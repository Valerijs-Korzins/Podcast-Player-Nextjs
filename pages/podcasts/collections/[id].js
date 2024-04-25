import Head from "next/head";
import dynamic from "next/dynamic";
import LandingLayout from "../../../layouts/landing";
// import Collection from "../../../components/podcasts/collection";
const Collection = dynamic(() =>
  import("../../../components/podcasts/collection")
);

const CollectionPage = () => {
  return (
    <>
      <Head>
        <title>Collections | Prysmradio</title>
      </Head>
      <Collection />
    </>
  );
};

CollectionPage.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default CollectionPage;
