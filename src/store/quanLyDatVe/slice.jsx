import { createSlice } from "@reduxjs/toolkit";
import { datVe, getDatVe } from "./thunkAction";
import { ThongTinLichChieu } from './../../components/core/models/ThongTinPhongVe'
import { toast } from "react-toastify";
import { connection } from "../..";
import { json } from "react-router-dom";


const initialState = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhsachGheDangDat: [],
    dsGheKhachKhacDangDat: [],
    tabActive: '1',
    isLoading: false,
    error: undefined,
};
const deepCopyFunction = (inObject) => {
    let outObject, value, key;

    if (typeof inObject !== "object" || inObject === null) {
        return inObject; // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {};

    for (key in inObject) {
        value = inObject[key];

        // Recursively (deep) copy for nested objects, including arrays
        outObject[key] = deepCopyFunction(value);
    }

    return outObject;
};
const quanLyDatVeSlice = createSlice({
    name: "quanLyDatVe",
    initialState,
    reducers: {
        datGhe: (state, action) => {

            let danhSachGheCapNhat = deepCopyFunction(state.danhsachGheDangDat);

            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.payload.ghe.maGhe);

            if (index !== -1) {
                danhSachGheCapNhat.splice(index, 1)
            } else {
                danhSachGheCapNhat.push(action.payload.ghe)
            }
            return { ...state, danhsachGheDangDat: danhSachGheCapNhat }
        },
        changeTab: (state, action) => {
            let tabActiveNew = deepCopyFunction(state.tabActive)
            tabActiveNew = action.payload
            return { ...state, tabActive: tabActiveNew }
        },
        datGheDangDat: (state, action) => {
            let danhSachGheDangDat = deepCopyFunction(state.danhsachGheDangDat)
            let taiKhoan = action.payload.user.taiKhoan
            console.log("file: slice.jsx:61 ~ taiKhoan:", taiKhoan)
            let maLichChieu = action.payload.maLichChieu
            danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)
            // call api signalr 
            connection.invoke("datGhe", taiKhoan, danhSachGheDangDat, maLichChieu)
           
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDatVe.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getDatVe.fulfilled, (state, action) => {
                state.chiTietPhongVe = action.payload;
                state.isLoading = false;
            })
            .addCase(getDatVe.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(datVe.fulfilled, (state, action) => {
                state.danhsachGheDangDat = []
                if (action.payload.data.statusCode === 200) {
                    toast.success(action.payload.data.content)
                }
                state.tabActive = '2'
            })
    },
})
export const quanLyDatVeReducer = quanLyDatVeSlice.reducer;

export const quanLyDatVeAction = quanLyDatVeSlice.actions;