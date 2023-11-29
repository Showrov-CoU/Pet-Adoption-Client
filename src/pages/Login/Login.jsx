import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const { signIn, googleSignIn } = useContext(AuthContext);

  const handleLogin = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err.message);
        Swal.fire({
          title: "Invalid-login-credentials",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        });
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          image: result.user?.photURL,
        };

        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        //navigate(from, { replace: true });
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <section className="mt-12">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    placeholder="name@company.com"
                    required=""
                  />
                  {errors.email && (
                    <span className="text-red-600 pt-1">
                      missing your email
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    {...register("password", { required: true })}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                    required=""
                  />
                  {errors.email && (
                    <span className="text-red-600 pt-1">
                      provide your password
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button className="w-full text-white bg-[#57a538] hover:bg-[#4bc21c]  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Log in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don&apos;t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
              <div>
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="text-white bg-[#171718] hover:bg-[#0f294b] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                >
                  <FcGoogle className="mr-1"></FcGoogle>
                  Sign in with Google
                </button>
                <button
                  type="button"
                  className="text-white bg-[#171718] hover:bg-[#0f294b] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                >
                  <FaGithub className="mr-1"></FaGithub>
                  Sign in with Github
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
