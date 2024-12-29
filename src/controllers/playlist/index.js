import { addVideoToPlaylist } from "./add-video-to-playlist/add-video-to-playlist.controller.js";
import { createPlaylist } from "./create-playlist/create-playlist.controller.js";
import { deletePlaylist } from "./delete-playlist/delete-playlist.controller.js";
import { updatePlaylist } from "./update-playlist/update-playlist.controller.js";
import { getUserPlaylists } from "./get-playlists/get-playlist.controller.js";
import { removeVideoFromPlaylist } from "./remove-video-from-playlist/remove-video-from-playlist.controller.js";
import { getPlaylistById } from "./get-playlist-byId/get-playlist-byId.controller.js";

export {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  updatePlaylist,
  getUserPlaylists,
  getPlaylistById,
  removeVideoFromPlaylist,
};
