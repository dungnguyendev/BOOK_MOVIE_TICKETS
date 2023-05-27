import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { quanLyPhimServices } from "../services/quanLyPhim.services";
import ShowtimeDetail from "../components/ShowtimeDetail";

const MovieDetail = () => {
   const params = useParams();
   const navigate = useNavigate();
   const [movieInfo, setMovieInfo] = useState({});

   useEffect(() => {
      (async () => {
         try {
            const res = await quanLyPhimServices.fetchMovieInfo(params.id);
            setMovieInfo(res.data.content);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [params.id]);

   const items = [
      {
         key: "1",
         label: <p className="text-white">TỔNG QUAN</p>,
         children: `OVERVIEW`,
      },
      {
         key: "2",
         label: <p className="text-white">ĐÁNH GIÁ</p>,
         children: `REVIEW`,
      },
      {
         key: "3",
         label: <p className="text-white">LỊCH CHIẾU</p>,
         children: <ShowtimeDetail />,
      },
   ];
   return (
      <section
         className="text-gray-600 body-font overflow-hidden pt-28 z-10 relative"
         id="movieDetail"
      >
         <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap justify-between">
               <img
                  alt=""
                  className="w-[300px] h-[600px] object-cover object-center rounded"
                  src={movieInfo?.hinhAnh}
               />
               <div className="lg:w-3/5 w-full mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-200 tracking-widest">
                     {movieInfo?.ngayKhoiChieu}
                  </h2>
                  <h1 className="text-gray-100 text-3xl title-font font-medium mb-1">
                     {movieInfo?.tenPhim}
                  </h1>
                  <div className="flex mb-4">
                     <span className="flex items-center">
                        <svg
                           fill="currentColor"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           className="w-4 h-4 text-yellow-400"
                           viewBox="0 0 24 24"
                        >
                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg
                           fill="currentColor"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           className="w-4 h-4 text-yellow-400"
                           viewBox="0 0 24 24"
                        >
                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg
                           fill="currentColor"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           className="w-4 h-4 text-yellow-400"
                           viewBox="0 0 24 24"
                        >
                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg
                           fill="currentColor"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           className="w-4 h-4 text-yellow-400"
                           viewBox="0 0 24 24"
                        >
                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <svg
                           fill="none"
                           stroke="currentColor"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           className="w-4 h-4 text-yellow-400"
                           viewBox="0 0 24 24"
                        >
                           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-white ml-3">4 Reviews</span>
                     </span>
                     <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                        <a className="text-orange-400">
                           <svg
                              fill="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                           >
                              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                           </svg>
                        </a>
                        <a className="text-orange-400">
                           <svg
                              fill="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                           >
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                           </svg>
                        </a>
                        <a className="text-orange-400">
                           <svg
                              fill="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              className="w-5 h-5"
                              viewBox="0 0 24 24"
                           >
                              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                           </svg>
                        </a>
                     </span>
                  </div>
                  <p className="leading-relaxed text-white border-b-2 border-orange-300 mb-5 pb-4">
                     {movieInfo?.moTa}
                  </p>

                  <Tabs className="mt-3" items={items} />
               </div>
            </div>
         </div>
      </section>
   );
};

export default MovieDetail;
