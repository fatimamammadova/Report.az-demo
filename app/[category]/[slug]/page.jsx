import { getNews, getPost } from "@/app/lib/data";
import SideNews from "@/app/components/sideNews/SideNews";
import "./_singleNews.scss"

const SingleNews = async ({ params: { slug } }) => {
  const posts = await getPost(slug);
  const news = await getNews();

  return (
    <main>

      <section id="single-news" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page-title">
              {posts && posts.map((item) => <p key={item.id}>{item.title}</p>)}
              </div>



            </div>

            <div className="col-lg-4">
              <SideNews posts={news.slice(0, 20)}/>

            </div>
          </div>
        </div>

      </section>
      
    </main>
  );
};


export default SingleNews;