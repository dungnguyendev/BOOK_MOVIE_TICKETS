import React from "react";
import { useForm } from "react-hook-form";
import { quanLyNguoiDungServices } from "../services/quanLyNguoiDung.services";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import "./CSS/login.css";
const Register = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ mode: "onChange" });

   const navigate = useNavigate();

   return (
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:flex container">
         <div className="lg:w-full xl:max-w-screen-sm mx-auto">
            <div className="pt-2 flex justify-center lg:justify-start ">
               <div className="cursor-pointer flex items-center">
                  <div style={{ width: "100px", height: "100px" }}>
                     <div
                        style={{ width: "100%", height: "100%" }}
                        className="logo_movie"
                     ></div>
                  </div>
                  <div className="title_logo text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
                     Movie Film
                  </div>
               </div>
            </div>
            <div className="loggin mt-10 px-12 sm:px-24 md:px-48 lg:px-12  xl:px-24 xl:max-w-2xl">
               <h2
                  className="text-center text-4xl font-display font-semibold lg:text-left xl:text-5xl
               xl:text-bold"
               >
                  Register
               </h2>
               <div className="mt-12">
                  <form
                     onSubmit={handleSubmit(async (value) => {
                        try {
                           const res = await quanLyNguoiDungServices.register(
                              value
                           );
                           if (res.data.statusCode !== 400) {
                              message.success("Đăng ký tài khoàn thành công");
                              navigate("/login");
                           }
                        } catch (error) {
                           message.error("Đăng ký thất bại");
                        }
                     })}
                  >
                     <div>
                        <div className="mb-1 text-sm font-bold text-white king-wide">
                           Email Address
                        </div>
                        <input
                           className="w-full px-1 text-lg py-1 border-b  opacity-70 focus:outline-none text-black"
                           type
                           placeholder="mike@gmail.com"
                           {...register("email", {
                              required: "Vui lòng nhập mail !",
                              pattern: {
                                 value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                 message: "Vui lòng nhập đúng email",
                              },
                           })}
                        />
                        <p className="text-[13px] text-yellow-200">
                           {errors?.email?.message}
                        </p>
                     </div>
                     <div>
                        <div className="mb-1 text-sm mt-2 font-bold text-white  tracking-wide">
                           Tài khoản
                        </div>
                        <input
                           className="w-full px-1 text-lg py-1 border-b opacity-70 border-gray-300 focus:outline-none text-black"
                           type
                           placeholder="Tài khoản"
                           {...register("taikhoan", {
                              required: "Vui lòng nhập tài khoản !",
                              maxLength: {
                                 value: 10,
                                 message:
                                    "Tài khoản chỉ được nhập tối đa 10 ký tự",
                              },
                              minLength: {
                                 value: 5,
                                 message: "Tài khoản ít nhất 5 ký tự",
                              },
                           })}
                        />
                        <p className="text-[13px] text-yellow-200">
                           {errors?.taikhoan?.message}
                        </p>
                     </div>
                     <div>
                        <div className="mb-1 text-sm mt-2 font-bold text-white  tracking-wide">
                           Password
                        </div>
                        <input
                           className="w-full px-1 text-lg py-1 border-b opacity-70 border-gray-300 focus:outline-none text-black"
                           type="password"
                           placeholder="Password"
                           {...register("matKhau", {
                              required: "Vui lòng nhập password !",
                              pattern: {
                                 value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                                 message: "Vui lòng nhập đúng mật khẩu",
                              },
                           })}
                        />
                        <p className="text-[13px] text-yellow-200">
                           {errors?.matKhau?.message}
                        </p>
                     </div>
                     <div>
                        <div className="mb-1 text-sm mt-2 font-bold text-white  tracking-wide">
                           Họ và tên
                        </div>
                        <input
                           className="w-full px-1 text-lg py-1 border-b opacity-70 border-gray-300 focus:outline-none text-black"
                           type
                           placeholder="Họ và tên"
                           {...register("hoten", {
                              required: "Vui lòng nhập họ tên của bạn",
                           })}
                        />
                        <p className="text-[13px] text-yellow-200">
                           {errors?.hoten?.message}
                        </p>
                     </div>
                     <div>
                        <div className="mb-1 text-sm mt-2 font-bold text-white  tracking-wide">
                           Số điện thoại
                        </div>
                        <input
                           className="w-full px-1 text-lg py-1 border-b opacity-70 border-gray-300 focus:outline-none text-black"
                           type
                           placeholder="Số điện thoại"
                           {...register("sodt", {
                              required: "Vui lòng nhập số điện thoại !",
                              pattern: {
                                 value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                                 message: "Vui lòng nhập đúng số điện thoại",
                              },
                           })}
                        />
                        <p className="text-[13px] text-yellow-200">
                           {errors?.sodt?.message}
                        </p>
                     </div>
                     <div className="mt-10">
                        <button
                           className=" btb__login  text-gray-100 p-4 w-full rounded-full tracking-wide
                           font-semibold font-display focus:outline-none focus:shadow-outline 
                           shadow-lg"
                        >
                           Log In
                        </button>
                        <div className="text-white mt-1">
                           You have account ?{" "}
                           <a
                              href="#"
                              className="linkchange"
                              onClick={() => {
                                 navigate("/login");
                              }}
                           >
                              Login
                           </a>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Register;
