import React from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-background">
			{/* Top bar (no function props in server layout) */}
			<AdminTopBar notificationCount={3} adminName="Store Admin" />

			<div className="mx-auto flex w-full max-w-[120rem] gap-4 px-4 py-6 md:px-8">
				{/* Sidebar */}
				<div className="lg:w-72 shrink-0">
					<AdminSidebar />
				</div>

				{/* Main */}
				<main className="min-w-0 flex-1 pt-2">{children}</main>
			</div>
		</div>
	);
}
