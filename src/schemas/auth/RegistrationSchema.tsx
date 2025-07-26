import * as yup from "yup";

const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const registrationSchema = yup.object({
  firstName: yup
    .string()
    .required("Enter your first name")
    .min(4, "must be 4 or more characters"),

  lastName: yup
    .string()
    .required("Enter your last name")
    .min(4, "must be 4 or more characters"),

  email: yup
    .string()
    .matches(emailValidationRegex, "email must be a valid email")
    // .email("email must be a valid email")
    .required("Enter your email"),

  password: yup
    .string()
    .required("password is required")
    .min(8, "Minimum 8 characters required")
    .max(25, "password must contain 25 ot less charachters"),

  repeatPassword: yup
    .string()
    .required("Re-enter your password")
    .min(8, "must be 8 or more characters")
    .max(25, "password must contain 25 ot less charachters")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
