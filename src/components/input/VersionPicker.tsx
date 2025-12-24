import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import * as React from "react";

type VersionPickerProps = {
  label: string;
  setMajorVersion: React.Dispatch<React.SetStateAction<number>>;
  setMinorVersion: React.Dispatch<React.SetStateAction<number>>;
  setBugsVersion: React.Dispatch<React.SetStateAction<number>>;
};
export const VersionPicker = ({
  label,
  setMajorVersion,
  setMinorVersion,
  setBugsVersion,
}: VersionPickerProps) => {
  return (
    <div className={"w-full  flex flex-col justify-center items-start gap-4"}>
      <Label className={"pl-2"}>{label}</Label>
      <div className={"flex justify-end gap-1 items-end"}>
        v.
        <Input
            className={"number-input w-full bg-white h-8 border-2 border-[#FFC670] focus-visible:ring-[#FFC670] focus-visible:border-[#FF9D0A]"}
          type={"number"}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if(e.key === "-" || e.key ==="e") {e.preventDefault()}
            }}
          onChange={(e) => setMajorVersion(Number(e.target.value))}
        />
        .
        <Input
            className={"number-input w-full bg-white h-8 border-2 border-[#FFC670] focus-visible:ring-[#FFC670] focus-visible:border-[#FF9D0A]"}
          type={"number"}
          onChange={(e) => setMinorVersion(Number(e.target.value))}
        />
        .
        <Input
            className={"number-input w-full bg-white h-8 border-2 border-[#FFC670] focus-visible:ring-[#FFC670] focus-visible:border-[#FF9D0A]"}
          type={"number"}
          onChange={(e) => setBugsVersion(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
