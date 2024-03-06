"use client";
import { useEffect, useState } from "react";
import { getUpdate } from "@/app/lib/data";
import { getSlug } from "../../lib/function";

export const UpdateModal = ({
  post,
  categories,
  updateOpen,
  setUpdateOpen,
  subCategories,
  setSubCategories,
  subCategory,
  setSubCategory,
}) => {
  const date = new Date();
  const [updateNews, setUpdateNews] = useState({});

  useEffect(() => {
    setUpdateNews({
      title: post ? post.title : "",
      text: post ? post.text : "",
      important: post ? post.important : false,
      category: post ? post.category : "",
      sub_category: post ? post.sub_category : "",
      userId: post ? post.userId : "",
      image: post ? post.image : "",
      slug: post ? post.slug : "",
      date: date.toISOString(),
    });
  }, [post]);

  const subCategoriesForUpdate = (e) => {
    const newsCategory = e.target.value;
    if (newsCategory) {
      const categoryArr = categories.filter(
        (element) => element.title === newsCategory
      )[0];
      setSubCategories(categoryArr.sub_categories);

      const isSubCategory =
        categoryArr && categoryArr.sub_categories.length > 0 ? true : false;

      if (isSubCategory) {
        setUpdateNews({
          ...updateNews,
          category: newsCategory,
        });
      } else {
        setUpdateNews({
          ...updateNews,
          category: newsCategory,
          sub_category: newsCategory,
        });
      }
    }
  };

  useEffect(() => {
    if (post && post.id) {
      const defaultNewsCategory = document.getElementById("category-update");

      if (defaultNewsCategory) {
        const defaultCategoryValue = defaultNewsCategory.value;

        if (defaultCategoryValue) {
          const categoryArr = categories.filter(
            (element) => element.title === defaultCategoryValue
          )[0];

          setSubCategories(categoryArr.sub_categories);
        }
      }
    }
  }, [post]);

  const handleUpdate = async () => {
    if (post && updateNews) {
      await getUpdate(post.id, updateNews);
      setUpdateOpen(false);
    }
  };

  return (
    <div className={`form-modal data-modal ${updateOpen ? "show-modal" : ""}`}>
      <div className="modal">
        <div className="modal-inner">
          {post && (
            <form key={post.id}>
              <div className="form-scroll">
                <div className="form-input">
                  <label htmlFor="title">Xəbər başlığı</label>
                  <input
                    type="text"
                    id="title-update"
                    className="news-heading"
                    defaultValue={post.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      setUpdateNews({
                        ...updateNews,
                        title: newTitle,
                        slug: getSlug(newTitle).slice(1),
                      });
                    }}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="text">Xəbər Məzmunu</label>
                  <textarea
                    id="text-update"
                    className="news-text"
                    cols="30"
                    rows="15"
                    defaultValue={post.text}
                    onChange={(e) => {
                      const newText = e.target.value;
                      setUpdateNews({ ...updateNews, text: newText });
                    }}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="image">Xəbərlə bağlı şəkil</label>
                  <input
                    type="text"
                    id="image-update"
                    className="news-image"
                    defaultValue={post.image}
                    onChange={(e) => {
                      const newsImage = e.target.value;
                      setUpdateNews({ ...updateNews, image: newsImage });
                    }}
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="category">Xəbərin kateqoriyasi</label>
                  <select
                    name="categories"
                    id="category-update"
                    defaultValue={post.category}
                    onChange={subCategoriesForUpdate}
                  >
                    {categories &&
                      categories.slice(2).map((cat) => (
                        <option key={cat.url} value={cat.title}>
                          {cat.title}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-input">
                  <label htmlFor="subCategory">Xəbərin alt kateqoriyasi</label>
                  <select
                    name="sub-categories"
                    id="subCategories-update"
                    defaultValue={subCategory}
                    onChange={(e) => {
                      const newsSubCategory = e.target.value;
                      setSubCategory(newsSubCategory);
                      setUpdateNews({
                        ...updateNews,
                        sub_category: newsSubCategory,
                      });
                    }}
                  >
                    {subCategories.map((subCat) => (
                      <option key={subCat.url} value={subCat.title}>
                        {subCat.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-input">
                  <div>
                    <p style={{ display: "block" }}>Bu xəbər vacibdir?</p>

                    <div className="input-container">
                      <input
                        type="radio"
                        name="news-important"
                        id="yes"
                        className="important-check"
                        value="true"
                        defaultChecked={post.important}
                        onChange={() => {
                          setUpdateNews({
                            ...updateNews,
                            important: true,
                          });

                          console.log(updateNews);
                        }}
                      />
                      <label htmlFor="yes" style={{ fontWeight: "500" }}>
                        Bəli
                      </label>
                    </div>

                    <div className="input-container">
                      <input
                        type="radio"
                        name="news-important"
                        id="no"
                        className="important-check"
                        value="false"
                        defaultChecked={!post.important}
                        onChange={() => {
                          setUpdateNews({
                            ...updateNews,
                            important: false,
                          });
                        }}
                      />
                      <label htmlFor="yes" style={{ fontWeight: "500" }}>
                        Xeyr
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="buttons">
                <button
                  type="submit"
                  className="yes-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdateOpen(false);
                    handleUpdate();
                  }}
                >
                  Redaktə et
                </button>
                <button
                  className="no-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setUpdateOpen(false);
                  }}
                >
                  Ləğv et
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
