import styles from "./style.module.scss";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useQuery } from "react-query";
import { getPlaylist } from "../../../services/playlist";
import StationImg from "./stationimg";
import Loading from "../../loading";
import { encryptId } from "../../../lib/secret";

const Collection = () => {
  const { data } = useQuery(["playList"], () => getPlaylist());
  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <Row>
          {data?.map((content, idx) => (
            <Col xs={6} sm={4} md={3} lg={2} className="p-2" key={idx}>
              <div className={styles.collection}>
                <Link
                  href={`/playlist/radio/${encryptId(
                    content.stationID.toString()
                  )}`}
                  passHref
                >
                  <div className={styles.collection}>
                    <StationImg radioid={content.stationID} />
                    <div className={styles.slickcontent}>{content.station}</div>
                  </div>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Collection;
