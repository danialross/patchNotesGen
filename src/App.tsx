import { DatePicker } from "@/components/input/DatePicker.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Dropdown } from "@/components/input/Dropdown.tsx";
import { VersionPicker } from "@/components/input/VersionPicker.tsx";
import { Label } from "@radix-ui/react-label";
import Logo from "./assets/Account-X-page-logo.png";
import { ButtonWithDialog } from "@/components/input/ButtonWithDialog.tsx";
import { useState } from "react";

const branches = ["ent-uat", "dev-internal"];

function App() {
  const [branch, setBranch] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [oldMajorVersion, setOldMajorVersion] = useState(0);
  const [oldMinorVersion, setOldMinorVersion] = useState(0);
  const [oldBugsVersion, setOldBugsVersion] = useState(0);
  const [commits, setCommits] = useState("");

  const isInputValid = () => {
    return (
      !!branch &&
      !!date &&
      !!oldMajorVersion &&
      !!oldMinorVersion &&
      !!oldBugsVersion &&
      !!commits
    );
  };

  const createPatchNotes = () => {
    let enhancement = "Enhancement: \n";
    let bugFixes = "Bug Fixes: \n";
    const newMajorVersion = oldMajorVersion;
    let newMinorVersion = oldMinorVersion;
    let newBugsVersion = oldBugsVersion;
    const uniqueLines = new Set(commits.split("\n"));
    let hasFeature = false;
    for (const line of uniqueLines) {
      if (
        line.startsWith("feat") ||
        line.startsWith("Feat") ||
        line.startsWith("feature") ||
        line.startsWith("Feature")
      ) {
        enhancement += `- ${line}\n`;
        hasFeature = true;
      } else {
        bugFixes += `- ${line}\n`;
      }
    }

    if (hasFeature) {
      newMinorVersion = oldMinorVersion + 1;
      newBugsVersion = 0;
    } else {
      newBugsVersion += 1;
    }

    return (
      "```\n" +
      `[Release Notes - ${branch} Version v${newMajorVersion}.${newMinorVersion}.${newBugsVersion}]
Release Date: [${date?.getDate()}/${date?.getMonth()}/${date?.getFullYear()}]
Version: v${newMajorVersion}.${newMinorVersion}.${newBugsVersion}
Previous Version: v${oldMajorVersion}.${oldMinorVersion}.${oldBugsVersion}\n` +
      `${(hasFeature && enhancement) || ""}\n` +
      `${bugFixes}\n` +
      "```"
    );
  };

  return (
    <div
      className={
        "relative overflow-hidden w-screen h-screen flex flex-col justify-start items-center bg-[#FFCE85] text-xl"
      }
    >
      <div className={"w-[500px] py-8"}>
        <img src={Logo} alt="logo" />
        <Label className={"text-2xl"}>Patch Notes Generator</Label>
      </div>
      <div className={"flex gap-8 py-2 w-[500px]"}>
        <DatePicker setValue={setDate} />
        <Dropdown label={"Branch"} options={branches} setValue={setBranch} />
      </div>
      <div className={"flex gap-8 py-2 w-[250px]"}>
        <VersionPicker
          label={"Old Version"}
          setMajorVersion={setOldMajorVersion}
          setMinorVersion={setOldMinorVersion}
          setBugsVersion={setOldBugsVersion}
        />
      </div>
      <div className={"flex flex-col gap-3 pt-8 w-[500px]"}>
        <Label className={"text-sm px-2 font-medium"}>Commits</Label>
        <Textarea
          className={"h-[300px] border-gray-50 bg-white resize-none"}
          placeholder="Type your message here."
          onChange={(e) => setCommits(e.target.value)}
        />
      </div>
      <div className={"w-[500px] flex justify-end pt-8"}>
        <ButtonWithDialog
          disabled={!isInputValid()}
          patchNotes={createPatchNotes()}
        />
      </div>
    </div>
  );
}

export default App;
