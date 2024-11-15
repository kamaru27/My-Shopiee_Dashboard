import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import BrandTable from "@/components/Tables/Brand";
import { brandApi } from "@/api/brandApi";
import toast from "react-hot-toast";
import { PackageNavigation } from "@/types/packageNavigation";

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
    name:'Brands ',
    link:'/admin/brands'
  },
];

async function getAllBrands() {
try {
  const response = await brandApi.getAllBrands();
  // const Products = await response.json();

  return response.data;
} catch (error:any) {
  // console.log(error.message)
  toast.error(error.message)
  // toast.error('404 ERROR!!!.')
}}
const TablesPage = async () => {
  // console.log(packageData)
  const response = await getAllBrands()
  const brands = response.data.brands
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Brands" navigation={packageData}/>

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo />
        <TableThree /> */}
        <BrandTable listOfBrands={brands}/>
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
