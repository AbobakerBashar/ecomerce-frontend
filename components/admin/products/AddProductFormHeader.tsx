import { Layers3, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AddProductFormHeader = ({ progress }: { progress: number }) => {
	return (
		<header className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
					Product Studio
				</p>
				<h2 className="mt-1 text-xl font-semibold tracking-tight">
					Create Product Listing
				</h2>
			</div>
			<div className="flex items-center gap-2">
				<Badge variant="outline" className="rounded-full px-3 py-1">
					<Layers3 className="mr-1 size-3.5" />
					Admin Form
				</Badge>
				<Badge className="rounded-full px-3 py-1">
					<Sparkles className="mr-1 size-3.5" />
					{progress}% Complete
				</Badge>
			</div>
		</header>
	);
};

export default AddProductFormHeader;
