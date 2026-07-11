# Spinner Component

A beautiful, customizable loading spinner component for your Next.js application with multiple variants and sizes.

## Features

- ✨ **Multiple Variants**: Default, Dots, Pulse, and Gradient animations
- 📏 **6 Size Options**: XS, SM, MD, LG, XL, 2XL
- 🎨 **Theme Support**: Automatically uses your theme colors
- ♿ **Accessible**: Includes ARIA attributes for screen readers
- 🚀 **Performance**: CSS animations for smooth 60fps rendering
- 📦 **Flexible**: Can be used standalone or with containers

## Components

### `Spinner`

The base spinner component.

```tsx
import { Spinner } from "@/components/ui/spinner";

export function MyComponent() {
	return <Spinner variant="default" size="lg" label="Loading..." />;
}
```

**Props:**

- `variant`: `'default' | 'dots' | 'pulse' | 'gradient'` (default: `'default'`)
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` (default: `'md'`)
- `label`: `string` - Optional loading text
- `className`: `string` - Additional CSS classes

### `SpinnerContainer`

Wrapper that shows spinner during loading, content otherwise.

```tsx
import { SpinnerContainer } from "@/components/ui/spinner";

export function MyComponent() {
	const [isLoading, setIsLoading] = useState(true);

	return (
		<SpinnerContainer isLoading={isLoading} size="lg" label="Fetching data...">
			<YourContent />
		</SpinnerContainer>
	);
}
```

**Props:**

- `isLoading`: `boolean` - Show spinner when true
- `children`: `React.ReactNode` - Content to show when not loading
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` (default: `'lg'`)
- `label`: `string` - Optional loading text
- `variant`: `'default' | 'dots' | 'pulse' | 'gradient'` (default: `'default'`)

### `LoadingOverlay`

Full-screen loading overlay with blur background.

```tsx
import { LoadingOverlay } from "@/components/ui/spinner";

export function MyComponent() {
	const [isLoading, setIsLoading] = useState(false);

	return (
		<>
			<button onClick={() => setIsLoading(true)}>Start Loading</button>
			<LoadingOverlay isLoading={isLoading} label="Processing..." />
		</>
	);
}
```

**Props:**

- `isLoading`: `boolean` - Show overlay when true
- `label`: `string` (default: `'Loading...'`)
- `size`: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'` (default: `'lg'`)
- `variant`: `'default' | 'dots' | 'pulse' | 'gradient'` (default: `'default'`)

## Variants

### Default

Classic rotating spinner with transparent top border.

```tsx
<Spinner variant="default" />
```

### Dots

Three animated dots with staggered animation.

```tsx
<Spinner variant="dots" />
```

### Pulse

Pulsing animation with gradient effect.

```tsx
<Spinner variant="pulse" />
```

### Gradient

Smooth gradient conic animation.

```tsx
<Spinner variant="gradient" />
```

## Sizes

All components support 6 sizes:

```tsx
<Spinner size="xs" />   {/* 12px */}
<Spinner size="sm" />   {/* 16px */}
<Spinner size="md" />   {/* 24px */}
<Spinner size="lg" />   {/* 32px */}
<Spinner size="xl" />   {/* 40px */}
<Spinner size="2xl" />  {/* 48px */}
```

## Usage Examples

### Simple Spinner

```tsx
import { Spinner } from "@/components/ui/spinner";

export function LoadingIndicator() {
	return <Spinner />;
}
```

### With Loading State

```tsx
import { SpinnerContainer } from "@/components/ui/spinner";
import { useState, useEffect } from "react";

export function ProductsList() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchProducts().then((products) => {
			setProducts(products);
			setLoading(false);
		});
	}, []);

	return (
		<SpinnerContainer isLoading={loading} label="Loading products...">
			<div className="grid gap-4">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</SpinnerContainer>
	);
}
```

### Full Screen Overlay

```tsx
import { LoadingOverlay } from "@/components/ui/spinner";
import { useState } from "react";

export function CheckoutForm() {
	const [processing, setProcessing] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);

		try {
			await submitOrder();
		} finally {
			setProcessing(false);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>{/* form fields */}</form>
			<LoadingOverlay isLoading={processing} label="Processing payment..." />
		</>
	);
}
```

### Different Variants for Different States

```tsx
import { Spinner } from "@/components/ui/spinner";

export function DataFetcher() {
	const [state, setState] = useState("idle");

	if (state === "fetching") {
		return <Spinner variant="dots" size="lg" label="Fetching..." />;
	}

	if (state === "processing") {
		return <Spinner variant="pulse" size="lg" label="Processing..." />;
	}

	if (state === "syncing") {
		return <Spinner variant="gradient" size="lg" label="Syncing..." />;
	}

	return null;
}
```

## Customization

### Custom Colors

The spinner uses your theme's primary and secondary colors. Modify via CSS variables:

```css
:root {
	--primary: 0 0% 0%; /* hsl format */
	--secondary: 0 0% 100%;
}
```

### Custom Animations

Add custom animations via the `spinner.css` file or in your global styles.

## Import Statement

```tsx
import {
	Spinner,
	SpinnerContainer,
	LoadingOverlay,
} from "@/components/ui/spinner";
```

## Accessibility

- ✅ Semantic `role="status"` and `aria-live="polite"` attributes
- ✅ Respects `prefers-reduced-motion` for accessibility
- ✅ Works with screen readers
- ✅ High contrast support

## Performance

- 🚀 CSS-based animations (GPU accelerated)
- 📉 No JavaScript animation loops
- ✨ Smooth 60fps on all devices
- 🎯 Optimized rendering with React hooks
