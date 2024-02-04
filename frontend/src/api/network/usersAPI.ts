import { RegisterFormData } from "../../pages/Register";
import baseInstance from "../instaces/baseInstace";
import { GetAllUsers } from "../models/usersAPITypes";

export const usersAPIs = {
  getAllUsers: async (): Promise<GetAllUsers> => {
    const url = `/getall/users`;
    const { data } = await baseInstance.get(url);
    return data;
  },
  registerUser: async (userData: RegisterFormData) => {
    const url = `/users/register`;
    const { data } = await baseInstance.post(url, userData);
    return data;
  },
};
