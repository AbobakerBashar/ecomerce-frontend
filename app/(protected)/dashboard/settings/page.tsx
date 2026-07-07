import { Card } from "@/components/ui/card";

export default function SettingsPage() {
	return (
		<div className="space-y-4">
			<Card className="p-4">
				<h2 className="text-lg font-semibold">Settings</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Profile and preferences (demo).
				</p>
			</Card>

			<Card className="p-4">
				<div className="space-y-2">
					<p className="text-sm font-medium">Profile</p>
					<p className="text-sm text-muted-foreground">
						This project has no backend/auth integration. Wire these fields to
						your data layer when you add persistence.
					</p>
				</div>
			</Card>
		</div>
	);
}
