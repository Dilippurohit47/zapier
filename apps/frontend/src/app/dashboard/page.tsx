"use client";
import { DarkButton } from "@/components/buttons/DarkButton";
import { ZapTable } from "@/components/dashboard/zapTable";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import Link from "next/link";
import Loader from "@/components/Loader";

export interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
  createdAt: string;
}

function useZaps() {
  const [loading, setLoading] = useState<boolean>(true);
  const [zaps, setZaps] = useState<Zap[]>([]);
  useEffect(() => {
    const getZaps = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/zap`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setZaps(res.data.zap);
        setLoading(false);
      }
    };
    getZaps();
  }, []);

  return {
    loading,
    zaps,
  };
}

export default function () {
  const { loading, zaps } = useZaps();
  return (
    <div>
      <div className="flex justify-center  pt-8 bg-[#FFFDF9]">
        <div className="max-w-screen-lg	 w-full">
          <div className="flex justify-between pr-8 ">
            <div className="text-2xl font-bold">My Zaps</div>
            <Link href={"/zap/create"}>
              <DarkButton>Create</DarkButton>
            </Link>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]   ">
          <Loader />
        </div>
      ) : (
        <div className="flex justify-center">
          {" "}
          <ZapTable zaps={zaps} />{" "}
        </div>
      )}
    </div>
  );
}
