import {Home, Pencil, MapPin, PiggyBank, Newspaper} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    // SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    // SidebarMenuAction,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar"

import Link from 'next/link'

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     // DropdownMenuLabel,
//     // DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

import {
    Collapsible,
    // CollapsibleContent,
    // CollapsibleTrigger,
} from "@/components/ui/collapsible"


// Menu items.
// const items = [
//     {
//         title: "Home",
//         url: "#",
//         icon: Home,
//     },
//     {
//         title: "Projects",
//         url: "#Projects",
//         icon: Pencil,
//     }
// ]

export function AppSidebar() {
    return (
        <Sidebar variant={"floating"} collapsible={"offcanvas"}>
            <SidebarContent>
                <SidebarGroup>
                    {/*<SidebarGroupLabel>Application</SidebarGroupLabel>*/}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/#Top">
                                        <Home/>
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {/*<SidebarMenuItem>*/}
                            {/*    <SidebarMenuButton asChild>*/}
                            {/*        <a href="#Projects">*/}
                            {/*            <Pencil />*/}
                            {/*            <span>Projects</span>*/}
                            {/*        </a>*/}
                            {/*    </SidebarMenuButton>*/}
                            {/*</SidebarMenuItem>*/}
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href={"/#Projects"}>
                                            <Pencil/>
                                            <span>Projects</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={"/#WhereTheHeel"}>
                                                    <MapPin/>
                                                    <span>Where The Heel</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={"/#ChamaQuest"}>
                                                    <PiggyBank/>
                                                    <span>ChamaQuest</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href={"/#CarolinaRazor"}>
                                                    <Newspaper/>
                                                    <span>The Carolina Razor</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
