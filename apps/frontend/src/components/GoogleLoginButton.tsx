"use client";
import { BACKEND_URL } from "@/app/config";
import { useGoogleLogin } from "@react-oauth/google";
import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

interface GoogleLoginButtonProps {
  dispatch: Dispatch<any>;
  fetchAndSaveUser: (dispatch: Dispatch<any>) => void;
  router: any;
}

interface CredentialResType {
  [Key: string]: string;
}

export default function GoogleLoginButton({
  dispatch,
  fetchAndSaveUser,
  router,
}: GoogleLoginButtonProps) {
  const handleLoginSuccess = async (credentialResponse: CredentialResType) => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/auth/google/callback`,
        {
          credentialResponse,
        },
        {
          withCredentials: true,
        }
      );

      if (res && res.status === 200) {
        toast.success(res.data.message);
        fetchAndSaveUser(dispatch);
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Internal server error");
      } else {
        toast.error("An error occurred try again later");
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => handleLoginSuccess(codeResponse),
    flow: "auth-code",
  });
  return (
    <button
      className="flex w-full justify-center gap-4 bg-white px-6 py-2 items-center rounded-md border-[1px] border-gray-300 hover:bg-gray-100"
      onClick={login}
    >
      <FcGoogle size={22} /> Continue with Google
    </button>
  );
}
