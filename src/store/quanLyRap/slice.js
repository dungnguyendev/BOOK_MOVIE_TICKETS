import { createSlice } from "@reduxjs/toolkit";
import {
   createShowTimes1,
   getShowtimeInfo,
   getShowtimeTheaterSystem,
   getTheaterList,
} from "./thunkAction";
import { toast } from "react-toastify";

const initialState = {
   theaterList: [],
   error: undefined,
   theaterSystemGroup: [],
};

const quanLyRapSlice = createSlice({
   name: "quanLyRap",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getTheaterList.fulfilled, (state, action) => {
            state.theaterList = action.payload;
         })
         .addCase(createShowTimes1.fulfilled, (state, action) => {
            toast.success("Tạo lịch phim thành công");
         })
         .addCase(getShowtimeTheaterSystem.fulfilled, (state, action) => {
            state.theaterSystemGroup = action.payload;
         });
   },
});

export const quanLyRapReducer = quanLyRapSlice.reducer;

export const quanLyRapAction = quanLyRapSlice.actions;
