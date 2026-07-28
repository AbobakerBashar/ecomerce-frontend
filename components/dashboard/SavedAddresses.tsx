import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressRes } from "@/types/user";
import { MapPin, Pencil } from "lucide-react";
import Link from "next/link";

type Props = {
	addresses: AddressRes[];
	name: string;
};

const SavedAddresses = ({ addresses, name }: Props) => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Saved Addresses</CardTitle>
					<Link href="/dashboard/addresses">
						<Button variant="outline" size="xs" className="cursor-pointer">
							<Pencil className="size-3 mr-1" />
							Edit
						</Button>
					</Link>
				</div>
			</CardHeader>
			<CardContent>
				{addresses.map((ad) => (
					<div key={ad.id} className="flex gap-3">
						<div className="mt-0.5 shrink-0 text-muted-foreground">
							<MapPin className="size-4" />
						</div>
						<div className="space-y-1 text-sm">
							<p className="font-medium">{name}</p>
							<p className="text-muted-foreground">
								{ad.street}
								<br />
								{ad.city}
								<br />
								{ad.country}
							</p>
							<p className="text-muted-foreground">Phone: {ad.phone}</p>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};

export default SavedAddresses;
