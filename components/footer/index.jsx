import classnames from "classnames";
import styles from "./style.module.scss";
import { AudioPlayer } from "./audioplayer/AudioPlayer";
const Footer = () => {
  return (
    <>
      <div className={styles.autodiv}></div>
      <div className={classnames(styles.fixedbottom)}>
        <AudioPlayer />
      </div>
    </>
  );
};

export default Footer;
