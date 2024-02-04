import { useMutation, useQuery } from "@tanstack/react-query";
import { usersAPIs } from "../network/usersAPI";
import { toast } from "react-toastify";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["useGetAllUsers"],
    queryFn: usersAPIs.getAllUsers,
    staleTime: 1000 * 60,
  });
};
export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["useRegisterUser"],
    mutationFn: usersAPIs.registerUser,
    onMutate: () => {
      toast("Registering User...", {
        type: "info",
        toastId: "registerUser",
        isLoading: true,
        progress: 0,
      });
    },
    onSuccess: () => {
      toast.update("registerUser", {
        isLoading: false,
        type: "success",
        render: "Registration Done!",
        autoClose: 1500,
      });
    },
    onError: () => {
      toast.update("registerUser", {
        isLoading: false,
        type: "error",
        render: "Something went wrong",
        autoClose: 1500,
      });
    },
  });
};
