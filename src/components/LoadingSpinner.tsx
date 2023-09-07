"use client";
import ReactLoading from "react-loading";

type LoadingSpinnerProps = {
  width: string | number;
  height: string | number;
  color: string;
};

const LoadingSpinner = ({ width, height, color }: LoadingSpinnerProps) => {
  return (
    <ReactLoading type="spin" width={width} height={height} color={color} />
  );
};

export default LoadingSpinner;
