import { AppSidebar } from "./app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { MenubarRadio } from "./menu-bar";



function SidebarlayoutInset({ children }) {
       
  return (
    <SidebarProvider>
        <AppSidebar/>
        <SidebarInset>
            <header className="bg-background border-b border-border flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 relative">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1 text-foreground hover:bg-accent"/>
                    <Separator
                    orientation="vertical"
                    className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
                    <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#" className="text-foreground hover:bg-accent">
                            Build Your Application
                        </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                        <BreadcrumbPage className="text-foreground hover:bg-accent">
                            Data Fetching
                        </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="mr-5">
                    <MenubarRadio />
                </div>
            </header>
            { children }
        </SidebarInset>
    </SidebarProvider>
  )
}

export default SidebarlayoutInset