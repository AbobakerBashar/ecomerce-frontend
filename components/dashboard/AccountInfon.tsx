import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { Calendar, Mail, Phone, User } from "lucide-react";

type Props = {
	name: string;
	email: string;
	createdAt: string;
};

const AccountInfon = ({ name, email, createdAt }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Account Information</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<InfoRow icon={<User className="size-4" />} label="Name" value={name} />
				<Separator />
				<InfoRow
					icon={<Mail className="size-4" />}
					label="Email"
					value={email}
				/>
				<Separator />
				<InfoRow
					icon={<Phone className="size-4" />}
					label="Phone"
					value="+1 (555) 123-4567"
				/>
				<Separator />
				<InfoRow
					icon={<Calendar className="size-4" />}
					label="Joined"
					value={createdAt ? formatDate(createdAt) : "January 2026"}
				/>
			</CardContent>
		</Card>
	);
};

export default AccountInfon;

function InfoRow({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) {
	return (
		<div className="flex items-center gap-3">
			<div className="shrink-0 text-muted-foreground">{icon}</div>
			<div className="min-w-0">
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="truncate text-sm font-medium">{value}</p>
			</div>
		</div>
	);
}
