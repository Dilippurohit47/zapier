"use client";
import { useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";
import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hooks";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/reducers/userReducer";
import { BACKEND_URL } from "@/app/config";
import { toast } from "react-toastify";
export const Appbar = () => {
  const router = useRouter();
  const isUserLogin = useAppSelector((state) => state.userReducer.isloggedIn);
  const dispatch = useDispatch();
  const logOutUser = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.status === 200) {
        toast.success("Logout");
        dispatch(logout());
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex border-b justify-between p-4">
      <Link href="/">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
          Zapier
        </div>
      </Link>
      <div className="flex">
        <div className="pr-4">
          <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
        </div>
        {!isUserLogin && (
          <div className="pr-4">
            <LinkButton
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </LinkButton>
          </div>
        )}
        {isUserLogin ? (
          <LinkButton
            onClick={() => {
              logOutUser();
            }}
          >
            Logout
          </LinkButton>
        ) : (
          <PrimaryButton
            onClick={() => {
              router.push("/signup");
            }}
          >
            Signup
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};
