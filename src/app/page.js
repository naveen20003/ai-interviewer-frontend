"use client"

import HomeNavigationBar from '@/components/home-NavBar';
import HeroSection from '@/components/hero-section';
import ValueStrip from '@/components/value-strip';
import HowItWorks from '@/components/how-It-works';
import FeatureSection from '@/components/features-section';
import ProductSection from '@/components/product-section';
import CallToAction from '@/components/cta-section';
import FooterSection from '@/components/footer-section';
import ResumeSection from '@/components/resume-section';
import InterviewSection from '@/components/interview-section';
export default function Home() {
  return(
    <div className="bg-background text-foreground p-5 flex flex-col gap-10">
      <div className='flex justify-center mt-4'>
        <HomeNavigationBar />
      </div>
      <div className='w-full mt-10'>
       <HeroSection />
      </div>
      <div className='w-full mt-10'>
       <ResumeSection />
      </div>
      <div className='w-full mt-10'>
       <InterviewSection />
      </div>
      <div className='border-b border-t border-border'>
        <ValueStrip />
      </div>
      <div className='border-b'>
        <ProductSection />
      </div>
      <div className='border-b'>
         <HowItWorks />
      </div>
      <div className='border-b'>
         <FeatureSection />
      </div>
      <div className=''>
         <CallToAction />
      </div>
      <div>
         <FooterSection />
      </div>
    </div>
  )
}