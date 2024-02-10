import { useAddHotel } from "../api/queryHooks/hotelsHook";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const AddHotel = () => {
  const { mutate, isPending } = useAddHotel();
  const handleSave = (hotelFormData: FormData) => {
    console.log("Data", hotelFormData);
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
