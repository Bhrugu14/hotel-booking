import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import SVGIcon from "../../assets/Icons";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");
  const ImageFiles = watch("imageFiles");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-gray-700 text-base font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-5 ">
            {existingImageUrls.map((url, index) => (
              <div className="relative group mb-5" key={"Images" + index}>
                <img
                  src={url}
                  className={`min-h-full object-contain sm:h-40 h-28 hover:-opacity-50 rounded ${
                    index === 0
                      ? "border-2 border-primary"
                      : "border-transparent"
                  }`}
                />
                {index === 0 && (
                  <div className="text-base font-bold text-primary-dark">
                    Display Picture
                  </div>
                )}
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute top-0 right-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-red-100 p-1 rounded-full"
                >
                  <SVGIcon
                    name={"delete"}
                    width={20}
                    height={20}
                    fill={"none"}
                    className="stroke-red-800 hover:animate-pulse stroke-2"
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles")}
        />
        {ImageFiles && (
          <div className="grid md:grid-cols-6 grid-cols-2 gap-2">
            {Array.from(ImageFiles).map((i, k) => {
              return (
                <div
                  key={"image" + k}
                  className={`border-2 ${
                    k === 0 ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={URL.createObjectURL(i)}
                    className="object-contain sm:h-40 h-28 w-full"
                  />
                  {k === 0 && (
                    <div className="text-base font-bold text-primary-dark">
                      Display Picture
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-xs font-normal">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
