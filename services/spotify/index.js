import axios from "axios";

export const getSpotifyPlayList = async () => {
  try {
    const accesstoken = await axios("/api/spotifytoken");
    const token = "Bearer " + accesstoken.data.token.access_token;
    const url = `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER}/playlists`;
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return Promise.resolve(response.data.items);
  } catch (e) {
    return Promise.reject(e);
  }
};
