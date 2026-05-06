import type { Dispatch, SetStateAction } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  placeholder: string;
  error: string;
};

export default function TextField({
  setValue,
  label,
  placeholder,
  error,
}: Props) {
  return (
    <div className="flex flex-col gap-2 p-0">
      <Label className={"pl-2 text-sm font-medium"}>
        {label}
        {error ? <span className="text-red-500 text-xs">{error}</span> : null}
      </Label>
      <Input
        className={
          "text-sm w-full bg-white h-8 border-2 border-[#FFC670] focus-visible:ring-[#FFC670] focus-visible:border-[#FF9D0A]"
        }
        placeholder={placeholder}
        onChange={(e) => {
          if (e.target.value) {
            setValue(e.target.value);
          } else {
            setValue("");
          }
        }}
      />
    </div>
  );
}
