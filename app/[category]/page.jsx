import { getCategory, getNews } from "../lib/data";
import { getSlug } from "../lib/function";
import Link from "next/link";
import CategoryNews from "./categoryNews/CategoryNews";

export const generateMetadata = async ({ params: { category } }) => {
  const categories = await getCategory();
  const Category = categories.find((item) => item.url === category);
  let title;
  if (Category) {
    title = `${Category.title} Xəbərləri`;
  } else {
    categories.forEach((cat) => {
      const SubCategory = cat.sub_categories.find(
        (sub) => sub.url === category
      );
      if (SubCategory) {
        title = SubCategory.title;
      }
    });
  }

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

export const SingleCategory = async ({ params: { category } }) => {
  let categoryArr;
  let categoryNewsArr;
  let subCategoryArr = [];
  const categories = await getCategory();
  const posts = await getNews();
  const Category = categories.find((item) => item.url === category);
  if (Category) {
    categoryArr = [Category];
    subCategoryArr = categoryArr[0].sub_categories;
    categoryNewsArr = posts.filter(
      (item) => getSlug(item.category).slice(1) === category
    );
  } else {
    categoryNewsArr = posts.filter(
      (item) => getSlug(item.sub_category).slice(1) === category
    );
    categories.forEach((cat) => {
      const SubCategory = cat.sub_categories.find(
        (sub) => sub.url === category
      );
      if (SubCategory) {
        categoryArr = [SubCategory];
      }
    });
  }

  return (
    <main>
      <section id="categoryNews" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                {categoryArr &&
                  categoryArr.map((item, index) => (
                    <p key={index}>{item.title}</p>
                  ))}
              </div>
              <div
                className={`filter-date ${
                  subCategoryArr.length > 0 ? "" : "hidden"
                }`}
              >
                <ul>
                  {subCategoryArr.map((subItem, index) => (
                    <li key={index}>
                      <Link href={subItem.url} className="sub-category-btn">
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <CategoryNews posts={categoryNewsArr} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleCategory;
