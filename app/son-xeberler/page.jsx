import { getNews } from "../lib/data";
import "./_latestNews.scss";
import NewsData from "./NewsData/NewsData";

export const generateMetadata = async () => {
  return {
    title: 'Son Xəbərlər',
  }
}

export const LatestNews = async () => {
  const posts = await getNews();

  return (
    <>
      <NewsData posts={posts}/>
    </>
  );
};

export default LatestNews;
