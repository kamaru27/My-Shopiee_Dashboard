import PasswordUpdate from "@/components/PasswordUpdate";
import axios from "axios";

export const adminApi = {
  adminLogin: async function (body: any) {
    return await axios.post(
      "http://localhost:3005/api/dashboard/admin/login",
      body,
    );
  },
  PasswordUpdate: async function (body: any) {
    return await axios.post(
      "http://localhost:3005/api/dashboard/admin/updatePassword",
      body,
    );
  },
};
