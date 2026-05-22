import { cookies } from "next/headers";
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar";
import React from "react";
import { DashBoardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default async function DashBoardLayout({
    children,
} : {
    children: React.ReactNode
}) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value == "true";
    return (
        <SidebarProvider defaultOpen={true} className="h-svh">
            <TooltipProvider>
                <DashBoardSidebar />
            <SidebarInset className="min-h-0 min-w-0">
                <main className="flex min-h-0 flex-1 flex-col">
                    {children}
                </main>
            </SidebarInset>
            </TooltipProvider>
        </SidebarProvider>
    )
}