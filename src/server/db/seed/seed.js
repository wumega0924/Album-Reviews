const db = require("../client");
const { createUser } = require("../users");
const { users } = require("./users-data");
const { albums } = require("./albums-data");
const { albumReviews } = require("./album-review-data");
const { userComments } = require("./comment-data");
const { createAlbum, createAlbumReviews } = require("../albums");
const { createComment } = require("../comments");

const dropTables = async () => {
  try {
    await db.query(`DROP TABLE IF EXISTS userComments;`);
    // await db.query(`DROP TABLE IF EXISTS userFavorites;`); << Favorites Table
    await db.query(`DROP TABLE IF EXISTS albumReviews;`);
    await db.query(`DROP TABLE IF EXISTS users;`);
    await db.query(`DROP TABLE IF EXISTS albums;`);
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255)
        )`);
    await db.query(`
        CREATE TABLE albums(
            id SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            artist VARCHAR(100) NOT NULL,
            genre VARCHAR(50),
            releaseDate INTEGER,
            imgURL VARCHAR(255)
        )`);
    await db.query(`
        CREATE TABLE albumReviews(
            id SERIAL PRIMARY KEY,
            userID INTEGER REFERENCES users(id),
            albumID INTEGER REFERENCES albums(id),
            rating INTEGER,
            comment TEXT,
            reviewDate DATE
        )`);
    await db.query(`
        CREATE TABLE userComments(
            id SERIAL PRIMARY KEY,
            content TEXT,
            reviewID INTEGER REFERENCES albumReviews(id),
            userID INTEGER REFERENCES users(id)
        )`);
    // Is this needed - not called for in Rubric.
    // await db.query(`
    //     CREATE TABLE userFavorites(
    //         id SERIAL PRIMARY KEY,
    //         review INTEGER REFERENCES albumReviews(id),
    //         userID INTEGER REFERENCES users(id),
    //         albumID INTEGER REFERENCES albums(id)
    //     )`);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
    }
    console.log("Seed USER data inserted successfully.");
  } catch (error) {
    console.error("Error USER inserting seed data:", error);
  }
};

const insertAlbums = async () => {
  try {
    for (const album of albums) {
      await createAlbum({
        title: album.title,
        artist: album.artist,
        genre: album.genre,
        releaseDate: album.releaseDate,
        imgUrl: album.imgUrl,
      });
    }
    console.log("Seed ALBUM data inserted successfully.");
  } catch (error) {
    console.error("Error inserting ALBUM seed data:", error);
  }
};

const insertAlbumReviews = async () => {
  try {
    for (const review of albumReviews) {
      await createAlbumReviews({
        userId: review.userId,
        albumId: review.albumId,
        rating: review.rating,
        comment: review.comment,
        reviewDate: review.reviewDate,
      });
    }
    console.log("Seed ALBUM REVIEWS data inserted successfully.");
  } catch (error) {
    console.error("Error inserting ALBUM REVIEWS seed data:", error);
  }
};

const insertComments = async () => {
  try {
    for (const comment of userComments) {
      await createComment({
        content: comment.content,
        reviewId: comment.reviewId,
        userId: comment.userId,
      });
    }
    console.log("Seed USER COMMENTS data inserted successfully.");
  } catch (error) {
    console.error("Error inserting USER COMMENTS seed data:", error);
  }
};

const seedDatabse = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertAlbums();
    await insertAlbumReviews();
    await insertComments();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabse();
