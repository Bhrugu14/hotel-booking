import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-primary py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>BookHoliday.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to={"/sing-in"}
            className="flex bg-white rounded-sm shadow-sm shadow-teal-700 items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Header;
