import Link from "next/link";

export const generateMetadata = () => {
  return {
    title: "Nəticə tapılmadı",
  };
};

const NotFound = () => {
  return (
    <main>
      <div className="container messageBox">
        <h1>Səhifə tapılmadı!</h1>
        <p>Bağışlayın, bu səhifə mövcud deyil.</p>
        <Link href="/">Əsas səhifəyə qayıt</Link>
      </div>
    </main>
  );
};

export default NotFound;
