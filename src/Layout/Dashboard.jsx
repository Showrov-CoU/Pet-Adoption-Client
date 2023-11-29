import { Outlet } from "react-router-dom";
import NavBar from "../Shared/Navbar/NavBar";
import SideBar from "../pages/Dashboard/SideBar/SideBar";
import Footer from "../Shared/Footer/Footer";

const Dashboard = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="px-5 flex flex-col lg:flex-row gap-2 lg:gap-10">
        <div className="mt-16 lg:mt-[6.5rem]">
          <SideBar></SideBar>
        </div>
        <div className="mt-5 lg:mt-[6.5rem] flex-1">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
