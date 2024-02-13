"use client";
import Link from "next/link";
import Image from "next/image";
import { getNews } from "../libs/data";
import { formatDate, formatHours, getSlug } from "../libs/function";
import "./_latestNews.scss";
import { useEffect, useState } from "react";

export const LatestNews = () => {
  const [scroll, setScroll] = useState();
  const [posts, setPosts] = useState();
  const [lastData, setLastData] = useState(15);
  const [open,setOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const post = await getNews();
      setPosts(post);
    };
    fetchData();
  }, []);

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

    <>
    <main>
      <section id="latestNews">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                <p>Son xəbərlər</p>
                <button type="button" className="add-news-btn sub-category-btn" onClick={() => setOpen((prev) => !prev)}>
                  Xəbər əlavə et
                </button>
              </div>
              <div className="filter-date">
                <ul>
                  {[
                    { title: "Bu gün", url: "/son-xeberler/today" },
                    { title: "Dünən", url: "/son-xeberler/yesterday" },
                    { title: "Bu həftə", url: "/son-xeberler/this_week" },
                    { title: "Bu ay", url: "/son-xeberler/this_month" },
                    { title: "Keçən həftə", url: "/son-xeberler/prev_week" },
                    { title: "Keçən ay", url: "/son-xeberler/prev_month" },
                  ].map((item, index) => (
                    <li key={index}>
                      <Link href={`${item.url}`} className="sub-category-btn">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="news-list">
                {posts &&
                  posts.slice(0, lastData).map((item) => (
                    <div
                      className={`news-item ${item.important && "highlighted"}`}
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
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Link>
                      </div>
                      <div className="news-info">
                        <Link className="title" href={`${getSlug(item.sub_category)}/${item.slug}`}>
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
          </div>
        </div>
      </section>
    </main>
    <div className={`add-news-modal ${open ? "show" : ""}`}>
        
    </div>
    </>
  );
};

export default LatestNews;
