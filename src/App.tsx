import { DatePicker } from "@/components/input/DatePicker.tsx";
import { Dropdown } from "@/components/input/Dropdown.tsx";
import { VersionPicker } from "@/components/input/VersionPicker.tsx";
import { Label } from "@radix-ui/react-label";
import Logo from "./assets/Account-X-page-logo.png";
import { ButtonWithDialog } from "@/components/input/ButtonWithDialog.tsx";
import { useState } from "react";
import { Card } from "./components/ui/card";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CommitTextField } from "@/components/input/CommitTextField.tsx";

const branches = ["Ent UAT", "Dev-Internal"];

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
      oldBugsVersion !== undefined &&
      !!commits
    );
  };

  const createPatchNotes = () => {
    let enhancement = "Enhancement: \n";
    let bugFixes = "Bug Fixes: \n";
    const newMajorVersion = oldMajorVersion;
    let newMinorVersion = oldMinorVersion;
    let newBugsVersion = oldBugsVersion;
    const uniqueLines = new Set(commits.trim().split("\n"));
    let hasFeature = false;
    let hasBugFix = false;
    for (const line of uniqueLines) {
      if (
        line.toLocaleLowerCase().startsWith("feat") ||
        line.toLocaleLowerCase().startsWith("feature")
      ) {
        enhancement += `- ${line}\n`;
        hasFeature = true;
      } else if (
        line.toLocaleLowerCase().startsWith("chore") ||
        line.toLocaleLowerCase().startsWith("fix") ||
        line.toLocaleLowerCase().startsWith("mirror")
      ) {
        bugFixes += `- ${line}\n`;
        hasBugFix = true;
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
Previous Version: v${oldMajorVersion}.${oldMinorVersion}.${oldBugsVersion}\n
` +
      `${hasFeature ? enhancement : ""}\n` +
      `${hasBugFix ? bugFixes : ""}\n` +
      "```"
    );
  };

  return (
    <div
      className={
        "bg-[#FFC670] overflow-x-hidden relative min-h-screen flex flex-col justify-start items-center gap-8 py-[7vh]"
      }>
      <div className={"w-[350px] translate-x-8"}>
        <img src={Logo} alt="logo" />
        <Label className={"text-2xl"}>Patch Notes Generator</Label>
      </div>
      <div className={"flex flex-col lg:flex-row gap-4 lg:gap-8 py-2"}>
        <div className="flex flex-col items-center gap-2 lg:gap-4">
          <Card>
            <DatePicker setValue={setDate} />
          </Card>
          <div className="w-full flex justify-center py-2 ">
            <UnfoldMoreIcon fontSize="large" />
          </div>
          <Card>
            <Dropdown
              label={"Branch"}
              options={branches}
              setValue={setBranch}
            />
          </Card>
          <div className="w-full flex justify-center py-2 ">
            <UnfoldMoreIcon fontSize="large" />
          </div>
          <Card>
            <VersionPicker
              label={"Version"}
              setMajorVersion={setOldMajorVersion}
              setMinorVersion={setOldMinorVersion}
              setBugsVersion={setOldBugsVersion}
            />
          </Card>
        </div>
        <div className="flex flex-col justify-center items-center">
          <UnfoldMoreIcon fontSize="large" className="transform lg:rotate-90" />
        </div>
        <div className="w-[350px] lg:w-[400px] flex flex-col gap-4 p-4 bg-gray-50 border-2 border-[#FF9D0A] rounded-md ">
          <CommitTextField setValue={setCommits} />
        </div>
        <div className="flex items-center justify-center transform rotate-90 lg:rotate-0">
          <KeyboardDoubleArrowRightIcon fontSize="large" />
        </div>
        <div className="flex justify-center">
          <ButtonWithDialog
            disabled={!isInputValid()}
            patchNotes={createPatchNotes()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
