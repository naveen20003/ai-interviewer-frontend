"use client"

import * as React from "react"

// import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LayoutDashboard, User , GraduationCap , FileText , TerminalSquareIcon, BotIcon, BookOpenIcon, Settings2Icon } from "lucide-react"
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "IMG_6452.JPG",
  },

  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: (
        <TerminalSquareIcon />
      ),
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: (
        <BotIcon />
      ),
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: (
        <BookOpenIcon />
      ),
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: (
        <User />
      ),
    },
    {
      name: "Resume Analyze",
      url: "/resumeanalyzer",
      icon: (
        <FileText  />
      ),
    },
    {
      name: "Mock Interview",
      url: "/interview",
      icon: (
        <GraduationCap />
      ),
    },
  ],
}

export function AppSidebar({
  ...props
}) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
       setMounted(true);
    }, [])
    
    if (!mounted) {
      return <div className="w-24 md:w-32 lg:w-36 h-10" />;
    }
  return (
    <Sidebar collapsible="icon" {...props} className="bg-sidebar border border-sidebar-border">
      <SidebarHeader className="bg-sidebar text-sidebar-foreground">
        <div>
          <Image
            src={resolvedTheme === "dark" ? "/logo-night.png" : "/logo-light.png"}
            alt="AI Interviewer"
            width={120}
            height={40}
            priority
            className="w-16 md:w-20 lg:w-24 h-auto object-contain"
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar text-sidebar-foreground">
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects projects={data.projects}/>
      </SidebarContent>
      <SidebarFooter className="bg-sidebar text-sidebar-foreground">
        <NavUser user={data.user}/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
