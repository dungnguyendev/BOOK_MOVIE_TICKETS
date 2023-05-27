import { createSlice } from "@reduxjs/toolkit";
import { XoaPhim, capNhatPhim, getbannerList, getmovieList, layThongTinPhim, themPhimUploadHinh } from "./thunkAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
// import { useHistory } from "react-router-dom";
// import { getbannerList, getmovieList } from "./thunkAction";

const initialState = {
   movieList: [],
   isLoading: false,
   error: undefined,
   thongTinPhim: {},
   listBanner: [],
};
// const history = useHistory()
const quanLyPhimSlice = createSlice({

   name: "quanLyPhim",
   initialState,
   reducers: {

   },
   // xu ly cac action tao tu createAsyncThunk
   extraReducers: (builder) => {
      builder
         .addCase(getmovieList.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(getmovieList.fulfilled, (state, action) => {
            state.movieList = action.payload;
            state.isLoading = false;
         })
         .addCase(getmovieList.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
         })
         //addFilm 
         .addCase(themPhimUploadHinh.fulfilled, (state, action) => {
            toast.success("Bạn đã thêm 1 bộ phim mới")
         })
         .addCase(themPhimUploadHinh.rejected, (state, action) => {
            toast.error("Thêm phim thất bại :((")
         })
         // getFilm
         .addCase(layThongTinPhim.fulfilled, (state, action) => {
            state.thongTinPhim = action.payload
         })
         .addCase(capNhatPhim.fulfilled, (state, action) => {
            toast.success("Bạn cập nhật phim thành công")
         })
         .addCase(capNhatPhim.rejected, (state, action) => {
            toast.success("Cập nhật phim không thành công")
         })

         .addCase(XoaPhim.fulfilled, (state, action) => {
            toast.success("Phim đã được xoá")
         })
         .addCase(getbannerList.fulfilled, (state, action) => {
            state.bannlist = action.payload;
            state.isLoading = false;
         });
   },
});

// export const {reducer: quanLyPhimReducer, actions: quanLyPhimActions} = createSlice({
//    name: "quanLyPhim",
//    initialState,
//    reducers: {},
//    extraReducers: (builder) => {},
// });

export const quanLyPhimReducer = quanLyPhimSlice.reducer;

export const quanLyPhimActions = quanLyPhimSlice.actions;
