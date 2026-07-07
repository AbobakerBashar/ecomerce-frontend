import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardOverviewPage() {
	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<Card className="p-4">
					<p className="text-sm text-muted-foreground">Total Orders</p>
					<p className="mt-2 text-2xl font-semibold">12</p>
					<Badge variant="secondary" className="mt-2">
						This year
					</Badge>
				</Card>
				<Card className="p-4">
					<p className="text-sm text-muted-foreground">In Transit</p>
					<p className="mt-2 text-2xl font-semibold">3</p>
					<Badge variant="secondary" className="mt-2">
						Fast shipping
					</Badge>
				</Card>
				<Card className="p-4">
					<p className="text-sm text-muted-foreground">Saved Addresses</p>
					<p className="mt-2 text-2xl font-semibold">2</p>
					<Badge variant="secondary" className="mt-2">
						Home + Work
					</Badge>
				</Card>
				<Card className="p-4">
					<p className="text-sm text-muted-foreground">Account Tier</p>
					<p className="mt-2 text-2xl font-semibold">Silver</p>
					<Badge variant="secondary" className="mt-2">
						Member
					</Badge>
				</Card>
			</div>

			<Card className="p-4">
				<Tabs defaultValue="recent">
					<TabsList>
						<TabsTrigger value="recent">Recent</TabsTrigger>
						<TabsTrigger value="summary">Summary</TabsTrigger>
					</TabsList>

					<TabsContent value="recent" className="mt-4">
						<div className="grid gap-3 sm:grid-cols-2">
							<Card className="p-3">
								<p className="text-sm font-medium">Order #1042</p>
								<p className="mt-1 text-xs text-muted-foreground">
									Placed 2 days ago
								</p>
								<div className="mt-2 flex items-center gap-2">
									<Badge>Processing</Badge>
									<Badge variant="outline">ETA 3-5 days</Badge>
								</div>
							</Card>
							<Card className="p-3">
								<p className="text-sm font-medium">Order #1029</p>
								<p className="mt-1 text-xs text-muted-foreground">
									Placed 1 week ago
								</p>
								<div className="mt-2 flex items-center gap-2">
									<Badge variant="secondary">Delivered</Badge>
									<Badge variant="outline">Thanks!</Badge>
								</div>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="summary" className="mt-4">
						<div className="space-y-3">
							<div className="flex items-center justify-between gap-4">
								<p className="text-sm text-muted-foreground">Account Status</p>
								<Badge variant="secondary">Active</Badge>
							</div>
							<div className="flex items-center justify-between gap-4">
								<p className="text-sm text-muted-foreground">
									Refund Eligibility
								</p>
								<Badge variant="secondary">Within 30 days</Badge>
							</div>
							<div className="flex items-center justify-between gap-4">
								<p className="text-sm text-muted-foreground">
									Loyalty Progress
								</p>
								<Badge variant="outline">65%</Badge>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</Card>
		</div>
	);
}
