import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MapPinned, Settings, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const QuickActions = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
					<QuickActionButton
						icon={<Store className="size-5" />}
						label="Continue Shopping"
						href="/"
					/>
					<QuickActionButton
						icon={<FileText className="size-5" />}
						label="View Orders"
						href="/dashboard/orders"
					/>
					<QuickActionButton
						className="col-span-2"
						icon={<Settings className="size-5" />}
						label="Edit Profile / Change Password"
						href="/dashboard/settings"
					/>
					<QuickActionButton
						icon={<MapPinned className="size-5" />}
						label="Manage Addresses"
						href="/dashboard/addresses"
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default QuickActions;

function QuickActionButton({
	icon,
	label,
	href,
	className,
}: {
	icon: React.ReactNode;
	label: string;
	href: string;
	className?: string;
}) {
	return (
		<Link href={href} className={className}>
			<Button
				variant="outline"
				className="h-auto w-full flex-col gap-2 py-4 cursor-pointer"
			>
				<div className="text-muted-foreground">{icon}</div>
				<span className="text-xs font-medium">{label}</span>
			</Button>
		</Link>
	);
}
