import styles from "./style.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { getPlaylistradio } from "../../../services/playlist";
import { useQuery } from "react-query";
import defaultimg from "/public/images/metadata/default.png";
import Loading from "../../loading";
import BackComponent from "../../common/back";
import { decryptId } from "../../../lib/secret";

const Radio = () => {
  const router = useRouter();
  const { id } = router.query;
  const sid = decryptId(id);
  const { data } = useQuery(["getPlaylistRadio", sid], () =>
    getPlaylistradio(sid)
  );

  return (
    <>
      {!data ? (
        <Loading />
      ) : (
        <div>
          <div className={styles.maindiv}>
            <div className={styles.autodiv}></div>
            <div className="w-full px-2 pb-2">
              <BackComponent />
              <div>
                <div className={styles.playlisttitle}>{data?.stationName}</div>
              </div>
              {data?.playlists?.map((listresult, idx) => (
                <div key={idx}>
                  <div>
                    <div className={styles.playlissubttitle}>
                      {listresult.name}
                    </div>
                  </div>
                  <div className={styles.responsivegrid}>
                    {listresult.content ? (
                      listresult.content
                        .filter(function (el) {
                          if (el.listen) {
                            return el;
                          }
                        })
                        .map((contentresult, idx) => (
                          <div className={styles.collection} key={idx}>
                            <Image
                              // src={defaultimg.src}
                              src={`/api/images?url=${encodeURIComponent(
                                contentresult["cover"]["200"]
                              )}`}
                              title={contentresult.title}
                              width="135px"
                              height="135px"
                              lazy="true"
                              placeholder="blur"
                              unoptimized={
                                process.env.DEV_ENVIRONMENT == "true"
                                  ? true
                                  : false
                              }
                              quality={50}
                              blurDataURL={defaultimg.src}
                              className={styles.slickimage}
                            />
                            <div className={styles.collectioncontent}>
                              <div className={styles.slickcontent}>
                                {contentresult.title}
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Radio;
