import { CheckFeature } from "@/components/CheckFeature";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="flex pt-8 max-w-4xl">
        <div className="flex-1 pt-20 px-4">
          <div className="font-semibold text-3xl pb-4">
            Join millions worldwide who automate their work using Zapier.
          </div>
          <div className="pb-6 pt-4">
            <CheckFeature label={"Easy setup, no coding required"} />
          </div>
          <div className="pb-6">
            <CheckFeature label={"Free forever for core features"} />
          </div>
          <CheckFeature label={"14-day trial of premium features & apps"} />
        </div>

        {children}
      </div>
    </div>
  );
};

export default layout;
