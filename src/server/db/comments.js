const db = require("./client");

const createComment = async ({ content, reviewId, userId }) => {
  try {
    const {
      rows: [comment],
    } = await db.query(
      `
      INSERT INTO userComments(content, reviewId, userId)
      VALUES($1, $2, $3)
      RETURNING *
      `,
      [content, reviewId, userId]
    );

    return comment;
  } catch (err) {
    console.error("Unable to create comment. ", err.message);
    throw err;
  }
};

async function deleteComment(id) {
  try {
    const { rows } = await db.query(
      "DELETE FROM userComments WHERE id=$1 RETURNING *",
      [id]
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getComments() {
  try {
    const { rows } = await db.query(`SELECT * FROM userComments;`);
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getCommentById(id) {
  try {
    const { rows } = await db.query("SELECT * FROM userComments WHERE id=$1", [
      id,
    ]);
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getCommentByReviewId(reviewId) {
  try {
    const { rows } = await db.query(
      "SELECT * FROM userComments WHERE reviewid=$1",
      [reviewId]
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function updateComment(id, updatedFields) {
  try {
    const { rows: updatedComment } = await db.query(
      `
      UPDATE userComments
      SET content = $1, reviewId = $2, userId = $3
      WHERE id = $4
      RETURNING *
      `,
      [updatedFields.content, updatedFields.reviewId, updatedFields.userId, id]
    );

    if (!updatedComment || updatedComment.length === 0) {
      throw new Error("Comment not found");
    }

    return updatedComment[0];
  } catch (err) {
    console.error("Unable to update comment.", err.message);
    throw err;
  }
}

async function getUserCommentsById(userId) {
  try {
    const { rows } = await db.query(
      `SELECT * FROM userComments WHERE userid=${userId}`
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createComment,
  getComments,
  deleteComment,
  getCommentById,
  updateComment,
  getCommentByReviewId,
  getUserCommentsById,
};
