import axios from "../lib/axios";

export const getPlaylist = async () => {
  try {
    const res = await axios.get("/playlist/");
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getPlaylistradio = async (id) => {
  try {
    const res = await axios.get(`/playlist/radio/${id}/`);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
