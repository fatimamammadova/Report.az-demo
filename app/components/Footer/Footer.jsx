import Link from "next/link";
import Image from "next/image";
import { getCategory } from "@/app/libs/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faYoutube,
  faSlack,
} from "@fortawesome/free-brands-svg-icons";

import {
  faPaperPlane,
  faMobileScreenButton,
  faRss,
  faPodcast,
} from "@fortawesome/free-solid-svg-icons";
import "./_footer.scss";

export const Footer = async () => {
  const links = await getCategory();
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="logo">
                <Link href="/">
                  <Image
                    src="/images/logo.webp"
                    alt="Logo"
                    width={280}
                    height={65}
                    priority={true}
                    loading="eager"
                    quality={100}
                  />
                </Link>
              </div>
              <div className="footer-menu">
                <ul>
                  {[
                    { link: "Vakansiyalar", url: "/vacancies" },
                    { link: "Haqqımızda", url: "/haqqimizda" },
                    { link: "Bizimlə əlaqə", url: "/elaqe" },
                    { link: "Abunə", url: "/" },
                  ].map((item, index) => (
                    <li key={index}>
                      <Link href={item.url}>{item.link}</Link>
                    </li>
                  ))}
                </ul>
                <ul>
                  {links.slice(2).map((item, index) => (
                    <li key={index}>
                      <Link href={item.url}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="divider"></div>
              <div className="coprights-wrapper">
                <div className="copyrights">
                  <p>
                    Saytdakı materialların istifadəsi zamanı istinad edilməsi
                    vacibdir. Məlumat internet səhifələrində istifadə edildikdə
                    hiperlink vasitəsi ilə istinad mütləqdir.
                  </p>
                </div>
                <ul className="socials">
                  {[
                    { icon: faMobileScreenButton },
                    { icon: faFacebookF },
                    { icon: faInstagram },
                    { icon: faPaperPlane },
                    { icon: faTwitter },
                    { icon: faLinkedinIn },
                    { icon: faYoutube },
                    { icon: faRss },
                    { icon: faPodcast },
                    { icon: faSlack },
                  ].map((social, index) => (
                    <li key={index}>
                      <Link href="/">
                        <FontAwesomeIcon icon={social.icon} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>
                "Report" müstəqil informasiya agentliyi sayt və gündəlik
                bülletenlər vasitəsi ilə Azərbaycan, rus və ingilis dillərində
                siyasət, iqtisadiyyat, cəmiyyət, idman, mədəniyyət sahələri üzrə
                ölkədə və dünyada baş verən ən vacib hadisələri öz oxucularına
                operativ şəkildə çatdırır. O cümlədən, saytın “Analitika”
                bölməsində Azərbaycanda və dünyada gedən proseslərlə bağlı
                analitik materiallar təqdim edilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
