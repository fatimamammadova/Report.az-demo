"use client";

export const generateMetadata = () => {
  return {
    title: "Yalnışlıq baş vermişdir",
  };
};

const Error = () => {
  return (
    <main>
      <div className="container messageBox">
        <h1>Xəta baş verdi!</h1>
      </div>
    </main>
  );
};

export default Error;
