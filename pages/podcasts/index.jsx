import Head from "next/head";
import LandingLayout from "../../layouts/landing";
import dynamic from "next/dynamic";
const Podcastcomponent = dynamic(() => import("../../components/podcasts"));

const Podcast = () => {
  return (
    <>
      <Head>
        <title>Podcasts | Prysmradio</title>
      </Head>
      <Podcastcomponent />
    </>
  );
};

Podcast.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default Podcast;
