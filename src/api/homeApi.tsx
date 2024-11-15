import { axiosClient } from "./config/axiosConfig";


export const homeApi = {
    featuredProducts: async function () {
      return await axiosClient.get(
        "home/featuredProducts",
      );
    },
    categories: async function () {
      return await axiosClient.get(
        "home/categories",
      );
    },
  };