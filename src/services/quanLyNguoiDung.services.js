import http from "../constant/api";

export const quanLyNguoiDungServices = {
   register: (payload) => http.post("QuanLyNguoiDung/DangKy", payload),
   login: (payload) => http.post("QuanLyNguoiDung/DangNhap", payload),
   updateThongTinUser: (payload) => http.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", payload),
   layThongTin: () => http.post("QuanLyNguoiDung/ThongTinTaiKhoan"),
   layDSNguoiDung: (query = "") => http.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${query}`),
   layThongTinNguoiDung: (query = "") => http.post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${query}`),
   deleteThongTinNguoiDung: (query = "") => http.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${query}`),
   themNguoiDungAdmin: (query = "") => http.post(`QuanLyNguoiDung/ThemNguoiDung`, query),
};
