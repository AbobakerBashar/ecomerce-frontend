// import { products } from "@/lib/data";
// import { notFound } from "next/navigation";

// import SingleProductPage from "@/components/collections/SingleProductPage";

// export default async function ProductRoute({
// 	params,
// }: {
// 	params: Promise<{ slug: string }>;
// }) {
// 	const { slug } = await params;

// 	const product = products.find((p) => p.slug === slug);
// 	if (!product) notFound();

// 	return <SingleProductPage product={product} />;
// }

const page = () => {
	return <div>page</div>;
};

export default page;
