"use client";
import { getCategory, getNews } from "../lib/data";
import { getSlug } from "../lib/function";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoryNews from "./categoryNews/CategoryNews";

export const SingleCategory = ({ params: { category } }) => {
  const [singleCategory, setSingleCategory] = useState([]);
  const [categoryNews, setCategoryNews] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategory();
      const posts = await getNews();
      let categoryArr = [];
      let categoryNewsArr = [];
      const Category = categories.find((item) => item.url === category);
      if (Category) {
        categoryArr.push(Category);
        categoryArr.forEach((item) => {
          setSubCategory(item.sub_categories);
        });
        categoryNewsArr = posts.filter(
          (item) => getSlug(item.category).slice(1) === category
        );
      } else {
        categoryNewsArr = posts.filter(
          (item) => getSlug(item.sub_category).slice(1) === category
        );
        categories.forEach((cat) => {
          const SubCategory = cat.sub_categories.find(
            (sub) => sub.url === category
          );
          if (SubCategory) {
            categoryArr.push(SubCategory);
          }
        });
      }
      setSingleCategory(categoryArr);
      setCategoryNews(categoryNewsArr);
    };
    fetchData();
  }, [category]);

  return (
    <main>
      <section id="categoryNews" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                {singleCategory &&
                  singleCategory.map((item, index) => (
                    <p key={index}>{item.title}</p>
                  ))}
              </div>
              <div
                className={`filter-date ${
                  subCategory.length > 0 ? "" : "hidden"
                }`}
              >
                <ul>
                  {subCategory.map((subItem, index) => (
                    <li key={index}>
                      <Link href={subItem.url} className="sub-category-btn">
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <CategoryNews posts={categoryNews} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleCategory;
