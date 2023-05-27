import React, { useEffect, useState } from "react";
import { Radio, Space, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { quanLyRapServices } from "../services/quanLyRap.servies";
import "./showtimeMovies.scss";
import {
   getGroupTheater,
   getTheaterList,
} from "../store/quanLyRap/thunkAction";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";

const ShowtimeMovies = (props) => {
   const navigate = useNavigate();
   const theaterSystem = props.theaterSystemGroup;

   const renderShowtime = () => {
      return theaterSystem?.map((theater, index) => {
         return {
            key: index,
            label: (
               <img
                  src={theater.logo}
                  alt=""
                  className="rounded-full"
                  width="50"
               />
            ),
            children: (
               <Tabs
                  className="lg:w-[600px] md:w-[300px] w-[200px]"
                  // style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  tabPosition="left"
                  items={theater.lstCumRap?.map((item, index) => {
                     return {
                        key: index,
                        label: (
                           <div className="flex">
                              <img
                                 src={item.hinhAnh}
                                 alt=""
                                 className="lg:w-1/4 md:w-1/4 w-1/4"
                              />
                              <div className="ml-1">
                                 <h3 className="text-green-600 font-medium">
                                    {item.tenCumRap}
                                 </h3>
                                 <p className="text-gray-500 address-tab">
                                    {item.diaChi}
                                 </p>
                              </div>
                           </div>
                        ),
                        children: (
                           <>
                              {item.danhSachPhim?.map((film, index) => {
                                 return (
                                    <div
                                       className="lg:flex md:flex py-1 hidden"
                                       key={index}
                                    >
                                       <img
                                          src={film.hinhAnh}
                                          alt=""
                                          className="lg:w-[100px] lg:h-[100px] md:w-[100px] md:h-[100px] w-[80px] h-[80px]"
                                       />
                                       <div className="ml-1">
                                          <h3>{film.tenPhim}</h3>
                                          <p>{item.diaChi}</p>
                                          <div className="grid lg:grid-cols-5 lg:gap-2 md:grid-cols-2 md:gap-1">
                                             {film.lstLichChieuTheoPhim
                                                ?.slice(0, 10)
                                                .map((showtime, index) => {
                                                   return (
                                                      <button
                                                         className="bg-gray-400  text-green-700 font-semibold hover:text-orange-400 border border-gray-500 rounded"
                                                         key={index}
                                                         onClick={() => {
                                                            navigate(
                                                               `/checkout/${showtime.maLichChieu}`
                                                            );
                                                         }}
                                                      >
                                                         {moment(
                                                            showtime.ngayChieuGioChieu
                                                         ).format("hh:mm A")}
                                                      </button>
                                                   );
                                                })}
                                          </div>
                                       </div>
                                       <hr />
                                    </div>
                                 );
                              })}
                           </>
                        ),
                     };
                  })}
               />
            ),
         };
      });
   };
   return (
      <section className="text-gray-600 body-font bg-white z-10 relative py-4">
         <div className="md:w-3/5 lg:w-4/5 lg:mx-auto home-showtime">
            <Tabs
               defaultActiveKey="0"
               className="parent-tab"
               style={{ border: "1px solid gray", borderRadius: "4px" }}
               tabPosition="left"
               items={renderShowtime()}
            />
         </div>
      </section>
   );
};

export default ShowtimeMovies;
