import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-gray-700 text-base font-bold mb-3">Facilities</h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3">
        {hotelFacilities.map((facility, index) => (
          <label
            key={"facilities" + index}
            className="text-sm flex gap-1 text-gray-700 items-center"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities")}
              id={"cb" + index}
              className="appearance-none h-6 w-6 bg-gray-400 rounded-full checked:bg-primary checked:scale-75 transition-all duration-200 peer"
            />
            <div className="h-6 w-6 absolute rounded-full peer-checked:border-primary peer-checked:border-2 cursor-pointer" />
            <label
              htmlFor={"cb" + index}
              className="flex flex-col justify-center px-2 peer-checked:text-primary select-none cursor-pointer"
            >
              {facility}
            </label>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-xs font-normal">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
