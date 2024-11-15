import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Invoice from "@/components/Invoice";
import { productApi } from "@/api/productApi";
import toast from "react-hot-toast";
import { brandApi } from "@/api/brandApi";
import { categoryApi } from "@/api/categoryApi";
import { orderApi } from "@/api/orderApi";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

async function getOrder(id: string) {
  try {
    const oneOrder: any = await orderApi.getOrder(id);  

    return oneOrder.data;

  } catch (error: any) {
     toast.error(error.message)
    // console.log(error);
    // toast.error('404 ERROR!!!.')
  }
}

const FormElementsPage = async ({ params }: { params: { id: string } }) => {
  // console.log(params.view)
  const id = params.id;
  const response :any= await getOrder(id);
  const order = response.data;
// console.log(product)
  // const {_id ,productName, productDescription,productPrice} = product
  return (
    <DefaultLayout>
      <Invoice orderId={params.id} getOrder={order}/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
