"use client";
import { getCategory, getNews } from "../lib/data";
import { getSlug, formatDate, formatHours } from "../lib/function";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./_categoryNews.scss";

export const SingleCategory = ({ params: { category } }) => {
  const [singleCategory, setSingleCategory] = useState([]);
  const [categoryNews, setCategoryNews] = useState([]);
  const [lastData, setLastData] = useState(15);
  const [scroll, setScroll] = useState();
  const [subCategory, setSubCategory] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategory();
      const posts = await getNews();
      const subCategoryArr = categories.filter((item) => item.url === category);
      setSingleCategory(subCategoryArr);

      setSubCategory(subCategoryArr[0].sub_categories);
      const categoryNewsArr = posts.filter(
        (item) => getSlug(item.category).slice(1) === category
      );
      setCategoryNews(categoryNewsArr);
    };
    fetchData();
  }, []);

  return (
    <main>
      <section id="categoryNews">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                {singleCategory &&
                  singleCategory.map((item) => (
                    <p key={item.id}>{item.title}</p>
                  ))}
              </div>
              <div
                className={`filter-date ${
                  subCategory.length > 0 ? "" : "hidden"
                }`}
              >
                <ul>
                  {singleCategory &&
                    singleCategory.map((item) =>
                      item.sub_categories.map((subItem, index) => (
                        <li key={index}>
                          <Link href={subItem.url} className="sub-category-btn">
                            {subItem.title}
                          </Link>
                        </li>
                      ))
                    )}
                </ul>
              </div>
              <div className="news-blocks">
                <div className="row">
                  {categoryNews &&
                    categoryNews.slice(0, lastData).map((item) => (
                      <div
                        className="col-sm-auto col-sm-6 col-md-4 col-lg-3 news-block"
                        key={item.id}
                      >
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleCategory;
