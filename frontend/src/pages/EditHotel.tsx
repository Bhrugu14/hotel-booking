import { useEditMyHotel, useGetHotelById } from "../api/queryHooks/hotelsHook";
import SVGIcon from "../assets/Icons";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

function EditHotel() {
  const { data, isLoading, isError } = useGetHotelById();
  const { mutate } = useEditMyHotel();

  return (
    <section>
      {isError && (
        <div className="flex w-full items-center justify-center text-lg font-semibold text-red-600">
          <SVGIcon
            name={"error"}
            width={25}
            height={25}
            fill={"none"}
            stroke="red"
            className="mr-2"
          />
          {"No Data Found"}
        </div>
      )}
      <ManageHotelForm hotel={data} onSave={mutate} isLoading={isLoading} />
    </section>
  );
}

export default EditHotel;
