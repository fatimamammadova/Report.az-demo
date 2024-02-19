import { getPost } from "@/app/lib/data";

export const SingleNews = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  const [item] = post;

  return <>{item && <span key={item.id}>{item.category}</span>}</>;
};

export default SingleNews;
