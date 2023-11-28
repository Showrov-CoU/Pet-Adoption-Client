import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useDonations = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: donations = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/donations");
      return res.data;
    },
  });
  return [donations, isLoading, refetch];
};

export default useDonations;
