import styles from "./style.module.scss";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import classnames from "classnames";
import defaultimg from "/public/images/metadata/default.png";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { podcastSelector } from "../../../../store/reducers/podcast";
import { getPlayedlist } from "../../../../services/radio";

const Playedcards = () => {
  const { radioid, radiometadata } = useSelector(podcastSelector);
  const { data } = useQuery(["radioplayedlist", radioid], () =>
    getPlayedlist(radioid)
  );

  const [playedlist, setPlayedlist] = useState([]);
  useEffect(() => {
    getPlayedlist(radioid)
      .then(function (response) {
        setPlayedlist(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [radiometadata]);

  useEffect(() => {
    setPlayedlist(data);
  }, [data]);

  if (playedlist !== undefined) {
    return (
      <Col className={styles.zindexzero}>
        <p className={styles.pntracktextjp}>JUST PLAYED</p>
        <Row className={classnames(styles.textcenter, styles.trackjp)}>
          {playedlist?.map((content, idx) => (
            <Col key={idx} id={idx}>
              {content["cover"] && content["cover"]["200"] ? (
                <div className={styles.textright}>
                  <Image
                    src={`/api/images?url=${encodeURIComponent(
                      content["cover"]["100"]
                    )}`}
                    className={styles.imgborder}
                    width="150"
                    height="150"
                    placeholder="blur"
                    title={content["title"]}
                    unoptimized={
                      process.env.DEV_ENVIRONMENT == "true" ? true : false
                    }
                    blurDataURL={defaultimg.src}
                    quality={50}
                  />
                </div>
              ) : null}
            </Col>
          ))}
        </Row>
      </Col>
    );
  } else {
    return (
      <Col>
        <p className={styles.pntracktextjp}>JUST PLAYED</p>
      </Col>
    );
  }
};

export default Playedcards;
