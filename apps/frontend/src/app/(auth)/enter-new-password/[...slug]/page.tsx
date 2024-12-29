"use client";
import { BACKEND_URL } from "@/app/config";
import { Input } from "@/components/Input";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { slug } = useParams();
  const router = useRouter();
  if (!slug) {
    console.log("Slug is undefined or null");
    return;
  }
  const userId = slug[0];
  const otp = slug[1];
console.log(userId,otp)
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const resetPassword = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/reset-password/${userId}/${otp}`,
        {
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        router.push("/login");
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
      <Input
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        label={"New Password"}
        type="password"
        placeholder="Password"
      ></Input>
      <Input
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        label={"Confirm Password"}
        type="password"
        placeholder="Password"
      ></Input>

      <div className="pt-4 ">
        <button
          onClick={() => {
            resetPassword();
          }}
          className=" simple-button bg-blue-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default page;
