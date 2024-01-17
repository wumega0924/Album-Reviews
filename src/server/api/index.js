const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

const volleyball = require("volleyball");
apiRouter.use(volleyball);

apiRouter.use(async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth?.startsWith("Bearer ")) {
    try {
      const token = auth.slice(7);
      if (token === "null") {
        next();
      } else {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with 'Bearer '`,
    });
  }
});

const usersRouter = require("./users");
const albumsRouter = require("./albums");
const commentsRouter = require("./comments");
const reviewsRouter = require("./reviews");
const id = require("volleyball/lib/id");

apiRouter.use("/users", usersRouter);
apiRouter.use("/albums", albumsRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = apiRouter;
