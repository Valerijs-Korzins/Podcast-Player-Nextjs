import Head from "next/head";
import LandingLayout from "../../layouts/landing";
import dynamic from "next/dynamic";
const PlaylistComponent = dynamic(() => import("../../components/playlists"));

const Playlist = () => {
  return (
    <>
      <Head>
        <title>Playlist | Prysmradio</title>
      </Head>
      <PlaylistComponent />
    </>
  );
};

Playlist.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default Playlist;
