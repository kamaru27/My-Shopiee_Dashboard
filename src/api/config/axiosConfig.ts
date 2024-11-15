import axios from "axios";
import Cookies from "js-cookie";

let headers = {};

if (typeof window !== "undefined") {
  headers = {
    Authorization: "bearer " + window.localStorage.getItem("accessToken"),
  };
}

export const axiosClient = axios.create(
    {
        baseURL:'http://localhost:3005/api/dashboard/',
        headers:headers
    }
)