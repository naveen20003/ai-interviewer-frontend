
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "./ui/field";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

function SelectSetupType() {
    const router = useRouter();
    const [type, setType] = useState("");
    
    // console.log(type);

    useEffect(() => {
      if (type === "manual") {
        router.push("/interview/manual")
      };
  
      if (type === "jobdescription") {
        router.push("/interview/automatic");
      };
      
    }, [type]);


  return (
     <RadioGroup
        value={type}
        onValueChange={setType}
        defaultValue="plus" className="max-w-sm h-[300px] bg-card">
            <FieldLabel htmlFor="plus-plan">
            <Field orientation="horizontal">
                <FieldContent >
                <FieldTitle>Job Description</FieldTitle>
                <FieldDescription>
                    Dirctly Post Job Description That You Want Prepare
                </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="jobdescription" id="jobdescription" />
            </Field>
            </FieldLabel>
            <FieldLabel htmlFor="pro-plan">
            <Field orientation="horizontal">
                <FieldContent>
                <FieldTitle>Manual Setup</FieldTitle>
                <FieldDescription>If You Want To Setup Interview Session Manually </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="manual" id="manual" />
            </Field>
            </FieldLabel>
     </RadioGroup>
  )
}

export default SelectSetupType;