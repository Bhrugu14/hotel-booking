import { useAddHotel } from "../api/queryHooks/hotelsHook";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const AddHotel = () => {
  const { mutate, isPending } = useAddHotel();
  return (
    <section>
      <ManageHotelForm onSave={mutate} isLoading={isPending} />
    </section>
  );
};

export default AddHotel;
