import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useUserLogin } from "../api/queryHooks/usersHook";

export type LoginFormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Enter valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function SingIn() {
  const { mutate } = useUserLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });
  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Login User</h2>
        <label className="text-gray-700 text-base font-bold flex-1 relative">
          Email
          <input
            type="email"
            className="input-primary"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 absolute -bottom-4 left-0 text-xs font-normal">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-base font-bold flex-1 relative">
          Password
          <input
            type="password"
            className="input-primary"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500 absolute -bottom-4 left-0 text-xs font-normal">
              {errors.password.message}
            </span>
          )}
        </label>
        <span>
          <button type="submit" className="mt-10 float-end">
            <Button title="Login" />
          </button>
        </span>
      </form>
      <div className="font-normal text-base text-gray-700">
        Doesn't have an account?{" "}
        <Link to={"/register"}>
          <span className="text-primary font-bold hover:underline">
            Register
          </span>
        </Link>
      </div>
    </>
  );
}

export default SingIn;
