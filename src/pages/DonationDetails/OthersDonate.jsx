import useDonation from "../../Hooks/useDonation";
import DonationCard from "../../Components/DonationCard";

const OthersDonate = () => {
  const [donations] = useDonation();
  console.log(donations);
  return (
    <div className="md:px-10 mb-10 lg:px-16">
      <h1 className="text-center text-4xl font-bold pb-10">
        Recommended donation
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {donations.map((donation) => (
          <DonationCard key={donation._id} donation={donation}></DonationCard>
        ))}
      </div>
    </div>
  );
};

export default OthersDonate;
