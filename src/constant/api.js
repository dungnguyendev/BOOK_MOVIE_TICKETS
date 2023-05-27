import { message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

export const TOKEN_CYBERSOFT =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3NCIsIkhldEhhblN0cmluZyI6IjE2LzA5LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5NDgyMjQwMDAwMCIsIm5iZiI6MTY2ODI3MjQwMCwiZXhwIjoxNjk0OTcwMDAwfQ.3TXoqM7cOKUQgRGc0plbpUsV406snlZBBeHlA7RxJYk";

export const baseURL = "https://movienew.cybersoft.edu.vn/api/";
const http = axios.create();
var token = ""
export const checkToken = () => {
   if(JSON.parse(localStorage.getItem('user') === null)){
      token = ""
   }else{
      token = `Bearer ${JSON.parse(localStorage.getItem('user') || '')?.accessToken}`
   }
}
http.interceptors.request.use((config) => {

   return {
      ...config,
      headers: {
         TokenCyberSoft: TOKEN_CYBERSOFT,
         Authorization: token
      },
      baseURL,
   };
});

http.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      console.log({ error });
      if (error?.response?.status === 403) {
         toast.error("Bạn không có quyền truy cập");
      }
      if (error?.response?.status === 400) {
         toast.error(error.response?.data?.content);
      }
      if (error?.response?.status === 404) {
         toast.error(error.response?.data?.content);
      }
      if (error?.response?.status === 500) {
         toast.error(error.response?.data?.content);
      }
      if (error?.response?.status === 401) {
         toast.error(error.response?.data?.content);
      }
   }
);

export default http;

export const httErrorCode = {
   403: "",
};
export const messErr = {
   403: "Bạn không có quyền truy cấp",
};
