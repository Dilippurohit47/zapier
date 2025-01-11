"use client";

type InputType = "text" | "email" | "password";

export const Input = ({
  name,
  label,
  placeholder,
  onChange,
  type = "text",
  value,
  className ,
}: {
  label: string;
  name?: string;
  placeholder: string;
  onChange: (e: any) => void;
  type?: InputType;
  value: string;
  className?:string,
}) => {
  return (
    <div>
      <div className="text-sm pb-1 pt-2 font-medium text-gray-600">
         <label>{label}</label>
      </div>
      <input
        className={`border text-black rounded px-4 py-2 w-full border-black ${className && className}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};
