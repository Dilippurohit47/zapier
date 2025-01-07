import { useState } from "react";
import { Input } from "../Input";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function GithubSelector({
  setMetadata,
}: {
  setMetadata?: (params: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="absolute top-[50%] left-[25%]  bg-white w-2/4">
      <Input
        label={"To"}
        type={"text"}
        placeholder="To"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input
        label={"Body"}
        value={body}
        type={"text"}
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
      ></Input>
      <div className="pt-2">
        <PrimaryButton
          onClick={() => {
        //     setMetadata({
        //       email,
        //       body,
        //     });
          }}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
}
