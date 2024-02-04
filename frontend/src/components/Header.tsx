import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuthStore } from "../store/AuthStore";
import { useUserLogout } from "../api/queryHooks/usersHook";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const { mutate } = useUserLogout();
  return (
    <div className="bg-primary py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>BookHoliday.com</Link>
        </span>
        <span className="">
          {isLoggedIn ? (
            <div className="m-0" onClick={() => mutate()}>
              <Button title={"Sign Out"} />
            </div>
          ) : (
            <Link to={"/login"} className="m-0">
              <Button title={"Sign In"} />
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
