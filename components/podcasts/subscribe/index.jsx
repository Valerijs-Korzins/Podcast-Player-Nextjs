import styles from "./style.module.scss";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import EpisodeCard from "./episodecard";
import { useRouter } from "next/router";
import { getPodcast } from "../../../services/podcast";
import { useQuery } from "react-query";
import Loading from "../../loading";
import defaultimg from "/public/images/metadata/default.png";
import { decryptId } from "../../../lib/secret";
import Backcomponent from "../../common/back";

const Subscribe = () => {
  const router = useRouter();
  const { id } = router.query;
  const podcastid = decryptId(id);
  const { data } = useQuery(["getPodcast", podcastid], () =>
    getPodcast(podcastid)
  );
  return (
    <>
      <div className={styles.maindiv}>
        <div className={styles.autodiv}></div>
        {data === undefined ? (
          <Loading />
        ) : (
          <div className="w-full px-2">
            <Backcomponent />
            {data["success"] != false ? (
              <Row>
                <Col xs={12} sm={6} className="pt-1">
                  <div className={styles.subscribe}>
                    <Image
                      src={`/api/images?url=${encodeURIComponent(
                        data?.infos.cover["400"]
                      )}`}
                      width="350px"
                      height="350px"
                      lazy="true"
                      title={data?.title}
                      unoptimized={
                        process.env.DEV_ENVIRONMENT == "true" ? true : false
                      }
                      quality={50}
                      placeholder="blur"
                      blurDataURL={defaultimg.src}
                      className={styles.subscribeimg}
                    />
                  </div>
                  <div className={styles.slickcontent1}>{data?.title}</div>
                  <div className={styles.slickcontent2}>
                    By {data?.infos.author}
                  </div>
                  <div
                    className={styles.slickcontent3}
                    dangerouslySetInnerHTML={{
                      __html: data?.infos.description,
                    }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <div className={styles.slickcontent4}>Episodes</div>
                  {data?.episodes.map((content, idx) => (
                    <div key={idx}>
                      <EpisodeCard content={content} podcastid={podcastid} />
                    </div>
                  ))}
                </Col>
              </Row>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Subscribe;
