import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import { FaPlay, FaPause } from "react-icons/fa";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import classnames from "classnames";
import Image from "next/image";

import { Col, Row } from "react-bootstrap";

import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { podcastSelector } from "../../../store/reducers/podcast";
import { getCurrentradiometadata } from "../../../services/radio";

import Metadataimg from "/public/images/metadata/1.jpg";
import defaultimg from "/public/images/radio/default.jpg";

const AudioPlayer = () => {
  const { radioid } = useSelector(podcastSelector);
  const { data } = useQuery(["radiometadata", radioid], () =>
    getCurrentradiometadata(radioid)
  );
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioPlayer, setAudio] = useState(null);
  const [isShow, setShow] = useState(false);

  // references
  const progressBar_1 = useRef(); // reference our progress bar
  const progressBar_2 = useRef(); // reference our progress bar

  useEffect(() => {
    setDuration(100);
    progressBar_1.current.max = 100;
    progressBar_1.current.style.setProperty("--seek-before-width", `100%`);
    progressBar_2.current.max = 100;
    progressBar_2.current.style.setProperty("--seek-before-width", `100%`);
    if (data?.listen) {
      setAudio(new Audio(data?.listen));
    } else {
      setAudio(null);
    }
  }, [data]);

  const togglePlayPause = () => {
    const prevValue1 = isPlaying;
    if (!prevValue1) {
      if (audioPlayer != null) {
        audioPlayer.play();
        setIsPlaying(!prevValue1);
      }
    } else {
      if (audioPlayer != null) {
        audioPlayer.pause();
        setIsPlaying(!prevValue1);
      }
    }
  };

  const toggleVolume_1 = () => {
    const prevValue2 = isVolume;
    setIsVolume(!prevValue2);
    if (!prevValue2) {
      if (audioPlayer != null) {
        audioPlayer.volume = 0;
      }
    } else {
      if (audioPlayer != null) {
        audioPlayer.volume = progressBar_1.current.value / 100;
      }
    }
  };

  const toggleVolume_2 = () => {
    const prevValue2 = isShow;
    setShow(!prevValue2);
  };

  const changeRange_1 = () => {
    const prevValue2 = isVolume;
    if (progressBar_1.current.value == 0) {
      setIsVolume(!prevValue2);
    } else {
      if (isVolume != false) {
        setIsVolume(!prevValue2);
      }
      if (audioPlayer != null) {
        audioPlayer.volume = progressBar_1.current.value / 100;
      }
      progressBar_1.current.style.setProperty(
        "--seek-before-width",
        `${(progressBar_1.current.value / duration) * 100}%`
      );
      progressBar_2.current.style.setProperty(
        "--seek-before-width",
        `${(progressBar_1.current.value / duration) * 100}%`
      );
    }
  };
  const changeRange_2 = () => {
    const prevValue2 = isVolume;
    if (progressBar_2.current.value == 0) {
      setIsVolume(!prevValue2);
    } else {
      if (isVolume != false) {
        setIsVolume(!prevValue2);
      }
      if (audioPlayer != null) {
        audioPlayer.volume = progressBar_2.current.value / 100;
      }
      progressBar_1.current.style.setProperty(
        "--seek-before-width",
        `${(progressBar_2.current.value / duration) * 100}%`
      );
      progressBar_2.current.style.setProperty(
        "--seek-before-width",
        `${(progressBar_2.current.value / duration) * 100}%`
      );
    }
  };
  return (
    <div className={styles.audioPlayer}>
      <Row>
        <Col md={5} className="d-flex border-bottom">
          <Image
            src={
              data?.cover
                ? `/api/images?url=${encodeURIComponent(data?.cover["400"])}`
                : Metadataimg.src
            }
            width="80"
            height="80"
            placeholder="blur"
            blurDataURL={defaultimg.src}
            quality={50}
          />
          <div className={styles.txttitle}>
            {data?.title ? data?.title : "No title"}
            <div className={styles.txtcontent}>
              {data?.artist ? data?.artist : "No artist"}
            </div>
          </div>
        </Col>
        <Col
          md={2}
          className={classnames(styles.playdiv, "text-center border-bottom")}
        >
          <button onClick={togglePlayPause} className={styles.playPause}>
            {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
          </button>
        </Col>
        <Col
          md={5}
          className={classnames(
            styles.autohide,
            styles.divprogressBar_1,
            "p-3 border-bottom"
          )}
        >
          <button onClick={() => toggleVolume_1()} className={styles.volume}>
            {isVolume ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
          </button>
          <input
            // style={{ display: isVolume ? "block" : "none" }}
            type="range"
            className={styles.progressBar_1}
            min="0"
            max="100"
            ref={progressBar_1}
            onChange={changeRange_1}
          />
        </Col>
        <Col
          md={5}
          className={classnames(
            styles.autohide,
            styles.divprogressBar_2,
            "p-3 border-bottom"
          )}
        >
          <button onClick={() => toggleVolume_2()} className={styles.volume}>
            {isVolume ? <IoMdVolumeOff /> : <IoMdVolumeHigh />}
          </button>
          <input
            style={{ display: isShow ? "block" : "none" }}
            type="range"
            className={styles.progressBar_2}
            min="0"
            max="100"
            ref={progressBar_2}
            onChange={changeRange_2}
          />
        </Col>
      </Row>
    </div>
  );
};

export { AudioPlayer };
