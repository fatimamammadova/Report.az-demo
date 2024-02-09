import MainSwiper from "./components/swiper/mainSwiper/MainSwiper";
import VideoSwiper from "./components/swiper/videoSwiper/VideoSwiper";
import { getNews, getVideoNews } from "./libs/data";
import { sortedData } from "./libs/function";

export default async function Home() {
  const posts = await getNews()
  const videoNews = await getVideoNews();
  sortedData(posts) 
  return (
    <main>
      <section id="main-news">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <MainSwiper posts={posts}/>
            </div>
            <div className="col-lg-4">
              <VideoSwiper videoNews={videoNews}/>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
