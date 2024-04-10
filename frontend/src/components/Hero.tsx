import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchInput = () => {
  return (
    <div className="container mx-auto flex flex-col gaps-2 pt-5">
      <input type="text" className="p-2 rounded text-lg outline-none " />
    </div>
  );
};

const Hero = () => {
  const { pathname } = useLocation();
  const [navColor, setNavColor] = useState("bg-primary");
  const listenScrollEvent = () => {
    if (window.scrollY > 250) {
      setNavColor("bg-primary-dark");
    } else {
      setNavColor("bg-primary");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  if (pathname === "/my-hotels")
    return (
      <>
        <div
          className={`${navColor} transition-all ease-in duration-300 w-full z-10 pt-[84px]`}
        >
          <div className="container mx-auto flex flex-col gaps-2 pt-5">
            <h1 className="text-5xl text-white font-bold">
              Find your next stay
            </h1>
            <p className="text-2xl text-white">
              search low price on hotels for your dreams vacation...
            </p>
          </div>
          <div className={`flex flex-col py-5 ${navColor} z-10 w-full`}>
            <SearchInput />
          </div>
        </div>
        <div
          className={`flex flex-col py-5 ${navColor} transition-all ease-in duration-300 fixed z-10 ${
            navColor === "bg-primary" ? "-mt-20" : "mt-20"
          } w-full`}
        >
          <SearchInput />
        </div>
      </>
    );
};

export default Hero;
