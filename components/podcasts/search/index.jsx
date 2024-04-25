import styles from "./style.module.scss";
import { Col, Row } from "react-bootstrap";
import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { encryptId } from "../../../lib/secret";

const Search = ({ data }) => {
  const searchRef = useRef(null);
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const onFocus = useCallback(() => {
    setActive(true);
    document.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      document.removeEventListener("click", onClick);
    }
  }, []);

  const onChange = useCallback((event) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      if (searchValue && data.length > 0) {
        router.push({
          pathname: `/podcasts/collections/${searchValue}`,
        });
      }
    }
  };

  return (
    <Row className={styles.searchdiv}>
      <Col md={6}>
        <div className={styles.podcaststitle}>Podcasts</div>
      </Col>
      <Col md={6}>
        <div className={styles.container} ref={searchRef}>
          <input
            className={styles.search}
            type="text"
            name="search"
            onFocus={onFocus}
            value={searchValue}
            onChange={onChange}
            placeholder="Search Podcasts"
            autoComplete="off"
            onKeyPress={(e) => handleSearch(e)}
          />
          {active && searchValue.length > 0 && (
            <ul className={styles.results}>
              {data?.filter((content) =>
                content.title.match(new RegExp(searchValue, "i"))
              ).length > 0 ? (
                <div>
                  {data
                    ?.filter((content) =>
                      content.title.match(new RegExp(searchValue, "i"))
                    )
                    .map(({ idx, title }) => (
                      <Link
                        key={idx}
                        href={`/podcasts/subscribe/${encryptId(
                          idx.toString()
                        )}`}
                        passHref
                      >
                        <li className={styles.result}>
                          <a>{title}</a>
                        </li>
                      </Link>
                    ))}
                  <Link
                    className={styles.allsearch}
                    href={`/podcasts/collections/${searchValue}`}
                    passHref
                  >
                    <li className={styles.result}>
                      <a>See All Podcasts : {searchValue}</a>
                    </li>
                  </Link>
                </div>
              ) : (
                <li className={styles.emptyresult}>
                  Theare are no search result for :{" "}
                  <span className="text-info">{searchValue}</span>
                </li>
              )}
            </ul>
          )}
          <div className="absolute right-2 top-2 mr-2">
            <svg
              className="text-black h-6 w-6 fill-current"
              viewBox="0 0 56.966 56.966"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default Search;
