"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, formatHours, getSlug } from "@/app/lib/function";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./_importantSwiper.scss";

export const ImportantSwiper = ({ posts }) => {
  return (
    <div className="important-swiper">
      <h2 className="main-title">Ən vacib xəbərlər</h2>
      <Swiper
        modules={[Navigation, FreeMode]}
        breakpoints={{
          576: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={30}
        freeMode={true}
        navigation={{
          nextEl: ".swiper-controls .next-button",
          prevEl: ".swiper-controls .prev-button",
        }}
        className="importantSwiper"
      >
        {posts.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="counted-news" key={index}>
              <div className="img">
                <Link
                  href={`${getSlug(item.category)}${getSlug(
                    item.sub_category
                  )}/${item.slug}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    title={item.title}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              </div>
              <div className="info">
                <div className="num-title">
                  <div className="news-number">
                    <span>{`0${index + 1}.`}</span>
                  </div>
                  <Link
                    className="title"
                    href={`${getSlug(item.category)}${getSlug(
                      item.sub_category
                    )}/${item.slug}`}
                  >
                    {`${item.title.slice(0, 70)}`}...
                  </Link>
                </div>
                <div className="category-date">
                  <Link
                    href={`${getSlug(item.category)}`}
                    className="category"
                  >
                    <span>{`${item.category}`}</span>
                  </Link>
                  <div className="news-date">
                    <span>{`${formatDate(item.date)}`}</span>
                    <span>{`${formatHours(item.date)}`}</span>
                  </div>
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
