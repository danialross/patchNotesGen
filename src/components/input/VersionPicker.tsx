import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import * as React from "react";
import type { Number } from "../types/types";

type VersionPickerProps = {
  label: string;
  setMajorVersion: React.Dispatch<React.SetStateAction<Number>>;
  setMinorVersion: React.Dispatch<React.SetStateAction<Number>>;
  setBugsVersion: React.Dispatch<React.SetStateAction<Number>>;
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
          className={
            "number-input w-full bg-white h-8 border-2 border-[#FFC670] focus-visible:ring-[#FFC670] focus-visible:border-[#FF9D0A]"
          }
          type={"number"}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value) {
              setMajorVersion(Number(e.target.value));
            } else {
              setMajorVersion(null);
            }
          }}
        />
        .
        <Input
          className={
            "number-input w-full bg-white h-8 border-2 border-[#FFC670] focus-visible:ring-[#FFC670] focus-visible:border-[#FF9D0A]"
          }
          type={"number"}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value) {
              setMinorVersion(Number(e.target.value));
            } else {
              setMinorVersion(null);
            }
          }}
        />
        .
        <Input
          className={
            "number-input w-full bg-white h-8 border-2 border-[#FFC670] focus-visible:ring-[#FFC670] focus-visible:border-[#FF9D0A]"
          }
          type={"number"}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            if (e.target.value) {
              setBugsVersion(Number(e.target.value));
            } else {
              setBugsVersion(null);
            }
          }}
        />
      </div>
    </div>
  );
};
