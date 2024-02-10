import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { hotelsAPI } from "../network/hotelAPI";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useAddHotel = () => {
  //   const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["useAddHotel"],
    mutationFn: hotelsAPI.addHotel,
    onMutate: () => {
      toast("adding hotel...", {
        type: "info",
        toastId: "AddHotelToast",
        isLoading: true,
        progress: 0,
      });
    },
    onSuccess: (res) => {
      console.log("RESPONSE", res);

      toast.update("AddHotelToast", {
        isLoading: false,
        type: "success",
        render: "Hotel added!",
        autoClose: 2000,
      });
      navigate("/my-hotels");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      const message = error?.response?.data?.message;
      toast.update("AddHotelToast", {
        isLoading: false,
        type: "error",
        render: message ?? "Something went wrong",
        autoClose: 2000,
      });
    },
  });
};

export const useGetMyHotel = () => {
  return useQuery({
    queryKey: ["useGetMyHotel"],
    queryFn: hotelsAPI.getMyHotel,
  });
};
