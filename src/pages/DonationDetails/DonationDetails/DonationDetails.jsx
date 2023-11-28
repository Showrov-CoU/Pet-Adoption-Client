import { useLoaderData } from "react-router-dom";
import DonationBanner from "../../Donation/DonationBanner/DonationBanner";

const DonationDetails = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <DonationBanner></DonationBanner>
      
    </div>
  );
};

export default DonationDetails;
