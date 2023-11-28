import { useEffect, useState } from "react";
import Pets from "../Pets/Pets";
import axios from "axios";
import { Dropdown } from "flowbite-react";
// import usePets from "../../../Hooks/usePets";
// import Pets from "../Pets/Pets";

const PetListBanner = () => {
  const petsArray = ["Dog", "Cat", "Bird", "Duck", "Horse", "Rabbit"];
  const [pets, setPets] = useState([]);
  const [category, setCategory] = useState("");
  // const [searchKeyword, setSearchKeyword] = useState("");

  // const [petdata] = usePets();
  // setPets(petdata);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/pets?category=${category}`)
      .then((res) => setPets(res.data));
  }, [category]);

  const handlePet = (pet) => {
    setCategory(pet.toLowerCase());
  };

  return (
    <section className="bg-white dark:bg-gray-900 mt-20">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Explore our of adorable pets waiting for a loving home.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Our pet adoption platform is dedicated to helping you find the ideal
          furry friend to bring joy, love, and companionship into your life.
        </p>

        <div className=" mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <div className="flex gap-20 flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
            {/* dropdown */}
            <Dropdown
              className="text-white font-bold"
              gradientMonochrome="lime"
              label="Select menu for seeing pets"
            >
              {petsArray.map((pet) => (
                <Dropdown.Item onClick={() => handlePet(pet)} key={pet}>
                  {pet}
                </Dropdown.Item>
              ))}
            </Dropdown>

            {/* search */}

            <form className="flex-1">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-primary rounded-lg bg-gray-50 focus:border-primary"
                  placeholder="Search Dogs, cats..."
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-2.5 bg-primary hover:bg-primaryDeep font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Pets pets={pets}></Pets>
    </section>
  );
};

export default PetListBanner;
