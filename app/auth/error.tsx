"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function CollectionsError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex min-h-[60vh] items-center justify-center p-4">
			<Card className="mx-auto w-full max-w-md p-8 text-center">
				<div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
					<AlertTriangle className="size-8 text-destructive" />
				</div>
				<h1 className="text-2xl font-semibold tracking-tight">
					Failed to load products
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					{error.message ||
						"We couldn't fetch the product catalog. Please try again."}
				</p>
				<div className="mt-6 grid grid-cols-2 gap-3">
					<Link href="/">
						<Button
							variant="outline"
							className="cursor-pointer rounded-full w-full"
						>
							Go Home
						</Button>
					</Link>
					<Button
						onClick={() => reset()}
						className="cursor-pointer rounded-full px-8 w-full"
					>
						Try Again
					</Button>
				</div>
			</Card>
		</div>
	);
}
