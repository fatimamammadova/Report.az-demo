"use client";
import { getNews } from "../lib/data";
import "./_latestNews.scss";
import { useEffect, useState } from "react";
import NewsData from "./NewsData/NewsData";

export const LatestNews = () => {
  const [posts, setPosts] = useState();
 
  useEffect(() => {
    const fetchData = async () => {
      const post = await getNews();
      setPosts(post);
    };
    fetchData();
  }, []);

  return (
    <>
      <NewsData posts={posts}/>
    </>
  );
};

export default LatestNews;
