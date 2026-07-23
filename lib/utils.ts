import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateSKU = (text: string) => {
	if (!text) return "";
	const parts = text.split(" ").filter(Boolean);
	const prefix = parts
		.slice(0, 2)
		.map((p) => p.substring(0, 3).toUpperCase())
		.join("-");
	return prefix ? `${prefix}-001` : "";
};

export function formatDate(dateStr: string) {
	try {
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		}).format(new Date(dateStr));
	} catch {
		return dateStr;
	}
}
