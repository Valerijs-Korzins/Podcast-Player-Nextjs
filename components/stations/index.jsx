import Slider from "./slider";
import Metadata from "./metadata";
import Pntracks from "./pntracks";
import { Container } from "react-bootstrap";
import styles from "./style.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getCurrentradiometadata } from "../../services/radio";
import Metadataimg from "/public/images/metadata/default.png";
import { useDispatch } from "react-redux";
import {
  setRadiomatadata,
  podcastSelector,
} from "../../store/reducers/podcast";
import moment from "moment";

const Station = () => {
  const dispatch = useDispatch();
  const { radioid } = useSelector(podcastSelector);

  const { data } = useQuery(["radiometadata", radioid], () =>
    getCurrentradiometadata(radioid)
  );

  const cenddate = 0;
  useEffect(() => {
    loadmetadata();
    const interval = setInterval(() => {
      const ctimestamp = moment().unix();
      console.log(radioid, ctimestamp, cenddate);
      if (ctimestamp >= cenddate) {
        loadmetadata();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [radioid]);

  const [bgimg, setBackgroundImg] = useState(Metadataimg.src);
  const loadmetadata = () => {
    getCurrentradiometadata(radioid)
      .then(function (response) {
        const etime =
          Number(response?.timestamp) + Number(response?.duration) / 1000;
        // eslint-disable-next-line no-const-assign
        cenddate = parseInt(etime);
        dispatch(setRadiomatadata(response));
        if (response?.cover?.["400"]) {
          setBackgroundImg(response?.cover?.["400"]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (data?.cover?.["400"]) {
      setBackgroundImg(data?.cover?.["400"]);
    }
  }, [data]);
  return (
    <>
      <div>
        <div
          className={styles.maindiv}
          style={{ position: "relative", height: "auto" }}
        >
          <Image
            src={bgimg}
            layout="fill"
            unoptimized={process.env.DEV_ENVIRONMENT == "true" ? true : false}
            title="Prysmradio"
            objectFit="cover"
            quality={50}
            className={styles.stationbg}
          />
          <Container>
            <div className={styles.autodiv}></div>
            <Slider />
            <Metadata />
            <Pntracks />
          </Container>
        </div>
      </div>
    </>
  );
};
export default Station;
