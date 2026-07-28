"use client";

import AddressesContent from "@/components/dashboard/AddressesContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function AddressesPage() {
	const [isAdding, setIsAdding] = useState(false);

	const cancelAdding = () => {
		setIsAdding(false);
	};

	return (
		<div className="space-y-4">
			{!isAdding && (
				<Card className="p-4">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
						<div>
							<h2 className="text-lg font-semibold">Addresses</h2>
							<p className="mt-1 text-sm text-muted-foreground">
								Saved shipping addresses.
							</p>
						</div>

						<Button
							onClick={() => setIsAdding(true)}
							className="cursor-pointer"
						>
							Add address
						</Button>
					</div>
				</Card>
			)}

			<AddressesContent isAdding={isAdding} cancelAdding={cancelAdding} />
		</div>
	);
}
