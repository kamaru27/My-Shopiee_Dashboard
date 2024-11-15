import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BannerEditForm from "@/components/Form/Banner-form/Update";
// import { brandApi } from "@/api/brandApi";
import toast from "react-hot-toast";
import { bannerApi } from "@/api/bannerApi";
import { categoryApi } from "@/api/categoryApi";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

async function getBanner(id:string) {
  try {
    const response = await bannerApi.getBanner(id);
    const listOfCategories: any = await categoryApi.getCategoriesForProduct();
    // const Products = await response.json();
    return  { listOfCategories:listOfCategories.data , response:response.data};
  } catch (error:any) {
    toast.error(error.message)
    // toast.error('404 ERROR!!!.')
    // console.log(error.message)
  }
}

const FormElementsPage = async ({params}:{params:{id:string}}) => {
  const response = await getBanner(params.id)
  const banner = response?.response;
  const categories = response?.listOfCategories.data;

  return (
    <DefaultLayout>
  
      <BannerEditForm 
      bannerId={params.id} getBanner={banner} categoryList={categories}
      />
    </DefaultLayout>
  );
};


export default FormElementsPage;
