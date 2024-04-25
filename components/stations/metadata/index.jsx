import classnames from "classnames";
import Image from "next/image";
import styles from "./style.module.scss";
import { Col, Row, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPlayradioid,
  setCurrentradiotitle,
  setRadioPlay,
  setStreamurl,
  podcastSelector,
} from "../../../store/reducers/podcast";
import { useRouter } from "next/router";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { FaPlay } from "react-icons/fa";
import Metadataimg from "/public/images/metadata/default.png";
import Sharingsvg from "/public/images/metadata/sharing.png";
import defaultimg from "/public/images/metadata/default.png";

const Metadata = ({ metadata }) => {
  const {
    radioid,
    playradioid,
    gradiotitle,
    currentstreamurl,
    radioPlay,
    radiometadata,
  } = useSelector(podcastSelector);

  const dispatch = useDispatch();
  const router = useRouter();
  const sharingsrc = process.env.SITE_URL + router.asPath;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cradiodata, setRadiodata] = useState([]);

  useEffect(() => {
    setRadiodata(radiometadata);
  }, [radiometadata]);

  useEffect(() => {
    setRadiodata(metadata);
  }, [metadata]);

  function playRadio() {
    dispatch(setRadioPlay(true));
    dispatch(setPlayradioid(radioid));
    dispatch(setCurrentradiotitle(gradiotitle));
    dispatch(setStreamurl(currentstreamurl));
  }

  function playotherRadio() {
    dispatch(setRadioPlay(true));
    dispatch(setPlayradioid(radioid));
    dispatch(setCurrentradiotitle(gradiotitle));
    dispatch(setStreamurl(currentstreamurl));
  }

  return (
    <>
      <Row className="p-1">
        <Col className={styles.autohide}>
          <div className={styles.metainfo}>
            {playradioid === radioid ? (
              <>
                <h5>
                  {radioPlay ? (
                    <div className={styles.metabadge}>LIVE</div>
                  ) : (
                    <div className={styles.metabadge}>ON AIR</div>
                  )}
                </h5>
              </>
            ) : (
              <>
                <h5>
                  <div className={styles.metabadge}>ON AIR</div>
                </h5>
              </>
            )}
            <h3 className={styles.metatitle}>
              {cradiodata?.title ? cradiodata["title"] : "Loading...."}
            </h3>
            <button type="button" onClick={handleShow}>
              <Image
                src={Sharingsvg.src}
                className={styles.Sharingsvg}
                width="24"
                height="33"
                title="Sharing"
                unoptimized={
                  process.env.DEV_ENVIRONMENT == "true" ? true : false
                }
              />
            </button>
            <Modal
              show={show}
              size="md"
              className={styles.zindexmax}
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
                    src={
                      cradiodata?.cover
                        ? `/api/images?url=${encodeURIComponent(
                            cradiodata["cover"]["400"]
                          )}`
                        : Metadataimg.src
                    }
                    width="350px"
                    height="350px"
                    placeholder="blur"
                    title={cradiodata?.title}
                    blurDataURL={defaultimg.src}
                    unoptimized={
                      process.env.DEV_ENVIRONMENT == "true" ? true : false
                    }
                    quality={50}
                    className={styles.socialimage}
                  />
                  <h5 className="py-2">
                    {cradiodata?.title ? cradiodata["title"] : "Loading...."} -
                    Live
                  </h5>
                </div>
                <Row>
                  <Col>
                    <TwitterShareButton
                      url={sharingsrc}
                      title={
                        "Check out " +
                        cradiodata?.title +
                        " - Live on Prysmradio"
                      }
                      windowWidth="800"
                      windowHeight="600"
                    >
                      <TwitterIcon size={50} round />
                    </TwitterShareButton>
                  </Col>
                  <Col>
                    <FacebookShareButton
                      url={sharingsrc}
                      title={
                        "Check out " +
                        cradiodata?.title +
                        " - Live on Prysmradio"
                      }
                      windowWidth="800"
                      windowHeight="600"
                    >
                      <FacebookIcon size={50} round />
                    </FacebookShareButton>
                  </Col>
                  <Col>
                    <WhatsappShareButton
                      url={sharingsrc}
                      title={
                        "Check out " +
                        cradiodata?.title +
                        " - Live on Prysmradio"
                      }
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
        <Col>
          <div className={classnames(styles.metacard, "text-white mx-auto")}>
            <Image
              src={
                cradiodata?.cover
                  ? `/api/images?url=${encodeURIComponent(
                      cradiodata["cover"]["400"]
                    )}`
                  : Metadataimg.src
              }
              width="380px"
              height="380px"
              placeholder="blur"
              title={cradiodata?.song}
              unoptimized={process.env.DEV_ENVIRONMENT == "true" ? true : false}
              blurDataURL={defaultimg.src}
              quality={50}
            />
            {playradioid === radioid ? (
              <>
                {!radioPlay && (
                  <button
                    className={styles.playbtn}
                    onClick={(e) => playRadio(e)}
                  >
                    <FaPlay />
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  className={styles.playbtn}
                  onClick={(e) => playotherRadio(e)}
                >
                  <FaPlay />
                </button>
              </>
            )}
            <div className={styles.cardgradient}></div>
            <div className={styles.metatext}>
              {playradioid === radioid ? (
                <>
                  {radioPlay ? (
                    <p className={classnames(styles.badgeonair)}>LIVE</p>
                  ) : (
                    <p className={classnames(styles.badgeonair)}>ON AIR</p>
                  )}
                </>
              ) : (
                <>
                  <p className={classnames(styles.badgeonair)}>ON AIR</p>
                </>
              )}
              <p>{cradiodata?.song ? cradiodata["song"] : "Loading...."}</p>
            </div>
          </div>
        </Col>
        <Col className={styles.autohide} />
      </Row>
    </>
  );
};

export default Metadata;
