import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyNguoiDungServices } from "../../services/quanLyNguoiDung.services";

export const login = createAsyncThunk(
   "quanLyNguoiDung/login",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyNguoiDungServices.login(payload);
         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);
export const layThongTinNguoiDung = createAsyncThunk(
   "quanLyNguoiDung/layThongTinNguoiDung",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyNguoiDungServices.layThongTin();

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);
export const layThongTinNguoiDungByID = createAsyncThunk(
   "quanLyNguoiDung/layThongTinNguoiDungById",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyNguoiDungServices.layThongTinNguoiDung(payload);

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);
export const layDSNguoiDung = createAsyncThunk(
   "quanLyNguoiDung/getListUser",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyNguoiDungServices.layDSNguoiDung(payload);

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);
export const upDateThongTinUser = createAsyncThunk(
   "quanLyNguoiDung/upDateUser",
   async (body, { rejectWithValue }) => {
      try {
         const res = await quanLyNguoiDungServices.updateThongTinUser(body);

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);
export const deleteThongTinUser = createAsyncThunk(
   "quanLyNguoiDung/deleteUser",
   async (taiKhoan, { rejectWithValue }) => {
      try {
         console.log(taiKhoan);
         const res = await quanLyNguoiDungServices.deleteThongTinNguoiDung(taiKhoan);

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);
export const themNguoiDungAdmin = createAsyncThunk(
   "quanLyNguoiDung/themNguoiDungAdmin",
   async (data, { rejectWithValue }) => {
      try {
         const res = await quanLyNguoiDungServices.themNguoiDungAdmin(data);
         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);