import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import MainLayoutAdmin from "../layout/MainLayoutAdmin";
import Home from "../pages/home/Home";
import About from "../pages/About";
import MovieDetail from "../pages/MovieDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import User from "../pages/User";
import User1 from "../pages/Admin/User/User";
import CheckOut from "../pages/checkOut/CheckOut";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Fims from "../pages/Admin/Flims/Fims";
import Showtime from "../pages/Admin/Flims/Showtime";
import AddNew from "../pages/Admin/Flims/AddNew";
import EditFilm from "../pages/Admin/Flims/EditFilm";

import EditUser from "../pages/Admin/User/EditUser";
import AddUser from "../pages/Admin/User/AddUser";
import BookTickets from "../pages/Admin/User/BookTickets";
import PageNotFound from "../pages/PageNotFound";

const Router = () => {
   const elements = useRoutes([
      {
         path: "/",
         element: <MainLayout />,
         children: [
            {
               path: "/",
               element: <Home />,
            },
            {
               path: "/home",
               element: <Home />,
            },
            {
               path: "/about",
               element: <About />,
            },
            {
               path: "/moviedetail/:id",
               element: <MovieDetail />,
            },
            {
               path: "/checkout/:id",
               element: <CheckOut />,
            },
            {
               path: "/user",
               element: <User />,
            },
         ],
      },
      {
         path: "/register",
         element: <Register />,
      },
      {
         path: "/login",
         element: <Login />,
      },
      {
         path: "/admin",
         element: <MainLayoutAdmin />,
         children: [
            {
               path: "/admin",
               element: <Dashboard />,
            },
            {
               path: "/admin/film",
               element: <Fims />,
            },
            {
               path: "/admin/film/addnew",
               element: <AddNew />,
            },
            {
               path: "/admin/create_calendar/:nameFilm/:id",
               element: <Showtime />,
            },
            {
               path: "/admin/edit/:id",
               element: <EditFilm />,
            },
            {
               path: "/admin/user",
               element: <User1 />,
            },
            {
               path: "/admin/user/edit/:id",
               element: <EditUser />,
            },
            {
               path: "/admin/user/add",
               element: <AddUser />,
            },
            {
               path: "/admin/user/booktickets/:id",
               element: <BookTickets />,
            },
         ],
      },
      {
         path: "*",
         element: <Navigate to="/404" />,
      },
      {
         path: "/404",
         element: <PageNotFound />,
      },
   ]);
   return elements;
};

export default Router;
