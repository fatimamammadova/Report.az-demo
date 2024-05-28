"use client";
import Link from "next/link";
import Image from "next/image";
import { formatDate, formatHours, getSlug } from "../../lib/function";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import AddModal from "@/app/components/AddModal/AddModal";
import DeleteModal from "@/app/components/DeleteModal/DeleteModal";
import "./_newsData.scss";
import UpdateModal from "@/app/components/UpdateModal/UpdateModal";

const NewsData = ({ posts, categories }) => {
  const path = usePathname();
  const [post, setPost] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [lastData, setLastData] = useState(15);
  const [scroll, setScroll] = useState();

  const [subCategory, setSubCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.innerHeight + window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

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
      setSubCategory(selectedItem.sub_category && selectedItem.sub_category);
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
  }, [post, lastData]);

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

      <DeleteModal
        post={post}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
      />

      <AddModal
        categories={categories}
        addOpen={addOpen}
        setAddOpen={setAddOpen}
        subCategories={subCategories}
        setSubCategories={setSubCategories}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />

      <UpdateModal
        post={post}
        categories={categories}
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
        subCategories={subCategories}
        setSubCategories={setSubCategories}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
    </>
  );
};

export default NewsData;
