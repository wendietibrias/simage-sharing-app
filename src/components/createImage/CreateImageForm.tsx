"use client";
import { storeImageHandler } from "@/api/image.api";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";
import { useRouter, redirect } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import useAlert, { useAlertType } from "@/hooks/useAlert";
import cloudinaryConfig from "@/lib/cloudinary";
import toast from "react-hot-toast";
import Input from "../Input";
import ButtonForm from "../ButtonForm";
import LoadingSpinner from "../LoadingSpinner";
import Alert from "../Alert";
import formatimage from "@/constants/formatimage";

export type ImageFormValues = {
  name: string;
  email: string;
  description: string;
  image: any;
  title: string;
};

const CreateImageForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ImageFormValues>();
  const { data: session, status } = useSession() as any;
  const { open, openAlert, closeAlert } = useAlert() as useAlertType;
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);

  const queryClient = useQueryClient();
  const router = useRouter();

  const storeImage: any = useMutation({
    mutationFn: storeImageHandler,
    mutationKey: "store-images",
    onSuccess: (response) => {
      openAlert({
        open: true,
        message: "Successfully stored images",
        variant: "success",
      });
      reset();

      setTimeout(() => {
        closeAlert();
        setImage(null);
        queryClient.invalidateQueries("images-user");
        router.push("/");
      }, 3000);
    },
    onError: () => {
      openAlert({
        open: true,
        message: "Failed to store images",
        variant: "error",
      });
    },
  });

  const imageUploadHandler = (result: any) => {
    if (result.event === "success") {
      if (result.info.bytes > 1000000) {
        return toast.error("Image is to big", {
          position: "top-center",
          duration: 3000,
        });
      }

      if (!formatimage.includes(result.info.format)) {
        return toast.error("Invalid image type", {
          position: "top-center",
          duration: 3000,
        });
      }

      setImage({
        url: result.info.secure_url,
        publicId: result.info.public_id,
        type: result.info.type,
      });
    }
  };

  const submitHandler: SubmitHandler<ImageFormValues> = (
    formData
  ): Promise<any> | any => {
    if (!image) {
      return toast.error("please upload image first", {
        duration: 3000,
        position: "top-center",
      });
    }

    return storeImage.mutate({ ...formData, image: image });
  };

  useEffect(() => {
    setValue("name", session?.user?.name);
    setValue("email", session?.user?.email);
  }, [session, status]);

  if (status === "unauthenticated") {
    return redirect("/");
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-[700px] sm:w-full sm:shadow-none flex flex-col mt-7 sm:mt-5 mx-auto bg-white p-5 shadow-md shadow-gray-300 gap-y-3"
    >
      {open && <Alert />}
      <Input
        type="text"
        showlable={true}
        name="name"
        register={register}
        error={errors?.name ? true : false}
        placeholder="Username"
      />
      <Input
        type="email"
        showlable={true}
        name="email"
        register={register}
        error={errors?.email ? true : false}
        placeholder="User Email"
      />
      <Input
        type="text"
        showlable={true}
        name="title"
        register={register}
        error={errors?.title ? true : false}
        placeholder="Image Title"
      />
      <Input
        type="text"
        name="description"
        register={register}
        error={errors?.description ? true : false}
        showlable={true}
        placeholder="Image Description"
      />
      <div className="w-full h-[280px] mt-1 rounded-md border-dotted border-2 border-gray-300">
        {loading ? (
          <div className="w-full flex justify-center items-center h-full">
            <LoadingSpinner width={24} height={24} color="#6366f1" />
          </div>
        ) : (
          <div className="w-full h-full py-3 px-3 flex justify-center items-center">
            {image ? (
              <img
                src={image?.url}
                alt="image-generate"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <h5 className="text-xl font-bold text-gray-400">UPLOAD IMAGE</h5>
            )}
          </div>
        )}
      </div>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={imageUploadHandler}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      >
        <button
          disabled={loading}
          className="flex text-[13px] font-semibold items-center gap-x-2 text-green-500"
        >
          <AiOutlinePlus className="text-[17px]" />
          Upload Image
        </button>
      </CldUploadButton>
      <ButtonForm isActive={storeImage.isLoading}>
        {storeImage.isLoading ? (
          <LoadingSpinner width={16} height={16} color="#fff" />
        ) : (
          "Create Image"
        )}
      </ButtonForm>
    </form>
  );
};

export default CreateImageForm;
