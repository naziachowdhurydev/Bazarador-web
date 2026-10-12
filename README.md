<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# 🛒 বাজার দর - Bazar Dor

A modern Bengali grocery price tracking website that helps users easily check and compare the latest prices of everyday products.

## 🌐 Project Overview

**বাজার দর (Bazar Dor)** is a responsive web application designed to make it easier for users to find current market prices of grocery and household products.

Users can browse product categories, view current and previous prices, see price changes, and manage their account through authentication.

## 🚀 Technologies Used

- **Next.js** - React framework for building the application
- **React** - User interface development
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Responsive and modern styling
- **Better Auth** - User authentication
- **MongoDB** - Database
- **React Toastify** - Notifications
- **REST API** - Fetching product and category data

## ✨ Features

### 1. 📊 Current Market Prices

Users can view the latest prices of different grocery and household products.

### 2. 📈 Price Change Tracking

Products show whether their prices have increased, decreased, or remained unchanged compared to previous prices.

### 3. 🗂️ Product Categories

Products are organized into different categories so users can quickly find what they need.

### 4. 🔥 Highest Price Products

A dedicated section highlights products with the biggest price increases.

### 5. 📉 Lowest Price Products

Users can easily see products whose prices have decreased.

### 6. 🔐 User Authentication

Users can create an account, sign in, sign out, and manage their profile using Better Auth.

### 7. 👤 User Profile

Authenticated users can view and update their profile information and profile picture.

### 8. 📱 Responsive Design

The website is fully responsive and works smoothly across mobile, tablet, and desktop devices.

### 9. 🔄 Loading & Error Pages

Custom loading and 404 pages provide a better experience while navigating the website.

### 10. 🔔 User Notifications

Toast notifications provide clear feedback when users perform actions such as updating their profile or signing out.

## 📁 Project Structure

```text
bazar-dor/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── types/
├── public/
├── .env
├── next.config.ts
├── package.json
└── README.md
```
