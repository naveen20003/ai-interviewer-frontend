"use client"

import SelectSetupType from "@/components/SelectSetup-Type"

export default function ShowSetupPage() {
    return(
      <>
         <div className="w-full min-h-screen p-10 grid gap-5 bg-background text-foreground">
           <SelectSetupType />
         </div>
      </>
    )
}