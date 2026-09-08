import { Bot, Goal, CircleUser, FileText, Gauge, ChartNoAxesCombined } from 'lucide-react';

const items = [
    {
        name: "Adaptive",
        icon: <Bot />
    },
    {
        name: "Personalized",
        icon: <CircleUser />
    },
    {
        name: "Job Data",
        icon: <Goal />
    },
    {
        name: "Resume Analyzer",
        icon: <FileText />
    },
    {
        name: "Score Dashboard",
        icon: <Gauge />
    },
    {
        name: "Interview Report",
        icon: <ChartNoAxesCombined />
    },
]
function FeatureSection() {
  return (
    <div className='w-full bg-background text-foreground min-h-[300px] border border-border py-15'>
        <h1 className='col-span-3 text-4xl font-semibold flex justify-center mb-10'>Features</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5  place-items-center'>
            {
                items.map((i)=> (
                    <div key={i.name} className='flex md:gap-3 text-md md:text-xl font-medium py-10'>
                        <h1>{i.icon}</h1>
                        <h1>{i.name}</h1>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default FeatureSection;