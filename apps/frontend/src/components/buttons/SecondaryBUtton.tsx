import { ReactNode } from "react";

export const SecondaryButton = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "small" ? "text-sm" : "text-xl"} ${
        size === "small" ? "px-3 pt-2" : "px-6 py-2"
      } cursor-pointer hover:shadow-md border text-black border-black rounded-md`}
    >
      {children}
    </div>
  );
};
