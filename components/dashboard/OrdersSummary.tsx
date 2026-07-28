import { CheckCircle2, Package, Truck } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type Props = {
	stats: { count: number; inProgress: number; completed: number };
};

const OrdersSummary = ({ stats }: Props) => {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<SummaryCard
				icon={<Package className="size-5" />}
				label="Total Orders"
				value={stats?.count}
				iconBg="bg-blue-500/10"
				iconColor="text-blue-600 dark:text-blue-400"
			/>
			<SummaryCard
				icon={<Truck className="size-5" />}
				label="In Progress"
				value={stats.inProgress}
				iconBg="bg-amber-500/10"
				iconColor="text-amber-600 dark:text-amber-400"
			/>
			<SummaryCard
				icon={<CheckCircle2 className="size-5" />}
				label="Completed"
				value={stats.completed}
				iconBg="bg-emerald-500/10"
				iconColor="text-emerald-600 dark:text-emerald-400"
			/>
			{/* <SummaryCard
				icon={<Heart className="size-5" />}
				label="Wishlist Items"
				value={stats.wishlistCount}
				iconBg="bg-rose-500/10"
				iconColor="text-rose-600 dark:text-rose-400"
			/> */}
		</div>
	);
};

export default OrdersSummary;

function SummaryCard({
	icon,
	label,
	value,
	iconBg,
	iconColor,
}: {
	icon: React.ReactNode;
	label: string;
	value: number;
	iconBg: string;
	iconColor: string;
}) {
	return (
		<Card>
			<CardContent className="flex items-start gap-4 p-4">
				<div
					className={`flex size-11 shrink-0 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
				>
					{icon}
				</div>
				<div className="min-w-0">
					<p className="text-xs text-muted-foreground">{label}</p>
					<p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
				</div>
			</CardContent>
		</Card>
	);
}
