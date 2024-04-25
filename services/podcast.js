import axios from "../lib/axios";

export const getPodcasts = async () => {
  try {
    const res = await axios.get("/podcast/en/");
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getPodcast = async (id) => {
  try {
    if (id === null) {
      return;
    }
    const res = await axios.get(`/podcast/en/${id}/`);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
