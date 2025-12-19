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
			"border-2 border-[#FFC670] bg-white resize-none w-[400px] h-[330px]"
		}
		placeholder="Type your message here."
		onChange={(e) => setValue(e.target.value)}
	/></>
}