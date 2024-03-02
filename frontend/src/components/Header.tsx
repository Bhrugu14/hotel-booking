import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuthStore } from "../store/AuthStore";
import { useUserLogout } from "../api/queryHooks/usersHook";
import { BrowserLinks } from "../utils/constants";
import MenuLinks from "./MenuLinks";
import { useEffect, useState } from "react";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const { mutate } = useUserLogout();
  const [navColor, setNavColor] = useState("bg-primary");
  const listenScrollEvent = () => {
    window.scrollY > 20
      ? setNavColor("bg-primary-dark")
      : setNavColor("bg-primary");
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  return (
    <div
      className={`${navColor} py-6 fixed w-full z-20 transition-all ease-in duration-300`}
    >
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
