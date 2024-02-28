import { getCategory, getNews } from "../lib/data";
import NewsData from "./NewsData/NewsData";
// import { unstable_noStore as noStore } from "next/cache";

export const generateMetadata = async () => {
  return {
    title: "Son Xəbərlər",
  };
};

export const LatestNews = async () => {
  // noStore();
  const posts = await getNews();
  const category = await getCategory()

  return (
    <>
      <NewsData posts={posts} category={category} />
    </>
  );
};

export default LatestNews;
