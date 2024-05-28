"use client"
import { getSlug, formatDate, formatHours } from "../../lib/function";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./_categoryNews.scss";

const CategoryNews = ({ posts }) => {
  const [lastData, setLastData] = useState(15);
  const [scroll, setScroll] = useState();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.innerHeight + window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scroll > document.documentElement.offsetHeight - 1000) {
        setLastData((prevLastData) => prevLastData + 15);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [scroll]);

  return (
    <div className="news-blocks">
      <div className="row">
        {posts &&
          posts.slice(0, lastData).map((item) => (
            <div
              className="col-sm-auto col-sm-6 col-md-4 col-lg-3 news-block"
              key={item.id}
            >
              <div className="img">
                <Link href={`${getSlug(item.sub_category)}/${item.slug}`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width="0"
                    height="0"
                    sizes="100vw"
                    priority="true"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              </div>
              <div className="news-info">
                <Link
                  className="title"
                  href={`${getSlug(item.sub_category)}/${item.slug}`}
                >
                  {item.title}
                </Link>
                <div className="news-date">
                  <span>{`${formatDate(item.date)}`}</span>
                  <span>{`${formatHours(item.date)}`}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryNews;
