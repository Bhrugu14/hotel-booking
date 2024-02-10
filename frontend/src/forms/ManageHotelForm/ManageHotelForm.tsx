import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";
import FacilitiesSection from "./FacilitiesSection";
import { HotelType } from "../../config/hotel-options-config";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../components/Button";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const schema = z.object({
  name: z.string().min(3, { message: "at least 3 characters required" }),
  city: z.string().min(3, { message: "at least 3 characters required" }),
  country: z.string().min(3, { message: "at least 3 characters required" }),
  description: z.string().min(3, { message: "at least 3 characters required" }),
  type: z.any().refine(
    (v) => {
      if (v) {
        return v.length > 0;
      } else {
        return false;
      }
    },
    { message: "select at least one" }
  ),
  pricePerNight: z
    .string()
    .min(1, { message: "at least 1 characters required" })
    .refine(
      (v) => {
        const n = Number(v);
        if (isNaN(n)) {
          return false;
        } else {
          return n > 0;
        }
      },
      { message: "must be greater then zero" }
    ),
  starRating: z.number().min(1, { message: "Rating is required" }),
  facilities: z.array(z.string()).superRefine((val, ctx) => {
    if (val.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        type: "array",
        inclusive: true,
        message: "Select At least one",
      });
    }
  }),
  imageFiles: z.custom<FileList>().superRefine((val, ctx) => {
    if (val.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        type: "array",
        inclusive: true,
        message: "Select At least one",
      });
    }
    if (val.length > 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: 6,
        type: "array",
        inclusive: true,
        message: "Select At least one",
      });
    }
  }),
  imageUrls: z.any(),
  adultCount: z
    .string()
    .min(1, { message: "at least 1 characters required" })
    .refine(
      (v) => {
        const n = Number(v);
        if (isNaN(n)) {
          return false;
        } else {
          return n > 0;
        }
      },
      { message: "must be greater then zero" }
    ),
  childCount: z
    .string()
    .min(1, { message: "at least 1 characters required" })
    .refine(
      (v) => {
        const n = Number(v);
        if (isNaN(n)) {
          return false;
        } else {
          return n >= 0;
        }
      },
      { message: "must be greater then zero" }
    ),
});

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    console.log("FORm", formDataJson);

    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="disabled:bg-gray-500 flex"
          >
            <Button title={isLoading ? "Saving..." : "Save"} />
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
