import Collections from "@/components/home/Collections";
import HeroSection from "@/components/home/Hero";
import Contact from "@/components/home/Contact";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SocialProof from "@/components/home/SocialProof";
import ShopByCategory from "@/components/home/ShopByCategory";
import NewArrivals from "@/components/home/NewArrivals";
import UGC from "@/components/home/UGC";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
	return (
		<div className="space-y-24 pb-24">
			<HeroSection />
			<SocialProof />

			<Suspense fallback={<Spinner size="lg" label="Loading categories..." />}>
				<ShopByCategory />
			</Suspense>

			<Suspense
				fallback={<Spinner size="lg" label="Loading featured products..." />}
			>
				<FeaturedProducts />
			</Suspense>

			<Suspense
				fallback={<Spinner size="lg" label="Loading new arrival products..." />}
			>
				<NewArrivals />
			</Suspense>

			<Collections />

			<UGC />

			<Contact />
		</div>
	);
}
