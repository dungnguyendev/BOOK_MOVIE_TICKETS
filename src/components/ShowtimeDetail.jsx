import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getShowtimeInfo } from "../store/quanLyRap/thunkAction";
import { quanLyRapServices } from "../services/quanLyRap.servies";
import moment from "moment";

const ShowtimeDetail = () => {
   const [showtimeInfo, setShowtimeInfo] = useState();
   const dispatch = useDispatch();
   const params = useParams();
   const navigate = useNavigate();

   // const { showtimeInfo } = useSelector((state) => state.quanLyRap);
   useEffect(() => {
      (async () => {
         try {
            const res = await quanLyRapServices.fetchShowtimeInfo(params.id);
            setShowtimeInfo(res.data.content);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [params.id]);

   console.log(showtimeInfo);

   return (
      <section className="text-gray-600 body-font bg-transparent">
         <div className="container mx-auto home-showtime">
            <Tabs
               className="parent-tab"
               style={{ border: "1px solid gray", borderRadius: "4px" }}
               tabPosition="left"
               items={showtimeInfo?.heThongRapChieu.map((theater) => {
                  console.log(theater.cumRapChieu);
                  return {
                     key: theater.maHeThongRap,
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
                           className="detail"
                           style={{ width: "800px" }}
                           tabPosition="left"
                           items={theater.cumRapChieu.map((item) => {
                              console.log(item);
                              return {
                                 key: item.maLichChieu,
                                 label: (
                                    <>
                                       <h3 className="text-orange-600 font-medium">
                                          {item.tenCumRap}
                                       </h3>
                                       <p className="text-gray-300 address-tab">
                                          {item.diaChi}
                                       </p>
                                       <div>
                                          {item.lichChieuPhim.map((i) => {
                                             return (
                                                <button
                                                   onClick={() => {
                                                      navigate(
                                                         `/checkout/${i.maLichChieu}`
                                                      );
                                                   }}
                                                   className="bg-gray-100 hover:bg-gray-200 hover:text-orange-400 text-black font-bold py-2 px-4 rounded mr-1"
                                                >
                                                   {moment(
                                                      i.ngayChieuGioChieu
                                                   ).format("hh:mm A")}
                                                </button>
                                             );
                                          })}
                                       </div>
                                    </>
                                 ),
                              };
                           })}
                        />
                     ),
                  };
               })}
            />
         </div>
      </section>
   );
};

export default ShowtimeDetail;
