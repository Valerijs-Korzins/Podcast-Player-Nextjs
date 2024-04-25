import Head from "next/head";
import dynamic from "next/dynamic";
import LandingLayout from "../../../layouts/landing";
import { useRouter } from "next/router";
import { getPlaylistradio } from "../../../services/playlist";
import { useQuery } from "react-query";
// import Radio from "../../../components/playlists/radio";
const Radio = dynamic(() => import("../../../components/playlists/radio"));
import { decryptId } from "../../../lib/secret";

const RadioPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const sid = decryptId(id);
  const { data } = useQuery(["getPlaylistRadio", sid], () =>
    getPlaylistradio(sid)
  );
  return (
    <>
      <Head>
        <title>{data?.stationName} Playlist | Prysmradio</title>
      </Head>
      <Radio />
    </>
  );
};

RadioPage.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default RadioPage;
