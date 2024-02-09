import { Link } from "react-router-dom";
export interface BrowserLinksType {
  name: string;
  link: string;
}
const MenuLinks = ({ name }: BrowserLinksType) => {
  return (
    <div className="flex items-center px-2 rounded-md text-base font-semibold text-white hover:underline mx-2">
      <Link to={"/"}>{name}</Link>
    </div>
  );
};

export default MenuLinks;
