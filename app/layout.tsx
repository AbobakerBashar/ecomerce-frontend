import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/common/Providers";
import { Suspense } from "react";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist",
});

export const metadata: Metadata = {
	title: "E-Commerce App",
	description: "E-Commerce App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${geist.className} h-full antialiased`}
		>
			<body>
				<Suspense>
					<Providers>{children}</Providers>
				</Suspense>
			</body>
		</html>
	);
}
