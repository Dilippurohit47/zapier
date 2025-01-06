import { HOOKS_URL } from "@/app/config";
import { LinkButton } from "../buttons/LinkButton";
import { useRouter } from "next/navigation";
import { Zap } from "@/app/dashboard/page";
import { toast } from "react-toastify";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ZapOptionsModal from "./zapOptionsModal";
import { useState } from "react";
export const ZapTable = ({ zaps }: { zaps: Zap[] }) => {
  const router = useRouter();
  const copyWebhookurl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!", {
      position: "top-right",
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      className: "bg-gray-600 text-white  ",
    });
  };
  const [zapModal, setZapModal] = useState<string | null>("");

  const selectZapModal = (id: string) => {
    if (zapModal === id) {
      setZapModal("");
    } else {
      setZapModal(id);
    }
  };
  return (
    <div className="p-8 max-w-screen-lg w-full">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Actions
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Created at
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Webhook URL
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Go</th>
            <th className="border border-gray-300 px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {zaps && zaps.length > 0 ? (
            zaps.map((z, index) => (
              <tr key={z.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-4 flex items-center gap-2 h-full">
                  <img
                    src={z.trigger.type.image}
                    className="w-5 h-5 object-cover"
                    alt="Trigger Icon"
                  />
                  {z.actions.map((x, actionIndex) => (
                    <img
                      key={`${z.id}-${actionIndex}`}
                      src={x.type.image}
                      className="w-5 h-5 object-cover"
                      alt={`Action Icon ${actionIndex}`}
                    />
                  ))}
                </td>
                <td className="border border-gray-300 px-4 whitespace-nowrap py-2">
                  untitled-{index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {z.createdAt?.split("T")[0]}
                </td>
                <td
                  className="border border-gray-300 px-4 py-2  max-w-xs  cursor-pointer whitespace-nowrap  truncate overflow-hidden"
                  onClick={() =>
                    copyWebhookurl(`${HOOKS_URL}/hooks/catch/1/${z.id}`)
                  }
                >
                  {`${HOOKS_URL}/hooks/catch/1/${z.id}`}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <LinkButton
                    onClick={() => {
                      router.push("/zap/" + z.id);
                    }}
                  >
                    Go
                  </LinkButton>
                </td>
                <td className="border border-gray-300 px-4 py-2 relative">
                  <div
                    className="cursor-pointer"
                    onClick={() => selectZapModal(z.id)}
                  >
                    <HiOutlineDotsVertical size={22} />
                    {zapModal && zapModal === z.id && (
                      <ZapOptionsModal id={z.id} setZapModal={setZapModal} />
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No zaps available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
