"use client";

import React, { useState } from "react";
import AdminDashboardHome from "@/components/admin/AdminDashboardHome";

export default function AdminHomePage() {
	// demo-only state for future wiring with top-bar search
	const [searchQuery] = useState("");

	return (
		<div>
			{/* Search is handled inside AdminDashboardHome via its own input/filter.
			    This prop/state is kept to avoid unused warnings and allow future wiring. */}
			<div className="mb-4">
				<h1 className="text-2xl font-semibold tracking-tight">
					Admin Dashboard
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					At-a-glance KPIs, trends, and recent activity.
				</p>
				{/* Prevent unused lint for demo state */}
				<span className="sr-only">{searchQuery}</span>
			</div>

			<AdminDashboardHome />
		</div>
	);
}
