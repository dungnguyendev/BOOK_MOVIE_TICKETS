import http from "../constant/api";

export const quanLyDatVeServices = {
   getDatVe: (query = "") => http.get(`QuanLyDatVe/LayDanhSachPhongVe${query}`),
   DatVe: (query = "") => http.post(`QuanLyDatVe/DatVe`, query),
};
