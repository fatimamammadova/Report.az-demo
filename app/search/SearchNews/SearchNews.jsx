"use client";
import {
  formatDate,
  formatHours,
  getSlug,
  getHighlightedWord,
  isHighlightedWord,
  highlightedSentece,
} from "../../lib/function";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./_searchNews.scss";

export const SearchNews = ({ posts, query }) => {
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
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (scroll > document.documentElement.offsetHeight - 1000) {
        setLastData((prevLastData) => prevLastData + 15);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [scroll]);
  
  return (
    <main>
      <section id="search" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                <p>Açar sözü: {query}</p>
              </div>

              <div className="news-list">
                {posts
                  .filter(
                    (element) =>
                      isHighlightedWord(element.text, query) ||
                      isHighlightedWord(element.title, query)
                  )
                  .slice(0, lastData)
                  .map((item) => (
                    <div className="news-item" key={item.id}>
                      <div className="img">
                        <Link
                          href={`${getSlug(item.sub_category)}/${item.slug}`}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            width="0"
                            height="0"
                            sizes="100vw"
                            priority={true}
                            style={{ width: "100%", height: "auto" }}
                          />
                        </Link>
                      </div>
                      <div className="news-info">
                        <Link
                          className="title"
                          href={`${getSlug(item.sub_category)}/${item.slug}`}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: getHighlightedWord(item.title, query),
                            }}
                          />
                        </Link>

                        <div className="description">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: highlightedSentece(item.text, query),
                            }}
                          ></p>
                        </div>

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
  );
};

export default SearchNews;
