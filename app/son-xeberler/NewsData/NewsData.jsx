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
import { getDelete, getUpdate } from "@/app/lib/data";

export const NewsData = ({ posts, categories }) => {
  const path = usePathname();
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [post, setPost] = useState(null);
  const [lastData, setLastData] = useState(10);
  const [scroll, setScroll] = useState();

  const [updateNews, setUpdateNews] = useState({});

  const handleSubCategory = (e) => {
    const newsCategory = e.target.value;
    if (newsCategory) {
      const categoryArr = categories.filter(
        (element) => element.title === newsCategory
      )[0];
      setSubCategories(categoryArr.sub_categories);
    }
  };

  useEffect(() => {
    if (post && post.id) {
      const defaultNewsCategory = document.getElementById("category");

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

    const handleEditDeleteClick = (e, itemId) => {
      e.stopPropagation();
      removeActives();
      const selectedItem = posts.find((item) => item.id === itemId);
      setPost(selectedItem);
      setSubCategory(selectedItem.sub_category);
    };

    newsBlocks.forEach((item) => {
      const editDeleteBtn = item.querySelector(".edit-delete-btn");
      const selectBtnContainer = item.querySelector(".selectbox");
      editDeleteBtn.addEventListener("click", (e) => {
        const itemId = item.dataset.id;
        handleEditDeleteClick(e, itemId);
        selectBtnContainer.classList.add("open");
      });
    });

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      newsBlocks.forEach((item) => {
        const editDeleteBtn = item.querySelector(".edit-delete-btn");
        editDeleteBtn.removeEventListener("click", handleEditDeleteClick);
      });
    };
  }, [post]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const modal = e.target.querySelector(".show-modal .modal-inner");
      if (modal) {
        setAddOpen(false);
        setUpdateOpen(false);
        setDeleteOpen(false);
        setPost(null);
        setSubCategory("");
      }
    };

    const deleteData = async () => {
      post && (await getDelete(post.id));
    };

    const updateData = async () => {
      post && (await getUpdate(post.id, updateNews));
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
  }, [post]);

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
                    onClick={() => {
                      setAddOpen((prev) => !prev);
                      setSubCategory("");
                    }}
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
        className={`form-modal data-modal ${updateOpen ? "show-modal" : ""}`}
      >
        <div className="modal">
          <div className="modal-inner">
            {post && (
              <form key={post.id}>
                <div className="form-scroll">
                  <div className="form-input">
                    <label htmlFor="title">Xəbər başlığı</label>
                    <input
                      type="text"
                      id="title"
                      className="news-heading"
                      defaultValue={post.title}
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
                      defaultValue={post.text}
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
                      defaultValue={post.category}
                      onChange={handleSubCategory}
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
                    <label htmlFor="subCategory">
                      Xəbərin alt kateqoriyasi
                    </label>
                    <select
                      name="sub-categories"
                      id="subCategories"
                      value={subCategory && subCategory}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSubCategory(e.target.value);
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
                          defaultChecked={!post.important}
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
            )}
          </div>
        </div>
      </div>

      <div className={`form-modal data-modal ${addOpen ? "show-modal" : ""}`}>
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
                  <select
                    name="categories"
                    id="category"
                    defaultValue={categories[2].title}
                    onChange={handleSubCategory}
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
                    value={subCategory || ""}
                    onChange={(e) => {
                      setSubCategory(e.target.value);
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
