import { Bot, Goal, FileChartColumn } from 'lucide-react';
function ValueStrip() {
  return (
    <div className='w-full bg-background text-foreground text-xs max-w-xl md:max-w-7xl min-h-[80px] flex items-center justify-center gap-5 md:gap-10 md:gap-30'>
        <div className='flex gap-1 items-center md:gap-2'><Goal />Role Based</div>
        <div className='flex gap-1 items-center md:gap-2'><Bot />Ai Powered</div>
        <div className='flex gap-1 items-center md:gap-2'><FileChartColumn />Detailed Feedback</div>
    </div>
  )
}

export default ValueStrip;