"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ChevronsUpDownIcon, SunMoon, BadgeCheckIcon, CreditCardIcon, BellIcon, LogOutIcon } from "lucide-react"
import { MenubarRadio } from "./menu-bar"
import { Dialog, DialogTrigger } from "./ui/dialog"
import ProfileDialog from "./profile-dialog"
import { useState } from "react";
import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"

export function NavUser() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { isMobile } = useSidebar();
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { logOut } = useAuth();

  const handleLogout = async () => {
       try {
          await logOut();
  
          await signOut();
  
          router.push("/login");
          // router.refresh();
       } catch (error) {
          console.error(error)
       }
     }
return (
    <SidebarMenu>
      <SidebarMenuItem>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar>
              <AvatarImage src={user?.avatar}  alt={user?.name} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user?.name}
              </span>

              <span className="truncate text-xs">
                {user?.email}
              </span>
            </div>

            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-fit bg-sidebar text-sidebar-foreground"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >

            <DropdownMenuSeparator />

            <DropdownMenuGroup>

              {/* PROFILE */}
              <DropdownMenuItem
                onClick={() => setProfileOpen(true)}
                className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <BadgeCheckIcon />
                Profile
              </DropdownMenuItem>

              {/* THEME */}
              {/* <DropdownMenuItem>
                <SunMoon />
                <MenubarRadio />
              </DropdownMenuItem> */}

              {/* NOTIFICATIONS */}
              <DropdownMenuItem>
                <BellIcon />
                Notifications
              </DropdownMenuItem>

            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive"  onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>


          {/* PROFILE DIALOG */}
          <Dialog
            open={profileOpen}
            onOpenChange={setProfileOpen}
          >
          <ProfileDialog setUser={setUser}/>
        </Dialog>

      </SidebarMenuItem>
    </SidebarMenu>
  );
}
