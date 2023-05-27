import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { quanLyNguoiDungServices } from "../services/quanLyNguoiDung.services";
import { toast } from "react-toastify";
import { checkToken } from "../constant/api";
import { layThongTinNguoiDung } from "../store/quanLyNguoiDung/thunkAction";
import { quanLyNguoiDungActions } from "../store/quanLyNguoiDung/slice";
import { store } from "../store";
import { useNavigate } from "react-router-dom";

const User = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();
   checkToken();
   const { user } = useSelector((state) => state.quanLyNguoiDung);
   useEffect(() => {
      console.log(user);
      if (!user) return;
      reset({ ...user });
   }, [user]);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   return (
      <div className="z-10 relative">
         <div className="max-w-screen-xl mx-auto p-4 mt-32">
            <h2 className="text-center text-2xl text-white">
               Thông tin tài khoản
            </h2>

            <form
               className="mt-10"
               onSubmit={handleSubmit(async (value) => {
                  try {
                     const res =
                        await quanLyNguoiDungServices.updateThongTinUser(value);
                     if (res.data.statusCode) {
                        toast.success(
                           "Thay thông tin thành công, Vui lòng nhập lại tài khoản"
                        );
                     }
                  } catch (err) {
                     toast.error("Thay đổi thông tin thất bại");
                  }
               })}
            >
               <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                     <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Tài khoản
                     </label>
                     <input
                        type="text"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        {...register("taiKhoan", {
                           required: "Vui lòng nhập tài khoản",
                           maxLength: {
                              value: 10,
                              message:
                                 "Tài khoản chỉ được nhập tối đa 10 kí tự",
                           },
                           minLength: {
                              value: 5,
                              message: "Tài khoản ít nhất 5 kí tự",
                           },
                        })}
                     />
                     <p className="text-red-500 text-[13px]">
                        {errors?.taiKhoan?.message}
                     </p>
                  </div>
                  <div>
                     <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Mật khẩu
                     </label>
                     <input
                        type="text"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Mật khẩu"
                        {...register("matKhau", {
                           required: "Vui lòng nhập mật khẩu",
                           pattern: {
                              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                              message:
                                 "Mật khẩu phải có 1 kí tự in hoa, 1 kí tự đặc biệt",
                           },
                        })}
                     />
                     <p className="text-red-500 text-[13px]">
                        {errors?.matKhau?.message}
                     </p>
                  </div>
                  <div>
                     <label
                        htmlFor="company"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Email
                     </label>
                     <input
                        type="text"
                        id="company"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Flowbite"
                        {...register("email", {
                           pattern: {
                              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                              message: "Vui lòng nhập đúng email",
                           },
                        })}
                     />
                     <p className="text-[13px] text-red-500">
                        {errors?.email?.message}
                     </p>
                  </div>

                  <div>
                     <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Số điện thoại
                     </label>
                     <input
                        type="tel"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register("soDT")}
                     />
                  </div>
                  <div>
                     <label
                        htmlFor="website"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Mã nhóm
                     </label>
                     <input
                        id="website"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="flowbite.com"
                        {...register("maNhom")}
                     />
                  </div>
                  <div>
                     <label
                        htmlFor="visitors"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                     >
                        Họ tên
                     </label>
                     <input
                        id="visitors"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Vui lòng nhập họ tên"
                        {...register("hoTen")}
                     />
                  </div>
               </div>

               <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               >
                  Submit
               </button>
            </form>
         </div>
      </div>
   );
};

export default User;
