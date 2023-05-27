import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./Banner";
import ShowtimeMovies from "./../../components/ShowtimeMovies";
import { getShowtimeTheaterSystem } from "../../store/quanLyRap/thunkAction";
import MultipleRows from "../../components/RSlick/MultipleRow";
import { getmovieList } from "../../store/quanLyPhim/thunkAction";
import { Skeleton } from "antd";

// const contentStyle = {
//    backgroundImage: "url('./bgmovie.jpg')",
// };
const Home = () => {
   const dispatch = useDispatch();
   const { movieList, isLoading } = useSelector((state) => state.quanLyPhim);
   const { theaterSystemGroup } = useSelector((state) => state.quanLyRap);

   useEffect(() => {
      dispatch(getShowtimeTheaterSystem());
      dispatch(getmovieList());
   }, [dispatch]);

   if (isLoading) {
      return (
         <div className="flex flex-wrap justify-center gap-2">
            {[...Array(10)].map((e, i) => {
               return (
                  <div className="flex flex-col w-1/4" key={i}>
                     <Skeleton.Input style={{ width: 300, height: 400 }} />
                     <Skeleton.Input
                        style={{ width: 300, height: 60, marginTop: "10px" }}
                     />
                  </div>
               );
            })}
         </div>
      );
   }

   return (
      <div>
         <Banner />

         <div className="pt-3 z-10 relative">
            <h3 className="title-list">ĐANG CHIẾU</h3>
            <section className="text-gray-600 body-font lg:w-4/5 m-auto">
               <MultipleRows movieList={movieList} />
            </section>
         </div>

         <ShowtimeMovies theaterSystemGroup={theaterSystemGroup} />
      </div>
   );
};

export default Home;
