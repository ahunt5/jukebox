import express from "express";
const app = express();
export default app;

import playlistRouter from "./api/playlists.js";
import tracksRouter from "./api/tracks.js";

app.use(express.json());
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistRouter);

app.use((err, req, res, next) => {
  if (err.code === "22P02") return res.status(400).send(err.message);

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});
