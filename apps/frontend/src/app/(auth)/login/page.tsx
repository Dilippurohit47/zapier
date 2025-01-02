"use client";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import { fetchAndSaveUser } from "@/lib/hooks/saveUserInRedux";
import { useDispatch } from "react-redux";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function () {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();
  const dispatch = useDispatch();
  const login = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res && res.status === 200) {
        toast.success("Welcome Back!");
        fetchAndSaveUser(dispatch);
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Internal server error");
      } else {
        toast.error("An error occurred try again later");
      }
    }
  };

  return (
    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
      <Input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        label={"Email"}
        type="email"
        placeholder="Your Email"
      ></Input>
      <Input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        label={"Password"}
        type="password"
        placeholder="Password"
      ></Input>
      <div className="flex justify-between">
        <Link href={"/forgot-password"} className="text-blue-400 text-sm">
          forgot password ?
        </Link>
        <Link href={`/verify/${email}`} className="text-blue-400 text-sm">
          want to verify ?
        </Link>
      </div>

      <div className="pt-4 space-y-3">
        <PrimaryButton onClick={login} size="big">
          Login
        </PrimaryButton>
        <p className="text-center text-slate-500 font-semibold">
          Or 
        </p>
        <GoogleOAuthProvider clientId="860063088948-9dalgkd113he6c4dhjkfd8qo11vankv6.apps.googleusercontent.com">
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}
