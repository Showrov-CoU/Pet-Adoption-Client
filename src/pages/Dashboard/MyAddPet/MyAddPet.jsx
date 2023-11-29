import { Button } from "flowbite-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { FaCheckCircle, FaEdit, FaPeopleCarry, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const MyAddPet = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myPets = [], refetch } = useQuery({
    queryKey: ["myAddedPets"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/mypet/${user.email}`);
      console.log(result.data);
      return result.data;
    },
  });

  const handleAdopted = (mypet) => {
    axiosSecure.patch(`/makeadopt/${mypet._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `"Congratulations! You've successfully adopted a new furry friend.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeletePet = (myPet) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#57a538",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/myPet/${myPet._id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="w-full mx-auto">
      <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div>
            <button
              id="dropdownActionButton"
              data-dropdown-toggle="dropdownAction"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 rounded-lg text-sm px-5 font-bold py-2 "
              type="button"
            >
              <span className="sr-only">Action button</span>
              Total Addition: {myPets?.length}
            </button>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
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
              type="text"
              id="table-search-myPetss"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for Pet"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                S/N
                {/* <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div> */}
              </th>
              <th scope="col" className="px-6 py-3 ">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Adoption Status
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {myPets?.map((myPet, idx) => (
              <tr
                key={myPet._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{idx + 1}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-12 h-12 rounded-lg"
                    src={myPet.image}
                    alt=""
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">{myPet.name}</div>
                    <div className="font-normal text-gray-500">
                      {myPet.shortDesc}
                    </div>
                  </div>
                </th>
                <td className="w-4 p-4 text-center">{myPet.category}</td>
                <td className="w-4 p-4 text-center">{myPet.location}</td>
                <td className="px-6 py-4 text-center">
                  {myPet.adopted ? (
                    <span className=" flex justify-center items-center gap-1 text-primary font-semibold">
                      Adopted <FaCheckCircle></FaCheckCircle>
                    </span>
                  ) : (
                    <span className="text-red-900 font-bold">Not Adopted</span>
                  )}
                </td>

                <td className="px-6 py-4 text-start">
                  <div className="flex justify-center gap-6 items-center">
                    <Button gradientMonochrome="lime">
                      <FaEdit size={16}></FaEdit>
                    </Button>
                    <Button
                      onClick={() => handleDeletePet(myPet)}
                      gradientMonochrome="failure"
                    >
                      <FaTrash size={16}></FaTrash>
                    </Button>
                    <Button
                      onClick={() => handleAdopted(myPet)}
                      gradientMonochrome="success"
                    >
                      <FaPeopleCarry size={16}></FaPeopleCarry>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // <p>MyAddpet: {myPets?.length}</p>
  );
};

export default MyAddPet;
