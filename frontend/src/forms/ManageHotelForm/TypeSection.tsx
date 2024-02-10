import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-gray-700 text-base font-bold mb-3">Type</h2>
      <div className="flex flex-wrap">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer flex ${
              typeWatch === type
                ? "bg-primary text-white"
                : "bg-gray-300 text-black"
            } text-sm rounded-full px-4 py-2 font-semibold items-center justify-center mb-2 mx-1`}
          >
            <input
              type="radio"
              value={type}
              {...register("type")}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-xs font-normal">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
