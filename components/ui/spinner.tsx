import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
	variants: {
		size: {
			xs: "w-3 h-3",
			sm: "w-4 h-4",
			md: "w-6 h-6",
			lg: "w-8 h-8",
			xl: "w-10 h-10",
			"2xl": "w-12 h-12",
		},
		variant: {
			default: "border-2 border-primary border-t-transparent",
			dots: "bg-gradient-to-r from-primary via-primary to-transparent",
			pulse: "border-4 border-secondary border-t-primary",
			gradient: "bg-gradient-conic from-primary via-secondary to-primary",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "default",
	},
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
	className?: string;
	label?: string;
}

export function Spinner({ size, variant, className, label }: SpinnerProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-3">
			{variant === "dots" ? (
				<div className={cn("flex gap-1", className)}>
					{[0, 1, 2].map((i) => (
						<div
							key={i}
							className={cn(
								"rounded-full bg-primary animate-pulse",
								size === "xs" && "w-1.5 h-1.5",
								size === "sm" && "w-2 h-2",
								size === "md" && "w-2.5 h-2.5",
								size === "lg" && "w-3 h-3",
								size === "xl" && "w-3.5 h-3.5",
								size === "2xl" && "w-4 h-4",
							)}
							style={{
								animationDelay: `${i * 150}ms`,
								opacity: 0.6 + i * 0.15,
							}}
						/>
					))}
				</div>
			) : (
				<div
					className={cn(
						spinnerVariants({ size, variant }),
						"rounded-full",
						className,
					)}
					role="status"
					aria-live="polite"
				/>
			)}
			{label && (
				<p className="text-sm text-muted-foreground animate-pulse">{label}</p>
			)}
		</div>
	);
}

// Centered Spinner Container
export function SpinnerContainer({
	children,
	isLoading,
	size = "lg",
	label,
	variant = "default",
}: {
	children?: React.ReactNode;
	isLoading: boolean;
	size?: VariantProps<typeof spinnerVariants>["size"];
	label?: string;
	variant?: VariantProps<typeof spinnerVariants>["variant"];
}) {
	if (!isLoading) {
		return <>{children}</>;
	}

	return (
		<div className="flex items-center justify-center min-h-[400px]">
			<Spinner size={size} label={label} variant={variant} />
		</div>
	);
}

// Loading Overlay
export function LoadingOverlay({
	isLoading,
	size = "lg",
	label = "Loading...",
	variant = "default",
}: {
	isLoading: boolean;
	size?: VariantProps<typeof spinnerVariants>["size"];
	label?: string;
	variant?: VariantProps<typeof spinnerVariants>["variant"];
}) {
	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-background border border-border rounded-lg p-8 shadow-lg">
				<Spinner size={size} label={label} variant={variant} />
			</div>
		</div>
	);
}
