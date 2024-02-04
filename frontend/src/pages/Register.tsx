import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/Button";
import { useRegisterUser } from "../api/queryHooks/usersHook";

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
  //   const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5 ">
        <label className="text-gray-700 text-base font-bold flex-1 relative">
          First Name
          <input
            className="input-primary"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500 absolute -bottom-4 left-0 text-xs font-normal">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-base font-bold flex-1 relative">
          Last Name
          <input
            className="input-primary"
            {...register("lastName", { required: "This field is required" })}
          />
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
          {...register("email", { required: "This field is required" })}
        ></input>
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
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
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
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do no match";
              }
            },
          })}
        ></input>
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
  );
};

export default Register;
