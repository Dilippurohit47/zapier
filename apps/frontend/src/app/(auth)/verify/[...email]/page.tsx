"use client";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../config";

export default function () {
  const router = useRouter();
  const { email } = useParams();

  if (!email) {
    return;
  }

  const newEmail = email[0].split("%40").join("@");
  console.log(newEmail);
  const [userEmail, setUserEmail] = useState<string>(newEmail);
  const [otpDialog, setOtpDialog] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const verifyEmail = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/user/verify-otp`,
        {
          email: userEmail,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        toast.success("Email verified successfully");
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
  const sendOtp = async () => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/user/send-otp`,
        {
          email: userEmail,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        toast.success(`Otp sent to ${userEmail}`);
        setOtpDialog(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
      } else {
        toast.error("An  error occured try again later");
      }
    }
  };

  return (
    <div className="flex-1 pt-6 pb-6 mt-12 px-4 border rounded">
      <Input
        value={userEmail}
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        label={"Email"}
        type="email"
        placeholder="Your Email"
      ></Input>
      {otpDialog && (
        <Input
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
          label={"Otp"}
          type="text"
          placeholder="enter your otp"
        ></Input>
      )}

      <div className="pt-4">
        {otpDialog ? (
          <PrimaryButton onClick={() => verifyEmail()} size="big">
            Verify
          </PrimaryButton>
        ) : (
          <PrimaryButton onClick={() => sendOtp()} size="big">
            Send otp
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}
