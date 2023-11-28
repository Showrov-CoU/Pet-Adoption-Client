import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err.message));
  };

  return (
    <Navbar fluid rounded className="bg-slate-200 fixed w-full top-0 z-30 py-4">
      <Navbar.Brand href="#">
        <span className="self-center font-lobster text-4xl font-extrabold whitespace-nowrap text-primary dark:text-white">
          PetAdopt
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User settings" img={user?.photoURL} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-base text-primary">
              {user?.displayName}
            </span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Header>
          <Link to="/dashboard">
            <Dropdown.Item>Dashboard</Dropdown.Item>
          </Link>
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="text-base">
        <NavLink to="/">
          {({ isActive }) => (
            <span className={isActive ? "text-primary font-semibold" : ""}>
              Home
            </span>
          )}
        </NavLink>
        <NavLink to="/petList">
          {({ isActive }) => (
            <span className={isActive ? "text-primary font-semibold" : ""}>
              Pet Listing
            </span>
          )}
        </NavLink>
        <NavLink to="/donation">
          {({ isActive }) => (
            <span className={isActive ? "text-primary font-semibold" : ""}>
              Donation Campaigns
            </span>
          )}
        </NavLink>
        <NavLink to="/contact">
          {({ isActive }) => (
            <span className={isActive ? "text-primary font-semibold" : ""}>
              Contact
            </span>
          )}
        </NavLink>
        <NavLink>
          {user ? (
            <Link
              to="/login"
              className=" px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-[#57a538] hover:bg-[#4bc21c]"
              onClick={handleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link
              className=" px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-[#57a538] hover:bg-[#4bc21c]"
              to="/login"
            >
              Login
            </Link>
          )}
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
