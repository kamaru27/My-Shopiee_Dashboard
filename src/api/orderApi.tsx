import { axiosClient } from "./config/axiosConfig";

export const orderApi = {
  getAllOrders: async function () {
    return await axiosClient.get("orders/getAll");
  },
  orderStatus: async function (orderId: string, value: string) {
    return await axiosClient.put(
      `orders/status?orderId=${orderId}&orderValue=${value}`,
    );
  },
  getOrder: async function (orderId: string) {
    return await axiosClient.get(`orders/invoice/${orderId}`);
  },
};
