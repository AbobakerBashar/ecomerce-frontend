import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AddressesPage() {
	return (
		<div className="space-y-4">
			<Card className="p-4">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
					<div>
						<h2 className="text-lg font-semibold">Addresses</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Saved shipping addresses (demo).
						</p>
					</div>

					<Button>
						<Link href="/dashboard/addresses/add" className="w-full">
							Add address
						</Link>
					</Button>
				</div>
			</Card>

			<div className="grid gap-4 md:grid-cols-2">
				<Card className="p-4">
					<div className="flex items-center justify-between gap-3">
						<p className="text-sm font-medium">Home</p>
						<Badge variant="secondary">Default</Badge>
					</div>
					<p className="mt-2 text-sm text-muted-foreground">
						123 Main St, Springfield
					</p>
					<div className="mt-3">
						<Button size="sm" variant="outline">
							<Link href="/dashboard/addresses/1/edit">Edit</Link>
						</Button>
					</div>
				</Card>

				<Card className="p-4">
					<div className="flex items-center justify-between gap-3">
						<p className="text-sm font-medium">Work</p>
						<Badge variant="outline">Backup</Badge>
					</div>
					<p className="mt-2 text-sm text-muted-foreground">
						456 Market Rd, Springfield
					</p>
					<div className="mt-3">
						<Button size="sm" variant="outline">
							<Link href="/dashboard/addresses/2/edit">Edit</Link>
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
