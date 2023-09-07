"use client";

type PaginationButtonProps = {
  page: number;
  onNext: () => void;
  onPrev: () => void;
};

const PaginationButton = ({ page, onNext, onPrev }: PaginationButtonProps) => {
  return (
    <div className="text-center mt-7 flex justify-center items-center gap-x-4">
      <button
        onClick={() => onPrev()}
        className="p-2 rounded-md bg-indigo-500 text-white font-semibold text-[13px]"
      >
        Previous
      </button>
      <span className="text-lg text-gray-700 font-semibold">{page}</span>
      <button
        onClick={() => onNext()}
        className="p-2 rounded-md bg-indigo-500 text-white font-semibold text-[13px]"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButton;
