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
    <div className={"w-full  flex flex-col"}>
      <Label className={"py-3"}>{label}</Label>
      <div className={"flex justify-end gap-1 items-end"}>
        v.
        <Input
          className={"w-full bg-white border border-red"}
          type={"number"}
          onChange={(e) => setMajorVersion(Number(e.target.value))}
        />
        .
        <Input
          className={"w-full bg-white"}
          type={"number"}
          onChange={(e) => setMinorVersion(Number(e.target.value))}
        />
        .
        <Input
          className={"w-full bg-white"}
          type={"number"}
          onChange={(e) => setBugsVersion(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
