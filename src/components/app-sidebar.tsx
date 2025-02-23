import { Home, Pencil, MapPin, PiggyBank, Newspaper } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    // SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuAction,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
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
                                        <a href="#">
                                            <Home />
                                            <span>Home</span>
                                        </a>
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
                                        <a href="#Projects">
                                            <Pencil />
                                            <span>Projects</span>
                                        </a>
                                    </SidebarMenuButton>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="#WhereTheHeel">
                                                    <MapPin />
                                                    <span>Where The Heel</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="#ChamaQuest">
                                                    <PiggyBank />
                                                    <span>ChamaQuest</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <a href="#CarolinaRazor">
                                                    <Newspaper />
                                                    <span>The Carolina Razor</span>
                                                </a>
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
