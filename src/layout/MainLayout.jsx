import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
   return (
      <div className="MainLayout flex flex-col h-full">
         <Header />

         <div
            className="MainContent flex-1 relative"
            style={{
               backgroundImage: "url(./bgmovie.jpg)",
               backgroundAttachment: "fixed",
               backgroundRepeat: "no-repeat",
               backgroundSize: "cover",
               backgroundPosition: "center",
               zIndex: 1,
            }}
         >
            <Outlet />
            <div
               className="overlay"
               style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 2,
                  backgroundColor: "rgba(0,0,0,0.5)",
               }}
            ></div>
         </div>

         <Footer />
      </div>
   );
};

export default MainLayout;
