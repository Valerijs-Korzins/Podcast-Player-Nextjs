import classnames from "classnames";
import styles from "./style.module.scss";
import Image from "next/image";
import { useState } from "react";
import Logo from "/public/logo.svg";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [show, setshow] = useState(false);
  const setshowlist = () => {
    setshow(!show);
  };
  const currentpath = router.asPath;
  const [isSelect, setSelect] = useState("/" + currentpath.split("/")[1]);
  const handleClick = (path) => {
    setshow(false);
    router.push(path);
    setSelect(path);
  };
  return (
    <div className={classnames(styles.fixedheader, "bg-white")}>
      <div className="2xl:mx-auto lg:px-7 sm:px-6">
        <nav>
          <div className="flex flex-row justify-between  p-3">
            <button onClick={() => handleClick("/")}>
              <Image
                src={Logo.src}
                width="140"
                height="35"
                quality={50}
                unoptimized={
                  process.env.DEV_ENVIRONMENT == "true" ? true : false
                }
                title="Prysmradio"
              />
            </button>
            {/* Burger Icon */}
            <div
              id="bgIcon"
              onClick={setshowlist}
              role="presentation"
              className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  block xl:hidden cursor-pointer mt-1"
            >
              <svg
                className={`${show ? "hidden" : ""}`}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className=" transform duration-150"
                  d="M4 6H20"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12H20"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  className=" transform duration-150"
                  d="M4 18H20"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                className={`${show ? "block" : "hidden"}`}
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            id="MobileNavigation"
            className={`${
              show ? "block" : "hidden"
            } transform duration-150 xl:hidden mt-4`}
          >
            <div className="flex flex-col gap-3 mt-4 h-screen">
              <button
                className={
                  isSelect == "/" || isSelect == "/live"
                    ? "flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-red-500 border-white items-center pl-6 pt-4 pb-4"
                    : "flex space-x-2 w-full h-10 no-underline font-normal text-sm leading-3 text-gray-800 hover:shadow-[inset_5px_0_0_#FF0000] hover:text-black items-center pl-6 pt-4 pb-4"
                }
                onClick={() => handleClick("/")}
              >
                <div>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M27.167 7.74992H10.1045L22.1503 2.87909L21.1587 0.458252L2.72533 7.96867C1.66074 8.377 0.916992 9.45617 0.916992 10.6666V28.1666C0.916992 29.7708 2.21491 31.0833 3.83366 31.0833H27.167C28.7857 31.0833 30.0837 29.7708 30.0837 28.1666V10.6666C30.0837 9.04784 28.7857 7.74992 27.167 7.74992ZM27.167 10.6666V15.0416H24.2503V12.1249H21.3337V15.0416H3.83366V10.6666H27.167ZM3.83366 28.1666V17.9583H27.167V28.1666H3.83366Z"
                      fill={
                        isSelect == "/" || isSelect == "/live"
                          ? "#FFFFFF"
                          : "#FF0000"
                      }
                    />
                  </svg>
                </div>
                <div className="text-lg font-bold pl-5">Stations</div>
              </button>
              <button
                className={
                  isSelect == "/podcasts"
                    ? "flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-red-500 border-white items-center pl-6 pt-4 pb-4"
                    : "flex space-x-2 w-full h-10 no-underline font-normal text-sm leading-3 text-gray-800 hover:shadow-[inset_5px_0_0_#FF0000] hover:text-black items-center pl-6 pt-4 pb-4"
                }
                onClick={() => handleClick("/podcasts")}
              >
                <div>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.417 15.5001C18.417 16.5792 17.8337 17.5126 16.9587 18.0084V30.0834H14.042V18.0084C13.167 17.498 12.5837 16.5792 12.5837 15.5001C12.5837 13.8959 13.8962 12.5834 15.5003 12.5834C17.1045 12.5834 18.417 13.8959 18.417 15.5001ZM15.5003 6.75008C10.6732 6.75008 6.75033 10.673 6.75033 15.5001C6.75033 18.0376 7.84408 20.3272 9.57949 21.9167L11.6503 19.8459C10.4399 18.7813 9.66699 17.2355 9.66699 15.5001C9.66699 12.2772 12.2774 9.66675 15.5003 9.66675C18.7232 9.66675 21.3337 12.2772 21.3337 15.5001C21.3337 17.2355 20.5607 18.7813 19.3503 19.8459L21.4212 21.9167C23.1566 20.3272 24.2503 18.0376 24.2503 15.5001C24.2503 10.673 20.3274 6.75008 15.5003 6.75008ZM15.5003 0.916748C7.45033 0.916748 0.916992 7.45008 0.916992 15.5001C0.916992 19.6563 2.66699 23.3897 5.45241 26.0584L7.52324 23.9876C5.26283 21.8584 3.83366 18.8397 3.83366 15.5001C3.83366 9.06883 9.06908 3.83341 15.5003 3.83341C21.9316 3.83341 27.167 9.06883 27.167 15.5001C27.167 18.8397 25.7378 21.8584 23.4774 23.9876L25.5482 26.0584C28.3337 23.3897 30.0837 19.6563 30.0837 15.5001C30.0837 7.45008 23.5503 0.916748 15.5003 0.916748Z"
                      fill={isSelect == "/podcasts" ? "#FFFFFF" : "#FF0000"}
                    />
                  </svg>
                </div>
                <div className="text-lg font-bold pl-5">Podcast</div>
              </button>
              <button
                className={
                  isSelect == "/playlist"
                    ? "flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-red-500 border-white items-center pl-6 pt-4 pb-4"
                    : "flex space-x-2 w-full h-10 no-underline font-normal text-sm leading-3 text-gray-800 hover:shadow-[inset_5px_0_0_#FF0000] hover:text-black items-center pl-6 pt-4 pb-4"
                }
                onClick={() => handleClick("/playlist")}
              >
                <div>
                  <svg
                    width="30"
                    height="30"
                    viewBox="-5 0 32 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 0.375V15.7604C8.63958 15.2646 7.64792 14.9583 6.58333 14.9583C3.36042 14.9583 0.75 17.5688 0.75 20.7917C0.75 24.0146 3.36042 26.625 6.58333 26.625C9.80625 26.625 12.4167 24.0146 12.4167 20.7917V6.20833H18.25V0.375H9.5ZM6.58333 23.7083C4.97917 23.7083 3.66667 22.3958 3.66667 20.7917C3.66667 19.1875 4.97917 17.875 6.58333 17.875C8.1875 17.875 9.5 19.1875 9.5 20.7917C9.5 22.3958 8.1875 23.7083 6.58333 23.7083Z"
                      fill={isSelect == "/playlist" ? "#FFFFFF" : "#FF0000"}
                    />
                  </svg>
                </div>
                <div className="text-lg font-bold pl-5">Playlist</div>
              </button>
              <a
                className="flex space-x-2 w-full h-10 no-underline font-normal text-sm leading-3 text-gray-800 hover:shadow-[inset_5px_0_0_#FF0000] hover:text-black items-center pl-6 pt-4 pb-4"
                href="http://www.prysmradio.com/"
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 0C11.5728 0 7.56677 1.65937 4.61307 4.61307C1.65937 7.56677 0 11.5728 0 15.75C0 19.9272 1.65937 23.9332 4.61307 26.8869C7.56677 29.8406 11.5728 31.5 15.75 31.5C19.9272 31.5 23.9332 29.8406 26.8869 26.8869C29.8406 23.9332 31.5 19.9272 31.5 15.75C31.5 11.5728 29.8406 7.56677 26.8869 4.61307C23.9332 1.65937 19.9272 0 15.75 0V0ZM1.9425 16.94H6.335C6.405 18.5325 6.62725 20.1145 7 21.665H3.22C2.51511 20.179 2.08243 18.5787 1.9425 16.94ZM16.94 7.49V2.0825C18.6264 2.72339 20.0122 3.97184 20.825 5.5825C21.1838 6.18975 21.5005 6.8215 21.77 7.4725L16.94 7.49ZM22.575 9.8525C22.981 11.3977 23.2225 12.9815 23.2925 14.5775H16.94V9.8525H22.575ZM14.56 2.0825V7.49H9.73C9.99996 6.83847 10.3157 6.20689 10.675 5.6C11.4843 3.98274 12.8705 2.72766 14.56 2.0825ZM14.56 9.8525V14.5775H8.225C8.295 12.9815 8.5365 11.3977 8.9425 9.8525H14.56ZM6.335 14.56H1.9425C2.08243 12.9213 2.51511 11.321 3.22 9.835H7C6.62654 11.3849 6.40383 12.9672 6.335 14.56ZM8.225 16.94H14.56V21.665H8.9425C8.53656 20.1199 8.29604 18.536 8.225 16.94ZM14.5775 23.94V29.3475C12.8911 28.7066 11.5053 27.4582 10.6925 25.8475C10.3332 25.2406 10.0175 24.609 9.7475 23.9575L14.5775 23.94ZM16.94 29.3475V24.0275H21.77C21.5 24.679 21.1842 25.3106 20.825 25.9175C20.0122 27.5282 18.6264 28.7766 16.94 29.4175V29.3475ZM16.94 21.5775V16.8525H23.275C23.204 18.4485 22.9634 20.0324 22.5575 21.5775H16.94ZM25.1825 16.8525H29.575C29.4351 18.4912 29.0024 20.0915 28.2975 21.5775H24.5C24.8675 20.055 25.0898 18.5028 25.165 16.94L25.1825 16.8525ZM25.1825 14.49C25.1024 12.926 24.8738 11.3732 24.5 9.8525H28.28C28.9853 11.34 29.4175 12.9395 29.5575 14.5775L25.1825 14.49ZM26.9325 7.49H23.8C23.2332 5.89803 22.4117 4.40864 21.3675 3.08C23.5452 4.05751 25.4367 5.57559 26.8625 7.49H26.9325ZM10.1325 3.08C9.08831 4.40864 8.26679 5.89803 7.7 7.49H4.6375C6.06326 5.57559 7.95483 4.05751 10.1325 3.08ZM4.62 24.08H7.7C8.26679 25.672 9.08831 27.1614 10.1325 28.49C7.94881 27.4978 6.05666 25.9612 4.6375 24.0275L4.62 24.08ZM21.35 28.49C22.3942 27.1614 23.2157 25.672 23.7825 24.08H26.8625C25.428 25.9688 23.5372 27.4621 21.3675 28.42L21.35 28.49Z"
                      fill="#FF0000"
                    />
                  </svg>
                </div>
                <div className="text-lg font-bold pl-5">Blog</div>
              </a>

              {/* <button
              className={isSelect == "/trends" ? "flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-red-500 border-white items-center pl-6 pt-4 pb-4" : "flex space-x-2 w-full h-10 no-underline font-normal text-sm leading-3 text-gray-800 hover:shadow-[inset_5px_0_0_#FF0000] hover:text-black items-center pl-6 pt-4 pb-4"}
              onClick={() => handleClick("/trends")}
            >
              <div>
                <svg
                  width="30"
                  height="30"
                  viewBox="-2 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8726 19.1916C9.88926 19.6 8.70801 20.8833 8.70801 22.7062C8.70801 24.6604 10.3268 26.2354 12.3393 26.2354C15.3288 26.2354 17.7497 23.8146 17.7497 20.825C17.7497 19.2646 17.5309 17.7333 17.0788 16.275C15.9268 17.8354 13.8705 18.7833 11.8726 19.1916ZM14.6872 0.977051C14.6872 0.977051 15.7663 4.84163 15.7663 7.97705C15.7663 10.9812 13.7976 13.4166 10.7934 13.4166C7.77467 13.4166 5.49967 10.9812 5.49967 7.97705L5.54342 7.45205C2.59759 10.9521 0.833008 15.4875 0.833008 20.4166C0.833008 26.8625 6.05384 32.0833 12.4997 32.0833C18.9455 32.0833 24.1663 26.8625 24.1663 20.4166C24.1663 12.5562 20.3893 5.54163 14.6872 0.977051ZM12.4997 29.1666C7.67259 29.1666 3.74967 25.2437 3.74967 20.4166C3.74967 18.1854 4.18717 15.9833 5.00384 13.9562C6.47676 15.4291 8.51842 16.3333 10.7934 16.3333C14.6726 16.3333 17.7205 13.6646 18.4934 9.87288C20.2872 13.0812 21.2497 16.6833 21.2497 20.4166C21.2497 25.2437 17.3268 29.1666 12.4997 29.1666Z"
                    fill={isSelect == "/trends" ? "#FFFFFF" : "#FF0000"}
                  />
                </svg>
              </div>
              <div className="text-lg font-bold pl-5">Trends</div>
            </button>
            <button
              className={isSelect == "/videos" ? "flex space-x-2 w-full h-10 font-normal text-sm leading-3 text-white bg-red-500 border-white items-center pl-6 pt-4 pb-4" : "flex space-x-2 w-full h-10 no-underline font-normal text-sm leading-3 text-gray-800 hover:shadow-[inset_5px_0_0_#FF0000] hover:text-black items-center pl-6 pt-4 pb-4"}
              onClick={() => handleClick("/videos")}
            >
              <div>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 32 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1247 6.20833V17.875L22.333 12.0417L12.1247 6.20833ZM29.6247 0.375H3.37467C1.77051 0.375 0.458008 1.6875 0.458008 3.29167V20.7917C0.458008 22.3958 1.77051 23.7083 3.37467 23.7083H10.6663V26.625H22.333V23.7083H29.6247C31.2288 23.7083 32.5413 22.3958 32.5413 20.7917V3.29167C32.5413 1.6875 31.2288 0.375 29.6247 0.375ZM29.6247 20.7917H3.37467V3.29167H29.6247V20.7917Z"
                    fill={isSelect == "/videos" ? "#FFFFFF" : "#FF0000"}
                  />
                </svg>
              </div>
              <div className="text-lg font-bold pl-5">Videos</div>
            </button> */}
              {/* <div
                className={classnames(styles.signgroupbuttonmt, "text-center")}
              >
                <button
                  type="button"
                  className="px-2 py-2 text-lg font-medium leading-6 text-center text-red-600 uppercase transition bg-transparent border-2 border-red-500 rounded-full ripple focus:outline-none w-40 content-center"
                >
                  SIGN IN
                </button>
              </div>
              <div className={classnames("text-center")}>
                <button
                  type="button"
                  className="px-2 py-2 mt-2 text-lg font-medium leading-6 text-center text-white uppercase transition bg-red-600 border-2 border-red-500 rounded-full ripple focus:outline-none w-40 content-center"
                >
                  SIGN UP
                </button>
              </div> */}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
