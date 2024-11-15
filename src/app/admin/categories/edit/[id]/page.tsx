import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CategoryEditForm from "@/components/Form/Category-form/Update";
import { categoryApi } from "@/api/categoryApi";
import toast from "react-hot-toast";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

async function getCategory(id:string) {
  try {
    const response = await categoryApi.getCategory(id);
    // const Products = await response.json();
    return response.data;
  } catch (error:any) {
    toast.error(error.message)
    // toast.error('404 ERROR!!!.')
  }
}

const FormElementsPage = async ({params}:{params:{id:string}}) => {
  const response = await getCategory(params.id)
  const category = response.data
  return (
    <DefaultLayout>
      <CategoryEditForm categoryId={params.id} getBrand={category}/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
