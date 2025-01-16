import { useState } from "react";
import { Input } from "../Input";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function EmailSelector({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [subject, setSubject] = useState("");

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
      <div className="pt-2">
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
    </div>
  );
}