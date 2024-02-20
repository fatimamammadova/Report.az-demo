import { getNews } from "../lib/data";

export const generateMetadata = ({ searchParams: { query } }) => {
  return {
    title: `Axtarış nəticəsi: ${query}`,
  };
};

export const Search = async ({ searchParams: { query } }) => {
  const posts = await getNews();

  //split

  return (
    <main>
      <section id="search" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                <p>Açar sözü: {query}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Search;
