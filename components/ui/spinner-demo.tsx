"use client";

import { Spinner, SpinnerContainer, LoadingOverlay } from "./spinner";

export function SpinnerDemo() {
	return (
		<div className="space-y-12 p-8">
			<div>
				<h2 className="text-2xl font-bold mb-6">Spinner Variants</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div className="flex flex-col items-center gap-4">
						<Spinner variant="default" size="lg" />
						<p className="text-sm text-muted-foreground">Default</p>
					</div>
					<div className="flex flex-col items-center gap-4">
						<Spinner variant="dots" size="lg" />
						<p className="text-sm text-muted-foreground">Dots</p>
					</div>
					<div className="flex flex-col items-center gap-4">
						<Spinner variant="pulse" size="lg" />
						<p className="text-sm text-muted-foreground">Pulse</p>
					</div>
					<div className="flex flex-col items-center gap-4">
						<Spinner variant="gradient" size="lg" />
						<p className="text-sm text-muted-foreground">Gradient</p>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-6">Sizes</h2>
				<div className="flex items-center gap-8">
					<div className="flex flex-col items-center gap-2">
						<Spinner size="xs" />
						<p className="text-xs text-muted-foreground">XS</p>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Spinner size="sm" />
						<p className="text-xs text-muted-foreground">SM</p>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Spinner size="md" />
						<p className="text-xs text-muted-foreground">MD</p>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Spinner size="lg" />
						<p className="text-xs text-muted-foreground">LG</p>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Spinner size="xl" />
						<p className="text-xs text-muted-foreground">XL</p>
					</div>
					<div className="flex flex-col items-center gap-2">
						<Spinner size="2xl" />
						<p className="text-xs text-muted-foreground">2XL</p>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-6">With Labels</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
					<Spinner size="lg" label="Loading..." />
					<Spinner size="lg" variant="dots" label="Processing..." />
					<Spinner size="lg" variant="pulse" label="Syncing..." />
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-bold mb-6">Container</h2>
				<div className="border border-border rounded-lg p-8">
					<SpinnerContainer isLoading={true} label="Loading your data..." />
				</div>
			</div>
		</div>
	);
}
