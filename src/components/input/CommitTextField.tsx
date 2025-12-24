import {Label} from "@radix-ui/react-label";
import {Textarea} from "@/components/ui/textarea.tsx";
import type {Dispatch, SetStateAction} from "react";

type Props = {
	setValue : Dispatch<SetStateAction<string>>;
}

export const CommitTextField = ({setValue}:Props) => {
return <>
	<Label className={"text-sm px-2 font-medium"}>Commits</Label>
	<Textarea
		className={
			"border-2 border-[#FFC670] bg-white resize-none w-full h-[330px] focus-visible:ring-[#FFC670] focus-visible:border-[#FF9D0A]"
		}
		placeholder="Type commit messages here."
		onChange={(e) => setValue(e.target.value)}
	/></>
}