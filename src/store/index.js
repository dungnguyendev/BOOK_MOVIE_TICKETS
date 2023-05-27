import { configureStore } from "@reduxjs/toolkit";
import { quanLyPhimReducer } from "./quanLyPhim/slice";
import {
   quanLyNguoiDungActions,
   quanLyNguoiDungReducer,
} from "./quanLyNguoiDung/slice";
import { quanLyDatVeReducer } from "./quanLyDatVe/slice";
import { quanLyRapReducer } from "./quanLyRap/slice";

export const store = configureStore({
   reducer: {
      quanLyPhim: quanLyPhimReducer,
      quanLyNguoiDung: quanLyNguoiDungReducer,
      quanLyDatVe: quanLyDatVeReducer,
      quanLyRap: quanLyRapReducer,
   },
});

store.dispatch(quanLyNguoiDungActions.getUser());
