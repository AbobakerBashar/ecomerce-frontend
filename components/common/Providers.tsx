"use client";

import { Toaster } from "sonner";
import QueryProvider from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider>
			<QueryProvider>{children}</QueryProvider>
			<Toaster position="top-center" />
		</ThemeProvider>
	);
};

export default Providers;
