const express = require("express");
const reviewsRouter = express.Router();
const {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getUserReviewsById,
} = require("../db/reviews");
const { getCommentById, getCommentByReviewId } = require("../db/comments");
const { isLoggedIn } = require("./roles");
const { getUserById } = require("../db");

// const { requireUser, requiredNotSent } = require('./utils')

// GET request for all reviews
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.send(reviews);
  } catch (err) {
    next(err);
  }
});

// GET request for a specific review by ID + associated comments.
reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const reviews = await getReviewById(req.params.id);
    for (let x = 0; x < reviews.length; x++) {
      const reviewComments = await getCommentByReviewId(reviews[x].id);
      reviews[x].comments = reviewComments;
      const users = [];
      for (let y = 0; y < reviews[x].comments.length; y++) {
        const currentComment = reviews[x].comments[y];
        const user = await getUserById(currentComment.userid);
        users.push(user);
      }
      reviews[x].users = users;
    }

    res.send(reviews);
  } catch (err) {
    next(err);
  }
});

// POST request for a new review
reviewsRouter.post("/", isLoggedIn("user", "admin"), async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const userReviews = await getUserReviewsById(req.body.userId);

    for (let x = 0; x < userReviews.length; x++) {
      const review = userReviews[x];
      if (Number.parseInt(req.body.albumId) === review.albumid) {
        res
          .status(400)
          .json({ message: "You've already reviewed this album!" });
        return;
      }
    }

    // Check if rating and comment are provided
    if (!rating || !comment) {
      return res
        .status(400)
        .json({ message: "Rating and comment are required" });
    }

    // Create a new review object
    const newReview = await createReview({
      userId: req.body.userId,
      albumId: req.body.albumId,
      rating: rating,
      comment: comment,
      reviewDate: new Date().toISOString(),
    });

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (err) {
    next(err);
  }
});

// PATCH request to update reviews
reviewsRouter.patch(
  "/:id",
  isLoggedIn("user", "admin"),
  async (req, res, next) => {
    try {
      const content = {
        comment: req.body.comment,
        rating: req.body.rating,
      };
      const updatedReview = await updateReview(req.params.id, content);
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json({
        message: "Review updated successfully",
        review: updatedReview,
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE request to delete a review
reviewsRouter.delete(
  "/:id",
  isLoggedIn("user", "admin"),
  async (req, res, next) => {
    try {
      const deletedReview = await deleteReview(req.params.id);
      if (!deletedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json({
        message: "Review deleted successfully",
        review: deletedReview,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = reviewsRouter;
