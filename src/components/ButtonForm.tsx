"use client";

type ButtonFormProps = {
  children: React.ReactNode;
  isActive: boolean;
};

const ButtonForm = ({ children, isActive }: ButtonFormProps) => {
  return (
    <button
      disabled={isActive}
      type="submit"
      className={`w-full rounded-md bg-indigo-500 flex justify-center items-center text-white text-sm font-semibold mt-3 py-3 ${
        isActive && "cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );
};

export default ButtonForm;
