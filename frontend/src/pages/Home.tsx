import { useEffect } from "react";
import { useGetAllUsers } from "../api/queryHooks/usersHook";
import { toast } from "react-toastify";

const Home = () => {
  const { data, isLoading, error } = useGetAllUsers();
  toast("LOADING", {
    type: "success",
    toastId: "testing",
    isLoading: true,
    progress: 0,
  });
  useEffect(() => {
    console.log("DATA", isLoading, error?.message, data);
  }, [data, isLoading]);
  useEffect(() => {
    setTimeout(() => {
      toast.update("testing", { isLoading: false });
    }, 2000);
    setTimeout(() => {
      toast.done("testing");
    }, 3000);
  }, []);

  return <div>Home</div>;
};

export default Home;
