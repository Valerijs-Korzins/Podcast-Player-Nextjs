import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Loading from "../../loading";
import defaultimg from "/public/images/metadata/default.png";
import { encryptId } from "../../../lib/secret";

const Dance = ({ data }) => {
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
      {!data ? (
        <Loading />
      ) : (
        <div className="px-2">
          {data == "Not a valid Podcast URL" ? (
            <></>
          ) : (
            <>
              <div className="row justify-content-between">
                <div className="col-8">
                  <h6 className={styles.editortitle}>Dance Selection</h6>
                </div>
                <div className="col-4 text-right">
                  <Link href={"/podcasts/collections"} passHref>
                    <div className={styles.btnmore}>More</div>
                  </Link>
                </div>
              </div>
              <Slide {...properties}>
                {data
                  .sort(() => Math.random() - 0.5)
                  ?.map((content, idx) => (
                    <div key={idx}>
                      <Link
                        href={`/podcasts/subscribe/${encryptId(
                          content.id.toString()
                        )}`}
                        passHref
                      >
                        <div className={styles.collection}>
                          <Image
                            src={`/api/images?url=${encodeURIComponent(
                              content.infos.cover["200"]
                            )}`}
                            width="150px"
                            height="150px"
                            lazy="true"
                            unoptimized={
                              process.env.DEV_ENVIRONMENT == "true"
                                ? true
                                : false
                            }
                            title={content.title}
                            placeholder="blur"
                            blurDataURL={defaultimg.src}
                            quality={50}
                            className={styles.slickimage}
                          />
                          <div className={styles.collectioncontent}>
                            <div className={styles.slickcontent}>
                              {content.title}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </Slide>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dance;
