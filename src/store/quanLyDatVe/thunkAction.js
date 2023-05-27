import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyDatVeServices } from "../../services/quanLyDatVe.services";

export const getDatVe = createAsyncThunk(
   "quanLyDatVe/getDatVe",
   async (payload, { rejectWithValue }) => {
      try {

         const res = await quanLyDatVeServices.getDatVe("?MaLichChieu="+payload);
         return res.data.content;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
export const datVe = createAsyncThunk(
   "quanLyDatVe/datVe",
   async (thongTinDatVe, { rejectWithValue }) => {
      try {
         const res = await quanLyDatVeServices.DatVe(thongTinDatVe);

         return res;
      } catch (err) {
         return rejectWithValue(err);
      }
   }
);
// export const datGhe = createAsyncThunk (
//     "quanLyDatVe/datGhe",
//     async (thongTinDatVe, { rejectWithValue }) => {
//         try {
//             const res = await quanLyDatVeServices.DatVe(thongTinDatVe);

//             return res;
//         } catch (err) {
//             return rejectWithValue(err)
//         }

//     }
// )
