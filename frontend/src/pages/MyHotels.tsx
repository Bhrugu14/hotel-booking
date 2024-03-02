import { Link } from "react-router-dom";
import Button from "../components/Button";
import SVGIcon from "../assets/Icons";
import { useGetMyHotel } from "../api/queryHooks/hotelsHook";

function MyHotels() {
  const { data, isLoading } = useGetMyHotel();
  return (
    <div className="h-full flex-1 flex flex-col bg-white">
      <div className="flex justify-between w-full items-center">
        <h2 className="text-3xl font-bold">My Hotels</h2>
        <Link to={"/add-hotel"} className="flex">
          <Button title="Add Hotel" />
        </Link>
      </div>
      {isLoading && (
        <div className="items-center mt-4 flex">
          <SVGIcon
            name={"circularLoading"}
            width={40}
            height={40}
            fill={"none"}
            stroke="#0047AB"
          />{" "}
          Loading...
        </div>
      )}
      {!isLoading &&
        data?.map((i, k) => (
          <div
            key={"hotels" + k}
            className="border-gray-100 rounded-md shadow-lg border p-4 mt-4"
          >
            <div className="flex">
              <img
                src={i.imageUrls[0]}
                alt="logo"
                className="h-20 w-20 object-cover mr-5 rounded-sm"
              />
              <div>
                <div className="text-xl font-bold text-slate-700">{i.name}</div>
                <div className="text-sm text-slate-900 whitespace-pre-line">
                  {i.description}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-5 mt-5">
              <div className="flex items-center border p-2">
                <SVGIcon
                  name={"map"}
                  width={15}
                  height={15}
                  fill={"none"}
                  stroke="#0047AB"
                />
                <label className="ml-1 text-sm">{`${i.city}, ${i.country}`}</label>
              </div>
              <div className="flex items-center border p-2">
                <SVGIcon
                  name={"tag"}
                  width={15}
                  height={15}
                  fill={"none"}
                  stroke="#0047AB"
                />
                <label className="ml-1 text-sm">{i.type}</label>
              </div>
              <div className="border p-2 flex items-center">
                <SVGIcon
                  name={"money"}
                  width={15}
                  height={15}
                  fill={"none"}
                  stroke="#0047AB"
                />
                <label className="ml-1 text-sm">
                  {i.pricePerNight} per night
                </label>
              </div>
              <div className="border p-2 flex items-center">
                <SVGIcon
                  name={"user"}
                  width={15}
                  height={15}
                  fill={"none"}
                  stroke="#0047AB"
                />
                <label className="ml-1 text-xs">
                  <div>{`${i.adultCount} adult(s)`}</div>
                  <div>{`${i.childCount} children`}</div>
                </label>
              </div>
              <div className="border p-2 flex items-center">
                <SVGIcon
                  name={"star"}
                  width={15}
                  height={15}
                  fill={"none"}
                  stroke="#0047AB"
                />
                <label className="ml-1 text-sm">{i.starRating}</label>
              </div>
            </div>
            <div className="float-end">
              <Link
                to={`/edit-hotel/${i._id}`}
                className="flex items-center p-2 mt-4 group"
              >
                <div className="text-lg font-semibold group-hover:text-primary group-hover:underline">
                  {"View Details"}
                </div>
                <SVGIcon
                  name={"rightArrow"}
                  width={20}
                  height={20}
                  fill={"none"}
                  className="group-hover:stroke-primary stroke-black group-hover:animate-anime-sliding stroke-2"
                />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyHotels;
