import { useQuery } from "react-query";
import styles from "./style.module.scss";
import Search from "./search";
import Editor from "./editor";
import Dance from "./dance";
import { getPodcasts } from "../../services/podcast";

const Podcasts = () => {
  const { data } = useQuery(["dancepodcasts"], () => getPodcasts());
  return (
    <div>
      <div className={styles.maindiv}>
        <div className={styles.autodiv}></div>
        <div className="w-full px-2">
          <Search data={data} />
          <Editor data={data} />
        </div>
      </div>
      <div className={styles.dancediv}>
        <div className="w-full px-2">
          <Dance data={data} />
        </div>
      </div>
    </div>
  );
};
export default Podcasts;
