import { getCategory, getNews } from "../lib/data";
import NewsData from "./NewsData/NewsData";

export const generateMetadata = async () => {
  return {
    title: "Son Xəbərlər",
  };
};

export const LatestNews = async () => {
  const posts = await getNews();
  const categories = await getCategory()

  return (
    <>
      <NewsData posts={posts} categories={categories} />
    </>
  );
};

export default LatestNews;
