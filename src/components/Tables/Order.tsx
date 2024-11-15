"use client";
import { orderApi } from "@/api/orderApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  listOfOrders: [];
};

const OrderTable = ({ listOfOrders }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // const filteredOrders = listOfOrders.filter((orderItem: any) =>
  //   orderItem.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || orderItem.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const totalPages = Math.ceil(listOfOrders.length / itemsPerPage);
  const orderData = listOfOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const router = useRouter();
  // router.refresh();
  async function orderStatus(orderId: any, value: any) {
    try {
      const orderStatus = await orderApi.orderStatus(orderId, value);
      if (orderStatus.data.success == true) {
        toast.success(orderStatus.data.message);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="rounded-[10px] border border-stroke bg-white py-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:py-7.5">
        {orderData.length>0?<><div className="flex justify-between ml-7 mb-5">
          <div>
            <form className="mx-auto max-w-md">
              <label
                htmlFor="default-search"
                className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full rounded-lg border  border-gray-300 bg-gray-50 p-1 px-20 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Search Order"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
                <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white xl:pl-7.5">
                  Order Number
                </th>
                <th className="min-w-[220px] px-4 py-4 font-medium text-dark dark:text-white ">
                  Customers
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Total
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Grand Total
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Order Status
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-dark dark:text-white">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((packageItem: any, index) => (
                <tr key={index}>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pl-7.5 ${index === packageItem.length - 1 ? "border-b-0" : "border-b"}`}
                  >
                    <h5 className="text-dark dark:text-white">
                      #MYSHOPIEE
                      {packageItem.orderNumber.toString().padStart(4, "0")}
                    </h5>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageItem.length - 1 ? "border-b-0" : "border-b"}`}
                  >
                    <p className="text-dark dark:text-white">
                      {packageItem.user.name}
                    </p>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${index === packageItem.length - 1 ? "border-b-0" : "border-b"}`}
                  >
                    <p className="text-dark dark:text-white">
                    ₹{packageItem.total}/-
                    </p>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === packageItem.length - 1 ? "border-b-0" : "border-b"}`}
                  >
                    <p className="text-dark dark:text-white">
                    ₹{packageItem.grandTotal}/-
                    </p>
                  </td>
                  <td
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 xl:pr-7.5 ${index === packageItem.length - 1 ? "border-b-0" : "border-b"}`}
                  >
                    <div className="col-lg-4 col-sm-6">
                      <div className="form-group ">
                        <select
                          defaultValue={packageItem.orderStatus}
                          className="form-control form-control-sm bg-transparent"
                          onChange={(event) => {
                            orderStatus(packageItem._id, event.target.value);
                          }}
                        >
                          <option value="cancelled">Cancelled</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="on the way">On The Way</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`border-[#eee] px-8 py-4 dark:border-dark-3 xl:pr-7.5 ${index === packageItem.length - 1 ? "border-b-0" : "border-b"}`}
                  >
                    <div className="flex items-center">
                      <Link href={`/admin/orders/invoice/${packageItem._id}`}>
                        <button className="mt-[6px] hover:text-primary">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99935 6.87492C8.27346 6.87492 6.87435 8.27403 6.87435 9.99992C6.87435 11.7258 8.27346 13.1249 9.99935 13.1249C11.7252 13.1249 13.1243 11.7258 13.1243 9.99992C13.1243 8.27403 11.7252 6.87492 9.99935 6.87492ZM8.12435 9.99992C8.12435 8.96438 8.96382 8.12492 9.99935 8.12492C11.0349 8.12492 11.8743 8.96438 11.8743 9.99992C11.8743 11.0355 11.0349 11.8749 9.99935 11.8749C8.96382 11.8749 8.12435 11.0355 8.12435 9.99992Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.99935 2.70825C6.23757 2.70825 3.70376 4.96175 2.23315 6.8723L2.20663 6.90675C1.87405 7.3387 1.56773 7.73652 1.35992 8.20692C1.13739 8.71064 1.04102 9.25966 1.04102 9.99992C1.04102 10.7402 1.13739 11.2892 1.35992 11.7929C1.56773 12.2633 1.87405 12.6611 2.20664 13.0931L2.23316 13.1275C3.70376 15.0381 6.23757 17.2916 9.99935 17.2916C13.7611 17.2916 16.2949 15.0381 17.7655 13.1275L17.792 13.0931C18.1246 12.6612 18.431 12.2633 18.6388 11.7929C18.8613 11.2892 18.9577 10.7402 18.9577 9.99992C18.9577 9.25966 18.8613 8.71064 18.6388 8.20692C18.431 7.73651 18.1246 7.33868 17.792 6.90673L17.7655 6.8723C16.2949 4.96175 13.7611 2.70825 9.99935 2.70825ZM3.2237 7.63475C4.58155 5.87068 6.79132 3.95825 9.99935 3.95825C13.2074 3.95825 15.4172 5.87068 16.775 7.63475C17.1405 8.10958 17.3546 8.3933 17.4954 8.71204C17.627 9.00993 17.7077 9.37403 17.7077 9.99992C17.7077 10.6258 17.627 10.9899 17.4954 11.2878C17.3546 11.6065 17.1405 11.8903 16.775 12.3651C15.4172 14.1292 13.2074 16.0416 9.99935 16.0416C6.79132 16.0416 4.58155 14.1292 3.2237 12.3651C2.85821 11.8903 2.64413 11.6065 2.50332 11.2878C2.37171 10.9899 2.29102 10.6258 2.29102 9.99992C2.29102 9.37403 2.37171 9.00993 2.50332 8.71204C2.64413 8.3933 2.85821 8.10958 3.2237 7.63475Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            className="ml-7 rounded bg-black px-3 pb-1 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-black"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="mr-7 rounded bg-black px-3 pb-1 font-semibold text-white disabled:opacity-50 dark:bg-white dark:text-black"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div></>:          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-lg text-red-600">Data not found</p>
            <Link
            href={"/"}
            className="mt-3 rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
            >
            Home
          </Link>
          </div>}
      </div>
    </>
  );
};

export default OrderTable;
