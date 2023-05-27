import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";
import style from "./CheckOut.module.css";
import "./../checkOut/CheckOut.css";
import { datVe, getDatVe } from "../../store/quanLyDatVe/thunkAction";
import { quanLyDatVeAction } from "../../store/quanLyDatVe/slice";
import _, { stubString } from "lodash";
import { Skeleton, Tabs } from "antd";
import { layThongTinNguoiDung } from "../../store/quanLyNguoiDung/thunkAction";
import moment from "moment/moment";
import { connection } from "../../index";
import { checkToken } from "../../constant/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CheckOut = () => {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.quanLyNguoiDung);
   const {
      chiTietPhongVe,
      isLoading,
      danhsachGheDangDat,
      dsGheKhachKhacDangDat,
   } = useSelector((state) => state.quanLyDatVe);
   checkToken();
   const param = useParams();
   const navigate = useNavigate()
   useEffect(() => {

      if (!localStorage.getItem("user")) {
         toast.error("Bạn chưa có tài khoản vui lòng đăng nhập để đặt vé");
         return (navigate("/login"))
      }
      dispatch(getDatVe(param.id));
      // Load ds ghế đặt từ server
      connection.on("loadDanhSachGheDaDat", (dsDatGhe) => {
         // console.log(dsDatGhe);
         // dsDatGhe.splice(0, dsDatGhe.length);
         console.log(dsDatGhe);
      });
   }, [dispatch]);
   const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
   const renderSeats = () => {
      return danhSachGhe.map((ghe, index) => {
         let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
         let classGheDaDat = ghe.daDat === true ? "gheDaDat1" : "";
         let classGheDaDuocDat =
            ghe.taiKhoanNguoiDat === user.taiKhoan ? "gheDaDuocDat" : "";
         let classGheDangDat = "";

         let indexGheDD = danhsachGheDangDat.findIndex(
            (gheDD) => gheDD.maGhe === ghe.maGhe
         );
         if (indexGheDD != -1) {
            classGheDangDat = "gheDangChon";
         }

         let indexGheKD = dsGheKhachKhacDangDat.findIndex(
            (gheKD) => gheKD.maGhe === ghe.maGhe
         );
         let classGheKhachDangDat = "";
         if (indexGheKD != -1) {
            classGheKhachDangDat = "gheKhachDangDat";
         }
         return (
            <Fragment key={index}>
               <button
                  onClick={() => {
                     const thongTinDatVe = {};
                     thongTinDatVe.user = user;
                     thongTinDatVe.maLichChieu = thongTinPhim.maLichChieu;
                     dispatch(
                        quanLyDatVeAction.datGhe({
                           ghe,
                        })
                     );
                     dispatch(quanLyDatVeAction.datGheDangDat(thongTinDatVe));
                  }}
                  disabled={ghe.daDat || classGheKhachDangDat !== ""}
                  className={`mt-3 ghe ${classGheKhachDangDat}  ${classGheDaDuocDat} ${classGheVip} ${classGheDaDat} ${classGheDangDat}`}
                  key={index}
               >
                  {ghe.daDat || classGheKhachDangDat !== "" ? (
                     <CloseOutlined />
                  ) : (
                     ghe.stt
                  )}
               </button>
               {(index + 1) % 16 === 0 ? <br /> : ""}
            </Fragment>
         );
      });
   };

   if (isLoading) {
      return (
         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {[...Array(1)].map((e, i) => {
               return (
                  <div className="grid grid-cols-12 mt-2" key={i}>
                     <Skeleton.Input
                        active
                        className="col-span-9"
                        style={{ width: 950, height: 400 }}
                     />
                     <Skeleton.Input
                        active
                        className="col-span-3 ml-2"
                        style={{ width: 250, height: 400, marginTop: "10px" }}
                     />
                  </div>
               );
            })}
         </div>
      );
   }
   return (
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
         <div className="grid grid-cols-12 mt-2">
            <div className="col-span-9">
               <div className="flex flex-col items-center mt-5">
                  <div
                     className="linner"
                     style={{ width: "100%", height: "20px" }}
                  ></div>
                  <div className={`${style["trapezoid"]} text-center`}>
                     <h3 className="text-black mt-3">Màn hình</h3>
                  </div>
                  <div className="text-center gr-ghe">{renderSeats()}</div>
                  <div className="mt-5 ">
                     <table className="text-white" style={{ width: "100%" }}>
                        <thead className="">
                           <tr>
                              <th>Ghế chưa đặt</th>
                              <th>Ghế đang đặt</th>
                              <th>Ghế vip</th>
                              <th>Ghế đã đặt</th>
                              <th>Ghế mình đặt</th>
                              <th>Ghế khách khác đang đặt</th>
                           </tr>
                        </thead>
                        <tbody className="">
                           <tr>
                              <th>
                                 <button className="ghe"></button>
                              </th>
                              <th>
                                 <button className="ghe gheDangChon"></button>
                              </th>
                              <th>
                                 <button className="ghe gheVip"></button>
                              </th>
                              <th>
                                 <button className="ghe gheDaDat1"></button>
                              </th>
                              <th>
                                 <button className="ghe gheDaDuocDat"></button>
                              </th>
                              <th>
                                 <button className="ghe gheKhachDangDat"></button>
                              </th>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
            <div className="col-span-3 ml-2 text-white ">
               <div className="box__bill  p-4 border-spacing-2">
                  <div className="my-0.5">
                     <h3 className="text-orange-400 text-center text-2xl">
                        {danhsachGheDangDat
                           .reduce((tongTien, ghe, index) => {
                              return (tongTien += ghe.giaVe);
                           }, 0)
                           .toLocaleString()}
                        đ
                     </h3>
                     <hr />
                     <h3 className="text-lg font">{thongTinPhim.tenPhim}</h3>
                     <p>Địa điểm: {thongTinPhim.tenCumRap}</p>
                     <p>Ngày chiếu: {thongTinPhim.ngayChieu}</p>
                  </div>
                  <hr />
                  <div className="flex flex-row my-5">
                     <div className="w-4/5 col">
                        <span className="text-red-400 font-bold">Ghế:</span>
                        {_.sortBy(danhsachGheDangDat, ["stt"]).map(
                           (gheDD, index) => {
                              return (
                                 <Fragment key={index}>
                                    <span
                                       key={index}
                                       className="text-orange-300 font-bold text-sm mx-0.5"
                                    >
                                       {gheDD.stt}
                                    </span>
                                    {(index + 1) % 6 === 0 ? <br /> : ""}
                                 </Fragment>
                              );
                           }
                        )}
                     </div>
                     <div className="text-right col-span-1">
                        <span className="text-white text-sm">
                           {danhsachGheDangDat
                              .reduce((tongTien, ghe, index) => {
                                 return (tongTien += ghe.giaVe);
                              }, 0)
                              .toLocaleString()}
                           đ
                        </span>
                     </div>
                  </div>
                  <hr />
                  <div className="my-0.5">
                     <i>Email</i> <br />
                     {user?.email}
                  </div>
                  <hr />
                  <div className="my-0.5">
                     <i>Phone</i> <br />
                     {user?.soDT}
                  </div>
                  <hr />
                  <div className="my-0.5">
                     <i>Mã giảm giá</i> <br />
                  </div>
                  <hr />
                  <div className="mb-0 h-full flex flex-col ">
                     <div
                        className="ticked1 cursor-pointer  text-white w-full text-center py-1  text-1xl my-1"
                        onClick={() => {
                           const thongTinDatVe = {};
                           thongTinDatVe.danhSachVe = danhsachGheDangDat;
                           thongTinDatVe.maLichChieu = thongTinPhim.maLichChieu;
                           dispatch(datVe(thongTinDatVe));
                           // call lai api
                           dispatch(getDatVe(param.id));
                        }}
                     >
                        ĐẶT VÉ
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
const KetQuaDatVe = () => {
   const { isLoading } = useSelector((state) => state.quanLyDatVe);
   const dispatch = useDispatch();
   const { thongTinNguoiDung, user } = useSelector(
      (state) => state.quanLyNguoiDung
   );
   useEffect(() => {
      dispatch(layThongTinNguoiDung());
   }, [thongTinNguoiDung]);

   const renderTickedItem = () => {
      if (thongTinNguoiDung.thongTinDatVe == "") {
         return (
            <div className="text-center">
               <p className="text-white" > Tài khoản này hiện chưa có thông tin đặt vé </p>
            </div>
         )
      } else {
         return thongTinNguoiDung.thongTinDatVe?.map((ticked, index) => {

            const ghe = [];
            ticked.danhSachGhe.map((tenGhe) => {
               ghe.push(" [" + tenGhe.tenGhe + "] ");
            });
            const seats = _.first(ticked.danhSachGhe);
            return (
               <div className="p-2 lg:w-1/3 md:w-1/2 w-full " key={index}>
                  <div className="h-full flex items-center bg-r01 border-gray-200 border p-4 rounded-lg">
                     <img
                        alt="team"
                        className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                        src={ticked.hinhAnh}
                     />
                     <div className="flex-grow ">
                        <h2 className="text-white title-font font-medium">
                           {ticked.tenPhim}
                        </h2>
                        <p className="text-white">
                           Giờ chiếu: {moment(ticked.ngatDat).format("hh:mm A")} -
                           Ngày chiếu {moment(ticked.ngatDat).format("DD-MM-YYYY")}
                        </p>
                        <p className="text-white">
                           Địa điểm: {seats.tenHeThongRap}
                        </p>
                        <p className="text-white">
                           Tên rập: {seats.tenCumRap} - Ghế:{" "}
                           <span className="letter text-orange-100">{ghe}</span>
                        </p>
                     </div>
                  </div>
               </div>
            );
         });
      }
   };
   if (isLoading) {
      return (
         <div className="max-w-screen-xl flex flex-col items-center justify-center mx-auto p-4">
            <div className="flex justify-center mb-10">
               <Skeleton.Input active style={{ width: 200, height: 50 }} />
            </div>
            {[...Array(3)].map((e, i) => {
               return (
                  <div className="my-3" key={i}>
                     <div className="grid grid-cols-3 gap-10">
                        <Skeleton.Input
                           active
                           className=""
                           style={{ width: 300, height: 200 }}
                        />
                        <Skeleton.Input
                           active
                           className=""
                           style={{ width: 300, height: 200 }}
                        />
                        <Skeleton.Input
                           active
                           className=""
                           style={{ width: 300, height: 200 }}
                        />
                     </div>
                  </div>
               );
            })}
         </div>
      );
   }
   return (
      <div className="max-w-screen-xl  mx-auto mb-40">
         <section className="text-gray-600 body-font">
            <div className="container px-1 py-1 mx-auto">
               <div className="flex flex-col text-center w-full mb-5">
                  <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
                     Lịch sử đặt vé
                  </h1>
                  <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
                     No hope.
                  </p>
               </div>
               <div className="flex flex-wrap -m-2">{renderTickedItem()}</div>
            </div>
         </section>
      </div>
   );
};
const items = [
   {
      key: "1",
      label: <p className="text-white">01 CHỌN GHẾ THANH TOÁN</p>,
      children: <CheckOut />,
   },
   {
      key: "2",
      label: <p className="text-white">02 KẾT QUẢ ĐẶT VÉ</p>,
      children: <KetQuaDatVe />,
   },
];

export default function App() {
   const { isLoading, tabActive } = useSelector((state) => state.quanLyDatVe);

   const dispatch = useDispatch();

   return (
      <div className="mt-32 z-10 relative">
         <Tabs
            defaultActiveKey={1}
            activeKey={tabActive}
            className="tabs "
            items={items}
            onChange={(key) => {
               dispatch(quanLyDatVeAction.changeTab(key.toString()));
            }}
         ></Tabs>
      </div>
   );
}
