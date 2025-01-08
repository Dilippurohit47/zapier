import React from "react";
import { GithubSelector } from "./GithubSelector";

type selectedTriggerType = {
  id: string ;
  name: string;
};

const SelectedTriggerModal = ({
  trigger,
  setOpenTriggerModel
}: {
  trigger: selectedTriggerType | undefined;
  setOpenTriggerModel:(state:string) =>void
}) => {
  return <div>{trigger?.name === "GitHub" && <GithubSelector setOpenTriggerModel={setOpenTriggerModel} />}</div>;
};

export default SelectedTriggerModal;
