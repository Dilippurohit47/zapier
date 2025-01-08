import { ReactNode } from "react";

export const PrimaryButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick?: () => void;
  size?: "big" | "small";
  type?:"submit" |"button"
}) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "small" ? "text-sm" : "text-lg"} ${
        size === "small" ? "px-3 py-2" : "px-6 py-2"
      } cursor-pointer hover:shadow-md bg-amber-700 font-semibold text-white rounded-full text-center flex justify-center flex-col`}
    >
      {children}
    </div>
  );
};
