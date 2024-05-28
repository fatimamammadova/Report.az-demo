import Link from "next/link";


const Links = ({ posts }) => {

  return (
    <nav>
      <ul className="navbar">
        {posts &&
          posts.map((item, index) => (
            <li key={index}>
              <Link href={`/${item.url}`}>{item.title}</Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Links;
