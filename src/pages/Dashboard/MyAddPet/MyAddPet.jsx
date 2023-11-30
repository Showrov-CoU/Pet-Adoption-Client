import { Button, Modal } from "flowbite-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { FaCheckCircle, FaEdit, FaPeopleCarry, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const MyAddPet = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [petId, setPetId] = useState("");

  function onCloseModal() {
    setOpenModal(false);
  }

  const { data: myPets = [], refetch } = useQuery({
    queryKey: ["myAddedPets"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/mypet/${user.email}`);
      // console.log(result.data);
      return result.data;
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    console.log(petId);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    let hour = currentDate.getHours();
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    hour = hour || 12;

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(imageHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const url = res.data.data.url;
    if (res.data.success) {
      const petDetails = {
        name: data.name,
        image: url,
        // image: res?.data?.display_url,
        email: user.email,
        category: data.category,
        location: data.location,
        age: parseInt(data.age),
        shortDesc: data.shortDesc,
        date: `${year}-${month}-${day}`,
        time: `${hour}:${minutes} ${ampm}`,
        adopted: false,
      };
      // console.log(petDetails);
      const res = await axiosSecure.patch(`/updatepet/${petId}`, petDetails);
      console.log(res.data);
      if (res.data.modifiedCount >= 0) {
        refetch();
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

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
                    {/* update */}
                    <Button
                      onClick={() => {
                        setOpenModal(true);
                        setPetId(myPet._id);
                      }}
                      gradientMonochrome="lime"
                    >
                      <FaEdit size={16}></FaEdit>
                    </Button>
                    <Modal
                      show={openModal}
                      size="md"
                      onClose={onCloseModal}
                      popup
                    >
                      <Modal.Header />
                      <Modal.Body>
                        <div className="overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0  md:h-full">
                          <div className="w-full p-4 h-full md:h-auto">
                            <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  Update a Pet
                                </h3>
                              </div>

                              <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                  <div>
                                    <label
                                      htmlFor="name"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Name
                                    </label>
                                    <input
                                      type="text"
                                      name="name"
                                      defaultValue={myPet.name}
                                      {...register("name", { required: true })}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                                      placeholder="Type pet name"
                                    />
                                    {errors.name && (
                                      <span className="text-red-600 pt-1">
                                        This field is required
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="brand"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Location
                                    </label>
                                    <input
                                      type="text"
                                      name="location"
                                      defaultValue={myPet.location}
                                      {...register("location", {
                                        required: true,
                                      })}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                                      placeholder="Pet Location"
                                    />
                                    {errors.location && (
                                      <span className="text-red-600 pt-1">
                                        This field is required
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="price"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Age
                                    </label>
                                    <input
                                      type="number"
                                      name="age"
                                      defaultValue={myPet.age}
                                      {...register("age", { required: true })}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                      placeholder=""
                                    />
                                    {errors.age && (
                                      <span className="text-red-600 pt-1">
                                        This field is required
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="category"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Category
                                    </label>
                                    <select
                                      id="category"
                                      defaultValue={myPet.category}
                                      {...register("category", {
                                        required: true,
                                      })}
                                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                                    >
                                      <option value="">Select category</option>
                                      <option value="dog">Dog</option>
                                      <option value="cat">Cat</option>
                                      <option value="bird">Bird</option>
                                      <option value="duck">Duck</option>
                                      <option value="horse">Horse</option>
                                      <option value="rabbit">Rabbit</option>
                                    </select>
                                    {errors.category && (
                                      <span className="text-red-600 pt-1">
                                        This field is required
                                      </span>
                                    )}
                                  </div>
                                  <div className="sm:col-span-2">
                                    <label
                                      htmlFor="description"
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                      Short Description
                                    </label>
                                    <textarea
                                      rows="4"
                                      defaultValue={myPet.shortDesc}
                                      {...register("shortDesc", {
                                        required: true,
                                      })}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                                      placeholder="Write product description here"
                                    ></textarea>
                                    {errors.shortDesc && (
                                      <span className="text-red-600 pt-1">
                                        This field is required
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col justify-start gap-3">
                                  <div>
                                    <label
                                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                      htmlFor="file_input"
                                    >
                                      Upload file
                                    </label>
                                    <input
                                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                      id="file_input"
                                      type="file"
                                      {...register("image", { required: true })}
                                    />
                                    {errors.image && (
                                      <span className="text-red-600 pt-1">
                                        This field is required
                                      </span>
                                    )}
                                  </div>
                                  <button className="text-white inline-flex items-center bg-primary hover:bg-primaryDeep  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    <svg
                                      className="mr-1 -ml-1 w-6 h-6"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                    Update this pet
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
                    {/* delete */}
                    <Button
                      onClick={() => handleDeletePet(myPet)}
                      gradientMonochrome="failure"
                    >
                      <FaTrash size={16}></FaTrash>
                    </Button>
                    {/* adopt */}
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
