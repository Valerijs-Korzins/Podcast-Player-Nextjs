import Image from "next/image";
import styles from "./style.module.scss";
import defaultimg from "/public/images/metadata/default.png";
import SlickSlider from "react-slick";
import { useQuery } from "react-query";
import { getRadios } from "../../../services/radio";
import { useDispatch } from "react-redux";
import {
  setCurrentradioid,
  setCurrentsliderid,
  setgCurrentradiotitle,
  setCurrentstreamurl,
} from "../../../store/reducers/podcast";
import { encryptId, decryptId } from "../../../lib/secret";
import { useRouter } from "next/router";

const Slider = () => {
  const router = useRouter();
  const { id } = router.query;
  const sliderid = decryptId(id);
  const csliderid = sliderid ? Number(sliderid) : 0;
  const { data } = useQuery(["radios"], () => getRadios());
  const dispatch = useDispatch();
  const settings = {
    className: "center",
    centerMode: true,
    slidesToShow: 5,
    initialSlide: csliderid,
    speed: 250,
    centerPadding: "0",
    focusOnSelect: true,
    afterChange: function (next) {
      const path = "/live/" + encryptId(next.toString());
      dispatch(setCurrentsliderid(next));
      dispatch(setCurrentradioid(data?.[next]["id"]));
      dispatch(setgCurrentradiotitle(data?.[next]["name"]));
      dispatch(setCurrentstreamurl(data?.[next]["stream"]["0"]["stream_url"]));
      router.push(path);
    },
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
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
  };
  return (
    <>
      {data && (
        <div className={styles.slider}>
          {data.length > 0 ? (
            <div>
              <SlickSlider {...settings} className={styles.slickSlide}>
                {data?.map((content, idx) => (
                  <div
                    data-index={idx}
                    key={idx}
                    id={idx}
                    className={styles.imgdiv}
                  >
                    <Image
                      src={`/api/images?url=${encodeURIComponent(
                        content?.["cover"]["100"]
                      )}`}
                      width="120px"
                      height="120px"
                      placeholder="blur"
                      lazylod="true"
                      title={content?.["name"]}
                      unoptimized={
                        process.env.DEV_ENVIRONMENT == "true" ? true : false
                      }
                      blurDataURL={defaultimg.src}
                      quality={50}
                      className={styles.slickimage}
                    />
                  </div>
                ))}
              </SlickSlider>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Slider;
