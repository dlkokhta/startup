import { useForm } from "react-hook-form";
import type { registrationTypes } from "../../types/registrationTypes";
import { yupResolver } from "@hookform/resolvers/yup";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegistrationSuccess } from "../../components/RegistrationSuccess.js";

import { registrationSchema } from "../../schemas/index.js";
import { RegistrationInputField } from "../../components/RegistrationInputField";

export const RegistrationPage = () => {
  const [responseError, setResponseError] = useState<string | null>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const {
    register,

    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data: registrationTypes) => {
    const url = import.meta.env.PROD ? `` : `http://localhost:4000`;

    const userData = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
      passwordRepeat: data.repeatPassword,
    };

    try {
      const response = await axios.post(`${url}/auth/signup`, userData);
      console.log("Registration response:", response.data);
      setResponseMessage(response.data.message);
      reset();
    } catch (error: any) {
      setResponseError(error.response.data);
    }
  };

  showModal ? navigate("/login") : null;

  return (
    <div className="pt-10 px-16 sm:px-40 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[600px] 3xl:px-[750px] 4xl:px-[790px]">
      {responseMessage && !showModal ? (
        <RegistrationSuccess
          message="Registration successful! Please check your email to verify your account."
          onClose={() => setShowModal(true)}
        />
      ) : (
        ""
      )}
      <h1
        onClick={() => navigate("/")}
        className="block cursor-pointer text-center font-roboto font-medium"
      >
        App
      </h1>

      <div className="pt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-4 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Create account</h1>

          <RegistrationInputField
            label="first name"
            errors={errors.firstName}
            type="text"
            id="firstName"
            register={register}
            name="firstName"
            errorMessage={errors.firstName?.message}
          />

          <RegistrationInputField
            label="last name"
            errors={errors.lastName}
            type="text"
            id="lastName"
            register={register}
            name="lastName"
            errorMessage={errors.lastName?.message}
          />

          <div className="w-full">
            <label className="block text-sm" htmlFor="email">
              email
            </label>
            <input
              className={`w-full border ${
                errors.email ? `border-red` : `border-slate-400 `
              }  outline-none`}
              type="email"
              id="email"
              {...register("email")}
              name="email"
            />
            {errors.email ? (
              <div className="text-xs text-red">{errors.email.message}</div>
            ) : (
              responseError && (
                <div className="text-xs text-red">{responseError}</div>
              )
            )}
          </div>

          <RegistrationInputField
            label="Password"
            errors={errors.password}
            type="password"
            id="password"
            register={register}
            name="password"
            errorMessage={errors.password?.message}
          />

          <RegistrationInputField
            label="Repeat Password"
            errors={errors.repeatPassword}
            type="password"
            id="confirm-password"
            register={register}
            name="repeatPassword"
            errorMessage={errors.repeatPassword?.message}
          />

          <button className=" w-full rounded-xl bg-green-400 px-5 py-2  text-sm hover:bg-green-600 cursor-pointer">
            Submit
          </button>

          <div className="text-sm">
            have an account?{" "}
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="cursor-pointer text-blue-500 underline hover:text-red"
            >
              Sign in
            </a>
            <a
              onClick={() => {
                navigate("/");
              }}
              className="ml-3 cursor-pointer text-blue-500 underline hover:text-red"
            >
              Home
            </a>
          </div>
        </form>
      </div>
      <div className="">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
    </div>
  );
};
