import { useState } from "react";
import { Input } from "../Input";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function GithubSelector({
  setOpenTriggerModel,
}: {
  setOpenTriggerModel: (string: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");



  const submitForm = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);

    setOpenTriggerModel("") //close modal after form submit
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full  bg-slate-100 bg-opacity-70 flex">
      <div className="relative py-6 px-4 border  border-[#0000002a] w-full max-w-2xl max-h-full shadow-lg rounded-md">
        <h4 className="font-bold">Github</h4>
        <form onSubmit={submitForm}>
          <Input
          label="Repo"
            name="repo"
            type={"text"}
            placeholder="select repo "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
          label="Body"

            name="body"
            value={body}
            type={"text"}
            placeholder="Body"
            onChange={(e) => setBody(e.target.value)}
          ></Input>
          <div className="pt-2">
            <button className=" w-full  py-3    cursor-pointer hover:shadow-md bg-[#0D1117] font-semibold text-white rounded-full text-center flex justify-center items-center">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
