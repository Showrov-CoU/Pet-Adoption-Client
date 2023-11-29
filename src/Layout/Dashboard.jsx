import { Outlet } from "react-router-dom";
import NavBar from "../Shared/Navbar/NavBar";
import SideBar from "../pages/Dashboard/SideBar/SideBar";

const Dashboard = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="px-5 flex flex-col lg:flex-row gap-2 lg:gap-10">
        <div className="mt-16 lg:mt-[4.5rem]">
          <SideBar></SideBar>
        </div>
        <div className="mt-5 lg:mt-28 flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
