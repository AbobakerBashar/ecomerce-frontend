import AccountInfon from "@/components/dashboard/AccountInfon";
import OrdersSummary from "@/components/dashboard/OrdersSummary";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentOrders from "@/components/dashboard/RecentOrders";
import SavedAddresses from "@/components/dashboard/SavedAddresses";
import { getUserAction } from "@/lib/auth";
import { getAllOrders, getOrdersStats } from "@/lib/order";

export const revalidate = 0;

const loadData = async () => {
	try {
		const [recentOrders, stats, user] = await Promise.all([
			getAllOrders("", 5),
			getOrdersStats(),
			getUserAction(),
		]);
		return {
			stats: stats?.stats,
			orders: recentOrders?.orders,
			user: user?.user,
		};
	} catch (error) {
		console.log(error);
		return {};
	}
};

export default async function DashboardPage() {
	const { user, orders, stats } = await loadData();
	const addresses = user.addresses || [];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Welcome back
					{user?.name ? `, ${user.name}` : ""}! Here&apos;s an overview of your
					account.
				</p>
			</div>

			<OrdersSummary stats={stats} />

			<div className="grid gap-6 lg:grid-cols-3">
				<RecentOrders orders={orders} />

				<div className="space-y-4">
					<AccountInfon
						name={user.name}
						email={user.email}
						createdAt={user.createdAt}
					/>

					<SavedAddresses addresses={addresses} name={user.name} />
				</div>
			</div>

			<QuickActions />
		</div>
	);
}
