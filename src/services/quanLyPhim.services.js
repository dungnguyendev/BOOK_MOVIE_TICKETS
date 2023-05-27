import http from "../constant/api";

export const quanLyPhimServices = {
   getMovieList: (query = "") => http.get(`QuanLyPhim/LayDanhSachPhim${query}`),
   // admin 
   themPhimUploadHinh: (themPhim = "") => http.post(`QuanLyPhim/ThemPhimUploadHinh`, themPhim),
   layThongTinphim: (getMovie = "") => http.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${getMovie}`),
   CapNhatThongTinphim: (data = "") => http.post(`QuanLyPhim/CapNhatPhimUpload`, data),
   XoaPhim: (id = "") => http.delete(`QuanLyPhim/XoaPhim?MaPhim=${id}`),

   getBannerList: () => http.get("QuanLyPhim/LayDanhSachBanner"),

   fetchMovieInfo: (query = "") =>
      http.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${query}`),
};
