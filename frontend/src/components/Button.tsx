interface Props {
  title: string;
}
const Button = ({ title = "" }: Props) => {
  return (
    <div className="group relative inline-block overflow-hidden rounded border border-gray-100 bg-white px-5 py-2 text-base font-medium text-slate-800 hover:text-primary focus:outline-none focus:ring active:bg-primary active:text-white cursor-pointer">
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-primary transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-primary transition-all duration-200 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-primary transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-primary transition-all duration-200 group-hover:h-full"></span>
      {title}
    </div>
  );
};
export default Button;
