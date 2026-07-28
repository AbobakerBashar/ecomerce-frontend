import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Badge } from "../ui/badge";
import AddAddress from "./AddAddress";
import { useGetAddresses } from "@/hooks/address";
import { Spinner } from "../ui/spinner";
import type { AddressRes } from "@/types/user";
import { useState } from "react";
import EditAddress from "./EditAddress";

type Props = {
	isAdding: boolean;
	cancelAdding: () => void;
};

const AddressesContent = ({ isAdding, cancelAdding }: Props) => {
	const { data: addresses, isLoading } = useGetAddresses();
	const [editingAddress, setEditingAddress] = useState<AddressRes | null>(null);

	const cancelEditing = () => {
		setEditingAddress(null);
	};

	if (isLoading) return <Spinner label="Loading addresses..." />;

	return (
		<>
			{isAdding || editingAddress ? (
				editingAddress ? (
					<EditAddress address={editingAddress} cancelEditing={cancelEditing} />
				) : (
					<AddAddress handleCancel={cancelAdding} />
				)
			) : (
				<div className="grid gap-4 md:grid-cols-2">
					{(addresses || []).map((address: AddressRes, indx: number) => (
						<Card className="p-4" key={indx + address.street}>
							<div className="flex items-center justify-between gap-3">
								<p className="text-sm font-medium">{address.label}</p>
								{address.isDefault && (
									<Badge variant="secondary">Default</Badge>
								)}
							</div>
							<p className="mt-2 text-sm text-muted-foreground">
								{address.zip} {address.street}, {address.state}
							</p>
							<div className="mt-3">
								<Button
									size="sm"
									variant="outline"
									onClick={() => setEditingAddress(address)}
									className="cursor-pointer"
								>
									<Edit className="w-4 h-4" />
									Edit
								</Button>
							</div>
						</Card>
					))}
				</div>
			)}
		</>
	);
};

export default AddressesContent;
