import styles from "./style.module.scss";
import Explore from "./explore";
import Stationplaylist from "./stationplaylist";

const Playlists = () => {
  return (
    <div>
      <div className={styles.maindiv}>
        <div className={styles.autodiv}></div>
        <div className="w-full px-2">
          <div className="mt-3 mb-4">
            <div className={styles.playlisttitle}>Explore us on Spotify</div>
          </div>
          <Explore />
          <div className="mt-5">
            <div className={styles.playlisttitle}>Stations Playlists</div>
          </div>
          <Stationplaylist />
        </div>
      </div>
    </div>
  );
};
export default Playlists;
