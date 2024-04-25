import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getPodcast } from "../../../services/podcast";
import { useQuery } from "react-query";
import LandingLayout from "../../../layouts/landing";
// import Subscribe from "../../../components/podcasts/subscribe";
const Subscribe = dynamic(() =>
  import("../../../components/podcasts/subscribe")
);
import { decryptId } from "../../../lib/secret";

const CollectionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const podcastid = decryptId(id);
  const { data } = useQuery(["getPodcast", podcastid], () =>
    getPodcast(podcastid)
  );
  return (
    <>
      <Head>
        <title>{data?.title + " | "}Prysmradio</title>
      </Head>
      <Subscribe />
    </>
  );
};

CollectionPage.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default CollectionPage;
