import { notFound } from "next/navigation";

import SingleProductPage from "@/components/collections/SingleProductPage";
import { getProductBySlug } from "@/lib/product";
import { FullProduct } from "@/types/product";
import type { Metadata } from "next";
import SimilarProducts from "@/components/collections/SimilarProducts";

type Props = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;

	const product = await getProduct(slug);

	if (!product) notFound();

	return {
		title: `${product.name}`,
		description: product.description,

		openGraph: {
			title: product.name,
			description: product.description,
			images: [
				{
					url: product.images[0],
					width: 800,
					height: 800,
					alt: product.name,
				},
			],
		},

		twitter: {
			card: "summary_large_image",
			title: product.name,
			description: product.description,
			images: [product.images[0]],
		},
	};
}

const getProduct = async (slug: string): Promise<FullProduct | null> => {
	try {
		const res = await getProductBySlug(slug);
		return res.product;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default async function ProductRoute({ params }: Props) {
	const { slug } = await params;

	const product = await getProduct(slug);

	if (!product) notFound();

	return (
		<SingleProductPage product={product}>
			<SimilarProducts categoryId={product.category.id} />
		</SingleProductPage>
	);
}
