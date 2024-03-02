import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import Rating from "../../components/Rating";
import { useParams } from "react-router-dom";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useFormContext<HotelFormData>();
  const { hotelId } = useParams();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">
        {hotelId ? "Edit Hotel" : "Add Hotel"}
      </h1>
      <label className="text-gray-700 text-base font-bold flex-1 ">
        Name
        <input type="text" className="input-primary" {...register("name")} />
        {errors.name && (
          <span className="text-red-500 text-xs font-normal">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex gap-4">
        <label className="text-gray-700 text-base font-bold flex-1 ">
          City
          <input type="text" className="input-primary" {...register("city")} />
          {errors.city && (
            <span className="text-red-500 text-xs font-normal">
              {errors.city.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-base font-bold flex-1 ">
          Country
          <input
            type="text"
            className="input-primary"
            {...register("country")}
          />
          {errors.country && (
            <span className="text-red-500 text-xs font-normal">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-base font-bold flex-1 ">
        Description
        <textarea
          rows={10}
          className="input-primary"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-500 text-xs font-normal">
            {errors.description.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-base font-bold">
        Price Per Night
        <input
          type="number"
          min={1}
          className="input-primary"
          {...register("pricePerNight")}
          value={
            getValues("pricePerNight")
              ? getValues("pricePerNight").toString()
              : ""
          }
        />
        {errors.pricePerNight && (
          <span className="text-red-500 text-xs font-normal">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-base font-bold">Star Rating</label>
      <Rating
        value={getValues("starRating")}
        onclick={(num) => {
          setValue("starRating", num);
          trigger("starRating");
        }}
      />
      {errors.starRating && (
        <span className="text-red-500 text-xs font-normal">
          {errors.starRating.message}
        </span>
      )}
    </div>
  );
};

export default DetailsSection;
