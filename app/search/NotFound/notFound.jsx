export const generateMetadata = () => {
  return {
    title: "Axtarış nəticəsi tapılmadı",
  };
};

export const notFound = () => {
  return (
    <main>
      <div className="container messageBox">
        <h1>Axtarış nəticəsi tapılmadı!</h1>
        <Link href="/">Əsas səhifəyə qayıt</Link>
      </div>
    </main>
  );
};
