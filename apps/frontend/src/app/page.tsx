"use client";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";
import { fetchAndSaveUser } from "@/lib/hooks/saveUserInRedux";
import { useAppSelector } from "@/lib/redux/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { logout } from "@/lib/redux/reducers/userReducer";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAndSaveUser(dispatch);
  }, []);

  const isUserLogin = useAppSelector((state) => state.userReducer.isloggedIn);
  return (
    <main className="pb-48 ">
      <Hero isUserLogin={isUserLogin} />
      <div className="pt-8">
        <HeroVideo />
      </div>
    </main>
  );
}
