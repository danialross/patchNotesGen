import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Select,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label.tsx";

type SelectProps = {
  options: string[];
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const Dropdown = ({ options, label, setValue }: SelectProps) => {
  return (
    <div className={"w-full flex flex-col justify-center items-start gap-3"}>
      <Label className={" px-2"}>{label}</Label>
      <Select onValueChange={setValue}>
        <SelectTrigger className="w-full bg-white hover:bg-gray-100 ">
          <SelectValue placeholder="Select a branch" />
        </SelectTrigger>
        <SelectContent>
          {options.map((item, index) => (
            <SelectItem
              id={`${index}-${item}`}
              value={item}
              key={`${index}-${item}`}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
