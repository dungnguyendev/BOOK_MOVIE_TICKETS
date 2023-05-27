import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { quanLyPhimServices } from "../../services/quanLyPhim.services";
import { useDispatch } from "react-redux";
import "./banner.css";

const Banner = () => {
   const [bannerList, setBannerList] = useState([]);
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         try {
            const res = await quanLyPhimServices.getBannerList();

            setBannerList(res.data.content);
         } catch (error) {
            console.log(error);
         }
      })();
   }, []);
   return (
      <Carousel autoplay>
         {bannerList.map((banner) => {
            return (
               <div key={banner.maBanner}>
                  <div
                     className="banner"
                     style={{
                        backgroundImage: `url(${banner.hinhAnh})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                     }}
                  ></div>
               </div>
            );
         })}
      </Carousel>
   );
};

export default Banner;
