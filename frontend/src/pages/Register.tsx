import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/Button";
import { useRegisterUser } from "../api/queryHooks/usersHook";
import { Link } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    firstName: z.string().min(3, { message: "at least 3 characters required" }),
    lastName: z.string().min(3, { message: "at least 3 characters required" }),
    email: z
      .string()
      .min(1, { message: "email is required" })
      .email({ message: "Enter valid Email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const { mutate } = useRegisterUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className="max-w-[650px] mx-auto bg-white/80 p-5 rounded-lg shadow-lg border shadow-gray-300 mt-28">
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5 ">
          <label className="text-gray-700 text-base font-bold flex-1 relative">
            First Name
            <input className="input-primary" {...register("firstName")} />
            {errors.firstName && (
              <span className="text-red-500 absolute -bottom-4 left-0 text-xs font-normal">
                {errors.firstName.message}
              </span>
            )}
          </label>
          <label className="text-gray-700 text-base font-bold flex-1 relative">
            Last Name
            <input className="input-primary" {...register("lastName")} />
            {errors.lastName && (
              <span className="text-red-500 absolute -bottom-4 left-0 text-xs font-normal">
                {errors.lastName.message}
              </span>
            )}
          </label>
        </div>
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
        <label className="text-gray-700 text-base font-bold flex-1 relative">
          Confirm Password
          <input
            type="password"
            className="input-primary"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 absolute -bottom-4 left-0 text-xs font-normal">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
        <span>
          <button type="submit" className="mt-10 float-end">
            <Button title="Register" />
          </button>
        </span>
      </form>
      <div className="font-normal text-base text-gray-700">
        have an account already?{" "}
        <Link to={"/login"}>
          <span className="text-primary font-bold hover:underline">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
