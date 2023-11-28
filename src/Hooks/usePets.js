import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePets = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/pets");
      return res.data;
    },
  });
  return [pets, isLoading, refetch];
};

export default usePets;
