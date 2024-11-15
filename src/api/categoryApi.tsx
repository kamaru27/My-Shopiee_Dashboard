import axios from "axios";
import { axiosClient } from "./config/axiosConfig";

export const categoryApi = {  
  createCategory: async function (body: any) {
    return await axiosClient.post(
      "categories/",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
  updateCategory: async function (categoryId: any, body: any) {
    return await axiosClient.put(
      `categories/update/${categoryId}`,
      body,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
  getAllCategories: async function () {
    return await axiosClient.get(
      "categories/getAll/",
    );
  },
  getCategory: async function (categoryId: any) {
    return await axiosClient.get(
      `categories/getCategory/${categoryId}`,
    );
  },
  deleteCategory: async function (categoryId: any) {
    return await axiosClient.delete(
      `categories/delete/${categoryId}`,
    );
  },
  getCategoriesForProduct: async function () {
    return await axiosClient.get(
      "categories/dropdown/categories",
    );
  },
};
