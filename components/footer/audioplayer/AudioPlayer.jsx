import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import classnames from "classnames";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import {
  setRadioPlay,
  setCurrentvolume,
  podcastSelector,
} from "../../../store/reducers/podcast";
import useDebounce from "../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { getCurrentradiometadata } from "../../../services/radio";
import defaultimg from "/public/images/metadata/default.png";
import moment from "moment";

export function formatTime(seconds) {
  if (seconds === 0) {
    return "";
  }
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  hours = hours >= 10 ? hours : "0" + hours;
  minutes = minutes >= 60 ? minutes % 60 : minutes;
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return hours + ":" + minutes + ":" + seconds;
}

const AudioPlayer = () => {
  const {
    playradioid,
    radiotitle,
    radioPlay,
    podcastplaydata,
    streamurl,
    currentvolume,
  } = useSelector(podcastSelector);
  const { data } = useQuery(["radiometadata", playradioid], () =>
    getCurrentradiometadata(playradioid)
  );

  const dispatch = useDispatch();
  const [isStoping, setIsStoping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const [isTransport, setIsTransport] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isShow, setShow] = useState(false);
  const [rcover, setCover] = useState("");
  const [rtitle, setRadiotitle] = useState("");
  const [playrtitle, setPlayrtitle] = useState("");
  const [ratist, setArtist] = useState("");

  const audioPlayer = useRef();
  const progressBar_1 = useRef();
  const progressBar_2 = useRef();
  const transportbar = useRef();

  const volume = currentvolume ? currentvolume : 100;
  const [cvolume, setPlayervolume] = useState(volume);
  const [currentTimeProcentage, setCurrentTimeProcentage] = useState(0);
  const [currentDurationtime, setDurationtime] = useState(0);
  const setVolume = useDebounce(cvolume, 1000);

  useEffect(() => {
    dispatch(setCurrentvolume(setVolume));
  }, [setVolume]);

  useEffect(() => {
    transportbar.current.value =
      (currentTimeProcentage / currentDurationtime) * 1000;
  }, [currentTimeProcentage]);

  useEffect(() => {
    if (radioPlay === true) {
      audioPlayer.current.currentTime = 0;
      audioPlayer.current.play();
      setIsStoping(true);
    } else {
      audioPlayer.current.pause();
      setIsStoping(false);
    }
  }, [radioPlay]);

  useEffect(() => {
    if (podcastplaydata != undefined) {
      if (podcastplaydata.length != 0) {
        setDuration(100);
        setRadiotitle("");
        setArtist(podcastplaydata?.author);
        setPlayrtitle(podcastplaydata?.title);
        setCover(podcastplaydata?.cover2["cover100"]);
      }
    }
    setIsTransport(true);
    setDurationtime(0);
    setIsLoading(false);
    setCurrentTimeProcentage(0);
    progressBar_1.current.style.setProperty(
      "--seek-before-width",
      `${currentvolume}%`
    );
    progressBar_2.current.style.setProperty(
      "--seek-before-width",
      `${currentvolume}%`
    );
    if (podcastplaydata?.audio_url) {
      audioPlayer.current.src = podcastplaydata?.audio_url;
      const promise = audioPlayer.current.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsStoping(true);
            audioPlayer.current.onended = () => {
              dispatch(setRadioPlay(false));
              setIsTransport(false);
              setDurationtime(0);
              setIsLoading(false);
            };
          })
          .catch(() => {
            setIsStoping(false);
          });
      }
    } else {
      audioPlayer.current.src = null;
    }
  }, [podcastplaydata]);

  useEffect(() => {
    if (isTransport === false) {
      const interval = setInterval(() => {
        const ctimestamp = moment().unix();
        if (ctimestamp >= cenddate) {
          getCurrentradiometadata(playradioid)
            .then(function (response) {
              const etime =
                Number(response?.timestamp) + Number(response?.duration) / 1000;
              // eslint-disable-next-line no-const-assign
              cenddate = parseInt(etime);
              setCover(response?.cover2["cover100"]);
              setArtist(response?.artist);
              setPlayrtitle(response?.title);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isTransport]);

  const cenddate = 0;
  useEffect(() => {
    if (data != undefined) {
      if (data?.success != false) {
        setDuration(100);
        setRadiotitle(radiotitle);
        setCover(data?.cover2["cover100"]);
        setArtist(data?.artist);
        setPlayrtitle(data?.title);
      }
    }
    setIsTransport(false);
    setDurationtime(0);
    setCurrentTimeProcentage(0);
    setIsLoading(false);
    progressBar_1.current.style.setProperty(
      "--seek-before-width",
      `${currentvolume}%`
    );
    progressBar_2.current.style.setProperty(
      "--seek-before-width",
      `${currentvolume}%`
    );
    if (streamurl) {
      audioPlayer.current.src = streamurl;
      const promise = audioPlayer.current.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsStoping(true);
            audioPlayer.current.onended = () => {
              dispatch(setRadioPlay(false));
              setIsTransport(false);
              setDurationtime(0);
              setIsLoading(false);
            };
          })
          .catch(() => {
            setIsStoping(false);
          });
      }
    } else {
      audioPlayer.current.src = null;
    }
  }, [data]);

  const onLoadMetaData = () => {
    const { current: aud } = audioPlayer;
    setDurationtime(aud.duration);
    setIsLoading(true);
  };

  const togglePlayStop = () => {
    const prevStop = isStoping;
    setIsLoading(true);
    if (!prevStop) {
      audioPlayer.current.currentTime = 0;
      audioPlayer.current.play();
      dispatch(setRadioPlay(!prevStop));
      setIsStoping(!prevStop);
    } else {
      audioPlayer.current.pause();
      dispatch(setRadioPlay(!prevStop));
      setIsStoping(!prevStop);
    }
  };

  const togglePlayPause = () => {
    const prevPause = isStoping;
    if (!prevPause) {
      if (audioPlayer.current.src.match(new RegExp("null")) == null) {
        audioPlayer.current.play();
        setIsStoping(!prevPause);
      }
    } else {
      if (audioPlayer.current.src.match(new RegExp("null")) == null) {
        audioPlayer.current.pause();
        setIsStoping(!prevPause);
      }
    }
  };

  const toggleVolume_1 = () => {
    const prevValue2 = isVolume;
    setIsVolume(!prevValue2);
    if (!prevValue2) {
      if (audioPlayer.current.src.match(new RegExp("null")) == null) {
        audioPlayer.current.volume = 0;
      }
    } else {
      if (audioPlayer.current.src.match(new RegExp("null")) == null) {
        audioPlayer.current.volume = progressBar_1.current.value / 100;
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
      // setIsVolume(!prevValue2);
    } else {
      if (isVolume != false) {
        setIsVolume(!prevValue2);
      }
      if (audioPlayer.current.src.match(new RegExp("null")) == null) {
        audioPlayer.current.volume = progressBar_1.current.value / 100;
      }
      setPlayervolume(progressBar_1.current.value);
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
      // setIsVolume(!prevValue2);
    } else {
      if (isVolume != false) {
        setIsVolume(!prevValue2);
      }
      if (audioPlayer.current.src.match(new RegExp("null")) == null) {
        audioPlayer.current.volume = progressBar_2.current.value / 100;
      }
      setPlayervolume(progressBar_2.current.value);
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

  const changecurrenttime = () => {
    const setvalue = currentDurationtime * (transportbar.current.value / 1000);
    audioPlayer.current.currentTime = setvalue;
  };

  return (
    <div>
      <input
        style={{ display: isTransport ? "block" : "none" }}
        type="range"
        className={styles.transportbar}
        min="0"
        max="1000"
        ref={transportbar}
        onChange={changecurrenttime}
      />
      <Row className={styles.audioPlayer}>
        <Col md={5} className={classnames(styles.playdata, "d-flex")}>
          <Image
            src={
              data?.cover
                ? `/api/images?url=${encodeURIComponent(rcover)}`
                : defaultimg.src
            }
            width="80"
            height="80"
            unoptimized={process.env.DEV_ENVIRONMENT == "true" ? true : false}
            placeholder="blur"
            blurDataURL={defaultimg.src}
            quality={50}
            className={styles.footerimg}
            title={playrtitle}
          />
          <audio
            ref={audioPlayer}
            id="audioplayer"
            preload="matadata"
            onLoadedMetadata={onLoadMetaData}
            onTimeUpdate={(e) => {
              setCurrentTimeProcentage(e.currentTarget.currentTime);
            }}
          />
          <div className={styles.txttitle}>
            <div className={styles.txtcontent}>{rtitle ? rtitle : ""}</div>
            <div className={styles.txtcontent1}>
              {playrtitle ? playrtitle : ""}
            </div>
            <div className={styles.txtcontent}>
              {ratist ? ratist + " " : " "}
              {currentTimeProcentage > 0 ? (
                <>
                  {isTransport === true ? (
                    <>
                      <span className={styles.colorblue}>
                        {formatTime(currentTimeProcentage)}
                      </span>
                      {" / " + formatTime(currentDurationtime)}
                    </>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </Col>
        <Col md={2} className={classnames(styles.playdiv, "text-center")}>
          {isTransport !== true ? (
            <>
              <button onClick={togglePlayStop} className={styles.playPause}>
                {isLoading ? (
                  <>
                    {isStoping ? (
                      <FaStop title="Stop" />
                    ) : (
                      <FaPlay className={styles.play} title="Play" />
                    )}
                  </>
                ) : (
                  <div className="spinner-border text-light" />
                )}
              </button>
            </>
          ) : (
            <>
              <button onClick={togglePlayPause} className={styles.playPause}>
                {isLoading ? (
                  <>
                    {isStoping ? (
                      <FaPause title="Pause" />
                    ) : (
                      <FaPlay className={styles.play} title="Play" />
                    )}
                  </>
                ) : (
                  <div className="spinner-border text-light" />
                )}
              </button>
            </>
          )}
        </Col>
        <Col
          md={5}
          className={classnames(
            styles.autohide,
            styles.divprogressBar_1,
            "p-3"
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
            "p-3"
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
