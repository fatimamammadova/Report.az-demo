import { getNews } from "../lib/data";
import SearchNews from "./SearchNews/SearchNews";

export const generateMetadata = ({ searchParams: { query } }) => {
  return {
    title: `Axtarış nəticəsi: ${query}`,
  };
};

const Search = async ({ searchParams: { query } }) => {
  const posts = await getNews();

  return <SearchNews posts={posts} query={query}/>;
};

export default Search;
