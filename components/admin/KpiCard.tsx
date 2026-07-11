import React from "react";

export default function KpiCard({
	title,
	value,
	subtitle,
	trend,
	trendLabel,
	variant = "default",
}: {
	title: string;
	value: string;
	subtitle?: string;
	trend?: number; // -100..100
	trendLabel?: string;
	variant?: "default" | "success" | "warning" | "danger";
}) {
	const variantStyles: Record<string, string> = {
		default: "bg-primary/5 text-foreground border-border",
		success:
			"bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20",
		warning:
			"bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20",
		danger: "bg-red-500/10 text-red-800 dark:text-red-300 border-red-500/20",
	};

	const trendIsPositive = (trend ?? 0) >= 0;
	const trendText =
		trendLabel ??
		(trend == null ? "" : `${trendIsPositive ? "+" : ""}${trend.toFixed(1)}%`);

	return (
		<div
			className={
				"rounded-xl border p-4 shadow-sm backdrop-blur " +
				(variantStyles[variant] ?? variantStyles.default)
			}
		>
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="text-xs font-medium text-muted-foreground">{title}</p>
					<p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
					{subtitle ? (
						<p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
					) : null}
				</div>
			</div>

			{trendText ? (
				<div className="mt-4 flex items-center gap-2">
					<span
						className={
							"rounded-md border px-2 py-1 text-xs font-medium " +
							(trendIsPositive
								? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
								: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20")
						}
					>
						{trendIsPositive ? "▲" : "▼"} {trendText}
					</span>
				</div>
			) : null}
		</div>
	);
}
