import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import TableOne from "@/components/Tables/TableOne";
// import TableThree from "@/components/Tables/TableThree";
// import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrderTable from "@/components/Tables/Order";
// import { brandApi } from "@/api/brandApi";
import toast from "react-hot-toast";
import { bannerApi } from "@/api/bannerApi";
import { PackageNavigation } from "@/types/packageNavigation";
import { orderApi } from "@/api/orderApi";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};


const packageData: PackageNavigation[] = [
  {
    name:'Dashboard / ',
    link:'/'
  },
  {
    name:'Orders ',
    link:'/admin/orders'
  },
];

async function getAllOrders() {
try {
  const response = await orderApi.getAllOrders();
  // const Products = await response.json();
  return response.data;
} catch (error:any) {
// console.log(error.message)
  toast.error(error.message);
  // toast.error('404 ERROR!!!.')
}
}



const TablesPage = async () => {
  const response = await getAllOrders()
  const orders = response.data.orders
  // console.log('-=-=-=-==',orders)
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Orders" navigation={packageData}/>

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo />
        <TableThree /> */}
        <OrderTable listOfOrders={orders}/>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
