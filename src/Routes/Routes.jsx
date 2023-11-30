import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PetList from "../pages/PetList/PetList/PetList";
import PetDetails from "../pages/PetDetails/PetDetails";
import Donation from "../pages/Donation/Donation/Donation";
import DonationDetails from "../pages/DonationDetails/DonationDetails/DonationDetails";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddPet from "../pages/Dashboard/AddPet/AddPet";
import MyAddPet from "../pages/Dashboard/MyAddPet/MyAddPet";
import AdoptionReq from "../pages/Dashboard/AdoptionReq/AdoptionReq";
import CreateDonationCamp from "../pages/Dashboard/CreateDonationCamp/CreateDonationCamp";
import MyDonationCamp from "../pages/Dashboard/MyDonationCamp/MyDonationCamp";
import MyDonations from "../pages/Dashboard/MyDonations/MyDonations";
import Users from "../pages/Dashboard/admin/Users/Users";
import AllPets from "../pages/Dashboard/admin/AllPets/AllPets";
import AllDonations from "./../pages/Dashboard/admin/AllDonations/AllDonations";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/petList",
        element: <PetList></PetList>,
      },
      {
        path: "/petDetails/:id",
        element: (
          <PrivateRoute>
            <PetDetails></PetDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/petDetails/${params.id}`),
      },
      {
        path: "/donation",
        element: <Donation></Donation>,
      },
      {
        path: "/donationDetails/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/addpet",
        element: <AddPet></AddPet>,
      },
      {
        path: "/dashboard/myaddpet",
        element: <MyAddPet></MyAddPet>,
      },
      {
        path: "/dashboard/adoptionrequest",
        element: <AdoptionReq></AdoptionReq>,
      },
      {
        path: "/dashboard/createdonationcamp",
        element: <CreateDonationCamp></CreateDonationCamp>,
      },
      {
        path: "/dashboard/mydonationcamp",
        element: <MyDonationCamp></MyDonationCamp>,
      },
      {
        path: "/dashboard/mydonation",
        element: <MyDonations></MyDonations>,
      },
      // admin routes
      {
        path: "/dashboard/users",
        element: <Users></Users>,
      },
      {
        path: "/dashboard/allpets",
        element: <AllPets></AllPets>,
      },
      {
        path: "/dashboard/alldonations",
        element: <AllDonations></AllDonations>,
      },
    ],
  },
]);
