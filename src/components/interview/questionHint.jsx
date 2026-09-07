import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Info } from 'lucide-react';

function QuestionHint({ hint }) {
    // console.log("inside QuestionHInt", hint);
    
  return (
    <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" className="rounded-full"/>}>
            <Info />
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Hint</AlertDialogTitle>
            <AlertDialogDescription>
                {hint}
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Ok</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default QuestionHint;