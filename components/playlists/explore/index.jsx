import Image from "next/image";
import styles from "./style.module.scss";
import { useQuery } from "react-query";
import { Slide } from "react-slideshow-image";
import { getSpotifyPlayList } from "../../../services/spotify";
import "react-slideshow-image/dist/styles.css";

const Explore = () => {
  const { data, isSuccess } = useQuery(["spotifyPlayList"], () =>
    getSpotifyPlayList()
  );

  const properties = {
    duration: 250,
    transitionDuration: 250,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: false,
    infinite: false,
    canSwipe: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    prevArrow: (
      <div
        style={{ width: "60px", marginRight: "-60px", marginTop: "-30px" }}
        className={styles.prevArrow}
      >
        <svg width="60.00000000000001" height="60.00000000000001" fill="none">
          <g>
            <circle opacity="0.6" fill="white" r="30" cy="30" cx="30" />
            <g transform="rotate(-180 30 30)">
              <path
                fill="#FF0000"
                d="m22,39.885l2.115,2.115l12.00003,-12l-12.00003,-12l-2.115,2.115l9.87003,9.885l-9.87003,9.885z"
              />
            </g>
          </g>
        </svg>
      </div>
    ),
    nextArrow: (
      <div
        style={{ width: "60px", marginLeft: "-60px", marginTop: "-30px" }}
        className={styles.nextArrow}
      >
        <svg width="60.00000000000001" height="60.00000000000001" fill="none">
          <g>
            <circle opacity="0.6" fill="white" r="30" cy="30" cx="30" />
            <g transform="rotate(0 30 30)">
              <path
                fill="#FF0000"
                d="m22,39.885l2.115,2.115l12.00003,-12l-12.00003,-12l-2.115,2.115l9.87003,9.885l-9.87003,9.885z"
              />
            </g>
          </g>
        </svg>
      </div>
    ),
  };
  return (
    <>
      <Slide {...properties}>
        {isSuccess &&
          data?.map((content, idx) => (
            <div key={idx}>
              <a
                href={content["external_urls"]["spotify"]}
                target="_blank"
                className="no-underline"
                rel="noreferrer"
              >
                <div className={styles.slickSlide}>
                  <Image
                    src={`/api/images?url=${encodeURIComponent(
                      content["images"]["0"]["url"]
                    )}`}
                    title={content["name"]}
                    width="135px"
                    height="135px"
                    lazy="true"
                    unoptimized={
                      process.env.DEV_ENVIRONMENT == "true" ? true : false
                    }
                    className={styles.slickimage}
                    quality={50}
                  />
                  <div className={styles.slickcontent}>{content["name"]}</div>
                </div>
              </a>
            </div>
          ))}
      </Slide>
    </>
  );
};

export default Explore;
