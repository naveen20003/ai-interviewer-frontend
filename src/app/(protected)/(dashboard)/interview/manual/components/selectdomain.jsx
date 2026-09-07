"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SelectDomain({ isSubmit, setIsSubmit, form, currentStep, nextStep,  prevStep }) {
    const { register, trigger,  formState: { errors }, } = form;

    const handleSubmit = async() => {
        setIsSubmit(true);
        const valid = await trigger("domain");

        if (valid) {
            nextStep();
        };
        setIsSubmit(false);
    }
     return(
        <div className="w-full pt-10 flex justify-center">
          <div className="w-full max-w-sm md:max-w-5xl">
            <div className="pl-5 font-bold text-2xl">
                <h1>
                Lets's Create The Best <br/> Experience For You
                </h1>
            </div>
            <div className="pl-5 pr-5 text-sm text-gray-500">
                <h5>let us know a bit more so we can help <br/> you get started</h5>
            </div>
            <div className="pl-5 pr-5 mt-10">
                <form>
                <div className="flex flex-col gap-10">
                    <div className="grid gap-2">
                    <Label htmlFor="input-required" className="font-bold">*Job Role</Label>
                    <Input
                        className="bg-white max-w-sm"
                        {...register("domain")}
                        placeholder="data analyst"
                    />
                    {errors.domain && (
                    <p className="text-red-500">{errors.domain.message}</p>
                    )}
                    </div>
                    <div className="w-full max-w-sm grid grid-cols-2 gap-5 md:gap-10">
                        <Button size="lg" className="md:w-50 bg-blue-600 hover:bg-gray-300 hover:text-gray-700" 
                        onClick={handleSubmit} disabled={isSubmit}>
                            next step
                        </Button>
                        <Button size="lg" variant="outline" className="md:w-50">
                            Cancel
                        </Button>                                  
                    </div>
                </div>
                </form>
            </div>
          </div>
        </div>
     )
}