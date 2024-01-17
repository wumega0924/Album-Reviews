const db = require("./client");

async function getReviews() {
  try {
    const { rows } = await db.query(`SELECT * FROM albumReviews;`);
    return rows;
  } catch (err) {
    throw err;
  }
}

async function getReviewById(id) {
  try {
    const { rows } = await db.query(
      "SELECT * FROM albumReviews WHERE albumid=$1",
      [id]
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

const createReview = async ({
  userId,
  albumId,
  rating,
  comment,
  reviewDate,
}) => {
  try {
    const {
      rows: [reviews],
    } = await db.query(
      `
            INSERT INTO albumReviews(userId, albumId, rating, comment, reviewDate)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
            `,
      [userId, albumId, rating, comment, reviewDate]
    );

    return reviews;
  } catch (err) {
    console.error("Review created failed", err.message);
    throw err;
  }
};

const updateReview = async (id, { comment, rating }) => {
  try {
    const {
      rows: [updatedReview],
    } = await db.query(
      `
            UPDATE albumReviews
            SET rating = $2, comment = $3
            WHERE id = $1
            RETURNING *
            `,
      [id, rating, comment]
    );

    if (!updatedReview) {
      throw new Error("Review not found");
    }

    return updatedReview;
  } catch (err) {
    console.error("Unable to update review. ", err.message);
    throw err;
  }
};

const deleteReview = async (id) => {
  try {
    const {
      rows: [deletedReview],
    } = await db.query("DELETE FROM albumReviews WHERE id = $1 RETURNING *", [
      id,
    ]);

    if (!deletedReview) {
      throw new Error("Review not found");
    }

    return deletedReview;
  } catch (err) {
    console.error("Unable to delete review. ", err.message);
    throw err;
  }
};

async function getUserReviewsById(userId) {
  try {
    const { rows } = await db.query(
      `SELECT * FROM albumReviews WHERE userid=${userId}`
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getUserReviewsById,
};
