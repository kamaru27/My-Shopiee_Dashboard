import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerAddForm from "@/components/Form/Banner-form/Add";
import { categoryApi } from "@/api/categoryApi";
import toast from "react-hot-toast";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

async function getProduct() {
    try {
      const listOfCategories: any = await categoryApi.getCategoriesForProduct();
    
      // const Products = await response.json();
      // console.log("aaaaaaaaaaa=======", response1.data);
      // console.log("bbbbbbbbbbb=======", response2.data);
      // console.log('111111111111',listOfCategories.data)
      return { listOfCategories:listOfCategories.data};
  
    } catch (error: any) {  
      // toast.error(error.message)
      // console.log(error);
      toast.error(error.message);
      // console.log(error.message)
    }
  }

const FormElementsPage = async () => {
    const response :any= await getProduct();
  const categories = response.listOfCategories.data;
  return (
    <DefaultLayout>
      <BannerAddForm categoryList={categories} />
    </DefaultLayout>
  );
};

export default FormElementsPage;
