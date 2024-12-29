import { useState } from "react";
import { Input } from "../Input";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function SolanaSelector({
    setMetadata,
  }: {
    setMetadata: (params: any) => void;
  }) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");
  
    return (
      <div className="">
        <Input
        value={address}
          label={"To"}
          type={"text"}
          placeholder="To"
          onChange={(e) => setAddress(e.target.value)}
        ></Input>
        <Input
        value={amount}
          label={"Amount"}
          type={"text"}
          placeholder="To"
          onChange={(e) => setAmount(e.target.value)}
        ></Input>
        <div className="pt-4">
          <PrimaryButton
            onClick={() => {
              setMetadata({
                amount,
                address,
              });
            }}
          >
            Submit
          </PrimaryButton>
        </div>
      </div>
    );
  }