import AuthImage from "@/components/auth/AuthImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Account",
	description: "Account pages",
};

export default function AuthLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="h-screen bg-background grid md:grid-cols-2 gap-4">
			<AuthImage />
			{children}
		</div>
	);
}
