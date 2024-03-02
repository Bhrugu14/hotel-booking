import baseInstance from "../instaces/baseInstace";
import { GetHotelType } from "../models/hotelAPITypes";

export const hotelsAPI = {
  addHotel: async (body: FormData): Promise<GetHotelType> => {
    const url = `/my-hotels/`;
    const { data } = await baseInstance.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
  getMyHotels: async (): Promise<GetHotelType[]> => {
    const url = `/my-hotels/`;
    const { data } = await baseInstance.get(url);
    return data;
  },
  getHotelById: async (hotelId: string): Promise<GetHotelType> => {
    const url = `/my-hotels/${hotelId}`;
    const { data } = await baseInstance.get(url);
    return data;
  },
  editHotelById: async (
    body: FormData,
    hotelId: string
  ): Promise<GetHotelType> => {
    const url = `/my-hotels/${hotelId}`;
    const { data } = await baseInstance.put(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },
};
