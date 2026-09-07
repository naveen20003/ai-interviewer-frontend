import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function CallToAction() {
    const router = useRouter();
  return (
    <div className="w-full min-h-[100px] py-15 flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold text-center mb-10">
            Take Your First Mock Today!
        </h1>
        <div className="w-full flex justify-center">
         <Button onClick={() => router.push("/signup")}>Get Here </Button>
        </div>
    </div>
  )
}

export default CallToAction;