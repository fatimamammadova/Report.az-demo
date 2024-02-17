import Image from "next/image";
import "./_vacancies.scss";

export const generateMetadata = () => {
  return {
    title: "Vakansiyalar",
  };
};

export const Vacancies = () => {
  return (
    <main>
      <section id="vacancies" className="page-section">
        <div className="container">
          <div className="row">
            <div className="col-12 wrapping">
              <div className="page-title">
                <p>Vakansiyalar</p>
              </div>
              <div className="about-content">
                <p>
                Hal-hazırda aktiv vakansiya yoxdur
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Vacancies;
