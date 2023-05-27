import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./multipleRow.scss";

const SampleNextArrow = (props) => {
   const { className, style, onClick } = props;
   return (
      <div
         className={`${className} arrow`}
         style={{ ...style, display: "block", right: "25px" }}
         onClick={onClick}
      ></div>
   );
};

const SamplePrevArrow = (props) => {
   const { className, style, onClick } = props;
   return (
      <div
         className={`${className} arrow`}
         style={{ ...style, display: "block" }}
         onClick={onClick}
      ></div>
   );
};

const MultipleRow = (props) => {
   const navigate = useNavigate();
   const settings = {
      className: "center variable-width",
      centerMode: true,
      infinite: true,
      initialSlide: 1,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      rows: 1,
      slidesPerRow: 2,
      slidesToScroll: 3,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      dots: false,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
               infinite: true,
               rows: 1,
               slidesPerRow: 2,
            },
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
               initialSlide: 2,
            },
         },
         {
            breakpoint: 640,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
            },
         },
      ],
   };
   const renderMovies = () => {
      return props.movieList?.map((movie) => {
         return (
            <div key={movie.maPhim} className=" p-4 movie-item">
               <div
                  onClick={() => {
                     navigate(`/moviedetail/${movie.maPhim}`);
                  }}
                  className="block lg:h-[30rem] rounded overflow-hidden relative"
               >
                  <div className="movie-overlay"></div>
                  <img
                     alt={movie.tenPhim}
                     className="object-cover object-center w-full h-full block"
                     src={movie.hinhAnh}
                  />
                  <div>
                     <FontAwesomeIcon
                        className="movie-trailer"
                        icon="fa-solid fa-play"
                     />
                  </div>
               </div>
               <div className="mt-4 relative">
                  {/* <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                 CATEGORY
                              </h3> */}
                  <h2 className="movie-name text-white title-font text-lg font-medium text-center">
                     {movie.tenPhim}
                  </h2>
                  <div className="movie-checkout">
                     <p
                        onClick={() => {
                           navigate(`/moviedetail/${movie.maPhim}`);
                        }}
                        className="text-white "
                     >
                        Mua vé
                     </p>
                  </div>

                  {/* <p className="mt-1">$16.00</p> */}
               </div>
            </div>
         );
      });
   };
   return (
      <div>
         <Slider {...settings}>{renderMovies()}</Slider>
      </div>
   );
};

export default MultipleRow;
