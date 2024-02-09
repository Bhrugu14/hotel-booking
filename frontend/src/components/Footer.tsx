import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-primary py-10">
      <div className="container mx-auto flex justify-between">
        <span className="text-base text-white font-bold tracking-tight">
          <Link to={"/"}>BookHoliday.com</Link>
        </span>
        <span className="flex space-x-2"></span>
      </div>
    </div>
  );
};
export default Footer;
