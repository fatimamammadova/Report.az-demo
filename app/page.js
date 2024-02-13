import Link from "next/link";
import Image from "next/image";
import MainSwiper from "./components/swiper/mainSwiper/MainSwiper";
import VideoSwiper from "./components/swiper/videoSwiper/VideoSwiper";
import UrgentSwiper from "./components/swiper/urgentSwiper/UrgentSwiper";
import { getNews, getVideoNews, getCategory } from "./libs/data";
import { formatDate, formatHours, getSlug } from "./libs/function";
import ImportantSwiper from "./components/swiper/importantSwiper/ImportantSwiper";
import SideNews from "./components/sideNews/SideNews";
import "./_home.scss";

export default async function Home() {
  const posts = await getNews();
  const videoNews = await getVideoNews();
  const links = await getCategory();
  return (
    <main>
      <section id="main-news">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <MainSwiper posts={posts.slice(0, 5)} />
              <div className="story-link">
                <Link href="/">PREZİDENT SEÇKİLƏRİ - 2024</Link>
              </div>
              <UrgentSwiper posts={posts.slice(5, 15)} />
              <div className="other-news">
                <div className="other-news-container">
                  <div className="actual-news-blocks">
                    {posts.slice(7, 9).map((item, index) => (
                      <div className="actual-news-block" key={index}>
                        <div className="img-container">
                          <Image
                            src={`${item.image}`}
                            fill
                            priority={true}
                            sizes="cover"
                            alt={item.title}
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div className="news-info">
                          <Link
                            className="news-category"
                            href={`${getSlug(item.category)}`}
                          >{`${item.category}`}</Link>
                          <Link
                            className="news-title"
                            href={`${getSlug(item.sub_category)}/${item.slug}`}
                          >{`${item.title}`}</Link>

                          <div className="news-date">
                            <span>{`${formatDate(item.date)}`}</span>
                            <span>{`${formatHours(item.date)}`}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="small-news-blocks">
                    {posts.slice(12, 24).map((item, index) => (
                      <div className="small-news-block" key={index}>
                        <div className="img">
                          <Link href={`${getSlug(item.sub_category)}/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              width="0"
                              height="0"
                              sizes="100vw"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </Link>
                        </div>
                        <div className="news-info">
                          <Link className="title" href={`${getSlug(item.sub_category)}/${item.slug}`}>
                            {`${item.title.slice(0, 63)}`}...
                          </Link>
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
              <ImportantSwiper posts={posts.slice(30, 39)} />
            </div>
            <div className="col-lg-4">
              <VideoSwiper videoNews={videoNews} />
              <SideNews posts={posts.slice(0, 20)} />
            </div>
          </div>
        </div>
      </section>

      <section id="category-news">
        <div className="container">
          <div className="row">
            {links.slice(2, 8).map((link) => (
              <div className="col-sm-12 col-lg-4 col-md-6" key={link.id}>
                <div className="category-news">
                  <Link className="main-title" href={`/${link.url}`}>
                    {link.title}
                  </Link>
                  {posts.filter((element) => element.category === link.title).slice(0,1).map((item) => (
                    <div className="news-block" key={item.id}>
                        <div className="img">
                          <Link href={`${getSlug(item.sub_category)}/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              width="0"
                              height="0"
                              sizes="100vw"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </Link>
                        </div>
                        <div className="news-info">
                          <Link className="title" href={`${getSlug(item.sub_category)}/${item.slug}`}>
                            {`${item.title}`}
                          </Link>
                          <div className="news-date">
                            <span>{`${formatDate(item.date)}`}</span>
                            <span>{`${formatHours(item.date)}`}</span>
                          </div>
                        </div>
                    </div>
                  ))}
                   <div className="small-news-blocks">
                    {posts.filter((element) => element.category === link.title).slice(1, 3).map((item) => (
                      <div className="small-news-block" key={item.id}>
                        <div className="img">
                          <Link href={`${getSlug(item.sub_category)}/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.title}
                              width="0"
                              height="0"
                              sizes="100vw"
                              style={{ width: "100%", height: "auto" }}
                            />
                          </Link>
                        </div>
                        <div className="news-info">
                          <Link className="title" href={`${getSlug(item.sub_category)}/${item.slug}`}>
                            {`${item.title.slice(0, 63)}`}...
                          </Link>
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
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
