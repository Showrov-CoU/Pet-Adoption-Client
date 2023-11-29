import { Sidebar } from "flowbite-react";

import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { IoIosCreate } from "react-icons/io";
import {
  HiAtSymbol,
  HiChartPie,
  HiMenuAlt2,
  HiShoppingBag,
  HiShoppingCart,
  HiUser,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const SideBar = () => {
  const isAdmin = true;

  return (
    <Sidebar
      className="w-full lg:w-fit"
      aria-label="Sidebar with content separator example"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard/addpet">
            <Sidebar.Item href="" icon={IoIosCreate}>
              Add a Pet
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard/myaddpet">
            <Sidebar.Item href="" icon={HiShoppingBag}>
              My Added Pets
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard/adoptionrequest">
            <Sidebar.Item href="" icon={HiShoppingCart}>
              Adoption Request
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard/createdonationcamp">
            <Sidebar.Item href="" icon={IoIosCreate}>
              Create Donation Camp..
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard/mydonationcamp">
            <Sidebar.Item href="" icon={HiChartPie}>
              My Donations Camp..
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard/mydonation">
            <Sidebar.Item href="" icon={HiAtSymbol}>
              My Donations
            </Sidebar.Item>
          </Link>
          <Link to="/login">
            <Sidebar.Item href="" icon={PiSignInBold}>
              Sign In
            </Sidebar.Item>
          </Link>
          <Link to="/register">
            <Sidebar.Item href="" icon={PiSignOutBold}>
              Sign Up
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>

        {isAdmin && (
          <Sidebar.ItemGroup>
            <Link to="/dashboard/users">
              <Sidebar.Item href="" icon={HiUser}>
                Users
              </Sidebar.Item>
            </Link>
            <Link to="/dashboard/allpets">
              <Sidebar.Item href="" icon={HiMenuAlt2}>
                All Pets
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        )}
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
