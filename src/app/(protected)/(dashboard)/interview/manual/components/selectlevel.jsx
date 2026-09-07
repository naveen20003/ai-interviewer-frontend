"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Controller } from "react-hook-form";

const items = [
  { label: "Select Level", value: "" },
  { label: "Frasher", value: "frasher" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Experienced", value: "experienced" },
]
export function SelectLevel({ isSubmit, form, currentStep, nextStep,  prevStep}) {
     const { register, trigger, formState: { errors }, } = form;

    const handleSubmit = async() => {
        const valid = await trigger("level");

        if (valid) {
            nextStep();
        };
    }
     return(
        <div className="w-full pt-10 flex justify-center">
          <div className="w-full max-w-sm md:max-w-5xl grid gap-6">
            <div className="pl-5 text-xl font-bold text-sky-400">
                <h1>
                 select your domain
                </h1>
            </div>
            <div className="pl-5 pr-5 font-bold text-3xl">
                <h3>Choose which job you want to prepare interview</h3>
            </div>
            <div className="pl-5 pr-5 mt-10">
                <form>
                <div className="flex flex-col gap-10">
                    <div className="grid gap-2">
                    <Label htmlFor="text" className="font-bold">*Experience Level</Label>
                    <Controller
                     name = "level"
                     control={form.control}
                     render={({ field }) => (
                      <>
                        <Select items={items}
                         onValueChange={field.onChange} 
                         value={field.value}
                        >
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select Level"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {items.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                    </SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                      </>
                     )}
                    />
                    {errors.level && (
                    <p className="text-red-500">{errors.level.message}</p>
                    )}
                    </div>
                    <div className="w-full max-w-sm grid grid-cols-2 gap-5 md:gap-10">
                        <Button size="lg" className="md:w-50 bg-blue-600 hover:bg-gray-300 hover:text-gray-700" 
                        onClick={handleSubmit} disabled={isSubmit}>
                            next step
                        </Button>
                        <Button onClick={prevStep} size="lg" variant="outline" className="md:w-50">
                            prev step
                        </Button>                                  
                    </div>
                </div>
                </form>
            </div>
          </div>
        </div>
     )
}