import axios from "axios";

import { useNavigate } from "react-router-dom";

import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://pet-adopter.vercel.app",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      //   console.log("Stopped by interceptor");
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      //   console.log(response);
      return response;
    },
    function (error) {
      //   console.log(error);
      const status = error.response.status;
      if (status === 401 || status === 403) {
        logOut()
          .then((res) => console.log(res))
          .catch((error) => console.log(error.meaasge));
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
