"use client"

import { useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSocket } from "@/context/socketContext";
import { useRouter } from "next/navigation";
import { v7 as uuid } from "uuid";

const sessionId = uuid();
export function PreviewData({ isSubmit, form, currentStep, nextStep,  prevStep}) {
    const socketRef = useSocket();
    console.log(socketRef.current.id);
    
    useEffect(() => {
      if(!socketRef.current) return;
      
      const onConnect = () => {
        console.log("socket ID:", socketRef.current.id)
      }
      socketRef.current.on("connect", onConnect);
      return () => {
        socketRef.current.off("connect", onConnect )
      }
    }, [socketRef.current])
    
    
    const router = useRouter();
    const { register } = form;
    
    const interviewtype = "standard"
    const handleSubmit = async() => {
        const { domain, level } = form.getValues();
        socketRef.current.emit("candidatedata", { interviewtype, sessionId, domain, level })
    };
    socketRef.current.on("message", (data) => {
        // console.log(data);
        const message = data;
        alert(message);
        router.push(`/interview/session`)
    });

    const values = form.getValues();
     return(
       <div className="w-full pt-10 flex justify-center">
          <div className="w-full max-w-sm md:max-w-5xl grid gap-6">
            <div className="pl-5 text-xl font-bold text-sky-400">
                <h1>
                 Preview
                </h1>
            </div>
            <div className="pl-5 pr-5 text-sm text-gray-500">
                <h5>check if all the details are correct then click Submit button and if not then go back and fill correct details</h5>
            </div>
            <div className="pl-5 pr-5 mt-10">
                <form>
                <div className="flex flex-col gap-10">
                    <div className="grid gap-2">
                    <Label htmlFor="text" className="font-bold">*Job Role</Label>
                    <Input
                        className="bg-white max-w-sm"
                        value={values.domain}
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="text" className="font-bold">*Experience Level</Label>
                    <Input
                        className="bg-white max-w-sm"
                        value={values.level}
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="text" className="font-bold">*Interview Type</Label>
                    <Input
                        className="bg-white max-w-sm"
                        value={values.interviewtype}
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="text" className="font-bold">*Number Of Questions</Label>
                    <Input
                        className="bg-white max-w-sm"
                        value={values.quequantity}
                    />
                    </div>
                    <div className="w-full max-w-sm grid grid-cols-2 gap-5 md:gap-10">
                        <Button size="lg" className="md:w-50 bg-blue-600 hover:bg-gray-300 hover:text-gray-700" 
                        onClick={handleSubmit} disabled={isSubmit}>
                            next step
                        </Button>
                        <Button onClick={prevStep} size="lg" variant="outline" className="md:w-50">
                            Go Back
                        </Button>                                  
                    </div>
                </div>
                </form>
            </div>
          </div>
        </div>
     )
}