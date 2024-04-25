import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getRadios } from "../services/radio";
import { useDispatch } from "react-redux";
import {
  setCurrentradioid,
  setgCurrentradiotitle,
  // setPlayradioid,
  podcastSelector,
} from "../store/reducers/podcast";
import { encryptId } from "../lib/secret";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import LandingLayout from "../layouts/landing";

const HomePage = () => {
  const router = useRouter();
  const { radioid, sliderid } = useSelector(podcastSelector);
  const { data } = useQuery(["radios"], () => getRadios());
  const dispatch = useDispatch();
  if (data) {
    if (radioid.length == 0) {
      dispatch(setCurrentradioid(data[0].id));
      // dispatch(setPlayradioid(data[0].id));
      dispatch(setgCurrentradiotitle(data[0].name));
      const path = "/live/" + encryptId("0");
      router.push(path);
    } else if (sliderid) {
      const path = "/live/" + encryptId(sliderid.toString());
      router.push(path);
    } else {
      dispatch(setCurrentradioid(data[0].id));
      // dispatch(setPlayradioid(data[0].id));
      dispatch(setgCurrentradiotitle(data[0].name));
      const path = "/live/" + encryptId("0");
      router.push(path);
    }
  }
  return (
    <>
      <div className="bgsplash" />
      <Loading />
    </>
  );
};

HomePage.Layout = function Layout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};

export default HomePage;
