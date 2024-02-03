import { check } from "express-validator";

export const RegisterValidations = [
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("email", "email is required").isEmail(),
  check("password", "6 or more character required").isLength({
    min: 6,
    max: 15,
  }),
];

export const SignInValidations = [
  check("email", "email is required").isEmail(),
  check("password", "6 or more character required").isLength({
    min: 6,
    max: 15,
  }),
];
