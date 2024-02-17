"use client";
import { getNews } from "@/app/lib/data";
import { useEffect, useState } from "react";

export const SingleNews = ({ params: { slug } }) => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const post = await getNews();
      const singleNews = post.find((item) => item.slug === slug);
      setNews(singleNews);
      console.log(singleNews);
    };
    fetchData();
  }, [slug]);

  return <>{news && <span key={news.id}>{news.category}</span>}</>;
};

export default SingleNews;
