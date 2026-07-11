"use client";

import React from "react";

function clamp(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n));
}

export default function MiniLineChart({
	values,
	labels,
	accent = "#8b5cf6", // violet-500
}: {
	values: number[];
	labels?: string[];
	accent?: string;
}) {
	const w = 640;
	const h = 220;
	const padding = 18;

	const min = Math.min(...values);
	const max = Math.max(...values);
	const range = max - min || 1;

	const points = values.map((v, i) => {
		const x = padding + (i * (w - padding * 2)) / (values.length - 1 || 1);
		const y = padding + (h - padding * 2) * (1 - (v - min) / range);
		return { x, y };
	});

	const lineD = points
		.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
		.join(" ");

	const areaD = `${lineD} L ${points[points.length - 1]?.x ?? 0},${h - padding} L ${points[0]?.x ?? 0},${h - padding} Z`;

	const last = values[values.length - 1] ?? 0;
	const first = values[0] ?? 0;
	const delta = last - first;

	const deltaPct = first === 0 ? 0 : (delta / Math.abs(first)) * 100;
	const deltaIsPositive = delta >= 0;

	const safePct = clamp(deltaPct, -999, 999);

	return (
		<div className="rounded-xl border bg-background/60 p-4 shadow-sm">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-xs font-medium text-muted-foreground">
						Sales trend
					</p>
					<p className="mt-2 text-lg font-semibold">Last 30 days</p>
				</div>
				<span
					className={
						"rounded-md border px-2.5 py-1 text-xs font-medium " +
						(deltaIsPositive
							? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
							: "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20")
					}
				>
					{deltaIsPositive ? "▲" : "▼"} {safePct.toFixed(1)}%
				</span>
			</div>

			<div className="mt-4">
				<svg
					viewBox={`0 0 ${w} ${h}`}
					className="h-44 w-full"
					preserveAspectRatio="none"
					role="img"
					aria-label="Sales trend chart"
				>
					<defs>
						<linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={accent} stopOpacity="0.28" />
							<stop offset="100%" stopColor={accent} stopOpacity="0.02" />
						</linearGradient>
					</defs>

					{/* grid */}
					{[0.25, 0.5, 0.75].map((t) => {
						const y = padding + (h - padding * 2) * t;
						return (
							<line
								key={t}
								x1={padding}
								x2={w - padding}
								y1={y}
								y2={y}
								stroke="currentColor"
								strokeOpacity={0.08}
								strokeWidth={1}
							/>
						);
					})}

					{/* area */}
					<path d={areaD} fill="url(#area)" />

					{/* line */}
					<path
						d={lineD}
						fill="none"
						stroke={accent}
						strokeWidth={3}
						strokeLinecap="round"
					/>

					{/* points */}
					{points.map((p, i) => (
						<circle
							key={i}
							cx={p.x}
							cy={p.y}
							r={i === points.length - 1 ? 5 : 3}
							fill={accent}
							stroke="#fff"
							strokeWidth={2}
						/>
					))}

					{/* x labels */}
					{labels?.length
						? labels.map((lab, i) => {
								const idx = Math.round(
									(i * (values.length - 1)) / (labels.length - 1 || 1),
								);
								const p = points[idx];
								if (!p) return null;
								return (
									<text
										key={lab + i}
										x={p.x}
										y={h - padding + 14}
										textAnchor="middle"
										fontSize={11}
										fill="currentColor"
										fillOpacity={0.45}
									>
										{lab}
									</text>
								);
							})
						: null}
				</svg>
			</div>
		</div>
	);
}
