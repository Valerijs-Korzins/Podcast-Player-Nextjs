import Head from "next/head";
import config from "./config";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { podcastSelector } from "../../store/reducers/podcast";

const SEO = () => {
  const { radiometadata } = useSelector(podcastSelector);
  const {
    originalTitle,
    originalDescription,
    siteName,
    social: { twitter },
    originalImage,
  } = config;
  const router = useRouter();
  const sharingsrc = process.env.SITE_URL + router.asPath;

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>
        {radiometadata?.title && radiometadata?.title + " - " + originalTitle}
      </title>
      <meta
        name="description"
        content={`${
          radiometadata?.title ? radiometadata?.title : originalDescription
        }`}
      />
      <meta
        name="image"
        content={`${
          radiometadata?.cover?.["100"]
            ? radiometadata?.cover?.["100"]
            : originalImage
        }`}
        key="ogtitle"
      />
      <meta
        property="og:title"
        content={`${
          radiometadata?.title ? radiometadata?.title : originalTitle
        }`}
        key="ogtitle"
      />
      <meta
        property="og:description"
        content={`${
          radiometadata?.title ? radiometadata?.title : originalDescription
        }`}
        key="ogdesc"
      />
      <meta
        property="twitter:card"
        content="summary_large_image"
        key="twcard"
      />
      <meta name="twitter:creator" content={twitter} key="twhandle" />
      <meta
        name="twitter:title"
        content={`${
          radiometadata?.title ? radiometadata?.title : originalTitle
        }`}
        key="twtitle"
      />
      <meta
        name="twitter:description"
        content={`${
          radiometadata?.title ? radiometadata?.title : originalDescription
        }`}
        key="twdescription"
      />
      <meta
        name="twitter:image"
        content={`${
          radiometadata?.cover?.["100"]
            ? radiometadata?.["cover"]["100"]
            : originalImage
        }`}
        key="twimage"
      />
      <meta property="og:url" content={`${sharingsrc}`} key="ogurl" />
      <meta
        property="og:image"
        content={`${
          radiometadata?.cover?.["100"]
            ? radiometadata?.cover?.["100"]
            : originalImage
        }`}
        key="ogimage"
      />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
    </Head>
  );
};
export default SEO;
