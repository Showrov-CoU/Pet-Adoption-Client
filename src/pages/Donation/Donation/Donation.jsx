import DonationCard from "../../../Components/DonationCard";
import useDonations from "../../../Hooks/useDonation";
import DonationBanner from "../DonationBanner/DonationBanner";

const Donation = () => {
  const [donations] = useDonations();
  return (
    <div>
      <DonationBanner></DonationBanner>
      <div className="md:px-10 mb-10 lg:px-16">
        <h1 className="text-center text-4xl font-bold pb-10">Donate for Pet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {donations.map((donation) => (
            <DonationCard key={donation._id} donation={donation}></DonationCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donation;
