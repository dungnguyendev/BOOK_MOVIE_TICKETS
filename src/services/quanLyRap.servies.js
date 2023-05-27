import http from "../constant/api";

export const quanLyRapServices = {
   getTheaterList: (query = "") => http.get("QuanLyRap/LayThongTinHeThongRap"),

   fetchGroupTheater: (query = "") =>
      http.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${query}`),

   fetchShowtimeTheaterSystem: (query) =>
      http.get(`QuanLyRap/LayThongTinLichChieuHeThongRap${query}`),

   fetchShowtimeInfo: (query = "") =>
      http.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${query}`),

   createShowTimes: (profileCalender = "") =>
      http.post(`QuanLyDatVe/TaoLichChieu`, profileCalender),
};
