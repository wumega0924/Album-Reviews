const db = require("./client");

const createAlbum = async ({ title, artist, genre, releaseDate, imgUrl }) => {
  try {
    const {
      rows: [album],
    } = await db.query(
      `
      INSERT INTO albums(title, artist, genre, releaseDate, imgUrl)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [title, artist, genre, releaseDate, imgUrl]
    );

    return album;
  } catch (err) {
    console.error("Unable to create album. ", err.message);
    throw err;
  }
};

const createAlbumReviews = async ({
  userId,
  albumId,
  rating,
  comment,
  reviewDate,
}) => {
  try {
    const {
      rows: [albumReviews],
    } = await db.query(
      `
      INSERT INTO albumreviews(userId,
        albumId,
        rating,
        comment,
        reviewDate)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [userId, albumId, rating, comment, reviewDate]
    );

    return albumReviews;
  } catch (err) {
    console.error("Unable to create album reviews. ", err.message);
    throw err;
  }
};

// Database Functions
async function getAllAlbums() {
  try {
    const { rows } = await db.query(
      `
      SELECT * 
      FROM albums; 
      `
    );
    return rows;
  } catch (err) {
    console.error("Could not get all albums: ", err.message);
    throw err;
  }
}

//get album by id
async function getAlbum(id) {
  try {
    const {
      rows: [album],
    } = await db.query("SELECT * FROM albums WHERE id=$1", [id]);
    return album;
  } catch (err) {
    throw err;
  }
}

async function deleteAlbumById(id) {
  try {
    const { rows } = await db.query(
      "DELETE FROM albums WHERE id=$1 RETURNING *",
      [id]
    );
    return rows;
  } catch (err) {
    throw err;
  }
}

async function updateAlbum(id, updatedFields) {
  try {
    const { rows: updatedAlbum } = await db.query(
      `
      UPDATE albums
      SET title = $1, artist = $2, genre = $3, releasedate = $4, imgurl = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        updatedFields.title,
        updatedFields.artist,
        updatedFields.genre,
        updatedFields.releaseDate,
        updatedFields.imgUrl,
        id,
      ]
    );

    if (!updatedAlbum || updatedAlbum.length === 0) {
      throw new Error("Album not found");
    }

    return updatedAlbum;
  } catch (err) {
    console.error("Unable to update album.", err.message);
    throw err;
  }
}

module.exports = {
  createAlbum,
  createAlbumReviews,
  getAllAlbums,
  getAlbum,
  deleteAlbumById,
  updateAlbum,
};
