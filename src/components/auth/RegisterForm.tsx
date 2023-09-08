"use client";
import { useMutation } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAlertType } from "@/hooks/useAlert";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import useAlert from "@/hooks/useAlert";
import Link from "next/link";
import Input from "../Input";
import ButtonForm from "../ButtonForm";
import Alert from "../Alert";
import LoadingSpinner from "../LoadingSpinner";
import { useSession } from "next-auth/react";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirm: string;
};

const RegisterForm = () => {
  const { status, data: session } = useSession();
  const { open, closeAlert, openAlert } = useAlert(
    (state) => state
  ) as useAlertType;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const router = useRouter();

  const registerMutation: any = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`,
        formData
      );
      return data;
    },
    mutationKey: "auth",
    onSuccess: (data) => {
      console.log(data);
      openAlert({
        open: true,
        message: "Successs create account",
        variant: "success",
      });
      reset();
      setTimeout(() => {
        closeAlert();
        router.push("/login");
      }, 2500);
    },
    onError: (error: any) => {
      const {
        response: { data },
      } = error;
      openAlert({
        open: true,
        message: data?.message,
        variant: "error",
      });
    },
  });

  const submitHandler: SubmitHandler<FormValues> = async (formData) =>
    registerMutation.mutate(formData);

  if (status === "authenticated") {
    return redirect("/");
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full bg-white p-7 rounded-md flex flex-col gap-y-3"
    >
      {open && <Alert />}
      <Input
        name="name"
        showlable={true}
        type="text"
        placeholder="Username"
        register={register}
        error={errors.name ? true : false}
      />
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
      <Input
        name="confirm"
        showlable={true}
        type="password"
        placeholder="Confirm Password"
        register={register}
        error={errors.confirm ? true : false}
      />
      <ButtonForm isActive={registerMutation.isLoading}>
        {registerMutation.isLoading ? (
          <LoadingSpinner width={16} height={16} color="#fff" />
        ) : (
          "Sign Up"
        )}
      </ButtonForm>
      <span className="text-center text-gray-500 text-[13px]">
        Already have an account?{" "}
        <Link className="text-indigo-500 font-bold" href="/login">
          Login
        </Link>
      </span>
    </form>
  );
};

export default RegisterForm;
