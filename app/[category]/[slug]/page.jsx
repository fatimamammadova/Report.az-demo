import { getNews, getPost, getUser } from "@/app/lib/data";
import SideNews from "@/app/components/sideNews/SideNews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCalendar,
  faPaperPlane,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import "./_singleNews.scss";
import {
  getSlug,
  formatDate,
  formatHours,
  setTextHtml,
} from "@/app/lib/function";

export const generateMetadata = async ({ params: { slug } }) => {
  const posts = await getPost(slug);

  let title = `${posts[0].title}`
  if (title) {
    return {
      title: title,
    };
  } else {
    return {
      title: "Səhifə Tapılmadı!",
    };
  }
};

const SingleNews = async ({ params: { slug } }) => {
  const posts = await getPost(slug);
  const news = await getNews();
  const user = await getUser(posts[0].userId);


  return (
    <main>
      <section id="single-news" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts.map((item) => (
                <div className="single-news" key={item.id}>
                  <div className="news-heading">
                    <p>{item.title}</p>
                  </div>

                  <div className="category-date wrapping">
                    <Link
                      href={getSlug(item.sub_category)}
                      className="news-category"
                    >
                      {item.sub_category}
                    </Link>

                    <div className="date wrapping">
                      <FontAwesomeIcon icon={faCalendar} />
                      <div className="news-date">
                        <span>{`${formatDate(item.date)}`}</span>
                        <span>{`${formatHours(item.date)}`}</span>
                      </div>
                    </div>
                  </div>

                  <div className="img">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>

                  <div
                    className="about-content"
                    dangerouslySetInnerHTML={{
                      __html: setTextHtml(item.text),
                    }}
                  ></div>

                  <div className="socials-author wrapping">
                    <ul className="socials">
                      {[
                        { icon: faFacebookF },
                        { icon: faWhatsapp },
                        { icon: faPaperPlane },
                        { icon: faTwitter },
                      ].map((social, index) => (
                        <li key={index}>
                          <Link href="/">
                            <FontAwesomeIcon icon={social.icon} />
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <ul className="other-actions">
                      <li
                        dangerouslySetInnerHTML={{
                          __html:
                            '<a href="#"><i class="fa-solid fa-print"></i></a>',
                        }}
                      ></li>

                      <li>
                        <Link href="/">
                          <FontAwesomeIcon icon={faLink} />
                        </Link>
                      </li>
                    </ul>

                    {user &&
                      user.map((item) => (
                        <div className="author" key={item.id}>
                          <div className="author-img">
                            <Image
                              src={item.image}
                              alt={item.username}
                              width="0"
                              height="0"
                              sizes="100vw"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>

                          <p className="author-name">
                            <span>{item.username}</span>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-4">
              <SideNews posts={news.slice(0, 20)} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleNews;
