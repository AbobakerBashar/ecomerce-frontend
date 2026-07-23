import { Search } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

type Props = {
	updateQuery: (value: string) => void;
	searchQ: string;
};

const OrdersHerder = ({ updateQuery, searchQ }: Props) => {
	const [searchQuery, setSearchQuery] = useState(searchQ);

	useEffect(() => {
		const timer = setTimeout(() => updateQuery(searchQuery.trim()), 500);

		return () => clearTimeout(timer);
	}, [searchQuery, updateQuery]);

	useEffect(() => {
		// eslint-disable-next-line
		setSearchQuery(searchQ);
	}, [searchQ]);

	return (
		<Card className="p-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="text-lg font-semibold">Orders</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Track and manage your purchase history.
					</p>
				</div>
				<div className="relative w-full sm:w-64">
					<Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search by order ID..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-8"
					/>
				</div>
			</div>
		</Card>
	);
};

export default OrdersHerder;
