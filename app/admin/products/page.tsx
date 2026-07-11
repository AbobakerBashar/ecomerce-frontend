import AdminProductForm from "@/components/admin/products/AdminProductForm";

export default function AdminAddProductPage() {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">Add Product</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Create a new product listing.
				</p>
			</div>

			<AdminProductForm />
		</div>
	);
}
