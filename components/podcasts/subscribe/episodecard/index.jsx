import styles from "./style.module.scss";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import classnames from "classnames";
// import Link from "next/link";
import defaultimg from "/public/images/metadata/default.png";
import moment from "moment";
import { useRouter } from "next/router";
import { encryptId } from "../../../../lib/secret";

const EpisodeCard = ({ content, podcastid }) => {
  const summary = content.summary.replace(/(<([^>]+)>)/gi, "");
  const pubDate = moment(content.pubDate).format("YYYY/MM/DD");
  const duration = moment.duration(
    ((content.duration + 3600) % (24 * 3600)) * 1000 - 2
  );
  const hours =
    duration.hours() == 23 ? duration.hours() - 23 : duration.hours() + 1;
  const playtime =
    (hours > 0 ? hours + "h " : "") +
    (duration.minutes() > 0 ? duration.minutes() + "m " : "") +
    (duration.seconds() > 0 ? duration.seconds() + "s " : "");

  const router = useRouter();
  const handleClick = (content, podcastid) => {
    const link =
      "/podcasts/episodes/" +
      encryptId(podcastid.toString()) +
      "--" +
      encryptId(content.title.toString());

    router.push({
      pathname: link,
    });
  };
  return (
    <Row
      className={classnames(styles.episodecard, "py-4")}
      onClick={() => handleClick(content, podcastid)}
    >
      <Col md={2} className="text-center mt-2">
        <Image
          src={`/api/images?url=${encodeURIComponent(content?.cover["100"])}`}
          width="85px"
          height="85px"
          lazy="true"
          placeholder="blur"
          title={content.title}
          blurDataURL={defaultimg.src}
          unoptimized={process.env.DEV_ENVIRONMENT == "true" ? true : false}
          quality={50}
          className={styles.slickimage}
        />
      </Col>
      <Col md={10}>
        <div className={styles.slickcontent1}>{content.title}</div>
        <div className={styles.slickcontent2}>{summary}</div>
        <div className={styles.slickcontent3}>
          <span>{pubDate}</span>
          <span className="ml-3">{playtime}</span>
        </div>
      </Col>
    </Row>
  );
};
export default EpisodeCard;
