import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import { homeApi } from "@/api/homeApi";
import toast from "react-hot-toast";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

async function featuredProducts() {
  try {
    const featured = await homeApi.featuredProducts();
    const categories = await homeApi.categories();
    // const Products = await response.json();
    return { featured: featured.data, categories: categories.data };
  } catch (error: any) {
    toast.error(error.message);
  }
}

export default async function Home() {
  const response = await featuredProducts();
  const products = response?.featured.data.products;
  const categories = response?.categories.data.categories;
  // console.log("-=-=-=-=-=-=-=-", categories);
  return (
    <>
      <DefaultLayout>
        <ECommerce products={products} categories={categories} />
      </DefaultLayout>
    </>
  );
}
