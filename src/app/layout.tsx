import {cookies} from "next/headers";
import type {Metadata} from "next";
import {Inter, Raleway} from "next/font/google";
import {SidebarProvider} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import PageWrapper from "@/app/ui/PageWrapper";
import SidebarContainer from "@/app/ui/SidebarContainer";
import "./globals.css";

// Load fonts
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});
const raleway = Raleway({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-raleway",
});

export const metadata: Metadata = {
    title: "Vikram Krishnakumar",
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <html lang="en" className={`${inter.variable} ${raleway.variable} antialiased`}>
        <body className="flex min-h-screen w-screen overflow-x-hidden">
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar/>
            <div className="flex-1 relative w-full">
                <SidebarContainer/>
                <PageWrapper>{children}</PageWrapper>
            </div>
        </SidebarProvider>
        </body>
        </html>
    );
}
