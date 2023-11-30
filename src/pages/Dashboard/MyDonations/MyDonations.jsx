import { useQuery } from "@tanstack/react-query";
import { Button } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: myDonationList = [], refetch } = useQuery({
    queryKey: ["myDonationList"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/myDonationList/${user.email}`);
      console.log(result.data);
      return result.data;
    },
  });

  const handleDonation = (id) => {
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
        axiosSecure.delete(`/removePreviousDonation/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your donation has been deleted.",
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
              Total Donation: {myDonationList?.length}
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
              </th>
              <th scope="col" className="px-6 py-3 ">
                Name
              </th>
              <th scope="col" className="px-6 py-3 ">
                Donated Amount
              </th>

              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {myDonationList?.map((item, idx) => (
              <tr
                key={item._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{idx + 1}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-12 h-12 rounded-lg"
                    src={item.image}
                    alt=""
                  />
                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {item.petName}
                    </div>
                    <div className="font-normal text-gray-500">
                      {item.Dname}
                    </div>
                  </div>
                </th>
                <td className="w-4 p-4 text-center">{item.amount} TK</td>

                <td className="px-6 py-4 text-start">
                  <div className="flex justify-center gap-6 items-center">
                    {/* delete */}
                    <Button
                      onClick={() => handleDonation(item._id)}
                      gradientMonochrome="failure"
                    >
                      <FaTrash size={16}></FaTrash>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // <p>my dona:{myDonationList.length}</p>
  );
};

export default MyDonations;
