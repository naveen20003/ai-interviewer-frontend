import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useInterview } from "@/context/interviewContext";
import useSocketConnection from "@/hooks/socket";

const interviewSchema = z.object({
  jobData: z.string()
  .min(1, "job description Is required")
});
function InputJobData() {
        const router = useRouter();
        const [isSubmit, setIsSubmit] = useState(false);
        const {
         startInterview,
        } = useInterview();
        const form = useForm({
            resolver: zodResolver(interviewSchema),
            defaultValues: {
                jobData: "",
            }
        });
        const { register, handleSubmit, formState: { errors }, } = form;
        let mode = "text"
        let interviewtype = "jobDescription"
        const onSubmit = ( data ) => {
        setIsSubmit(true);
        // console.log(data);
        const updatedData = { 
                ...data, 
                interviewtype,  
            };
        // console.log(
        //     "Starting interview:",
        //     updatedData
        // );
        startInterview(updatedData);

       router.push(
      `/interview/interviewroom/${mode}`
    );
        setIsSubmit(false);
    }
  return (
    <Tabs defaultValue="account" className="w-full">
        <TabsList className="bg-muted">
            <TabsTrigger value="link" className="text-muted-foreground">Link</TabsTrigger>
            <TabsTrigger value="text" className="text-muted-foreground">Description</TabsTrigger>
        </TabsList>
        <TabsContent value="link" className="max-w-sm md:max-w-lg p-5 bg-card text-card-foreground rounded-md">
            {/* <div className="w-full pt-10 flex justify-center"> */}
                {/* <div className="w-full max-w-sm md:max-w-5xl"> */}
                    <div className="pl-5 font-bold text-2xl">
                        <h1>
                        Lets's Create The Best And<br/>Fast Experience For You
                        </h1>
                    </div>
                    <div className="pl-5 pr-5 text-sm text-slate-400">
                        <h5>copy and paste the targeted job Link you want to prepare for</h5>
                    </div>
                    <div className="pl-5 pr-5 mt-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-10">
                            <div className="grid gap-2">
                            <Label htmlFor="input-required" className="font-bold">*Job Link</Label>
                            <Input
                                className="bg-input max-w-sm"
                                {...register("jobData")}
                                placeholder="paste link"
                            />
                            {errors.jobData && (
                            <p className="text-red-500">{errors.jobData.message}</p>
                            )}
                            </div>
                            <div className="w-full max-w-sm grid grid-cols-2 gap-5 md:gap-10">
                                <Button 
                                type="submit"
                                size="lg" 
                                className="md:w-50 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground" disabled={isSubmit}>
                                    Submit
                                </Button>
                                <Button size="lg" variant="outline" className="md:w-50 bg-secondary text-secondary-foreground">
                                    Cancel
                                </Button>                                  
                            </div>
                        </div>
                        </form>
                    </div>
                {/* </div> */}
        {/* </div> */}
        </TabsContent>
        <TabsContent value="text" className="max-w-sm md:max-w-lg p-5 bg-background text-foreground rounded-md">
            {/* <div className="w-full pt-10 flex justify-center"> */}
                {/* <div className="w-full max-w-sm md:max-w-5xl"> */}
                    <div className="pl-5 font-bold text-2xl">
                        <h1>
                        Lets's Create The Best And<br/>Fast Experience For You
                        </h1>
                    </div>
                    <div className="pl-5 pr-5 text-sm text-slate-400">
                        <h5>copy and paste the targeted job description you want to prepare for</h5>
                    </div>
                    <div className="pl-5 pr-5 mt-10">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-10">
                            <div className="grid gap-2">
                            <Label htmlFor="input-required" className="font-bold">*Job Description</Label>
                            <Input
                                className="bg-input max-w-sm h-20"
                                {...register("jobData")}
                                placeholder="paste job description"
                            />
                            {errors.jobData && (
                            <p className="text-red-500">{errors.jobData.message}</p>
                            )}
                            </div>
                            <div className="w-full max-w-sm grid grid-cols-2 gap-5 md:gap-10">
                                <Button 
                                type="submit"
                                size="lg" 
                                className="md:w-50 bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground" disabled={isSubmit}>
                                    Submit
                                </Button>
                                <Button size="lg" variant="outline" className="md:w-50 bg-secondary text-secondary-foreground">
                                    Cancel
                                </Button>                                  
                            </div>
                        </div>
                        </form>
                    </div>
                {/* </div> */}
        {/* </div> */}
        </TabsContent>
    </Tabs>
  )
}

export default InputJobData