"use client";

import React from "react";

const statusStyles: Record<
	string,
	{ label: string; className: string; dotClassName: string }
> = {
	completed: {
		label: "Completed",
		className:
			"bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
		dotClassName: "bg-emerald-500",
	},
	paid: {
		label: "Paid",
		className:
			"bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
		dotClassName: "bg-emerald-500",
	},
	shipped: {
		label: "Shipped",
		className:
			"bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
		dotClassName: "bg-emerald-500",
	},
	pending: {
		label: "Pending",
		className:
			"bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
		dotClassName: "bg-amber-500",
	},
	awaiting: {
		label: "Awaiting",
		className:
			"bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
		dotClassName: "bg-amber-500",
	},
	canceled: {
		label: "Canceled",
		className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
		dotClassName: "bg-red-500",
	},
	failed: {
		label: "Failed",
		className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
		dotClassName: "bg-red-500",
	},
	default: {
		label: "Unknown",
		className: "bg-muted text-foreground border-border",
		dotClassName: "bg-muted-foreground",
	},
};

export type StatusBadgeVariant = keyof typeof statusStyles;

export default function StatusBadge({
	status,
	className,
	label,
}: {
	status: StatusBadgeVariant | string;
	className?: string;
	label?: string;
}) {
	const key = (status as keyof typeof statusStyles) || "default";
	const style = statusStyles[key] ?? statusStyles.default;

	return (
		<span
			className={
				"inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium " +
				style.className +
				(className ? " " + className : "")
			}
		>
			<span
				className={"h-1.5 w-1.5 rounded-full " + style.dotClassName}
				aria-hidden
			/>
			{label ?? style.label}
		</span>
	);
}
