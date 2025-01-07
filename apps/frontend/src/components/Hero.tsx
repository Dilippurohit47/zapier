"use client";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryBUtton";
import { Feature } from "./Feature";
import Link from "next/link";

export const Hero = ({ isUserLogin }: { isUserLogin: boolean }) => {
  return (
    <div>
      <div className="flex justify-center">
        <Link
          href="https://github.com/login/oauth/authorize?client_id=Ov23liEyUark8iVMzES2&scope=SCOPES&redirect_uri=http://localhost:3002/api/v1/add-app/github/callback
"
        >
          Github
        </Link>
        <div className="text-5xl  font-semibold text-center pt-8 max-w-xl">
          Automate as fast as you can type
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <div className="text-xl  font-normal text-center pt-8 max-w-2xl">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <div className="flex">
          {isUserLogin ? (
            <Link href={"/dashboard"}>
              <PrimaryButton onClick={() => {}} size="big">
                Create Zaps
              </PrimaryButton>
            </Link>
          ) : (
            <Link href={"/signup"}>
              <PrimaryButton onClick={() => {}} size="big">
                Get Started free
              </PrimaryButton>
            </Link>
          )}
          <div className="pl-4">
            <SecondaryButton onClick={() => {}} size="big">
              Contact Sales
            </SecondaryButton>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Feature title={"Free Forever"} subtitle={"for core features"} />
        <Feature title={"More apps"} subtitle={"than any other platforms"} />
        <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
      </div>
    </div>
  );
};
