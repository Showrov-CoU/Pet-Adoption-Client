import { useLoaderData } from "react-router-dom";
import DonationBanner from "../../Donation/DonationBanner/DonationBanner";
import Donation from "../Donation";

const DonationDetails = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <DonationBanner></DonationBanner>
      <Donation donate={data}></Donation>
    </div>
  );
};

export default DonationDetails;
