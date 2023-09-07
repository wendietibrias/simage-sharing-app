"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useAlertType } from "@/hooks/useAlert";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../LoadingSpinner";
import useAlert from "@/hooks/useAlert";
import Link from "next/link";
import Input from "../Input";
import ButtonForm from "../ButtonForm";
import Alert from "../Alert";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();

  const { open, openAlert, closeAlert } = useAlert(
    (state) => state
  ) as useAlertType;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [loading, setLoading] = useState<boolean>(false);

  const submitHandler: SubmitHandler<FormValues> = async (formData) => {
    setLoading(true);
    const loginHandler: any = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    if (loginHandler.error) {
      openAlert({
        message: loginHandler.error,
        variant: "error",
        open: true,
      });
      setLoading(false);
    } else {
      reset();
      setLoading(false);
      openAlert({
        message: "Authenthication success, Redirected...",
        open: true,
        variant: "success",
      });

      setTimeout(() => {
        closeAlert();
        router.push("/");
      }, 3400);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full flex flex-col gap-y-3 bg-white rounded-md  p-7 sm:shadow-none shadow-sm shadow-gray-300"
    >
      {open && <Alert />}
      <Input
        name="email"
        showlable={true}
        type="email"
        placeholder="johndoe@example.com"
        register={register}
        error={errors.email ? true : false}
      />
      <Input
        name="password"
        showlable={true}
        type="password"
        placeholder="Password"
        register={register}
        error={errors.password ? true : false}
      />
      <ButtonForm isActive={loading}>
        {loading ? (
          <LoadingSpinner width={16} height={16} color="#fff" />
        ) : (
          "Sign In"
        )}
      </ButtonForm>
      <span className="text-center text-gray-500 text-[13px]">
        Don't have an account?{" "}
        <Link className="text-indigo-500 font-bold" href="/register">
          Register
        </Link>
      </span>
      <div className="w-full mt-2">
        <div className="flex items-center gap-x-2">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <span className="text-[13px] text-gray-700">Or with</span>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>
        <button
          onClick={() =>
            signIn("google", {
              redirect: false,
              callbackUrl: "http://localhost:3000",
            })
          }
          type="button"
          className="w-full rounded-md py-3 mt-3  gap-x-2 border font-semibold border-gray-300 flex justify-center items-center"
        >
          <FcGoogle className="text-lg" />
          <span className="text-[13px] text-gray-700">Sign in with google</span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
