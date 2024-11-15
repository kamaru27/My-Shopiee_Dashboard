import axios from "axios";
import { axiosClient } from "./config/axiosConfig";

export const brandApi = {
  createBrand: async function (body: any) {
    return await axiosClient.post(
      "brands/",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
  updateBrand: async function (brandId: any, body: any) {
    return await axiosClient.put(
      `brands/update/${brandId}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
  },
  getAllBrands: async function () {
    return await axiosClient.get(
      "brands/getAll/",
    );
  },
  getBrand: async function (brandId: any) {
    return await axiosClient.get(
      `brands/getBrand/${brandId}`,
    );
  },
  deleteBrand: async function (brandId: any) {
    return await axiosClient.delete(
      `brands/delete/${brandId}`,
    );
  },
  getBrandsForProduct: async function () {
    return await axiosClient.get(
      "brands/dropdown/brandsList",
    );
  },
};
