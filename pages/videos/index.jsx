import Head from "next/head";
import LandingLayout from "../../layouts/landing";

const Videos = () => {
  return (
    <>
      <Head>
        <title>Videos | Prysmradio</title>
      </Head>
    </>
  );
};

Videos.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default Videos;
