import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductForm from "@/components/Form/Product-form/Add";
import toast from "react-hot-toast";
import { brandApi } from "@/api/brandApi";
import { categoryApi } from "@/api/categoryApi";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

async function getProduct() {
  try {
    const listOfBrands: any = await brandApi.getBrandsForProduct();
    const listOfCategories: any = await categoryApi.getCategoriesForProduct();
  
    // const Products = await response.json();
    // console.log("aaaaaaaaaaa=======", response1.data);
    // console.log("bbbbbbbbbbb=======", response2.data);
    // console.log('111111111111',listOfCategories.data)
    return { listOfBrands: listOfBrands.data , listOfCategories:listOfCategories.data};

  } catch (error: any) {  
    // toast.error(error.message)
    // console.log(error);
    toast.error(error.message);
    // console.log(error.message)
  }
}

const FormElementsPage = async () => {
  const response :any= await getProduct();
  const brands = response.listOfBrands.data;
  const categories = response.listOfCategories.data;

  return (
    <DefaultLayout>
      <ProductForm brandList={brands} categoryList={categories}/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
