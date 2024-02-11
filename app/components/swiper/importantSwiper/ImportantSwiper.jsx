"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, formatHours } from "@/app/libs/function";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import './_importantSwiper.scss'

export const ImportantSwiper = ({ posts }) => {
  return (
    <div className="important-swiper">
      <h2 className="swiper-title">Ən vacib xəbərlər</h2>
      <Swiper
        modules={[FreeMode, Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        autoplay={{
          delay: 5000,
        }}
        navigation={{
          nextEl: ".swiper-controls .next-button",
          prevEl: ".swiper-controls .prev-button",
        }}
        className="mySwiper"
      >
        {posts.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="news-card-block" key={index}>
              <div className="img">
                <Link href={`${item.slug}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              </div>
              <div className="news-info">
                <Link className="title" href={item.slug}>
                  {`${item.title.slice(0, 63)}`}...
                </Link>
                <div className="news-date">
                  <span>{`${formatDate(item.date)}`}</span>
                  <span>{`${formatHours(item.date)}`}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-controls">
          <button className="prev-button">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className="next-button">
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default ImportantSwiper;
