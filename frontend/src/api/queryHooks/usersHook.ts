import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersAPIs } from "../network/usersAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useAuthStore } from "../../store/AuthStore";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["useGetAllUsers"],
    queryFn: usersAPIs.getAllUsers,
    staleTime: 1000 * 60,
  });
};
export const useRegisterUser = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

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
        autoClose: 2000,
      });
      qc.invalidateQueries({ queryKey: ["useVerifyToken"] });
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message;
      toast.update("registerUser", {
        isLoading: false,
        type: "error",
        render: message ?? "Something went wrong",
        autoClose: 2000,
      });
    },
  });
};
export const useUserLogin = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["useUserLogin"],
    mutationFn: usersAPIs.loginUser,
    onMutate: () => {
      toast("Login User...", {
        type: "info",
        toastId: "useUserLogin",
        isLoading: true,
        progress: 0,
      });
    },
    onSuccess: () => {
      toast.update("useUserLogin", {
        isLoading: false,
        type: "success",
        render: "Logged In!",
        autoClose: 2000,
      });
      qc.invalidateQueries({ queryKey: ["useVerifyToken"] });
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      const message = error?.response?.data?.message;
      toast.update("useUserLogin", {
        isLoading: false,
        type: "error",
        render: message ?? "Something went wrong",
        autoClose: 2000,
      });
    },
  });
};

export const useVerifyToken = () => {
  const { resetStore, setAuthUser } = useAuthStore();

  return useQuery({
    queryKey: ["useVerifyToken"],
    queryFn: () =>
      usersAPIs
        .verifyToken()
        .then((res) => {
          setAuthUser(res);
          return res;
        })
        .catch((error) => {
          console.log(error);
          resetStore();
          return error;
        }),
    retry: false,
  });
};

export const useUserLogout = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["useUserLogout"],
    mutationFn: usersAPIs.logOutUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["useVerifyToken"] });
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error);
      toast("Something went wrong", { type: "error" });
    },
  });
};
