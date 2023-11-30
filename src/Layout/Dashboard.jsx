import { Outlet } from "react-router-dom";
import NavBar from "../Shared/Navbar/NavBar";
import SideBar from "../pages/Dashboard/SideBar/SideBar";
import Footer from "../Shared/Footer/Footer";
import useAuth from "../Hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <NavBar></NavBar>
      <div className="px-5 flex flex-col lg:flex-row gap-2 lg:gap-10">
        <div className="mt-16 lg:mt-[4.6rem]">
          <SideBar></SideBar>
        </div>

        <div className="mt-5 lg:mt-[5rem] flex-1">
          <p className=" text-center font-lobster text-primary text-2xl pb-2">
            Hi {user.displayName}!!🎉 Welcome to Your Dashboard Celebration! 🎉
          </p>
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
