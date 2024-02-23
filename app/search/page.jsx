import { getNews } from "../lib/data";
import {
  formatDate,
  formatHours,
  getSlug,
  getHighlightedWord,
  isHighlightedWord,
} from "../lib/function";
import Link from "next/link";
import Image from "next/image";
import "./_search.scss";

export const generateMetadata = ({ searchParams: { query } }) => {
  return {
    title: `Axtarış nəticəsi: ${query}`,
  };
};

export const Search = async ({ searchParams: { query } }) => {
  const posts = await getNews();

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
                      isHighlightedWord(
                        `${element.text.split(".").slice(0, 1)}.`,
                        query
                      ) || isHighlightedWord(element.title, query)
                  )
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
                              __html: getHighlightedWord(
                                `${item.text.split(".").slice(0, 1)}.`,
                                query
                              ),
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

export default Search;
