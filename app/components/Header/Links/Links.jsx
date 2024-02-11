// import { useEffect, useState } from "react";
import Link from "next/link";
// import { getNews } from "../../../libs/data";
// import { getSlug, uniqueData } from "@/app/libs/function";

// const menuLinks = [
//   { link: "Əsas xəbərlər", path: "/" },
//   { link: "Son xəbərlər", path: "/son-xeberler" },
//   { link: "Siyasət", path: "/siyaset/" },
//   { link: "İqtisadiyyat", path: "/iqtisadiyyat/" },
//   { link: "COP29", path: "/cop29/" },
//   { link: "Cəmiyyət", path: "/cemiyyet/" },
//   { link: "İdman", path: "/idman/" },
//   { link: "Mədəniyyət", path: "/medeniyyet/" },
//   { link: "Dünya", path: "/dunya/" },
//   { link: "Analitika", path: "/analitika/" },
//   { link: "Multimedia", path: "/multimedia/" },
// ];

const Links = ({ posts }) => {
  // const [category, setCategory] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getNews();

  //     data.forEach((element) => {
  //       menuLinks.push({
  //         link: element.category,
  //         path: getSlug(element.category),
  //       });
  //     });

  //     const uniqueMenuLinks = menuLinks.filter((link, index) => {
  //       return (
  //         index ===
  //         menuLinks.findIndex((obj) => {
  //           return obj.link === link.link && obj.path === link.path;
  //         })
  //       );
  //     });

  //     setCategory(uniqueMenuLinks);
  //     console.log(uniqueMenuLinks)

  //   };
  //   fetchData();
  // }, []);

  return (
    <nav>
      <ul className="navbar">
        {posts &&
          posts.map((item, index) => (
            <li key={index}>
              <Link href={`/${item.url}/`}>{item.title}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Links;
