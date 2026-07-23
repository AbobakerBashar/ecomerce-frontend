import { OrderStatus } from "@/types/order";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const tabs: { value: OrderStatus | "all"; label: string }[] = [
	{ value: "all", label: "All" },
	{ value: "pending", label: "Pending" },
	{ value: "processing", label: "Processing" },
	{ value: "shipped", label: "Shipped" },
	{ value: "delivered", label: "Delivered" },
	{ value: "cancelled", label: "Cancelled" },
];

type Props = {
	updateActiveTab: (value: OrderStatus | "all") => void;
	activeTab: string;
};

const OrdersTabs = ({ updateActiveTab, activeTab }: Props) => {
	return (
		<Tabs value={activeTab} onValueChange={updateActiveTab}>
			<TabsList className="w-full flex-wrap h-auto">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.value}
						value={tab.value}
						className="flex-1 cursor-pointer"
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	);
};

export default OrdersTabs;
