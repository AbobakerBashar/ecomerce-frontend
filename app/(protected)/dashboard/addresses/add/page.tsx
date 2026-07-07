import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddAddressPage() {
	return (
		<div className="space-y-4">
			<Card className="p-4">
				<h2 className="text-lg font-semibold">Add Address</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Add a new shipping address. (Demo-only form: no persistence in this
					repo.)
				</p>
			</Card>

			<Card className="p-4">
				<form className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="label">Label</Label>
							<Input id="label" name="label" defaultValue="Apartment" />
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Phone</Label>
							<Input id="phone" name="phone" defaultValue="+1 (555) 123-4567" />
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="line1">Address line 1</Label>
						<Input id="line1" name="line1" defaultValue="789 Sunset Blvd" />
					</div>

					<div className="space-y-2">
						<Label htmlFor="line2">Address line 2 (optional)</Label>
						<Input id="line2" name="line2" defaultValue="Suite 4B" />
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						<div className="space-y-2">
							<Label htmlFor="city">City</Label>
							<Input id="city" name="city" defaultValue="Springfield" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="state">State</Label>
							<Input id="state" name="state" defaultValue="IL" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="zip">ZIP</Label>
							<Input id="zip" name="zip" defaultValue="62704" />
						</div>
					</div>

					<div className="flex items-center justify-end gap-3">
						<Button type="button" variant="outline">
							Cancel
						</Button>
						<Button type="submit">Add address</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
