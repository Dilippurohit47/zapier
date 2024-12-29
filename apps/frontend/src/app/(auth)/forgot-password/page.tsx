"use client";
import { BACKEND_URL } from "@/app/config";
import { Input } from "@/components/Input";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setotp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const router = useRouter();

  const getOtp = async () => {
    try {
      const res = await axios.put(`${BACKEND_URL}/api/v1/user/send-otp`, {
        email: email,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        setOtpSent(true);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Internal server error");
      } else {
        toast.error("An error occured try again later");
      }
    }
  };

  const VerifyOTp = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/verify-otp`, {
        email: email,
        otp: otp,
      });

      if (res.status === 200) {
        const userId = res.data.userId;
        toast.success(res.data.message);
        router.push(`/enter-new-password/${userId}/${otp}`);
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
    <div className="flex-1 pt-6 pb-6  mt-12 px-4 border-[2px] rounded max-h-[30vh]">
      <div className="text-center text-[1.2rem] font-semibold text-slate-500">
        {otpSent
          ? "Enter valid otp to get reset password link"
          : "        Enter email to get otp"}
      </div>

      {!otpSent ? (
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label={"Email"}
          type="email"
          placeholder="email"
        ></Input>
      ) : (
        <Input
          value={otp}
          onChange={(e) => {
            setotp(e.target.value);
          }}
          label={"Otp"}
          type="text"
          placeholder="Enter otp"
        ></Input>
      )}
      <div className="pt-4 ">
        {otpSent ? (
          <button
            onClick={() => {
              VerifyOTp();
            }}
            className=" simple-button bg-blue-500"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={() => {
              getOtp();
            }}
            className=" simple-button bg-blue-500"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default page;
