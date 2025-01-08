import { MdOutlineDeleteOutline } from "react-icons/md";
import { selectedActionType } from "@/app/zap/create/page";
export const TriggerZapCell = ({
  index,
  name,
  id,
  heading,
  setSelectedActions,
  selectedActions,
  setselectedModalId,

}: {
  index: number;
  name?: string;
  id: string;
  heading: string;
  setSelectedActions?: (state: selectedActionType[]) => void;
  selectedActions?: selectedActionType[];
  setselectedModalId: (id: string) => void;

}) => {
  const deleteAction = (id: string) => {
    if (selectedActions) {
      const newActions = selectedActions?.filter((a) => a.id !== id);
      if (setSelectedActions) {
        setSelectedActions(newActions);
      }
    }
  };
  return (
    <div
      onClick={() => {setselectedModalId(id)}}
      className="  bg-white px-3 py-3 shadow-lg cursor-pointer flex justify-between border-black w-[300px] rounded-md border-dashed border-[1.5px]"
    >
      <div>
        <h1 className="bg-[#ECE9DF] border-black border px-3  py-1  text-[0.9rem] rounded-md inline-block ">
          {name}
        </h1>
        <div className="flex mt-2 text-[0.9rem] gap-1  justify-center items-center ">
          <div className="font-semibold  ">{index}.</div>
          <h2 className="text-slate-800">{heading}</h2>
        </div>
      </div>
      {selectedActions && selectedActions.length > 0 && (
        <div
          className="hover:scale-125  h-5"
          onClick={(e) => {
            e.stopPropagation(), deleteAction(id);
          }}
        >
          <MdOutlineDeleteOutline />
        </div>
      )}
    </div>
  );
};
