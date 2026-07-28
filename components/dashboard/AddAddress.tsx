import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddAddress } from "@/hooks/address";
import type { AddressInput } from "@/types/user";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Switch } from "../ui/switch";

type Props = {
	handleCancel: () => void;
};

const AddAddress = ({ handleCancel }: Props) => {
	const [address, setAddress] = useState<AddressInput>({
		label: "Home",
		phone: "",
		street: "",
		city: "",
		state: "",
		zip: "",
		country: "",
		isDefault: false,
	});

	const [errors, setErrors] = useState<Partial<
		Record<keyof AddressInput, string>
	> | null>(null);
	const [internalErr, setInternalErr] = useState("");

	const { mutateAsync: addAddress, isPending: isAdding } = useAddAddress();

	const handleAdd = async (e: React.FormEvent) => {
		e.preventDefault();
		if (isAdding) return;

		try {
			const res = await addAddress(address);
			if (res.success) {
				handleCancel();
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
		<section className="space-y-4">
			<Card className="p-4">
				<h2 className="text-lg font-semibold">Add Address</h2>
				<p className="mt-1 text-sm text-muted-foreground">
					Add a new shipping address. (Demo-only form: no persistence in this
					repo.)
				</p>
			</Card>

			<Card className="p-4">
				<form className="space-y-4" onSubmit={handleAdd}>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<Label htmlFor="label">Label</Label>
							<Select
								id="label"
								value={address.label}
								onValueChange={(val) =>
									setAddress((address) =>
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
								placeholder="+1 (555) 123-4567"
								value={address.phone}
								onChange={(e) =>
									setAddress((address) => ({
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
					<div className="grid">
						<div className="space-y-2">
							<Label htmlFor="country">Country</Label>
							<Input
								id="street"
								name="country"
								placeholder="123 Main St"
								value={address.country}
								onChange={(e) =>
									setAddress((address) => ({
										...address,
										[e.target.name]: e.target.value,
									}))
								}
							/>
							{errors?.street && (
								<p className="text-destructive">{errors.country}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="street">Street</Label>
							<Input
								id="street"
								name="street"
								placeholder="789 Sunset Blvd"
								value={address.street}
								onChange={(e) =>
									setAddress((address) => ({
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
								value={address.city}
								onChange={(e) =>
									setAddress((address) => ({
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
								value={address.state}
								onChange={(e) =>
									setAddress((address) => ({
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
								value={address.zip}
								onChange={(e) =>
									setAddress((address) => ({
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
								checked={address.isDefault}
								onCheckedChange={(checked) =>
									setAddress((address) => ({
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
							onClick={handleCancel}
							type="button"
							variant="outline"
							disabled={isAdding}
							className="cursor-pointer flex-1"
						>
							Cancel
						</Button>
						<Button
							className="cursor-pointer flex-1"
							type="submit"
							disabled={isAdding}
						>
							{isAdding ? (
								<>
									<Loader className="w-4 h-4 animate-spin" />
									Adding...
								</>
							) : (
								"Add address"
							)}
						</Button>
					</div>
				</form>
			</Card>
		</section>
	);
};

export default AddAddress;
