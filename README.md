# E-Commerce Platform

A modern, full-stack e-commerce platform built with **Next.js, TypeScript, React Query, Axios, Tailwind CSS, shadcn/ui, and Motion**.

The platform provides a complete shopping experience where users can browse and search products, manage their shopping cart, place orders, and manage their personal account through a dedicated user dashboard.

## 🚀 Tech Stack

### Frontend

- **Next.js** – React framework for building the application
- **TypeScript** – Type-safe development
- **React** – Component-based UI
- **Tailwind CSS** – Responsive and utility-first styling
- **shadcn/ui** – Reusable and accessible UI components
- **Motion** – Animations and smooth UI interactions

### Data Fetching & API

- **TanStack React Query** – Server-state management, caching, queries, and mutations
- **Axios** – HTTP client for communicating with the backend API

### Authentication

- **JWT Authentication**
- Protected user pages
- Authenticated API requests
- User account management

---

## ✨ Features

### 🛍️ Product Browsing

Users can:

- Browse all products
- View product details
- Browse products by category
- Browse products by brand
- View featured products
- View new arrivals
- View similar products
- View product images
- View prices and discounts
- View available sizes and colours
- Check product availability

### 🔎 Global Product Search

The application provides a global search input that allows users to search for products by:

- Product name
- Brand
- Category

Search is debounced to reduce unnecessary API requests.

Example:

```text
/collections?search=nike
```

Search is handled by the backend, allowing the application to efficiently search the product database without loading all products into the browser.

### 🎯 Product Filtering

Users can filter products by:

- Category
- Brand
- Size
- Colour

Filters can be combined to narrow down product results.

### ↕️ Product Sorting

Products can be sorted by:

- Price — Low to High
- Price — High to Low
- Newest
- Featured

### 🛒 Shopping Cart

Users can:

- Add products to their cart
- Select product size
- Select product colour
- Change product quantity
- Remove products
- View cart items
- View cart totals
- Continue to checkout

### 💳 Checkout & Orders

The platform provides an order and checkout flow where users can:

- Review their cart
- Provide shipping information
- Complete checkout
- View order information
- View previous orders

### 👤 User Authentication

Users can:

- Create an account
- Sign in
- Sign out
- Access protected pages
- Manage their authenticated session

Authentication is handled using JWT-based authentication.

---

# 📊 User Dashboard

Authenticated users have access to a dedicated dashboard for managing their account and shopping activity.

The dashboard allows users to manage:

### Account

- View account information
- Update personal information
- Manage account details

### Addresses

Users can:

- Add addresses
- Edit addresses
- Delete addresses
- Set a default address
- Manage multiple shipping addresses

### Orders

Users can:

- View their orders
- View order details
- Track their order status
- Review previous purchases

### Profile Management

Users can manage their personal account information from the dashboard without needing to leave the application.

---

## 🎨 User Experience

The application focuses on providing a clean and responsive shopping experience.

Features include:

- Responsive design
- Mobile-friendly interface
- Smooth animations
- Loading states
- Error states
- Empty states
- Reusable components
- Accessible UI components
- Interactive product cards
- Responsive navigation
- Global search

Motion is used to provide smooth transitions and interactive animations throughout the application.

---

## 🧩 UI Components

The project uses **shadcn/ui** for reusable interface components.

Components include:

- Buttons
- Inputs
- Forms
- Dialogs
- Dropdowns
- Select menus
- Cards
- Navigation elements
- Tabs
- Alerts

The components can be customized directly within the project.

---

## 📡 API & Server State

The frontend communicates with the backend API using **Axios**.

**TanStack React Query** manages server state and provides:

- Data fetching
- Caching
- Loading states
- Error handling
- Mutations
- Query invalidation
- Automatic refetching

Example:

```ts
const { data, isLoading, error } = useQuery({
	queryKey: ["products"],
	queryFn: getProducts,
});
```

---

## 🔍 Product Search Flow

The global search works approximately as follows:

```text
User enters search
        ↓
Global Search Input
        ↓
Debounced Search
        ↓
/collections?search=nike
        ↓
Next.js Collections Page
        ↓
Backend API
        ↓
Database Search
        ↓
Matching Products
        ↓
Search Results
```

The backend searches product information including product names, brands, and categories.

---

# 📁 Project Structure

The project does **not** use a `src` directory.

A simplified structure is:

```text
project/
│
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── collections/
│   ├── products/
│   ├── cart/
│   ├── checkout/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── products/
│   ├── cart/
│   ├── dashboard/
│   └── ...
│
├── hooks/
│   └── ...
│
├── lib/
│   └── ...
│
├── types/
│   └── ...
│
├── public/
│   └── ...
│
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/AbobakerBashar/ecomerce-frontend
```

## 2. Navigate to the project

```bash
cd <project-folder>
```

## 3. Install dependencies

Using npm:

```bash
npm install
```

## 4. Configure environment variables

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_BASE_ENDPOINT=http://localhost:3000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

### Environment Variables

| Variable                    | Description                        |
| --------------------------- | ---------------------------------- |
| `NEXT_PUBLIC_BASE_ENDPOINT` | Base URL of the backend API        |
| `NODE_ENV`                  | Application environment            |
| `JWT_SECRET`                | Secret used for JWT authentication |

> **Important:** `JWT_SECRET` is sensitive and must never be exposed to the browser or committed to Git.

---

# ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🏗️ Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

Make sure the production environment variables are configured before deployment.

---

# 🔐 Environment Security

Add environment files to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
```

Never commit sensitive credentials or secrets to the repository.

In particular:

```env
JWT_SECRET
```

should remain private.

Variables prefixed with `NEXT_PUBLIC_` are intentionally exposed to the browser, so they should not contain secrets.

---

# 📱 Responsive Design

The application is designed to work across:

- 📱 Mobile devices
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop screens

Tailwind CSS is used to create a responsive and consistent layout across different screen sizes.

---

# 🚀 Future Improvements

Potential future improvements include:

- Wishlist functionality
- Product reviews and ratings
- Advanced product recommendations
- Improved product search
- Order tracking
- Notifications
- Advanced account settings
- Progressive Web App support
- Improved SEO
- Product analytics

---

# 👨‍💻 Author

**Abobaker Yagoub Bashar**

Full-stack developer building modern web applications with **TypeScript, JavaScript, React, Next.js, Node.js, and related technologies**.

---

# 📄 License

This project is available for educational and portfolio purposes.
