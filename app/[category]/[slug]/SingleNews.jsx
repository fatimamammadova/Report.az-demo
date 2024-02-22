import { getPost } from "@/app/lib/data";


const SingleNews = async ({ params: { slug } }) => {
  const posts = await getPost(slug);

  return (
    <div>
      {posts && posts.map((item) => <p>{item.title}</p>)}
    </div>
  );
};

export default SingleNews;
