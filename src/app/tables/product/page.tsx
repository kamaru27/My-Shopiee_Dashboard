// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import TableOne from "@/components/Tables/TableOne";
// import TableThree from "@/components/Tables/TableThree";
// import TableTwo from "@/components/Tables/TableTwo";

// import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Brand from "@/components/Tables/Brand";
// import ProductTable from "@/components/Tables/Product";
// import { productApi } from "@/api/productApi";
// import { PackageNavigation } from "@/types/packageNavigation";

// export const metadata: Metadata = {
//   title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
//   description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
// };


// const packageData: PackageNavigation[] = [
//   {
//     name:'Dashboard / ',
//     link:'/'
//   },
//   {
//     name:'Products ',
//     link:'/tables/product'
//   },
// ];

// async function getAllProducts() {
//   const response = await productApi.getAllProducts();
//   // const Products = await response.json();

//   return response.data;
// }

// const TablesPage = async () => {
//   const response = await getAllProducts()
//   const products = response.data.products
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Products" navigation={packageData}/>

//       <div className="flex flex-col gap-10">
//         <ProductTable listOfProducts={products}/>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default TablesPage;