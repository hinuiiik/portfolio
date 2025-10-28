import { Home, Pencil, MapPin, PiggyBank, Newspaper, Bird } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "@/components/ui/sidebar"

import Link from "next/link"
import { Collapsible } from "@/components/ui/collapsible"

export function AppSidebar() {
    return (
        <Sidebar variant="floating" collapsible="offcanvas">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* Home */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href="/#Top">
                                        <Home />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Projects */}
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/#Projects">
                                            <Pencil />
                                            <span>Projects</span>
                                        </Link>
                                    </SidebarMenuButton>

                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/#CarolinaRazor">
                                                    <Newspaper />
                                                    <span>The Carolina Razor</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>

                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/#PorgUNC">
                                                    <PiggyBank />
                                                    <span>PorgUNC</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </SidebarMenuItem>
                            </Collapsible>

                            {/* Hackathons */}
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/#Hackathons">
                                            <MapPin />
                                            <span>Hackathons</span>
                                        </Link>
                                    </SidebarMenuButton>

                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/#WhereTheHeel">
                                                    <MapPin />
                                                    <span>Where the Heel</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>

                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/#ChamaQuest">
                                                    <PiggyBank />
                                                    <span>ChamaQuest</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>

                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild>
                                                <Link href="/#DuckHunt">
                                                    <Bird />
                                                    <span>DuckHunt</span>
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
