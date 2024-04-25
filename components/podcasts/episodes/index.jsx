import { Button, Row, Col, Modal } from "react-bootstrap";
import styles from "./style.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import classnames from "classnames";
import { useRouter } from "next/router";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";

import { setPodcastMedia, setRadioPlay } from "../../../store/reducers/podcast";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import Loading from "../../loading";

import Sharingsvg from "/public/images/metadata/sharing.png";
import defaultimg from "/public/images/metadata/default.png";
import { decryptId } from "../../../lib/secret";
import { getPodcast } from "../../../services/podcast";
import Backcomponent from "../../common/back";

const Episode = () => {
  const router = useRouter();
  const answer_array = router.query.id.split("--");

  const podcastid = decryptId(answer_array[0]);
  const episodetitle = decryptId(answer_array[1]);
  const { data } = useQuery(["getPodcast", podcastid], () =>
    getPodcast(podcastid)
  );

  const sharingsrc = process.env.SITE_URL + router.asPath;
  const sharingtitle = "Check out " + episodetitle + " on Prysmradio";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [episode, setEpisodes] = useState([]);
  function renderComponent() {
    data?.episodes?.forEach((product) => {
      if (product?.title === episodetitle) {
        setEpisodes(product);
      }
    });
  }
  useEffect(() => {
    renderComponent();
  }, [data]);

  const dispatch = useDispatch();
  function setMedia() {
    dispatch(setPodcastMedia(episode));
    dispatch(setRadioPlay(true));
  }

  return (
    <>
      <div className={styles.maindiv}>
        {episode.length == 0 ? (
          <Loading />
        ) : (
          <div className="w-full px-2">
            <Row>
              <div className={styles.autodiv}></div>
              <Backcomponent />
              <Col xs={12} sm={6} className="pt-1 text-center">
                <div className={styles.subscribe}>
                  <Image
                    src={`/api/images?url=${encodeURIComponent(
                      episode.cover["400"]
                    )}`}
                    width="350px"
                    height="350px"
                    lazy="true"
                    title={episode.title}
                    className={styles.slickimage}
                  />
                </div>
                <div className="mt-4 d-inline-flex">
                  <div>
                    <Button
                      variant="light"
                      className={classnames(styles.btnplaynow, "rounded-pill")}
                      onClick={(e) => setMedia(e)}
                    >
                      PLAY NOW
                    </Button>
                  </div>
                  <button type="button" onClick={handleShow}>
                    <div className={styles.Sharingsvg}>
                      <Image
                        src={Sharingsvg.src}
                        width="50"
                        height="50"
                        title="Sharing"
                        unoptimized={
                          process.env.DEV_ENVIRONMENT == "true" ? true : false
                        }
                      />
                    </div>
                  </button>
                  <Modal
                    show={show}
                    className={styles.zindexmax}
                    size="md"
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Share</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={styles.socialbuttons}>
                      <div className={styles.socialimgdiv}>
                        <Image
                          src={`/api/images?url=${encodeURIComponent(
                            episode.cover["400"]
                          )}`}
                          width="350px"
                          height="350px"
                          title={episode.title}
                          placeholder="blur"
                          unoptimized={
                            process.env.DEV_ENVIRONMENT == "true" ? true : false
                          }
                          blurDataURL={defaultimg.src}
                          quality={50}
                          className={styles.socialimage}
                        />
                        <h5 className="py-2">{episode.title}</h5>
                      </div>
                      <Row>
                        <Col>
                          <TwitterShareButton
                            url={sharingsrc}
                            title={sharingtitle}
                            windowWidth="800"
                            windowHeight="600"
                          >
                            <TwitterIcon size={50} round />
                          </TwitterShareButton>
                        </Col>
                        <Col>
                          <FacebookShareButton
                            url={sharingsrc}
                            title={sharingtitle}
                            windowWidth="800"
                            windowHeight="600"
                          >
                            <FacebookIcon size={50} round />
                          </FacebookShareButton>
                        </Col>
                        <Col>
                          <WhatsappShareButton
                            url={sharingsrc}
                            title={sharingtitle}
                            windowWidth="800"
                            windowHeight="600"
                          >
                            <WhatsappIcon size={50} round />
                          </WhatsappShareButton>
                        </Col>
                      </Row>
                    </Modal.Body>
                  </Modal>
                </div>
              </Col>
              <Col xs={12} sm={6}>
                <div className={styles.slickcontent1}>{episode.title}</div>
                <div className={styles.slickcontent2}>by {episode.author}</div>
                <div
                  className={styles.slickcontent4}
                  dangerouslySetInnerHTML={{ __html: episode.summary }}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default Episode;
