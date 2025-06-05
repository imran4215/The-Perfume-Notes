import { Outlet } from "react-router-dom";
import Navbar from "./homeComponenets/Navbar/Navbar";
import Footer from "./homeComponenets//Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
