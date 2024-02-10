import { HotelFormData } from "../../forms/ManageHotelForm/ManageHotelForm";
import baseInstance from "../instaces/baseInstace";

export const hotelsAPI = {
  addHotel: async (body: FormData): Promise<HotelFormData> => {
    const url = `/my-hotels/`;
    const { data } = await baseInstance.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
