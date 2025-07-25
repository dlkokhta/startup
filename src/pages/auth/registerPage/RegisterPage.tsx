import { useForm } from "react-hook-form";
import type { registratioTypes } from "../../../types/registratioTypes.js";
import { yupResolver } from "@hookform/resolvers/yup";
import RegistrationSchema from "./RegistrationSchema.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import RegistrationSuccess from "../components/RegistrationSuccess";
import RegistrationInputField from "../../../components/RegistrationInputField.js";

const Registration = () => {
  const [responseError, setResponseError] = useState<string | null>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(RegistrationSchema) });

  const navigate = useNavigate();

  const onSubmit = async (data: registratioTypes) => {
    let url;
    if (process.env.NODE_ENV === "production") {
      url = ``;
    } else {
      url = `http://localhost:3000`;
    }

    const userData = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
    };

    try {
      const response = await axios.post(`${url}/api/register`, userData);
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
        eCommerce
      </h1>

      <div className="pt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-10 flex flex-col gap-4 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl ">Create account</h1>

          <RegistrationInputField
            label="Your firstname"
            errors={errors.firstname}
            type="text"
            id="firstname"
            register={register}
            name="firstname"
            errorMessage={errors.firstname?.message}
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
            label="password"
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

          <button className=" w-full rounded-xl bg-yellow-300 px-5 py-2  text-sm hover:bg-yellow-400">
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

export default Registration;
