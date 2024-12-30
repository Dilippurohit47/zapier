"use client";

import { ReactNode } from "react";

export const LinkButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex justify-center px-2  py-2 cursor-pointer bg-[#B45309] text-white hover:bg-[#b45309ea] font-medium text-sm rounded"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
