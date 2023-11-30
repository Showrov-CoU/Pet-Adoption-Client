import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddPet = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
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
      console.log(petDetails);
      const res = await axiosSecure.post("/addpet", petDetails);
      //console.log(res.data);
      if (res.data._id) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the petList`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden justify-center items-center w-full md:inset-0  md:h-full">
      <div className="w-full p-4 h-full md:h-auto">
        <div className=" p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add a Pet
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
                  {...register("location", { required: true })}
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
                  defaultValue=""
                  {...register("category", { required: true })}
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
                  {...register("shortDesc", { required: true })}
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
            <div className="flex justify-between items-center">
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
                Add new pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
