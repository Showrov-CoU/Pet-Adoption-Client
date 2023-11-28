import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PetList from "../pages/PetList/PetList/PetList";
import PetDetails from "../pages/PetDetails/PetDetails";
import Donation from "../pages/Donation/Donation/Donation";
import DonationDetails from "../pages/DonationDetails/DonationDetails/DonationDetails";

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
        element: <PetDetails></PetDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/petDetails/${params.id}`),
      },
      {
        path: "/donation",
        element: <Donation></Donation>,
      },
      {
        path: "/donationDetails/:id",
        element: <DonationDetails></DonationDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation/${params.id}`),
      },
    ],
  },
]);
