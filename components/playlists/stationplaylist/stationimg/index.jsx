import styles from "./style.module.scss";
import Image from "next/image";
import { useQuery } from "react-query";
import { getRadio } from "../../../../services/radio";
import defaultimg from "/public/images/metadata/default.png";

const StationImg = (props) => {
  const id = props.radioid;
  const { data } = useQuery(["getRadio", id], () => getRadio(id));
  return (
    <Image
      src={`/api/images?url=${encodeURIComponent(data?.cover2.cover400)}`}
      width="130px"
      height="130px"
      title={props.radiotitle}
      lazy="true"
      placeholder="blur"
      unoptimized={process.env.DEV_ENVIRONMENT == "true" ? true : false}
      blurDataURL={defaultimg.src}
      quality={50}
      className={styles.slickimage}
    />
  );
};
export default StationImg;
