import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-gray-700 text-base font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300 rounded-md">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            className="input-primary"
            type="number"
            min={1}
            {...register("adultCount")}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-xs font-normal">
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            className="input-primary"
            type="number"
            min={0}
            {...register("childCount")}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-xs font-normal">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
