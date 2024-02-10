"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./_videoSwiper.scss";

export const VideoSwiper =  ({videoNews}) => {
 
  return (
    <div id="video-swiper">
      <h2 className="swiper-title">Video xəbərlər</h2>
      <Swiper pagination={{ clickable: true }} modules={[Pagination]} className="mainSwiper3">
        {videoNews.map((item, index) => (
          <SwiperSlide key={index}>
             {/* <div
              className="video-container"
              dangerouslySetInnerHTML={{
                __html: item.src,
              }}
            ></div> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSwiper;
