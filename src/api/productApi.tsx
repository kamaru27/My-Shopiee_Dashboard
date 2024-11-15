import axios from "axios";
import { headers } from "next/headers";
import { axiosClient } from "./config/axiosConfig";

export const productApi = {
  createProduct: async function (body: any) {
    return await axiosClient.post(
      "products/",
      body,
      {
      headers:{
        'Content-Type':'multipart/form-data'
      }}
    );
  },
  updateProduct: async function (productId: any, body: any) {
    return await axiosClient.put(
      `products/update/${productId}`,
      body,
      {
        headers:{
          'Content-Type':'multipart/form-data'
        }}
    );
  },
  getAllProducts: async function () {
    return await axiosClient.get(
      "products/getAll",
    );
  },
  getProduct: async function (productId: any) {
    return await axiosClient.get(
      `products/getProduct/${productId}`,
    );
  },
  deleteProduct: async function (productId: any) {
    return await axiosClient.delete(
      `products/delete/${productId}`,
    );
  },
  featuredProduct: async function (productId: any) {
    return await axiosClient.put(
      `products/featured/${productId}`,
    );
  },
  productByCategory: async function (categoryId: any) {
    return await axiosClient.get(
      `products/productByCategory/${categoryId}`,
    );
  },
};
