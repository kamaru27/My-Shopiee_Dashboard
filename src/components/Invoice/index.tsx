// "use client";
import React from "react";
import Image from "next/image";
import { title } from "process";
import Link from "next/link";
import { storageUrl } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PackageNavigation } from "@/types/packageNavigation";
import dayjs from "dayjs";
// import { useCart } from "@mrvautin/react-shoppingcart";

type Props = {
  getOrder: any;
  orderId: string;
};

const packageData: PackageNavigation[] = [
  {
    name: "Dashboard / ",
    link: "/",
  },
  {
    name: "Orders / ",
    link: "/admin/orders",
  },
  {
    name: "Invoice ",
    link: "",
  },
];

// eslint-disable-next-line @next/next/no-async-client-component
const InvoicePage = async ({ getOrder, orderId }: Props) => {
  // const router = useRouter()
  // function back() {
  //   router.back();
  // }
    return (
    <>
      <Breadcrumb pageName="Order Invoice" navigation={packageData} />
      <div className="flex justify-center">
        <div className="h-full w-[75%] rounded-sm bg-white p-5">
          <div className="mt-10 grid w-full grid-cols-2 border-b border-dark-3 px-4 py-4 pb-10">
            <div>
              <p className="text-2xl font-bold text-black">MY-SHOPIEE</p>
              <p className="mt-7 text-sm font-medium text-black">
                My-Shopiee is a form of electronic commerce which allows
                consumers to directly buy goods from a seller over the Internet
                using a web browser or a mobile app.
              </p>
            </div>
            <div className="mr-5 mt-4 flex flex-col items-end">
              <p className="text-base font-medium text-black">
                Date Issued:{" "}
                {dayjs(getOrder.order.createdAt).format("DD-MM-YYYY")}
              </p>
              <p className="text-base font-medium text-black">
                Invoice: #MYSHOPIEE
                {getOrder.order.orderNumber.toString().padStart(4, "0")}
              </p>
            </div>
          </div>
          <div className="mt-15 border-b border-dark-3 px-4 py-4 pb-20 pl-15">
            <p className="mb-7 text-xl font-semibold text-black">Bill To :</p>
            <p className="mb-5 ml-5 font-semibold text-black">
              Name : {getOrder.order.billingDetails.firstName}{" "}
              {getOrder.order.billingDetails.lastName}
            </p>
            <p className="mb-5 ml-5 font-semibold text-black">
              Address : {getOrder.order.billingDetails.address}
            </p>
            <p className="mb-5 ml-5 font-semibold text-black">
              Phone Number : +91 {getOrder.order.billingDetails.phoneNumber}
            </p>
            <p className="mb-5 ml-5 font-semibold text-black">
              E-mail : {getOrder.order.billingDetails.email}
            </p>
            <p className="mb-5 ml-5 font-semibold text-black">
              Pin Code : {getOrder.order.billingDetails.zipCode}
            </p>
            <p className="ml-5 font-semibold text-black">
              Country : {getOrder.order.billingDetails.country}
            </p>
          </div>
          <div>
            <table className="mt-10 w-full">
              <thead>
                <tr className="h-10 bg-slate-300 text-center text-black">
                  <th>PRODUCT NAME</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {getOrder.order.items.map((item: any, index: any) => (
                  <tr key={index} className="text-lg text-black font-base h-15">
                    <td className="pl-10">{index+1}. {item.productName.name}</td>
                    <td className="text-center">₹{item.price} /-</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">
                      
                    ₹{item.quantity
                        ? (item.price * item.quantity).toFixed(2)
                        : item.price.toFixed(2)} /-
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full mt-10 border-t border-dark-3 py-10 flex flex-col items-end text-black">
            <div className="w-75 flex justify-between mb-2 mr-10">
            <div>Total:</div>
            <div>₹{getOrder.order.total.toFixed(2)} /-</div>
            </div>
            <div className="w-75 flex justify-between mb-2 mr-10">
            <div>Shipping Cost:</div>
            <div>₹{getOrder.order.shippingCost.toFixed(2)} /-</div>
            </div>
            <div className="w-75 flex justify-between mr-10">
            <div>Grand Total:</div>
            <div>₹{getOrder.order.grandTotal.toFixed(2)} /-</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;
