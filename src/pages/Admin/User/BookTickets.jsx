import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinNguoiDungByID } from '../../../store/quanLyNguoiDung/thunkAction'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import _ from 'lodash'

const BookTickets = () => {
  const dispatch = useDispatch()
  const { thongTinNguoiDungByID } = useSelector((state) => state.quanLyNguoiDung)
  const param = useParams()
  useEffect(() => {
    dispatch(layThongTinNguoiDungByID(param.id))
  }, [])
  const ShowBookTickets = () => {
    if(thongTinNguoiDungByID?.thongTinDatVe == ""){
      return (
        <div className='text-center'><p className='ml-4 mt-3'>Người dùng này hiện chưa có đặt vé :((</p></div>
      )
    }else{
      return thongTinNguoiDungByID.thongTinDatVe?.map((ticked, index) => {
        const ghe = [];
        ticked.danhSachGhe.map((item) => {
          ghe.push("[ " + item.tenGhe + " ]")
        })
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
      })
    }

  }
  return (
    <div>
      <h3 className='text-2xl font-bold mb-3'>Thông tin đặt vé</h3>

      <div className="flex flex-wrap -m-2"> {ShowBookTickets()}</div>
    </div>
  )
}

export default BookTickets