"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { GithubSelector } from "./GithubSelector";

type selectedTriggerType = {
  id: string;
  name: string;
};

const SelectedTriggerModal = ({
  trigger,
  setOpenTriggerModel,
  setTriggerMetaData,
}: {
  trigger: selectedTriggerType | undefined;
  setOpenTriggerModel: (state: string) => void;
}) => {
  const token = useSelector((state: any) => state.userReducer.user.githubToken);
  const router = useRouter();
  const normalizedToken = token === "null" ? null : token;
  useEffect(() => {
    if (trigger?.name === "GitHub" && !normalizedToken) {
      router.push(
        "https://github.com/login/oauth/authorize?client_id=Ov23liEyUark8iVMzES2&scope=repo,read:repo_hook,write:repo_hook,user&redirect_uri=http://localhost:3002/api/v1/add-app/github/callback"
      );
    }
  }, [trigger, normalizedToken]);

  return (
    <div>
      {trigger?.name === "GitHub" && normalizedToken ? (
        <GithubSelector setOpenTriggerModel={setOpenTriggerModel} setTriggerMetaData={setTriggerMetaData} />
      ) : (
        ""
      )}
    </div>
  );
};

export default SelectedTriggerModal;
