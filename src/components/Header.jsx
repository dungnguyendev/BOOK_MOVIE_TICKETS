import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { quanLyNguoiDungActions } from "../store/quanLyNguoiDung/slice";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useScrollDirection } from "./scrollDirection";

const Header = () => {
   const { t, i18n } = useTranslation();
   const navigate = useNavigate();
   const ref = useRef(null);

   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.quanLyNguoiDung);
   const handleChange = (value) => {
      i18n.changeLanguage(value);
   };

   const scrollDirection = useScrollDirection();

   return (
      <header
         className={`fixed ${scrollDirection === "down" ? "-top-28" : "top-0"
            } p-1 bg-gray-900 text-gray-100 bg-opacity-40 w-full z-50`}
      >
         <div className="container flex justify-between h-16 mx-auto">
            <NavLink
               rel="noopener noreferrer"
               aria-label="Back to homepage"
               className="flex items-center p-2"
            >
               <FontAwesomeIcon
                  className="header-icon"
                  icon="fa-solid fa-film"
               />
            </NavLink>
            <ul
               ref={ref}
               className="items-stretch hidden space-x-3 lg:flex header-mobile"
            >
               <li className="flex nav--item">
                  <NavLink
                     rel="noopener noreferrer"
                     to="/home"
                     className="flex items-center px-4 -mb-1 dark:border-transparent hover:text-orange-400"
                  >
                     {t('home')}
                  </NavLink>
               </li>
               <li className="flex nav--item">
                  <NavLink
                     rel="noopener noreferrer"
                     to="/showing-movies"
                     className="flex items-center px-4 -mb-1 dark:border-transparent hover:text-orange-400 "
                  >
                     {t('showingmovies')}
                  </NavLink>
               </li>
               <li className="flex nav--item">
                  <NavLink
                     rel="noopener noreferrer"
                     to="/coming-movies"
                     className="flex items-center px-4 -mb-1 dark:border-transparent hover:text-orange-400 "
                  >
                     {t('comingmovies')}
                  </NavLink>
               </li>
               <li className="flex nav--item">
                  <NavLink
                     rel="noopener noreferrer"
                     to="/about"
                     className="flex items-center px-4 -mb-1 dark:border-transparent hover:text-orange-400 "
                  >
                     {t('about')}
                  </NavLink>
               </li>
               <li className="flex">
                  <Select
                     defaultValue="Language"
                     style={{
                        width: 120,
                        display: "flex",
                     }}
                     className="flex items-center px-4 -mb-1 dark:border-transparent"
                     onChange={handleChange}
                     options={[
                        {
                           value: "en",
                           label: "English",
                        },
                        {
                           value: "vn",
                           label: "Việt Nam",
                        },
                        {
                           value: "chi",
                           label: "Trung Quốc",
                        },
                     ]}
                  />
               </li>
            </ul>
            {!!!user && (
               <div className="items-center flex-shrink-0 hidden lg:flex">
                  <button className="self-center px-8 py-3 rounded hover:text-orange-400">
                     <NavLink to="/login">{t('singin')}</NavLink>
                  </button>
                  <button className="self-center px-8 py-3 font-semibold rounded dark:bg-orange-400 dark:text-gray-900 hover:text-white">
                     <NavLink to="/register">{t('signup')}</NavLink>
                  </button>
               </div>
            )}
            {user && (
               <div className="items-center flex-shrink-0 hidden lg:flex">
                  <p
                     onClick={() => {
                        navigate("/user");
                     }}
                     className="cursor-pointer self-center px-8 py-3 rounded hover:text-orange-400"
                  >
                     {t('hello')}, <span className="font-bold">{user.taiKhoan}</span>
                  </p>
                  <button
                     onClick={() => {
                        dispatch(quanLyNguoiDungActions.logOut());

                        navigate("/login");
                     }}
                     className="self-center px-8 py-3 font-semibold rounded bg-orange-400 text-gray-900"
                  >
                     {t('logout')}
                  </button>
               </div>
            )}

            <button
               onClick={() => {
                  const element = ref.current;
                  console.log(element.style.display);

                  if (element.style.display !== "none") {
                     element.style.display = "none";
                  } else {
                     element.style.display = "flex";
                  }
               }}
               className="p-4 lg:hidden"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 dark:text-gray-100"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M4 6h16M4 12h16M4 18h16"
                  ></path>
               </svg>
            </button>
         </div>
      </header>
   );
};

export default Header;
