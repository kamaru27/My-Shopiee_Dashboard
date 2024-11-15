// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import TableOne from "@/components/Tables/TableOne";
// import TableThree from "@/components/Tables/TableThree";
// import TableTwo from "@/components/Tables/TableTwo";

// import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import CategoryTable from "@/components/Tables/Category";
// import { categoryApi } from "@/api/categoryApi";
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
//     name:'Categories ',
//     link:'/tables/category'
//   },
// ];

// async function getAllCategories() {
//   const response = await categoryApi.getAllCategories();
//   // const Products = await response.json();

//   return response.data;
// }

// const TablesPage = async () => {
//   const response = await getAllCategories()
//   const categories = response.data.categories
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Categories" navigation={packageData}/>

//       <div className="flex flex-col gap-10">
//         <CategoryTable listOfCategories={categories}/>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default TablesPage;