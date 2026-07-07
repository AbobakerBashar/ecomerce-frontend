import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen">
			<Header />
			<main className="min-h-screen px-4 md:px-8 pt-24">{children}</main>
			<Footer />
		</div>
	);
};

export default PublicLayout;
