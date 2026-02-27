import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";

import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { getTracksByPlaylistId } from "#db/queries/tracks";
import { getTrackById } from "#db/queries/tracks";
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { name, description } = req.body;
  if (!name || !description)
    return res
      .status(400)
      .send("Request body must contain a name and description");

  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

router.param("id", async (req, res, next, id) => {
  if (isNaN(Number(id))) return res.status(400).send("id is not a number");
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");
  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is required.");

  const { trackId } = req.body;
  if (!trackId) return res.status(400).send("Request body requires trackID");
  const track = await getTrackById(trackId);
  if (!track) return res.status(404).send("Track not found.");
  if (track) return res.status(400).send("This track already exists!");
  const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
  res.status(201).send(playlistTrack);
});
