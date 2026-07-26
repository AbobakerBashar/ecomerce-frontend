import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function GlobalNotFound() {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className="mx-auto max-w-md p-8 text-center">
				<div className="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
					<span className="text-4xl font-bold text-muted-foreground">404</span>
				</div>
				<h1 className="text-2xl font-semibold tracking-tight">
					Page not found
				</h1>
				<p className="mt-2 text-sm text-muted-foreground">
					The page you&apos;re looking for doesn&apos;t exist or has been moved.
				</p>
				<div className="mt-6 grid grid-cols-2 gap-3">
					<Link href="/">
						<Button
							variant="default"
							className="cursor-pointer w-full rounded-full"
						>
							Go Home
						</Button>
					</Link>
					<Link href="/collections">
						<Button
							variant="outline"
							className="cursor-pointer w-full rounded-full"
						>
							View Collections
						</Button>
					</Link>
				</div>
			</Card>
		</div>
	);
}
