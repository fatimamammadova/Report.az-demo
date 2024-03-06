"use client";
import { useEffect, useState } from "react";
import { addNewsFunction } from "@/app/lib/data";
import { getSlug } from "../../lib/function";

export const AddModal = ({
  categories,
  addOpen,
  setAddOpen,
  subCategories,
  setSubCategories,
  subCategory,
  setSubCategory,
}) => {
  const date = new Date();
  const [addNews, setAddNews] = useState({
    important: false,
    category: categories?.length >= 3 ? categories[2]?.title : "",
    userId: "65bd4808f1e5999380b13c97",
    date: date.toISOString(),
    sub_category:
      categories?.length >= 3 && categories[2]?.sub_categories?.length > 0
        ? categories[2].sub_categories[0]?.title
        : "",
  });
  const resetInputs = () => {
    const inputs = document.querySelectorAll(".add-modal .input");
    const radios = document.querySelectorAll(".add-modal .important-check");

    inputs.forEach((input) => {
      if (input.tagName === "INPUT") {
        input.value = "";
      } else if (input.tagName === "TEXTAREA") {
        input.value = "";
      }
      else if (input.tagName === "SELECT") {
        input.value = input.options[0]?.value;
      }
    });

    radios.forEach((radio) => {
      radio.checked = false;
    });

    setSubCategories(categories[2]?.sub_categories);
    setSubCategory(categories[2]?.sub_categories[0]?.title);

    setAddNews({
      important: false,
      category: categories?.length >= 3 ? categories[2]?.title : "",
      sub_category:
        categories?.length >= 3 && categories[2]?.sub_categories?.length > 0
          ? categories[2].sub_categories[0]?.title
          : "",
    });
  };

  const handleAddNews = async () => {
    if (addNews) {
      await addNewsFunction(addNews);
      setAddOpen(false);
    }
  };

  const handleSubCategories = (e) => {
    const newsCategory = e.target.value;
    const categoryArr = categories.find(
      (element) => element.title === newsCategory
    );
    const subCategoryTitle =
      categoryArr && categoryArr.sub_categories.length > 0
        ? categoryArr.sub_categories[0].title
        : "";
    setSubCategories(
      categoryArr ? categoryArr.sub_categories : categories[2].sub_categories
    );
    if (subCategoryTitle) {
      setAddNews({
        ...addNews,
        category: newsCategory,
        sub_category: subCategoryTitle,
      });
    } else {
      setAddNews({
        ...addNews,
        category: newsCategory,
        sub_category: newsCategory,
      });
    }
  };

  useEffect(() => {
    const defaultNewsCategory = document.getElementById("category").value;
    if (categories) {
      const categoryArr = categories.find(
        (element) => element.title === defaultNewsCategory
      );
      setSubCategories(
        categoryArr ? categoryArr.sub_categories : categories[2].sub_categories
      );
    }
  }, [categories]);

  return (
    <div
      className={`add-modal form-modal data-modal ${
        addOpen ? "show-modal" : ""
      }`}
    >
      <div className="modal">
        <div className="modal-inner">
          <form action="">
            <div className="form-scroll">
              <div className="form-input">
                <label htmlFor="title">Xəbər başlığı</label>
                <input
                  type="text"
                  id="title"
                  className="news-heading input"
                  defaultValue={""}
                  onChange={(e) => {
                    const newsTitle = e.target.value;

                    setAddNews({
                      ...addNews,
                      title: newsTitle,
                      slug: getSlug(newsTitle).slice(1),
                    });
                  }}
                />
              </div>

              <div className="form-input">
                <label htmlFor="text">Xəbər Məzmunu</label>
                <textarea
                  id="text"
                  className="news-text input"
                  cols="30"
                  rows="15"
                  defaultValue={""}
                  onChange={(e) => {
                    const newsText = e.target.value;
                    setAddNews({ ...addNews, text: newsText });
                  }}
                />
              </div>

              <div className="form-input">
                <label htmlFor="image">Xəbərlə bağlı şəkil</label>
                <input
                  type="text"
                  id="image"
                  className="input"
                  defaultValue={""}
                  onChange={(e) => {
                    const newsImage = e.target.value;
                    setAddNews({ ...addNews, image: newsImage });
                  }}
                />
              </div>

              <div className="form-input">
                <label htmlFor="category">Xəbərin kateqoriyasi</label>
                <select
                  name="categories"
                  id="category"
                  className="input"
                  defaultValue={
                    categories && categories.length > 2
                      ? categories[2].title
                      : ""
                  }
                  onChange={handleSubCategories}
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
                  id="subCategory"
                  className="input"
                  defaultValue={subCategory}
                  onChange={(e) => {
                    const newsSubCategory = e.target.value;
                    setSubCategory(e.target.value);
                    setAddNews({ ...addNews, sub_category: newsSubCategory });
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
                      value="true"
                      className="important-check"
                      onClick={() => {
                        setAddNews({ ...addNews, important: true });
                        console.log(addNews);
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
                      value="false"
                      className="important-check"
                      onClick={() => {
                        setAddNews({ ...addNews, important: false });
                        console.log(addNews);
                      }}
                    />
                    <label htmlFor="no" style={{ fontWeight: "500" }}>
                      Xeyr
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="buttons">
              <button
                type="button"
                className="yes-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleAddNews();
                }}
              >
                Əlavə et
              </button>
              <button
                className="no-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setAddOpen(false);
                  resetInputs();
                }}
              >
                Ləğv et
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
