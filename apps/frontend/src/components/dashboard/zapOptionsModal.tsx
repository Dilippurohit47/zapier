import React from "react";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "@/app/config";
import { toast } from "react-toastify";






const ZapOptionsModal = ({
  id,
  setZapModal,
}: {
  id: string;
  setZapModal: (state:string) => void;
}) => {


  const deleteZap = async (id: string) => {
    try {
      console.log(id);
      const res = await axios.delete(`${BACKEND_URL}/api/v1/zap/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Zap deleted", {
          autoClose: 1000,
        });
        setZapModal("")
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Internal server error");
      }
    }
  };

  const renameZap = () => {
    console.log("Rename clicked");
  };
  
  const editZap = () => {
    console.log("Edit clicked");
  };
  const options = [
    { label: "Rename", icon: <FaPencilAlt size={15.6} />, function: renameZap },
    { label: "Edit", icon: <TbEdit size={17.6} />, function: editZap },
    { label: "Delete", icon: <MdDelete size={17.6} />, function: deleteZap },
  ];
  return (
    <div className="z-10 bg-white border-[2px] rounded-md absolute py-4 px-4 inset flex flex-col items-start">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex text-black font-normal text-[1.1rem] gap-2 items-center justify-center cursor-pointer"
          onClick={() => option.function(id)}
        >
          {option.label} {option.icon}
        </div>
      ))}
    </div>
  );
};

export default ZapOptionsModal;
