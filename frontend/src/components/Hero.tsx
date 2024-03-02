import { useLocation } from "react-router-dom";

const Hero = () => {
  const { pathname } = useLocation();
  if (pathname === "/my-hotels")
    return (
      <div className="bg-primary pb-16">
        <div className="container mx-auto flex flex-col gaps-2">
          <h1 className="text-5xl text-white font-bold">Find your next stay</h1>
          <p className="text-2xl text-white">
            search low price on hotels for your dreams vacation...
          </p>
        </div>
      </div>
    );
};
export default Hero;
