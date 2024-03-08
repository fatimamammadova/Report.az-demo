"use client";
import { useEffect, useState } from "react";
import { addNewsFunction } from "../../lib/data";
import {
  getSlug,
  resetInputs,
  removeAllALerts,
  removeInputAlert,
  removeRadioInputAlert,
} from "../../lib/function";

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
    category: categories?.length >= 3 ? categories[2]?.title : "",
    userId: "65bd4808f1e5999380b13c97",
    date: date.toISOString(),
    sub_category:
      categories?.length >= 3 && categories[2]?.sub_categories?.length > 0
        ? categories[2].sub_categories[0]?.title
        : "",
  });

  const handleAddNews = async () => {
    try {
      if (addNews) {
        await addNewsFunction(addNews);
        setAddOpen(false);
      }
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  const controlInputs = () => {
    if (
      addNews.important !== undefined &&
      addNews.title !== undefined &&
      addNews.text !== undefined &&
      addNews.image !== undefined &&
      addNews.important !== "" &&
      addNews.title !== "" &&
      addNews.text !== "" &&
      addNews.image !== ""
    ) {
     
      handleAddNews();
    } else {
      const inputs = document.querySelectorAll(".form-modal .input");
      const radios = document.querySelectorAll(".form-modal .important-check");

      inputs.forEach((input) => {
        if (input.value === "") {
          input.classList.add("alert");
        } else {
          input.classList.remove("alert");
        }
      });

      const removeRadioAlert = () => {
        radios.forEach((radio) => {
          radio.classList.remove("alert");
        });
      };

      radios.forEach((radio) => {
        if (!radio.checked) {
          radio.classList.add("alert");
        } else {
          removeRadioAlert();
        }
      });
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
                    removeInputAlert(e.target);
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
                    removeInputAlert(e.target);
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
                    removeInputAlert(e.target);
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
                        removeRadioInputAlert();
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
                        removeRadioInputAlert();
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
                type="submit"
                className="yes-btn"
                onClick={(e) => {
                  e.preventDefault();
                  controlInputs();
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
                  removeAllALerts();
                  setSubCategories(categories[2]?.sub_categories);
                  setSubCategory(categories[2]?.sub_categories[0]?.title);
                  setAddNews({
                    important: false,
                    category:
                      categories?.length >= 3 ? categories[2]?.title : "",
                    sub_category:
                      categories?.length >= 3 &&
                      categories[2]?.sub_categories?.length > 0
                        ? categories[2].sub_categories[0]?.title
                        : "",
                  });
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
