import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductView from "@/components/Form/Category-form/View";
import { productApi } from "@/api/productApi";
import toast from "react-hot-toast";
import { brandApi } from "@/api/brandApi";
import { categoryApi } from "@/api/categoryApi";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

async function getProduct(id: string) {
  try {
    const oneProduct: any = await productApi.productByCategory(id);  

    return oneProduct.data;

  } catch (error: any) {
     toast.error(error.message)
    // console.log(error);
    // toast.error('404 ERROR!!!.')
  }
}

const FormElementsPage = async ({ params }: { params: { view: string } }) => {
  // console.log(params.view)
  const id = params.view;
  const response :any= await getProduct(id);
  const product = response.data.products;
// console.log(product)
  // const {_id ,productName, productDescription,productPrice} = product
  return (
    <DefaultLayout>
      <ProductView categoryId={params.view} getProduct={product}/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
