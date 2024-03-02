import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { hotelsAPI } from "../network/hotelAPI";
import { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    onSuccess: () => {
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
    queryFn: hotelsAPI.getMyHotels,
  });
};
export const useGetHotelById = () => {
  const { hotelId } = useParams();
  return useQuery({
    queryKey: ["useGetHotelById", hotelId],
    queryFn: async () => {
      if (!hotelId) {
        throw new Error("no hotel with this id");
      }
      return await hotelsAPI.getHotelById(hotelId);
    },
    enabled: !!hotelId,
  });
};

export const useEditMyHotel = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  return useMutation({
    mutationKey: ["useEditMyHotel"],
    mutationFn: async (body: FormData) => {
      if (!hotelId) {
        throw new Error("no hotel with this id");
      }
      return await hotelsAPI.editHotelById(body, hotelId);
    },
    onMutate: () => {
      toast("Editing hotel...", {
        type: "info",
        toastId: "editHotel",
        isLoading: true,
        progress: 0,
      });
    },
    onSuccess() {
      toast.update("editHotel", {
        isLoading: false,
        type: "success",
        render: "Hotel Updated!",
        autoClose: 2000,
      });
      navigate("/my-hotels");
    },
  });
};
