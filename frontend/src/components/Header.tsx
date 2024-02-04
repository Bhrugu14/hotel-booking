import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  return (
    <div className="bg-primary py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>BookHoliday.com</Link>
        </span>
        <span className="">
          <Link to={"/register"} className="m-0">
            <Button title="Sign In" />
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Header;
