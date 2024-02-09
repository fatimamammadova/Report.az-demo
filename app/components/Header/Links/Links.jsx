import { useEffect, useState } from "react";
import { getCategory } from "../../../libs/data";
import Link from "next/link";
import { getSlug, uniqueData } from "@/app/libs/function";

const menuLinks = [
  {
    link: "Əsas xəbərlər",
    path: "/",
  },
  {
    link: "Son xəbərlər",
    path: "/son-xeberler",
  },
];

const Links = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategory();

      categories.forEach((element) => {
        menuLinks.push({
          link: element.category,
          path: getSlug(element.category),
        });
      });

      const uniqueMenuLinks = menuLinks.filter((link, index) => {
        return (
          index ===
          menuLinks.findIndex((obj) => {
            return obj.link === link.link && obj.path === link.path;
          })
        );
      });

      setCategory(uniqueMenuLinks);

    };
    fetchData();
  }, []);

  return (
    <nav>
      <ul className="navbar">
        {category &&
          category.map((item,index) => (
            <li key={index}>
              <Link href={item.path}>{item.link}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Links;
