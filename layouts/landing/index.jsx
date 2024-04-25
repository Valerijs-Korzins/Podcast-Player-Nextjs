import dynamic from "next/dynamic";
import classnames from "classnames";
import styles from "./style.module.scss";

const Footer = dynamic(() => import("../../components/footer"), {
  ssr: false,
});
const NavBar = dynamic(() => import("../../components/nav-bar"), {
  ssr: false,
});
const Sidebar = dynamic(() => import("../../components/sidebar"), {
  ssr: false,
});

const Layout = ({ children, className }) => {
  return (
    <>
      <NavBar />
      <Sidebar />
      <main className={classnames(styles.containerWrap, className)}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
