import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
	return (
		<div className="space-y-4">
			<Card className="p-4">
				<h2 className="text-lg font-semibold">Edit Profile</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Update your name and email. (Demo-only form: no persistence in this
					repo.)
				</p>
			</Card>

			<Card className="p-4">
				<form className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2 md:col-span-1">
						<Label htmlFor="name">Full name</Label>
						<Input id="name" name="name" defaultValue="John Doe" />
					</div>

					<div className="space-y-2 md:col-span-1">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							defaultValue="john@example.com"
						/>
					</div>

					<div className="space-y-2 md:col-span-2">
						<Label htmlFor="bio">Bio</Label>
						<Input
							id="bio"
							name="bio"
							defaultValue="Premium shopper and sneaker enthusiast."
						/>
						<p className="text-xs text-muted-foreground">
							Replace this with a textarea if you want longer text.
						</p>
					</div>

					<div className="flex items-center justify-end gap-3 md:col-span-2">
						<Button type="button" variant="outline">
							Cancel
						</Button>
						<Button type="submit">Save changes</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
