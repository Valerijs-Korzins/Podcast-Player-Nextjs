import { useRouter } from "next/router";

const Collection = () => {
  const router = useRouter();
  const handleClick = () => {
    if (router.pathname == "/podcasts/collections") {
      router.push("/podcasts");
    } else if (router.pathname == "/podcasts/collections/[id]") {
      router.push("/podcasts");
    } else if (router.pathname == "/podcasts/subscribe/[id]") {
      router.push("/podcasts/collections");
    } else if (router.pathname == "/podcasts/episodes/[id]") {
      const answer_array = router.query.id.split("--");
      const redirecturl =
        "/podcasts/subscribe/" + encodeURIComponent(answer_array[0]);
      router.push(redirecturl);
    } else if (router.pathname == "/playlist/radio/[id]") {
      router.push("/playlist");
    }
  };
  return (
    <>
      <button onClick={() => handleClick()}>
        <p className="pb-1 text-light fs-5 d-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
          </svg>
          Back
        </p>
      </button>
    </>
  );
};

export default Collection;
