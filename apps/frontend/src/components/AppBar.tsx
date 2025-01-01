"use client";
import { useParams, useRouter } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";
import Link from "next/link";
import { useAppSelector } from "@/lib/redux/hooks";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/reducers/userReducer";
import { BACKEND_URL } from "@/app/config";
import { toast } from "react-toastify";

type NavLink = {
  label: string;
  href: string;
};

const navLinks: NavLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Contact Sales",
    href: "/contact-sale",
  },
  {
    label: "About us",
    href: "/contact-sale",
  },
];

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
    <div className="flex border-b justify-between py-4 px-8">
      <Link href="/">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
          Zapier
        </div>
      </Link>
      <div className="flex justify-center items-center gap-5 ">
        <div className="space-x-5">
          {navLinks.map((n) => (
            <Link
              className="font-semibold hover:text-[#B45309]"
              href={`${n.href}`}
            >
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center gap-5
        ">
          {!isUserLogin && (
            <Link
              className="font-semibold hover:text-[#B45309]"
              href={`/login`}
            >
              Login
            </Link>
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
    </div>
  );
};
