import { useState } from "react";
import { Input } from "../Input";
import { PrimaryButton } from "../buttons/PrimaryButton";
import { TiArrowSortedDown } from "react-icons/ti";
export function EmailSelector({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");
  const [showGuide, setShowGuide] = useState<boolean>(false);
  return (
    <div>
      <Input
        label={"To"}
        type={"text"}
        placeholder="To"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        label={"subject"}
        type={"text"}
        placeholder="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      ></Input>
      <Input
        label={"Body"}
        value={body}
        type={"text"}
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
      ></Input>
      <button
        className=" text-slate-600 font-semibold flex justify-start items-center mt-4  gap-0"
        onClick={() => setShowGuide((prev) => !prev)}
      >
        Guide{" "}
        <div
          className={`flex justify-center  items-center  ${showGuide ? "rotate-[180deg]" : ""}`}
        >
          <TiArrowSortedDown className="" size={20} />
        </div>
      </button>
      <div
        className={`${showGuide ? "min-h-[30vh] opacity-100  my-4 " : "h-0 w-0 opacity-0  "} shadow-lg  rounded-md w-[60%] bg-zinc-200 p-2 transition-all ease-in-out duration-200`}
      >
     <h3 className="text-lg font-semibold text-gray-800 mb-2">Guide Tips:</h3>
  <p className="text-sm text-gray-600 mb-2">
    You can use objects like <span className="text-gray-900 font-semibold">{"{"} {"}"}</span> if you want dynamic values which you think will be present in the trigger payload.
  </p>
  <p className="text-sm text-gray-600 mb-2">
    Example: If the trigger is a GitHub new commit, the dynamic email parts would look like:
  </p>
  
  <div className="bg-gray-100 p-2 rounded-md text-sm text-gray-800 border border-gray-300 mb-4">
    <p className="text-sm text-gray-600">To: <span className="font-semibold text-gray-800">your email </span></p>
    <p className="text-sm text-gray-600">Subject: <span className="font-semibold text-gray-800"> you's choice</span></p>
    <p className="text-sm text-gray-600">Body: <span className="font-semibold text-gray-800">new commit is received from {"{"} Committer Name or Email {"}"} in the repo {"{"} Repo Name {"}"}</span></p>
  </div>

  <p className="text-sm text-gray-600">
    This is the dynamic payload structure you can use for setting up triggers in your workflow.
  </p>
      </div>
      <PrimaryButton
        onClick={() => {
          setMetadata({
            email,
            body,
            subject,
          });
        }}
      >
        Submit
      </PrimaryButton>
    </div>
  );
}
