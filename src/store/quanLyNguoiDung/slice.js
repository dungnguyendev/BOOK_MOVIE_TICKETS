import { createSlice } from "@reduxjs/toolkit";
import { deleteThongTinUser, layDSNguoiDung, layThongTinNguoiDung, layThongTinNguoiDungByID, login, themNguoiDungAdmin, upDateThongTinUser } from "./thunkAction";
import { toast } from "react-toastify";

const initialState = {
   user: undefined,
   thongTinNguoiDung: {},
   listUser: [],
   thongTinNguoiDungByID: {}
};

const quanLyNguoiDungSlice = createSlice({
   name: "quanLyNguoiDung",
   initialState,
   reducers: {
      logOut: (state, action) => {
         localStorage.removeItem("user");
         state.user = undefined;
         toast.error("Hẹn gặp lại 😉");
      },
      getUser: (state, action) => {
         const data = localStorage.getItem("user");
         if (data) {
            state.user = JSON.parse(data);
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(login.fulfilled, (state, action) => {
            console.log(action.payload);
            state.user = action.payload;
            toast.success(" Hãy chọn bô phim bạn yêu thích nào 👌");
            localStorage.setItem("user", JSON.stringify(action.payload));
         })
         .addCase(layThongTinNguoiDung.fulfilled, (state, action) => {
            state.thongTinNguoiDung = action.payload;
            // console.log("123");
         })
         .addCase(layDSNguoiDung.fulfilled, (state, action) => {

            state.listUser = action.payload;
            // console.log("123");
         })
         .addCase(layThongTinNguoiDungByID.fulfilled, (state, action) => {
            state.thongTinNguoiDungByID = action.payload
         })
         .addCase(upDateThongTinUser.fulfilled, (state, action) => {
            toast.success("Cập nhật thông tin thành công")
         })
         .addCase(deleteThongTinUser.fulfilled, (state, action) => {
            toast.success("Bạn đã xoá 1 tài khoàn người dùng")
         })
         .addCase(themNguoiDungAdmin.fulfilled, (state, action) => {
            toast.success("Bạn đã thêm 1 tài khoàn người dùng mới")
         });
   },
});

export const quanLyNguoiDungReducer = quanLyNguoiDungSlice.reducer;

export const quanLyNguoiDungActions = quanLyNguoiDungSlice.actions;
