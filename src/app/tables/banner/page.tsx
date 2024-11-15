// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// // import TableOne from "@/components/Tables/TableOne";
// // import TableThree from "@/components/Tables/TableThree";
// // import TableTwo from "@/components/Tables/TableTwo";

// import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import BannerTable from "@/components/Tables/Banner";
// // import { brandApi } from "@/api/brandApi";
// import toast from "react-hot-toast";
// import { bannerApi } from "@/api/bannerApi";
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
//     name:'Banners ',
//     link:'/tables/banner'
//   },
// ];

// async function getAllBanners() {
// try {
//   const response = await bannerApi.getAllBanners();
//   // const Products = await response.json();
//   return response.data;
// } catch (error:any) {
//   console.log(error.message)
//   // toast.error(error.message)
//   // toast.error('404 ERROR!!!.')
// }
// }



// const TablesPage = async () => {
//   const response = await getAllBanners()
//   const banners = response.data.banners
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Banners" navigation={packageData}/>

//       <div className="flex flex-col gap-10">
//         {/* <TableOne />
//         <TableTwo />
//         <TableThree /> */}
//         <BannerTable listOfBanners={banners}/>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default TablesPage;
