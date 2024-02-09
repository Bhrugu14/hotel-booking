import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuthStore } from "../store/AuthStore";
import { useUserLogout } from "../api/queryHooks/usersHook";
import { BrowserLinks } from "../utils/constants";
import MenuLinks from "./MenuLinks";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const { mutate } = useUserLogout();
  return (
    <div className="bg-primary py-6">
      <div className="container mx-auto items-center flex justify-between">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to={"/"}>BookHoliday.com</Link>
        </span>
        <span className="flex items-center">
          {isLoggedIn &&
            BrowserLinks.map((item, index) => (
              <MenuLinks key={"links" + index} {...item} />
            ))}
          {isLoggedIn ? (
            <div className="flex" onClick={() => mutate()}>
              <Button title={"Sign Out"} />
            </div>
          ) : (
            <Link to={"/login"} className="m-0 p-0 flex">
              <Button title={"Sign In"} />
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};
export default Header;
