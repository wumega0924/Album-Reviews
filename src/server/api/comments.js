const express = require("express");
const commentsRouter = express.Router();
const {
  createComment,
  getComments,
  deleteComment,
  getCommentById,
  updateComment,
} = require("../db/comments");
const { isLoggedIn } = require("./roles");

//get all comments
commentsRouter.get("/", async (req, res, next) => {
  try {
    const comments = await getComments();
    res.send(comments);
  } catch (err) {
    next(err);
  }
});

//get comments by ID
commentsRouter.get("/:id", async (req, res, next) => {
  try {
    const comment = await getCommentById(req.params.id);
    res.send(comment);
  } catch (err) {
    next(err);
  }
});

//POST for a new comment
commentsRouter.post(
  "/",
  isLoggedIn("user", "admin"),
  async (req, res, next) => {
    try {
      const { content } = req.body;

      if (!content) {
        return res
          .status(400)
          .json({ message: "Contents are required for comments" });
      }

      //create a new comment object
      const newComment = await createComment({
        content: content,
        reviewId: req.body.reviewId,
        userId: req.body.userId,
      });

      res
        .status(201)
        .json({ message: "Comment added successfully", comment: newComment });
    } catch (err) {
      next(err);
    }
  }
);

// Patch request to update comments
commentsRouter.patch(
  "/:id",
  isLoggedIn("user", "admin"),
  async (req, res, next) => {
    try {
      const updatedComment = await updateComment(req.params.id, req.body);
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.json({
        message: "Comment updated successfully",
        comment: updatedComment,
      });
    } catch (err) {
      next(err);
    }
  }
);

//DELETE request to delete a comment
commentsRouter.delete(
  "/:id",
  isLoggedIn("user", "admin"),
  async (req, res, next) => {
    try {
      const deletedComment = await deleteComment(req.params.id);
      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not Found" });
      }
      res.json({
        message: "Comment deleted Successfully",
        comment: deletedComment,
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = commentsRouter;
