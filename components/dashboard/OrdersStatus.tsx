import type { Order } from "@/types/order";
import { useMemo } from "react";
import { Card } from "../ui/card";
import { CheckCircle2, Clock, Package, XCircle } from "lucide-react";

type Props = {
	orders: Order[];
};

const OrdersStatus = ({ orders }: Props) => {
	const stats = useMemo(() => {
		return {
			total: orders.length,
			processing: orders.filter((o) => o.orderStatus === "processing").length,
			delivered: orders.filter((o) => o.orderStatus === "delivered").length,
			cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
		};
	}, [orders]);

	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			<StatCard
				label="Total Orders"
				value={stats.total}
				icon={<Package className="size-4" />}
				color="text-blue-600 dark:text-blue-400"
			/>
			<StatCard
				label="Processing"
				value={stats.processing}
				icon={<Clock className="size-4" />}
				color="text-amber-600 dark:text-amber-400"
			/>
			<StatCard
				label="Delivered"
				value={stats.delivered}
				icon={<CheckCircle2 className="size-4" />}
				color="text-green-600 dark:text-green-400"
			/>
			<StatCard
				label="Cancelled"
				value={stats.cancelled}
				icon={<XCircle className="size-4" />}
				color="text-red-600 dark:text-red-400"
			/>
		</div>
	);
};

export default OrdersStatus;

function StatCard({
	label,
	value,
	icon,
	color,
}: {
	label: string;
	value: number;
	icon: React.ReactNode;
	color: string;
}) {
	return (
		<Card className="p-4">
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">{label}</p>
				<span className={color}>{icon}</span>
			</div>
			<p className="mt-2 text-2xl font-semibold">{value}</p>
		</Card>
	);
}
