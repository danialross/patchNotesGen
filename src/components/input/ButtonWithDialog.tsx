import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useEffect, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
type ButtonWithDialogProps = {
  disabled: boolean;
  patchNotes: string;
};
export function ButtonWithDialog({
  disabled,
  patchNotes,
}: ButtonWithDialogProps) {
  const [open, setOpen] = useState(false);
  const [isAlerted, setIsAlerted] = useState(false);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(patchNotes);
      setIsAlerted(true);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  useEffect(() => {
    if (isAlerted) {
      setTimeout(() => {
        setIsAlerted(false);
      }, 3000);
    }
  }, [isAlerted]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={
            "w-[100px] h-[40px] hover:bg-[#EE9332] hover:text-white border-none"
          }
          disabled={disabled}
        >
          Generate
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Patch Notes is Ready!</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Textarea
            className={"resize-none h-[500px] w-full border-gray-300"}
            disabled
            value={patchNotes}
          />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <div className="flex justify-evenly w-full">
            <Button onClick={handleCopyText}>
              <ContentCopyIcon fontSize={"small"} />
              Copy
            </Button>
            <Button onClick={() => setOpen(false)} variant="outline">
              <CloseIcon fontSize={"small"} />
              Close
            </Button>
          </div>
        </AlertDialogFooter>
        <div
          className={`transition-opacity duration-300 ${isAlerted ? "opacity-100" : "opacity-0"} absolute top-3/4 left-1/2 -translate-1/2 bg-white py-4 px-8 border-2 border-gray-200 rounded-md`}
        >
          Copied
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
