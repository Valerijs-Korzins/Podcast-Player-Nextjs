import Querystring from "querystring";

const { SPOTIFY_CLIENT_ID: client_id, SPOTIFY_CLIENT_SECRET: client_secret } =
  process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: Querystring.stringify({
      grant_type: "client_credentials",
    }),
  });
  return response.json();
};

export default async (_, res) => {
  const token = await getAccessToken();
  return res.status(200).json({ token });
};
