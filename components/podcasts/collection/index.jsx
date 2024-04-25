import styles from "./style.module.scss";
import Search from "../search";
import Image from "next/image";
import { Row } from "react-bootstrap";
import Link from "next/link";
import { useQuery } from "react-query";
import { getPodcasts } from "../../../services/podcast";
import Loading from "../../loading";
import defaultimg from "/public/images/metadata/default.png";
import { useRouter } from "next/router";
import { encryptId } from "../../../lib/secret";
import Backcomponent from "../../common/back";

const Collection = () => {
  const { data } = useQuery(["podcasts"], () => getPodcasts());
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className={styles.maindiv}>
        {!data ? (
          <Loading />
        ) : (
          <div className="w-full px-2">
            <div className={styles.autodiv}></div>
            <Backcomponent />
            <Search data={data} />
            {data?.filter((content) =>
              content["title"].match(new RegExp(id, "i"))
            ).length > 0 ? (
              <div className="mt-4">
                {id ? (
                  <div>Search result for : {id}</div>
                ) : (
                  <div>Dance Selection</div>
                )}
                <div className={styles.responsivegrid}>
                  {data
                    ?.sort(() => Math.random() - 0.5)
                    .filter((content) =>
                      content.title.match(new RegExp(id, "i"))
                    )
                    .map((content, idx) => (
                      <div key={idx}>
                        <Link
                          href={`/podcasts/subscribe/${encryptId(
                            content.id.toString()
                          )}`}
                          passHref
                        >
                          <div className={styles.collection}>
                            <Image
                              src={`/api/images?url=${encodeURIComponent(
                                content["infos"]["cover"]["200"]
                              )}`}
                              width="135px"
                              height="135px"
                              unoptimized={
                                process.env.DEV_ENVIRONMENT == "true"
                                  ? true
                                  : false
                              }
                              lazy="true"
                              placeholder="blur"
                              quality={50}
                              title={content.title}
                              blurDataURL={defaultimg.src}
                              className={styles.slickimage}
                            />
                            <div className={styles.slickcontent}>
                              {content.title}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <Row className="mt-4">
                <div>Theare are no search result for : {id}</div>
              </Row>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Collection;
