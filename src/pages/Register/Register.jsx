import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password)
      .then((res) => {
        const result = res.user;
        console.log(result);
        updateUserProfle(data.name, data.photo)
          .then(() => {
            // console.log("User profile info updated");
            const userInfo = {
              name: data.name,
              email: data.email,
              image: data.photo,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              console.log(res.data);
            });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Sign Up user Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            reset();
            navigate("/");
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <section className=" dark:bg-gray-900 mt-14">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                onSubmit={handleSubmit(handleOnSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="Enter Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-600 pt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="photo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    {...register("photo", { required: true })}
                    id="photo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="Type Your Photo URL"
                    required=""
                  />
                  {errors.photo && (
                    <span className="text-red-600 pt-1">
                      Photo URL is required
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                  {errors.email && (
                    <span className="text-red-600 pt-1">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
                    })}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    required=""
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-600 pt-1">
                      This field is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-600 pt-1">
                      password must be 6 characters
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-600 pt-1">
                      password must be less than 15 characters
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-600 pt-1">
                      password must have at least one UpperCase, one LowerCase,
                      one Special Character & one digit
                    </span>
                  )}
                </div>
                {/* <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div> */}
                {/* <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div> */}
                <button className="w-full text-white bg-[#57a538] hover:bg-[#4bc21c]  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-primary hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
