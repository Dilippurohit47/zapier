"use client";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useDispatch } from "react-redux";
import { fetchAndSaveUser } from "@/lib/hooks/saveUserInRedux";

export default function () {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otpDialog, setOtpDialog] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const dispatch = useDispatch();
  const SignUp = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        {
          email: email,
          password,
          name,
        },
        {
          withCredentials: true,
        }
      );

      if (res && res.status === 200) {
        toast.success(` verification code sent on ${email}`);
        setOtpDialog(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Internal server error");
      } else {
        toast.error("An error occured try again later");
      }
    }
  };

  const verifyEmail = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/user/verify-otp`,
        {
          email,
          otp: otp.trim(),
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Email verified successfully");
        fetchAndSaveUser(dispatch);
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Internal server error");
      } else {
        toast.error("An error occured try again later");
      }
    }
  };

  return (
    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
      {!otpDialog && (
        <Input
          value={name}
          label={"Name"}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Your name"
        ></Input>
      )}
      <Input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        label={"Email"}
        type="email"
        placeholder="Your Email"
      ></Input>
      {otpDialog ? (
        <Input
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          label={"Otp"}
          type="text"
          placeholder="enter your otp"
        ></Input>
      ) : (
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label={"Password"}
          type="password"
          placeholder="Password"
        ></Input>
      )}

      <div className="pt-4">
        {otpDialog ? (
          <PrimaryButton onClick={() => verifyEmail()} size="big">
            Verify
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => SignUp()} size="big">
            Get started free
          </PrimaryButton>
        )}

        <div className="pt-4 space-y-3">
          <p className="text-center text-slate-500 font-semibold">Or</p>
          <GoogleOAuthProvider clientId="860063088948-9dalgkd113he6c4dhjkfd8qo11vankv6.apps.googleusercontent.com">
            <GoogleLoginButton
              dispatch={dispatch}
              fetchAndSaveUser={fetchAndSaveUser}
              router={router}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}
