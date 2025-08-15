import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { loginTypes } from "../../types/loginTypes";
import { loginSchema } from "../../schemas";
import { Mail, Lock } from "lucide-react";

export const LoginPage = () => {
  const [responseError, setResponseError] = useState<string | null>(null);

  const navigate = useNavigate();

  const accessToken = sessionStorage.getItem("accessToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  let url;
  if (process.env.NODE_ENV === "production") {
    url = `http://localhost:4000`;
  } else {
    url = `http://localhost:4000`;
  }

  const onSubmit = async (data: loginTypes) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(`${url}/auth/login`, userData);
      console.log("response:", response.data);
      if (response.data.role === "admin") {
        navigate("/adminPanel");
      } else {
        navigate("/");
      }

      reset();
      console.log("login successfully");
      // const accessToken =
      //   response.data.role === "admin"
      //     ? response.data.adminToken
      //     : response.data.token;
      const accessToken = response.data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);
      console.log("accessToken:", accessToken);
      // localStorage.setItem("data.email", data.email);
      // localStorage.setItem("userName", response.data.name);
      // localStorage.setItem("role", response.data.role);
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setResponseError(error.response.data.message);
      } else {
        setResponseError("An error occurred. Please try again.");
      }
    }
  };

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="pt-10 px-16 sm:px-40 md:px-60 lg:px-[350px] xl:px-[470px] 2xl:px-[600px] 3xl:px-[750px] 4xl:px-[790px]">
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer text-center font-roboto font-medium"
      >
        App
      </h1>

      <div className="pt-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 flex flex-col gap-3 border border-slate-400 px-5 py-5"
        >
          <h1 className="text-xl">Sign in</h1>
          <h1 className="text-xs"></h1>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-slate-400"
                }`}
                type="email"
                id="email"
                {...register("email")}
                name="email"
                placeholder="Enter your email"
              />
            </div>
            {errors.email ? (
              <div className="text-xs text-red-500">{errors.email.message}</div>
            ) : (
              responseError && (
                <div className="text-xs text-red-500">{responseError}</div>
              )
            )}
          </div>

          <div className="w-full">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <label
                className="ml-auto block cursor-pointer text-xs text-sky-500 hover:text-red-500"
                htmlFor="password"
                onClick={() => navigate("/passwordRecovery")}
              >
                forgot your password?
              </label>
            </div>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-slate-400"
                }`}
                type="password"
                id="password"
                {...register("password")}
                name="password"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <div className="text-xs text-red-500">
                {errors.password.message}
              </div>
            )}
          </div>

          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
            Submit
          </button>
        </form>
      </div>

      <div className="">
        <button
          onClick={() => handleClick("/register")}
          className="mb-5 w-full rounded-xl bg-gradient-to-r from-transparent via-slate-200 to-transparent px-5 py-2 text-sm hover:via-slate-300"
        >
          Create your account
        </button>
      </div>

      <div className="">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </div>
    </div>
  );
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Window {
    google?: any;
  }
}
