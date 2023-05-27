import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyPhimServices } from "../../services/quanLyPhim.services";

export const getmovieList = createAsyncThunk(
   "quanLyPhim/getmovieList",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyPhimServices.getMovieList("?maNhom=GP13");

         return res.data.content;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);

export const getbannerList = createAsyncThunk(
   "quanLyPhim/getbannerList",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyPhimServices.getBannerList();

         return res.data.content;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const themPhimUploadHinh = createAsyncThunk(
   "quanLyPhim/themPhim",
   async (formData, { rejectWithValue }) => {
      try {
         const res = await quanLyPhimServices.themPhimUploadHinh(formData);
         return res.data.content;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const layThongTinPhim = createAsyncThunk(
   "quanLyPhim/getMovie",
   async (idFilm, { rejectWithValue }) => {
      try {
         const res = await quanLyPhimServices.layThongTinphim(idFilm);
         return res.data.content;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const capNhatPhim = createAsyncThunk(
   "quanLyPhim/capNhatPhim",
   async (formData, { rejectWithValue }) => {
      try {
         const res = await quanLyPhimServices.CapNhatThongTinphim(formData);
         return res.data.content;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const XoaPhim = createAsyncThunk(
   "quanLyPhim/XoaPhim",
   async (id, { rejectWithValue }) => {
      try {
        
         const res = await quanLyPhimServices.XoaPhim(id);
         return res.data.content;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);