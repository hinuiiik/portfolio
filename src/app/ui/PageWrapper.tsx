"use client";
import {usePathname} from "next/navigation";

export default function PageWrapper({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <div className={`min-h-screen ${isHomePage ? "bg-transparent" : "bg-background"}`}>
            {children}
        </div>
    );
}
