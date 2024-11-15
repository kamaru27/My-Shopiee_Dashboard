"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import Image from "next/image";
import { storageUrl } from "@/utils/baseUrl";
import Link from "next/link";

type Props = {
  products: any;
  categories:any;
};

const ECommerce = ({ products,categories }: Props) => {
  // console.log('=-=-==-=-=-=-',products)
  return (
    <>
      {/* <DataStatsOne /> */}

       {products.length>0? <>
      <div className="h-100 w-full rounded-xl border-b border-stroke bg-white pt-5 text-center text-2xl font-extrabold text-black dark:border-stroke-dark dark:bg-gray-dark dark:text-white ">
       Featured Products
        <div className="no-scrollbar mx-6 flex justify-around mt-3 gap-6 overflow-x-auto">
          {products.map((item: any, index: any) => (
            <Link href={`/admin/products/view/${item._id}`} key={index} className="group">
              <div className=" mt-[10px] h-75 w-60 shrink-0 rounded-lg bg-gray-3 dark:bg-gray-6 ">
                <div className="relative left-6 top-5 size-[190px] group-hover:shadow-lg group-hover:shadow-slate-950 rounded-xl ">
                  <Image
                    src={storageUrl + item.image}
                    alt={item.name}
                    fill 
                    className="rounded-xl object-cover"
                  ></Image>
                </div>
                <p className="mt-7">{item.name}</p>
                <p className="mt-3 text-sm">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
        </>:''}
     {categories.length>0? <div className="h-[43rem] w-full rounded-xl border-b border-stroke bg-white pt-5 text-center text-2xl font-extrabold text-black dark:border-stroke-dark dark:bg-gray-dark dark:text-white mt-10">
        Categories
        <div className=" mx-6 mt-3 grid grid-cols-4">
          {categories.map((item: any, index: any) => (
            <Link href={`/admin/categories/products/${item._id}`} key={index}>
              <div className="mt-[10px] h-70 w-60 rounded-lg bg-gray-3 dark:bg-gray-6">
                <div className="relative left-6 top-7 size-[190px]">
                  <Image
                    src={storageUrl + item.image}
                    alt=""
                    fill
                    className="rounded-xl object-cover"
                  ></Image>
                </div>
                <p className="mt-10">{item.name}</p>
              </div>
            </Link>
          ))}
          {categories.length==7?
        <Link href={"/admin/categories"}>
          <div className="  relative mt-21 flex size-31 items-center border-solid border-[1px] dark:bg-slate-800 justify-center rounded-full  shadow-3 hover:shadow-6 dark:shadow-2xl ">
            <div className="w-full text-black dark:text-white text-center text-base font-satoshi font-normal">
              See More
              &gt;&gt;&gt;
            </div>
          </div>
        </Link>:""}
          {/* <div className="absolute bottom-0 right-0">
          {categories.length==6?<button className="bg-current">See More &gt;&gt;&gt;</button>:""}
          </div> */}
        </div>
      </div>:""}
      {/* 
      <ChartOne />
      <ChartTwo />
      <ChartThree />
      <MapOne />
      <ChatCard /> */}
      {/* <div className="col-span-12 xl:col-span-8">
        <TableOne />
      </div> */}
    </>
  );
};

export default ECommerce;
