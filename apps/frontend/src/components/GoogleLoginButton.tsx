"use client";
import { BACKEND_URL } from "@/app/config";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const handleLoginSuccess = async (credentialResponse: any) => {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/auth/google/callback`,
      {
        credentialResponse,
      },
      {
        withCredentials: true,
      }
    );

    console.log(res);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleLoginSuccess(codeResponse),
    flow: "auth-code",
  });
  return (
    <button
      className="flex w-full justify-center gap-4 bg-white px-6 py-2 items-center rounded-md border-[1px] border-gray-200 hover:bg-gray-100"
      onClick={login}
    >
      <FcGoogle size={22} /> Continue with Google
    </button>
  );
}
