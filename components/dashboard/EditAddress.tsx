import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditAddress } from "@/hooks/address";
import type { AddressRes } from "@/types/user";
import axios from "axios";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Switch } from "../ui/switch";

type Props = {
	address: AddressRes;
	cancelEditing: () => void;
};

export default function EditAddress({ address, cancelEditing }: Props) {
	const [editingAddress, setEditingAddress] = useState<AddressRes>({
		label: address.label,
		phone: address.phone,
		street: address.street,
		city: address.city,
		state: address.state,
		zip: address.zip,
		country: address.country,
		isDefault: address.isDefault,
	});

	const [errors, setErrors] = useState<Partial<
		Record<keyof AddressRes, string>
	> | null>(null);
	const [internalErr, setInternalErr] = useState("");

	const { mutateAsync: edit, isPending: isEdting } = useEditAddress();

	const handleEditing = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await edit({ address: editingAddress, id: address.id || "" });
			if (res.success) {
				cancelEditing();
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response?.data?.errors)
					setErrors(error.response?.data?.errors);
				else setInternalErr(error.response?.data?.message);
			} else {
				setInternalErr("Interal error, Please try again later");
			}
		}
	};

	return (
		<div className="space-y-4">
			<Card className="p-4">
				<h2 className="text-lg font-semibold">Edit Address</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Editing address <span className="font-medium">{address.id}</span>.
				</p>
			</Card>

			<Card className="p-4">
				<form className="space-y-4" onSubmit={handleEditing}>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="label">Label</Label>
							<Select
								id="label"
								value={address.label}
								onValueChange={(val) =>
									setEditingAddress((address) =>
										val
											? {
													...address,
													label: val,
												}
											: { ...address },
									)
								}
							>
								<SelectTrigger className="w-full">
									{address.label}
								</SelectTrigger>
								<SelectContent className="w-full p-2">
									<SelectItem value="Home">Home</SelectItem>
									<SelectItem value="Work">Work</SelectItem>
									<SelectItem value="Other">Other</SelectItem>
								</SelectContent>
							</Select>
							{errors?.label && (
								<p className="text-destructive">{errors.label}</p>
							)}
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone">Phone</Label>
							<Input
								id="phone"
								name="phone"
								placeholder="+1 (555) 000-1111"
								value={editingAddress.phone}
								onChange={(e) =>
									setEditingAddress((address) => ({
										...address,
										[e.target.name]: e.target.value,
									}))
								}
							/>
							{errors?.phone && (
								<p className="text-destructive">{errors.phone}</p>
							)}
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="country">Country</Label>
							<Input
								id="street"
								name="country"
								placeholder="123 Main St"
								value={editingAddress.country}
								onChange={(e) =>
									setEditingAddress((address) => ({
										...address,
										[e.target.name]: e.target.value,
									}))
								}
							/>
							{errors?.street && (
								<p className="text-destructive">{errors.street}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="street">Street</Label>
							<Input
								id="street"
								name="street"
								placeholder="123 Main St"
								value={editingAddress.street}
								onChange={(e) =>
									setEditingAddress((address) => ({
										...address,
										[e.target.name]: e.target.value,
									}))
								}
							/>
							{errors?.street && (
								<p className="text-destructive">{errors.street}</p>
							)}
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						<div className="space-y-2">
							<Label htmlFor="city">City</Label>
							<Input
								id="city"
								name="city"
								placeholder="Springfield"
								value={editingAddress.city}
								onChange={(e) =>
									setEditingAddress((address) => ({
										...address,
										[e.target.name]: e.target.value,
									}))
								}
							/>
							{errors?.city && (
								<p className="text-destructive">{errors.city}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="state">State</Label>
							<Input
								id="state"
								name="state"
								placeholder="IL"
								value={editingAddress.state}
								onChange={(e) =>
									setEditingAddress((address) => ({
										...address,
										[e.target.name]: e.target.value,
									}))
								}
							/>
							{errors?.state && (
								<p className="text-destructive">{errors.state}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="zip">ZIP</Label>
							<Input
								id="zip"
								name="zip"
								placeholder="62704"
								value={editingAddress.zip}
								onChange={(e) =>
									setEditingAddress((address) => ({
										...address,
										[e.target.name]: e.target.value,
									}))
								}
							/>
							{errors?.zip && <p className="text-destructive">{errors.zip}</p>}
						</div>
						<Label>
							<Switch
								name="isDefault"
								className="w-16 h-16 cursor-pointer"
								checked={editingAddress.isDefault}
								onCheckedChange={(checked) =>
									setEditingAddress((address) => ({
										...address,
										isDefault: checked,
									}))
								}
							/>
							Set as default
						</Label>
					</div>
					{internalErr && (
						<p className="my-2 text-destructive">{internalErr}</p>
					)}
					<div className="mt-8 flex justify-center gap-3 w-full max-w-md mx-auto">
						<Button
							onClick={cancelEditing}
							type="button"
							variant="outline"
							disabled={isEdting}
							className="cursor-pointer flex-1"
						>
							Cancel
						</Button>
						<Button
							className="cursor-pointer flex-1"
							type="submit"
							disabled={isEdting}
						>
							{isEdting ? (
								<>
									<Loader className="w-4 h-4 animate-spin" />
									Edting...
								</>
							) : (
								"Save address"
							)}
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
