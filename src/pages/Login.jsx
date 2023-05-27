import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/quanLyNguoiDung/thunkAction";
import { Navigate, useNavigate } from "react-router-dom";
import { checkToken } from "../constant/api";
import "./CSS/login.css";
const Login = () => {
   const {
      handleSubmit,
      register,
      formState: { errors },
      reset,
   } = useForm({
      // defaultValues: { // state},
   });

   // useEffect(() => {
   //    // thông tin cần phải đợi api
   //    reset({
   //       taiKhoan: "viethai",
   //       matKhau: "12342",
   //    });
   //    reset({...user});
   // }, [user]);

   const dispatch = useDispatch();
   checkToken()
   const navigate = useNavigate();

   const { user } = useSelector((state) => state.quanLyNguoiDung);

   if (user) {
      return <Navigate to={"/home"} />;
   }

   return (



      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:flex container">
         <div className="lg:w-full xl:max-w-screen-sm mx-auto">
            <div className="pt-2 flex justify-center lg:justify-start ">
               <div className="cursor-pointer flex items-center">
                  <div style={{width:"100px", height:"100px"}}>
                     <div style={{width:"100%", height:"100%"}} className="logo_movie">

                     </div>
                  </div>
                  <div className="title_logo text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">Movie Film</div>
               </div>
            </div>
            <div className=" px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-1 xl:px-24 xl:max-w-2xl">
               <h2 className="loggin text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
               xl:text-bold">Log in</h2>
               <div className="mt-12">
                  <form
                     onSubmit={handleSubmit(async (value) => {
                        dispatch(login(value));
                     })}

                  >
                     <div>
                        <div className="text-sm font-bold text-white mb-1 tracking-wide">Tài khoản</div>
                        <input className="w-full text-lg py-1 px-1 border-b opacity-70 border-gray-300 focus:outline-none focus:border-indigo-500" type placeholder="mike@gmail.com"
                           {...register("taikhoan", {
                              required: "Vui lòng nhập mail !",
                              maxLength: {
                                 value: 10,
                                 message: "Tài khoản chỉ được nhập tối đa 10 ký tự"
                              },
                              minLength: {
                                 value: 5,
                                 message: "Tài khoản ít nhất 5 ký tự",
                              },
                           })}


                        />
                        <p className="text-[13px] text-yellow-200">
                           {
                              errors?.taikhoan?.message
                           }
                        </p>
                     </div>
                     <div className="mt-8">
                        <div className="flex justify-between items-center">
                           <div className="text-sm font-bold text-white mb-1 tracking-wide">
                              Password
                           </div>
                           <div>
                              <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                   cursor-pointer">
                                 Forgot Password?
                              </a>
                           </div>
                        </div>
                        <input className="w-full text-lg py-1 px-1 border-b  opacity-70 border-gray-300 focus:outline-none text-black" type="password" placeholder="Enter your password"

                           {...register("matKhau", {
                              required: "Vui lòng nhập tài khoản !",
                              // pattern: {
                              //    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                              //    message: "Vui lòng nhập đúng mật khẩu",
                              // },
                           })}
                        />
                        <p className="text-[13px] text-yellow-200">
                           {errors?.matKhau?.message}
                        </p>
                     </div>
                     <div className="mt-10">
                        <button className=" btb__login text-gray-100 p-4 w-full rounded-full tracking-wide
                           font-semibold font-display focus:outline-none focus:shadow-outline 
                           shadow-lg" type="submit">
                           Log In
                        </button>
                     </div>
                  </form>

                  <div className="mt-12 text-sm font-display font-semibold text-white text-center">
                     Don't have an account ? <a className="cursor-pointer linkchange" onClick={() => {
                        navigate("/register")
                     }}>Sign up</a>
                  </div>
               </div>
            </div>
         </div>
      
      </div>


   );
};

export default Login;
