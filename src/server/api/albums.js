const express = require("express");
const albumRouter = express.Router();

const {
  getAlbum,
  deleteAlbumById,
  getAllAlbums,
  createAlbum,
  updateAlbum,
} = require("../db/albums");
const { isLoggedIn } = require("./roles");

// GET /api/albums/:id
albumRouter.get("/:id", async (req, res, next) => {
  try {
    const album = await getAlbum(req.params.id);
    res.send(album);
  } catch (err) {
    next(err);
  }
});

// GET /api/albums/
albumRouter.get("/", async (req, res, next) => {
  try {
    const albums = await getAllAlbums();
    res.send(albums);
  } catch (error) {
    console.error("Could not get all albums: ", err.message);
    throw err;
  }
});

// POST
albumRouter.post("/", isLoggedIn("admin"), async (req, res, next) => {
  try {
    const { title, artist, genre, releaseDate, imgUrl } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title is required to add album." });
    }

    const newAlbum = await createAlbum({
      title: title,
      artist: artist,
      genre: genre,
      releaseDate: releaseDate,
      imgUrl: imgUrl,
    });

    res
      .status(201)
      .json({ message: "Album added successfully", album: newAlbum });
  } catch (err) {
    next(err);
  }
});

// PATCH
albumRouter.patch("/:id", isLoggedIn("admin"), async (req, res, next) => {
  try {
    const updatedAlbum = await updateAlbum(req.params.id, req.body);
    if (!updatedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.json({
      message: "Album updated successfully",
      comment: updatedAlbum,
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/albums/:id
albumRouter.delete("/:id", isLoggedIn("admin"), async (req, res, next) => {
  try {
    const deletedAlbum = await deleteAlbumById(req.params.id);
    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not Found" });
    }
    res.json({
      message: "Album deleted Successfully",
      comment: deletedAlbum,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = albumRouter;
