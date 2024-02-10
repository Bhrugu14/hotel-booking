import { RegisterFormData } from "../../pages/Register";
import { LoginFormData } from "../../pages/SingIn";
import baseInstance from "../instaces/baseInstace";
import {
  GetAllUsers,
  GetUserRegister,
  GetVerifyToken,
} from "../models/usersAPITypes";

export const usersAPIs = {
  getAllUsers: async (): Promise<GetAllUsers> => {
    const url = `/getall/users`;
    const { data } = await baseInstance.get(url);
    return data;
  },
  registerUser: async (
    userData: RegisterFormData
  ): Promise<GetUserRegister> => {
    const url = `/users/register`;
    const { data } = await baseInstance.post(url, userData);
    return data;
  },
  loginUser: async (userData: LoginFormData): Promise<GetUserRegister> => {
    const url = `/auth/login`;
    const { data } = await baseInstance.post(url, userData);
    return data;
  },
  logOutUser: async (): Promise<GetUserRegister> => {
    const url = `/auth/logout`;
    const { data } = await baseInstance.post(url);
    return data;
  },
  verifyToken: async (): Promise<GetVerifyToken> => {
    const url = `/auth/validate-token`;
    const { data } = await baseInstance.get(url);
    return data;
  },
};
