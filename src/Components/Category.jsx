import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";

const Category = ({ category }) => {
  const { name, description, image } = category;
  return (
    <>
      <div className="rounded-xl card relative h-[420px] w-[350px]  overflow-hidden shadow-lg shadow-[#466e37] hover:cursor-pointer">
        <img className="h-[420px] w-full" src={image} alt="pet image" />
        <div className="intro px-2 h-[45px] w-[350px] absolute z-10 bottom-0 bg-gradient-to-r from-neutral-200 via-gray-300 to-zinc-400 opacity-90">
          <h1 className=" w-full m-2 font-bold text-2xl capitalize">{name}</h1>
          <p className="text text-justify w-full">{description}</p>
          <Link to="/petList">
            <button
              type="button"
              className=" px-5 py-2 mr-3 text-base font-medium text-center text-white rounded-lg bg-[#57a538] hover:bg-[#4bc21c]"
            >
              See Pets
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

export default Category;
