"use client";

// import {usePathname} from "next/navigation";
import {SidebarTrigger} from "@/components/ui/sidebar";
import Socials from "@/app/ui/Socials";

export default function SidebarContainer() {
    // const pathname = usePathname();
    // const isHomePage = pathname === "/";

    return (
        <div
            className={`bg-transparent sticky top-1 left-1 z-50 flex items-center justify-between px-2 py-1 mb-4`}>
            <SidebarTrigger/>
            <div className="flex items-center space-x-2">
                <Socials/>
            </div>
        </div>
    );
}
