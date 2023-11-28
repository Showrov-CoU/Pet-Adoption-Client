import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DonationCard = ({ donation }) => {

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="h-60 w-full rounded-t-lg"
          src={donation.image}
          alt="product image"
        />
      </a>
      <div className="px-5 py-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {donation.name}
          </h5>
        </a>
        <div className="flex items-center mt-2.5 ">
          <div className="flex items-center space-x-1 rtl:space-x-reverse"></div>

          <span className=" bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
            Max Amount: $ {donation.maxAmount}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className=" bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
            Donated Amount: $ {donation.donatedAmount}
          </span>
          {/* <link to={`/donationDetails/${donation._id}`}> */}
          <Link to={`/donationDetails/${donation._id}`}>
            <button className="text-white bg-[#57a538] hover:bg-[#4bc21c] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

DonationCard.propTypes = {
  donation: PropTypes.object.isRequired,
};

export default DonationCard;
