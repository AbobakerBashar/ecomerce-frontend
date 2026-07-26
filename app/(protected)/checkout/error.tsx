"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function CheckoutError({
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
					Checkout error
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					{error.message ||
						"Something went wrong during checkout. Please try again."}
				</p>

				<div className="mt-6 grid grid-cols-2 gap-3">
					<Link href="/cart">
						<Button
							variant="outline"
							className="cursor-pointer rounded-full w-full"
						>
							Back to Cart
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
