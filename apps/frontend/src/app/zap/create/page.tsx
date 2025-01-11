"use client";

import { BACKEND_URL } from "@/app/config";
import { ZapCell } from "@/components/ZapCell";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { TriggerZapCell } from "@/components/createZaps/TriggerZapCell";
import { GithubSelector } from "@/components/models/GithubSelector";
import { Modal } from "@/components/models/Modal";
import SelectedTriggerModal from "@/components/models/selectedTriggerModal";
import { TriggerModal } from "@/components/models/triggerModel";
import { fetchAndSaveUser } from "@/lib/hooks/saveUserInRedux";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState([]);
  const [availableTriggers, setAvailableTriggers] = useState([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/trigger/available`)
      .then((x) => setAvailableTriggers(x.data.availableTriggers));

    axios
      .get(`${BACKEND_URL}/api/v1/actions/available`)
      .then((x) => setAvailableActions(x.data.availableActions));
  }, []);

  return {
    availableActions,
    availableTriggers,
  };
}
export interface selectedActionType {
  id: string;
  availableActionId: string;
  availableActionName: string;
  metadata: any;
}
export default function () {
  const { availableActions, availableTriggers } =
    useAvailableActionsAndTriggers();
  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
  }>();
  const [selectedActions, setSelectedActions] = useState<selectedActionType[]>(
    []
  );
  const [selectedModalId, setselectedModalId] = useState<string>("");
  const router = useRouter();
  const PublishZap = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/zap`,
        {
          availableTriggerId: selectedTrigger?.id || "",
          triggerMetadata: {},
          actions: selectedActions.map((a) => ({
            availableActionId: a.availableActionId,
            actionMetadata: a.metadata,
          })),
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success("Zap is Published");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Internal server error");
      } else {
        toast.error("An error occurred try again later");
      }
    }
  };

  const [triggerId, setTriggerId] = useState(uuid());
  const [openTriggerModel, setOpenTriggerModel] = useState<string>("");

const dispatch = useDispatch()
  useEffect(() =>{
    fetchAndSaveUser(dispatch)
  },[])
  return (
    <div>
      <div className="flex justify-end p-4">
        <PrimaryButton onClick={() => PublishZap()}>Publish</PrimaryButton>
      </div>
      <div className="w-full min-h-screen flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <TriggerZapCell
            id={triggerId}
            setselectedModalId={setselectedModalId}
            name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
            index={1}
            heading="select the trigger that starts your zap"
          />
        </div>

        <div className="w-full  pb-2 ">
          {selectedActions?.map((action, index) => (
            <>
              {selectedActions.length > 0 && (
                <div className="h-[10vh] w-0 border-[1px] border-black border-dashed mx-auto"></div>
              )}
              <div className=" flex justify-center ">
                {" "}
                <ZapCell
                  setselectedModalId={setselectedModalId}
                  name={
                    action.availableActionName
                      ? action.availableActionName
                      : "Action"
                  }
                  id={action.id}
                  heading="select the event for your zap to run"
                  selectedActions={selectedActions}
                  setSelectedActions={setSelectedActions}
                  index={index + 2}
                />{" "}
              </div>
            </>
          ))}
        </div>
        <div className="flex justify-center">
          <div>
            <button
              onClick={() => {
                setSelectedActions((a) => [
                  ...a,
                  {
                    id: uuid(),
                    availableActionId: "",
                    availableActionName: "",
                    metadata: {},
                  },
                ]);
              }}
              className="text-2xl hover:bg-blue-500 transition ease-in duration-100 mx-auto h-8 w-8  rounded-full my-auto text-center hover:text-white"
            >
              +
            </button>
          </div>
        </div>
      </div>
      {selectedModalId && selectedModalId !== triggerId && (
        <Modal
          availableItems={availableActions}
          onSelect={(
            props: null | { actionName: string; id: string; metadata: any }
          ) => {
            if (props === null) {
              setselectedModalId("");
              return;
            }

            setSelectedActions((actions) =>
              actions.map((action) => {
                if (action.id === selectedModalId) {
                  return {
                    ...action,
                    availableActionId: props.id,
                    availableActionName: props.actionName,
                    metadata: props.metadata,
                  };
                }
                return action;
              })
            );
            setselectedModalId("");
          }}
        />
      )}

      {selectedModalId === triggerId && (
        <TriggerModal
          availableItems={availableTriggers}
          onSelect={(
            props: null | { name: string; id: string; metadata: any }
          ) => {
            if (props === null) {
              setselectedModalId("");
              return;
            }

            setSelectedTrigger({
              id: props.id,
              name: props.name,
            });
            setselectedModalId("");
          }}
          setOpenTriggerModel={setOpenTriggerModel}
        />
      )}

      {openTriggerModel && (
        <SelectedTriggerModal
          trigger={selectedTrigger}
          setOpenTriggerModel={setOpenTriggerModel}
        />
      )}
    </div>
  );
}
