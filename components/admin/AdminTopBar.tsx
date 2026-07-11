"use client";

import React, { useMemo, useState } from "react";
import { Bell, Search, UserRound, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export type AdminSearchItem =
	| { kind: "order"; id: string; label: string }
	| { kind: "product"; id: string; label: string }
	| { kind: "customer"; id: string; label: string };

export default function AdminTopBar({
	notificationCount = 3,
	adminName = "Admin",
	onSearch,
}: {
	notificationCount?: number;
	onSearch?: (query: string) => void;
	adminName?: string;
}) {
	const [query, setQuery] = useState("");

	const showResultsHint = useMemo(() => query.trim().length >= 2, [query]);

	return (
		<header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
			<div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-3">
						<div className="text-muted-foreground">
							<Search className="h-4 w-4" />
						</div>
						<Input
							value={query}
							onChange={(e) => {
								const next = e.target.value;
								setQuery(next);
								onSearch?.(next);
							}}
							placeholder="Search order ID, product, or customer email"
							className="h-10"
						/>
						{showResultsHint ? (
							<span className="hidden sm:inline-flex text-xs text-muted-foreground">
								Press Enter to apply
							</span>
						) : null}
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon" className="relative">
						<Bell className="h-4 w-4" />
						{notificationCount > 0 ? (
							<Badge className="absolute -top-2 -right-2" variant="destructive">
								{notificationCount}
							</Badge>
						) : null}
					</Button>

					<div className="hidden sm:flex items-center gap-2 rounded-xl border border-border px-3 py-2">
						<UserRound className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm font-medium">{adminName}</span>
						{/* demo logout button */}
						<Button
							onClick={() => {
								// In this repo admin auth is not implemented; keep UI placeholder.
								alert("Logout (demo)");
							}}
							variant="ghost"
							className={cn("text-muted-foreground hover:text-foreground")}
						>
							<LogOut className="h-4 w-4" />
							<span className="ml-2">Logout</span>
						</Button>
					</div>

					{/* mobile compact profile */}
					<div className="sm:hidden">
						<Button
							onClick={() => alert("Logout (demo)")}
							variant="outline"
							size="icon"
						>
							<LogOut className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
