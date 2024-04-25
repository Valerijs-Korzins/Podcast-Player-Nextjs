import Head from "next/head";
import LandingLayout from "../../layouts/landing";
const Trends = () => {
  return (
    <>
      <Head>
        <title>Trends | Prysmradio</title>
      </Head>
    </>
  );
};

Trends.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default Trends;
