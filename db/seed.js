import db from "#db/client";
import { createPlaylistTrack } from "./queries/playlists_tracks.js";
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
await seed();

async function seed() {
  // TODO
  await db.connect();
  for (let playlistCount = 0; playlistCount < 10; playlistCount++) {
    const playlist = await createPlaylist(
      `Playlist${playlistCount}`,
      `a description`,
    );
  }
  for (let trackCount = 0; trackCount < 20; trackCount++) {
    await createTrack(`Track${trackCount}`, trackCount + 3);
  }
  for (
    let playlistTrackCount = 0;
    playlistTrackCount < 15;
    playlistTrackCount++
  ) {
    const playlistId = 1 + playlistTrackCount;
    await createPlaylistTrack(playlistId, playlistTrackCount);
  }
  console.log("🌱 Database seeded.");
  await db.end();
}
