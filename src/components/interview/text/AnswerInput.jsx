import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useInterview from "@/hooks/interview";
import { useState } from "react";


function AnswerInput() {
    const [answer, setAnswer] = useState("");
    // const { SubmitAnswer } = useInterview();
    
    // const HandleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("input value", answer);
    //     SubmitAnswer(answer)
    // }
    
  return (
    <div>
        <form onSubmit={HandleSubmit}>
            <Input 
                type="text"
                placeholder="type answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
                />
            <Button type="submit">Submit</Button>
        </form>
    </div>
  )
}

export default AnswerInput