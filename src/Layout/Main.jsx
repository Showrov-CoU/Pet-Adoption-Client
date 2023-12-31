import { Outlet } from "react-router-dom";

import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/Navbar/NavBar";

const Main = () => {
  return (
    <div className="leading-relaxed tracking-wider">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;
