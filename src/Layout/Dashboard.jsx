import { Outlet } from "react-router-dom";
import NavBar from "../Shared/Navbar/NavBar";

const Dashboard = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
