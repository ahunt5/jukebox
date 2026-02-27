-- TODO
DROP TABLE IF EXISTS playlists;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS playlists_tracks;

CREATE DATABASE jukebox;
\c jukebox;
CREATE TABLE playlists (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL 
);

CREATE TABLE playlists_tracks (
  id serial PRIMARY KEY,
  playlist_id int NOT NULL,
  track_id int NOT NULL,
  UNIQUE (playlist_id, track_id) 
);

CREATE TABLE tracks (
  id serial PRIMARY KEY,
  name text NOT NULL,
  duration_ms int NOT NULL
);
