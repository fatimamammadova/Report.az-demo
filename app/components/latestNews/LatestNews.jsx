import Link from "next/link";
import { formatHours, getSlug } from "../../libs/function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightLong
} from "@fortawesome/free-solid-svg-icons";
import "./_latestNews.scss";

export const LatestNews = async ({ posts }) => {
  return (
    <div className="latest-news">
      <Link className="main-title" href="/">
        Son xəbərlər
      </Link>
      <div className="news-container">
        <div className="latest-news-blocks">
          {posts.map((item, index) => (
            <div className="latest-news-block" key={index}>
              <div className="news-time">
                <span>{`${formatHours(item.date)}`}</span>
              </div>
              <div className="news-info">
                <div className="title-subcategory">
                  <Link
                    href={`/${getSlug(item.category)}/${getSlug(
                      item.sub_category
                    )}/${item.slug}`}
                    className="title"
                  >
                    <span>{`${item.title}`}</span>
                  </Link>
                  <Link href={getSlug(item.sub_category)} className="category">
                    {item.sub_category}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="go-to-page">
          <Link href="/son-xeberler/">Bütün xəbər lenti</Link>
          <FontAwesomeIcon icon={faArrowRightLong} />
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
