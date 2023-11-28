import Pet from "../../../Components/Pet";
import PropTypes from "prop-types";

const Pets = ({ pets }) => {
  return (
    <div className="md:px-10 mb-10 lg:px-16">
      <h1 className="text-center text-4xl font-bold pb-10">Pet Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pets.map((pet) => (
          <Pet key={pet._id} pet={pet}></Pet>
        ))}
      </div>
    </div>
  );
};

Pets.propTypes = {
  pets: PropTypes.array,
};

export default Pets;
