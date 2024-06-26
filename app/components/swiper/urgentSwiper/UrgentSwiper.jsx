"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay, Navigation } from "swiper/modules";
import { React } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, formatHours, getSlug } from "@/app/lib/function";
import "swiper/css";
import "swiper/css/navigation";
import "./_urgentSwiper.scss";

const UrgentSwiper = async ({ posts }) => {
  return (
    <div className="breaking-news-swiper">
      <div className="label">
        <FontAwesomeIcon icon={faBolt} />
        <h3>Təcili xəbərlər</h3>
      </div>
      <div className="swiper-container">
        <Swiper
          modules={[Navigation, Scrollbar, Autoplay]}
          spaceBetween={50}
          loop={true}
          navigation={{
            nextEl: ".swiper-controls .next-button",
            prevEl: ".swiper-controls .prev-button",
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="mainSwiper4"
        >
          {posts.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="news-item">
                <Link
                  className="news-heading"
                  href={`${getSlug(
                    item.sub_category
                  )}/${item.slug}`}
                >{`${item.title}`}</Link>

                <div className="news-date">
                  <span>{`${formatDate(item.date)}`}</span>
                  <span>{`${formatHours(item.date)}`}</span>
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
    </div>
  );
};

export default UrgentSwiper;
