"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function ProductDetailError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex min-h-[60vh] items-center justify-center p-4">
			<Card className="mx-auto max-w-md p-8 text-center">
				<div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-destructive/10">
					<AlertTriangle className="size-8 text-destructive" />
				</div>
				<h1 className="text-2xl font-semibold tracking-tight">
					Failed to load product
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					{error.message ||
						"We couldn't fetch the product details. Please try again."}
				</p>
				<div className="mt-6 flex items-center justify-center gap-3">
					<Link href="/collections">
						<Button variant="outline">Back to Collections</Button>
					</Link>
					<Button onClick={() => reset()}>Try Again</Button>
				</div>
			</Card>
		</div>
	);
}
