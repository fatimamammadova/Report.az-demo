"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./_goToTop.scss";

export const GoToTop = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const goToTopBtn = document.querySelector(".top-button");
      let scrolling =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let scrollY = window.scrollY;
      setScroll(scrollY);

      if (scrollY > scrolling || scrollY < 700) {
        goToTopBtn.style.right = "-80px";
      } else {
        goToTopBtn.style.right = "40px";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="top-button" onClick={goToTop}>
      <FontAwesomeIcon icon={faAngleUp} />
    </div>
  );
};

export default GoToTop;
