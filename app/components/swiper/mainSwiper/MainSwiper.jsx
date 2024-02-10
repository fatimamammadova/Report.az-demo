"use client";
import {
  formatDate,
  formatHours,
  getSlug,
} from "@/app/libs/function";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, Navigation, FreeMode } from "swiper/modules";
import "./_mainSwiper.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import Link from "next/link";

export const MainSwiper = ({ posts }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div id="main-swiper">
      <Swiper
        className="mainSwiper"
        modules={[Autoplay, Thumbs]}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {posts.slice(0, 5).map((item, index) => (
          <SwiperSlide key={index}>
            <div className="slide-bg">
              <Image
                src={`${item.image}`}
                fill
                priority={true}
                sizes="cover"
                alt="News Image"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="slide-content">
              <Link
                className="news-category"
                href={`${getSlug(item.category)}`}
              >{`${item.category}`}</Link>
              <Link
                className="news-title"
                href={item.slug}
              >{`${item.title}`}</Link>

              <div className="news-date">
                <span>{`${formatDate(item.date)}`}</span>
                <span>{`${formatHours(item.date)}`}</span>
              </div>
            </div>
            <div className="divider"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mainSwiper2"
      >
        {posts.slice(0, 5).map((item, index) => (
          <SwiperSlide key={index}>
            <div className="thumbs-img">
              <Image
                src={`${item.image}`}
                fill
                priority={true}
                sizes="cover"
                alt="Thumbs Image"
                style={{ objectFit: "cover" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSwiper;