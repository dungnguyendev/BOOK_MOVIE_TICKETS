import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyRapServices } from "../../services/quanLyRap.servies";

export const getTheaterList = createAsyncThunk(
   "quanLyRap/getTheaterList",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyRapServices.getTheaterList();

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const getGroupTheater = createAsyncThunk(
   "quanLyRap/getGroupTheater",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyRapServices.fetchGroupTheater();

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const getShowtimeInfo = createAsyncThunk(
   "quanLyRap/getShowtimeInfo",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyRapServices.fetchShowtimeInfo(payload);

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const getShowtimeTheaterSystem = createAsyncThunk(
   "quanLyRap/getShowtimeInfoTheater",
   async (payload, { rejectWithValue }) => {
      try {
         const res = await quanLyRapServices.fetchShowtimeTheaterSystem(
            "?maNhom=GP13"
         );

         return res.data.content;
      } catch (error) {
         return rejectWithValue(error);
      }
   }
);

export const createShowTimes1 = createAsyncThunk(
   "quanLyRap/createShoTimes",
   async (formData, { rejectWithValue }) => {
      try {
         const res = await quanLyRapServices.createShowTimes(formData);
         return res.data.content;
      } catch (error) {
         return rejectWithValue("err: " + error.response?.data);
      }
   }
);
