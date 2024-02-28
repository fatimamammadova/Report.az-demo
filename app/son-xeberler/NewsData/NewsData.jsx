"use client";
import Link from "next/link";
import Image from "next/image";

import { formatDate, formatHours, getSlug } from "../../lib/function";
import "./_newsData.scss";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { getCategory, getDelete, getUpdate } from "@/app/lib/data";

export const NewsData = ({ posts, category }) => {
  const path = usePathname();
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [newsId, setNewsId] = useState("");
  const [updateNews, setUpdateNews] = useState({});

  const [lastData, setLastData] = useState(15);
  const [scroll, setScroll] = useState();
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.innerHeight + window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scroll > document.documentElement.offsetHeight - 1000) {
        setLastData((prevLastData) => prevLastData + 15);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [scroll]);

  useEffect(() => {
    const newsBlocks = document.querySelectorAll(".news-item");
    const removeActives = () => {
      newsBlocks.forEach((item) => {
        const selectBtnContainer = item.querySelector(".selectbox");
        selectBtnContainer.classList.remove("open");
      });
    };

    const handleClickOutside = (e) => {
      const editDeleteBtn = e.target.closest(".edit-delete-btn");
      if (!editDeleteBtn) {
        removeActives();
      }
    };

    newsBlocks.forEach((item) => {
      const editDeleteBtn = item.querySelector(".edit-delete-btn");
      const selectBtnContainer = item.querySelector(".selectbox");
      editDeleteBtn.addEventListener("click", () => {
        removeActives();
        if (editDeleteBtn && selectBtnContainer) {
          selectBtnContainer.classList.add("open");
          setNewsId(item.dataset.id);
        }
      });
    });

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [lastData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const modal = e.target.querySelector(".show-modal .modal-inner");
      if (modal) {
        setAddOpen(false);
        setUpdateOpen(false);
        setDeleteOpen(false);
      }
    };

    const deleteData = async () => {
      if (newsId) {
        await getDelete(newsId);
      }
    };

    const updateData = async () => {
      if (newsId) {
        await getUpdate(newsId, updateNews);
      }
    };

    const deleteBtn = document.querySelector(".delete-modal .yes-btn");
    const updateBtn = document.querySelector(".update-modal .yes-btn");

    deleteBtn.addEventListener("click", deleteData);
    if (updateBtn) {
      updateBtn.addEventListener("click", updateData);
    }
    window.addEventListener("click", handleClickOutside);

    return () => {
      deleteBtn.removeEventListener("click", deleteData);
      if (updateBtn) {
        updateBtn.removeEventListener("click", updateData);
      }
      window.removeEventListener("click", handleClickOutside);
    };
  }, [newsId]);

  return (
    <>
      <main>
        <section id="latestNews" className="page-section">
          <div className="container">
            <div className="row">
              <div className="col-12 wrapping">
                <div className="page-title">
                  <p>Son xəbərlər</p>
                  <button
                    type="button"
                    className="add-news-btn sub-category-btn"
                    onClick={() => setAddOpen((prev) => !prev)}
                  >
                    Xəbər əlavə et
                  </button>
                </div>
                <div className="filter-date">
                  <ul>
                    {[
                      { title: "Bu gün", url: "/son-xeberler/today" },
                      { title: "Dünən", url: "/son-xeberler/yesterday" },
                      { title: "Bu həftə", url: "/son-xeberler/this_week" },
                      { title: "Bu ay", url: "/son-xeberler/this_month" },
                      { title: "Keçən həftə", url: "/son-xeberler/prev_week" },
                      { title: "Keçən ay", url: "/son-xeberler/prev_month" },
                    ].map((item, index) => (
                      <li key={index}>
                        <Link
                          href={`${item.url}`}
                          className={`sub-category-btn ${
                            path === item.url && "active"
                          } `}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="news-list">
                  {posts &&
                    posts.slice(0, lastData).map((item) => (
                      <div
                        className={`news-item ${
                          item.important ? "highlighted" : ""
                        }`}
                        key={item.id}
                        data-id={item.id}
                      >
                        <div className="img">
                          <Link
                            href={`${getSlug(item.sub_category)}/${item.slug}`}
                          >
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
                          <Link
                            className="title"
                            href={`${getSlug(item.sub_category)}/${item.slug}`}
                          >
                            {item.title}
                          </Link>
                          <div className="news-date">
                            <span>{`${formatDate(item.date)}`}</span>
                            <span>{`${formatHours(item.date)}`}</span>
                          </div>
                        </div>
                        <div className="edit-delete">
                          <button className="edit-delete-btn select-btn">
                            <span className="icon-container">
                              <FontAwesomeIcon icon={faEllipsisVertical} />
                            </span>
                          </button>

                          <div className="selectbox">
                            <button
                              className="delete select-btn"
                              onClick={() => setDeleteOpen((prev) => !prev)}
                            >
                              <span className="icon-container">
                                <FontAwesomeIcon icon={faTrashCan} />
                              </span>
                              <span className="btn-name">Sil</span>
                            </button>

                            <button
                              className="edit select-btn"
                              onClick={() => setUpdateOpen((prev) => !prev)}
                            >
                              <span className="icon-container">
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </span>
                              <span className="btn-name">Redaktə et</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div
        className={`delete-modal data-modal ${deleteOpen ? "show-modal" : ""}`}
      >
        <div className="modal">
          <div className="modal-inner">
            <h2 className="modal-title">Xəbəri silmək istəyirsiniz?</h2>
            <div className="buttons">
              <button className="yes-btn" onClick={() => setDeleteOpen(false)}>
                Bəli
              </button>
              <button className="no-btn" onClick={() => setDeleteOpen(false)}>
                Xeyr
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`update-modal data-modal ${updateOpen ? "show-modal" : ""}`}
      >
        <div className="modal">
          <div className="modal-inner">
            {posts
              .filter((item) => item.id === newsId)
              .map((item) => (
                <form key={item.id}>
                  <div className="form-scroll">
                    <div className="form-input">
                      <label htmlFor="title">Xəbər başlığı</label>
                      <input
                        type="text"
                        id="title"
                        className="news-heading"
                        defaultValue={item.title}
                        onChange={(e) => {
                          const newTitle = e.target.value;
                          setUpdateNews({
                            ...updateNews,
                            title: newTitle,
                            slug: getSlug(newTitle),
                          });
                        }}
                      />
                    </div>

                    <div className="form-input">
                      <label htmlFor="text">Xəbər Məzmunu</label>
                      <textarea
                        id="text"
                        className="news-text"
                        cols="30"
                        rows="15"
                        defaultValue={item.text}
                        onChange={(e) => {
                          const newText = e.target.value;
                          setUpdateNews({ ...updateNews, text: newText });
                        }}
                      />
                    </div>

                    <div className="form-input">
                      <label htmlFor="image">Xəbərlə bağlı şəkil</label>
                      <input type="file" id="image" className="news-image" />
                    </div>

                    <div className="form-input">
                      <label htmlFor="category">Xəbərin kateqoriyasi</label>
                      <select
                        name="categories"
                        id="category"
                        defaultValue={item.url}
                        onChange={(e) => {
                          const newCategory = e.target.value;
                          console.log(newCategory)
                          const selectedCategory = category.find(
                            (cat) => cat.url === newCategory
                          );
                          const selectedSubCategory =
                            selectedCategory.sub_categories[0];
                          setUpdateNews({
                            ...updateNews,
                            category: selectedCategory.title,
                            sub_category: selectedSubCategory.title,
                          });
                        }}
                      >
                        <option value={item.url}>{item.category}</option>
                        {category &&
                          category
                            .slice(2)
                            .filter((el) => el.title !== item.category)
                            .map((item) => (
                              <option key={item.url} value={item.url}>
                                {item.title}
                              </option>
                            ))}
                      </select>
                    </div>

                    <div className="form-input">
                      <label htmlFor="subCategory">
                        Xəbərin alt kateqoriyasi
                      </label>
                      <select
                        name="sub-categories"
                        id="subCategory"
                        defaultValue={item.url}
                        onChange={(e) => {
                          const newSubCategory = e.target.value;
                          setUpdateNews({
                            ...updateNews,
                            sub_category: newSubCategory,
                          });
                        }}
                      >
                        <option value={item.url}>{item.sub_category}</option>
                        {category &&
                          category
                            .slice(2)
                            .filter((cat) =>
                              cat.sub_categories.find(
                                (subCat) => subCat.title === item.sub_category
                              )
                            )
                            .map((el) =>
                              el.sub_categories
                                .filter((el) => el.title !== item.sub_category)
                                .map((subCat) => (
                                  <option key={subCat.url} value={item.url}>
                                    {subCat.title}
                                  </option>
                                ))
                            )}
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
                            defaultChecked={item.important}
                            onChange={(e) => {
                              const newImportant = e.target.value;
                              setUpdateNews({
                                ...updateNews,
                                important: newImportant,
                              });
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
                            defaultChecked={!item.important}
                            onChange={(e) => {
                              const newImportant = e.target.checked;
                              setUpdateNews({
                                ...updateNews,
                                important: newImportant,
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
              ))}
          </div>
        </div>
      </div>

      <div className={`add-modal data-modal ${addOpen ? "show-modal" : ""}`}>
        <div className="modal">
          <div className="modal-inner">
            <form action="">
              <div className="form-scroll">
                <div className="form-input">
                  <label htmlFor="title">Xəbər başlığı</label>
                  <input type="text" id="title" className="news-heading" />
                </div>

                <div className="form-input">
                  <label htmlFor="text">Xəbər Məzmunu</label>
                  <textarea
                    id="text"
                    className="news-text"
                    cols="30"
                    rows="15"
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="image">Xəbərlə bağlı şəkil</label>
                  <input type="file" id="image" className="news-image" />
                </div>

                <div className="form-input">
                  <label htmlFor="category">Xəbərin kateqoriyasi</label>
                  <select name="categories" id="category">
                    <option value=""></option>
                  </select>
                </div>

                <div className="form-input">
                  <label htmlFor="subCategory">Xəbərin alt kateqoriyasi</label>
                  <select name="sub-categories" id="subCategory">
                    <option value=""></option>
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
                    setAddOpen(false);
                  }}
                >
                  Redaktə et
                </button>
                <button
                  className="no-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    setAddOpen(false);
                  }}
                >
                  Ləğv et
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsData;
