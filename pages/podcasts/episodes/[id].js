import Head from "next/head";
import dynamic from "next/dynamic";
import LandingLayout from "../../../layouts/landing";
// import Episode from "../../../components/podcasts/episodes";
const Episode = dynamic(() => import("../../../components/podcasts/episodes"));

const EpisodePage = () => {
  return (
    <>
      <Head>
        <title>Episodes : Prysmradio</title>
      </Head>
      <Episode />
    </>
  );
};

EpisodePage.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default EpisodePage;
