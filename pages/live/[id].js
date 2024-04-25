import dynamic from "next/dynamic";
const Live = dynamic(() => import("../../components/stations"));
// const Seo = dynamic(() => import("../../components/Seo"));
import Seo from "../../components/seo";
// const Seo = dynamic(() => import("../../components/seo"));
import LandingLayout from "../../layouts/landing";
// import Head from "next/head";
const LivePage = () => {
  return (
    <>
      <Seo />
      <Live />
    </>
  );
};

LivePage.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default LivePage;
