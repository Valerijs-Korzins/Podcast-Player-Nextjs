import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Loading from "../../loading";
import defaultimg from "/public/images/metadata/default.png";
import { encryptId } from "../../../lib/secret";

const Editor = ({ data }) => {
  const properties = {
    duration: 250,
    transitionDuration: 250,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    infinite: false,
    canSwipe: true,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
            <g transform="rotate(-180 29.0575 30)">
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
            <g transform="rotate(0.112242 29.0575 30)">
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
      {!data ? (
        <Loading />
      ) : (
        <>
          <h6 className={styles.editortitle}>Editor’s Pick</h6>
          <Slide {...properties}>
            {data
              ?.sort(() => Math.random() - 0.5)
              .map((content, idx) => (
                <div key={idx}>
                  <Link
                    href={`/podcasts/subscribe/${encryptId(
                      content.id.toString()
                    )}`}
                    passHref
                  >
                    <div className={styles.slickSlide}>
                      <Image
                        src={`/api/images?url=${encodeURIComponent(
                          content.infos.cover["200"]
                        )}`}
                        width="250px"
                        height="250px"
                        lazy="true"
                        quality={50}
                        title={content.title}
                        placeholder="blur"
                        unoptimized={
                          process.env.DEV_ENVIRONMENT == "true" ? true : false
                        }
                        blurDataURL={defaultimg.src}
                        className={styles.slickimage}
                      />
                      <div className={styles.slickcontent}>{content.title}</div>
                    </div>
                  </Link>
                </div>
              ))}
          </Slide>
        </>
      )}
    </>
  );
};

export default Editor;
