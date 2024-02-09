import Image from "next/image";
import MainSlider from "./components/Slider/mainSlider/MainSlider";

export default function Home() {
  return (
    <main>
      <section id="main-news">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <MainSlider/>
            </div>
            <div className="col-lg-4">

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
