"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, SunMedium } from "lucide-react";

const ThemeToggle = ({
	className,
	label,
	size,
}: {
	className?: string;
	label?: string;
	size?: "sm" | "lg";
}) => {
	const { theme, setTheme, systemTheme } = useTheme();

	const resolvedTheme = theme === "system" ? systemTheme : theme;
	const isDark = resolvedTheme === "dark";

	return (
		<Button
			size={size || "sm"}
			className={className || ""}
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label="Toggle theme"
		>
			{isDark ? (
				<SunMedium className="h-4 w-4" />
			) : (
				<Moon className="h-4 w-4" />
			)}
			{label}
		</Button>
	);
};

export default ThemeToggle;
