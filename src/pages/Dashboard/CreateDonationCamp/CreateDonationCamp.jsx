import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// import "../../../../node_modules/flowbite/dist/datepicker";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const CreateDonationCamp = () => {
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
    // console.log("new url", url);
    if (res.data.success) {
      const donationDetails = {
        name: data.petname,
        Dname: data.dname,
        image: url,
        email: user.email,
        category: data.category,
        shortDesc: data.shortDesc,
        longDesc: data.LongDesc,
        maxAmount: Number(data.maxamount),
        donatedAmount: Number(data.donateamount),
        date: `${year}-${month}-${day}`,
        time: `${hour}:${minutes} ${ampm}`,
      };
      // console.log(donationDetails);
      const res = await axiosSecure.post("/createdonate", donationDetails);
      // console.log(res.data);
      if (res.data._id) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your donation is created successfully`,
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
              Create a Donation
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pet Name
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("petname", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="Pet name"
                />
                {errors.petname && (
                  <span className="text-red-600 pt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Donation name
                </label>
                <input
                  type="text"
                  name="dname"
                  {...register("dname", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                  placeholder="Pet Location"
                />
                {errors.dname && (
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
                  Maximum Amount
                </label>
                <input
                  type="number"
                  name="maxamount"
                  {...register("maxamount", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 "
                  placeholder=""
                />
                {errors.maxamount && (
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
                  Donated Amount
                </label>
                <input
                  type="number"
                  name="donateamount"
                  {...register("donateamount", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder=""
                />
                {errors.donateamount && (
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

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pet Name
                </label>
                <input
                  type="date"
                  {...register("dateValue", { required: true })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder=""
                />
                {errors.dateValue && (
                  <span className="text-red-600 pt-1">
                    This field is required
                  </span>
                )}
              </div>

              {/* <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Date of donation
                </label>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    datepicker
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                  />
                </div>
                {errors.LastDate && (
                  <span className="text-red-600 pt-1">
                    This field is required
                  </span>
                )}
              </div> */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Short Description
                </label>
                <textarea
                  rows="2"
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
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Long Description
                </label>
                <textarea
                  rows="3"
                  {...register("LongDesc", { required: true })}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                  placeholder="Write product description here"
                ></textarea>
                {errors.LongDesc && (
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
                Create new donation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDonationCamp;
