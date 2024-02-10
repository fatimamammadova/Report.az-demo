import Link from "next/link";
import Image from "next/image";
import MainSwiper from "./components/swiper/mainSwiper/MainSwiper";
import VideoSwiper from "./components/swiper/videoSwiper/VideoSwiper";
import UrgentSwiper from "./components/swiper/urgentSwiper/UrgentSwiper";
import { getNews, getVideoNews } from "./libs/data";
import { formatDate, formatHours, getSlug } from "./libs/function";
import "./_home.scss";

export default async function Home() {
  const posts = await getNews();
  const videoNews = await getVideoNews();
  return (
    <main>
      <section id="main-news">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              
              <MainSwiper posts={posts} />

              <div className="story-link">
                <Link href="/">PREZİDENT SEÇKİLƏRİ - 2024</Link>
              </div>

              <UrgentSwiper posts={posts.slice(5, 15)} />

              <div className="main-news">
                <div className="main-news-container">
                  <div className="actual-news-blocks">
                    {posts.slice(7, 9).map((item, index) => (
                      <div className="actual-news-block" key={index}>
                        <div className="news-img">
                          <Image
                            src={`${item.image}`}
                            fill
                            priority={true}
                            sizes="cover"
                            alt="News Image"
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
                            href={item.slug}
                          >{`${item.title}`}</Link>

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
            <div className="col-lg-4">
              <VideoSwiper videoNews={videoNews} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
