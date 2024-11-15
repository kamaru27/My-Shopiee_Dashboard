// "use client";
import React from "react";
import Image from "next/image";
import { title } from "process";
import Link from "next/link";
import { storageUrl } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PackageNavigation } from "@/types/packageNavigation";
// import { useCart } from "@mrvautin/react-shoppingcart";

type Props = {
  getProduct: any;
  productId: string;
};

const packageData: PackageNavigation[] = [
  {
    name:'Dashboard / ',
    link:'/'
  },
  {
    name:'Products / ',
    link:'/admin/products'
  },
  {
    name:'View ',
    link:''
  },
];

// eslint-disable-next-line @next/next/no-async-client-component
const ViewPage = async ({ getProduct, productId }: Props) => {
  // const router = useRouter()
  // function back() {
  //   router.back();
  // }
  return (
    <>
      <Breadcrumb pageName="Product View" navigation={packageData} />

      <div className="flex rounded-3xl bg-slate-300 p-5 w-full">
        <div className="relative size-[500px]">
          <Image
            src={storageUrl + getProduct.productImage}
            alt=""
            fill
            className="rounded-xl object-cover"
          ></Image>
        </div>
        <div className="ml-10 ">
          <p className="mt-20 text-3xl font-medium">{getProduct.productName}</p>
          <p className="my-10 text-xl font-semibold">
          ₹{getProduct.productPrice}/-
          </p>
          <p className="my-10 text-sm font-medium">{getProduct.brand.name}</p>
          <p className="from-neutral-500">{getProduct.productDescription}</p>
        </div>
      <div className="absolute right-15">
            <Link href={`/admin/products/edit/${productId}`}>
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 2 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                    <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                  </g>
                </svg>
            </Link>

              {/* <button className="mt-[20px]  flex h-[40px] w-[80px] items-center  justify-center gap-1 rounded-[10px] bg-black text-white hover:border-2 hover:border-solid hover:border-black hover:bg-white hover:text-black" 
              // onClick={back}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 30 30"
                >
                  <title>{"arrow-left"}</title>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M26 24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3h2V4a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v20a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4v-3h-2v3Zm5-11H9.414l5.243-5.243a1 1 0 1 0-1.415-1.414l-6.899 6.899A.992.992 0 0 0 6.06 14a.992.992 0 0 0 .283.758l6.899 6.899a1 1 0 1 0 1.415-1.415L9.414 15H31a1 1 0 1 0 0-2Z"
                  />
                </svg>
                Back
              </button> */}
          </div>
      </div>
    </>
  );
};

export default ViewPage;
