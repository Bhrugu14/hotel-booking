import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen transition-all relative">
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      <Header />
      <div className="pt-[84px]" />
      <Hero />
      <div className="container mx-auto pb-10 pt-5 flex-1">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
