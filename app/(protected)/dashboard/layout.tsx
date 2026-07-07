import { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const metadata = {
	title: "Dashboard",
	description: "User dashboard",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-7xl px-4 pb-12 pt-6 md:px-8">
				<div className="grid gap-6 lg:grid-cols-[280px_1fr]">
					<DashboardSidebar />

					<section>
						<div className="flex items-center justify-between gap-4">
							<div>
								<h1 className="text-2xl font-semibold">Dashboard</h1>
								<p className="mt-1 text-sm text-muted-foreground">
									Welcome back!
								</p>
							</div>
						</div>

						<div className="mt-4">{children}</div>
					</section>
				</div>
			</div>
		</div>
	);
}
