import Collections from "@/components/home/Collections";
import HeroSection from "@/components/home/Hero";
import Contact from "@/components/home/Contact";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SocialProof from "@/components/home/SocialProof";
import ShopByCategory from "@/components/home/ShopByCategory";
import NewArrivals from "@/components/home/NewArrivals";
import UGC from "@/components/home/UGC";

export default function Home() {
	return (
		<div className="space-y-24 pb-24">
			<HeroSection />
			<SocialProof />
			<ShopByCategory />
			<FeaturedProducts />
			<NewArrivals />
			<Collections />
			<UGC />
			<Contact />
		</div>
	);
}
