"use client";
import Image from "next/image";
import Link from "next/link";
import Links from "./Links/Links";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getValutes, getLang, getCategory } from "../../lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMoon,
  faSun,
  faSearch,
  faXmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./_header.scss";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState();
  const [valute, setValute] = useState();
  const [currentValute, setCurrentValute] = useState(0);
  const pathname = usePathname();
  const [isSearch, setIsSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [category, setCategory] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [celsius, setCelsius] = useState();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light" ? true : false;
    }
    return true;
  });

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
    setQuery("");
    setIsSearch(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(document.documentElement.scrollWidth);
      if (size > 1024) {
        setOpen(false);
      }
    });
  }, [size]);

  useEffect(() => {
    const fetchData = async () => {
      const valutes = await getValutes();
      const langs = await getLang();
      const category = await getCategory();
      setValute(valutes);
      setLang(langs);
      setCategory(category);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const currencies = document.querySelectorAll(".currency-list li");
    currencies.forEach((el, index) => {
      el.style.display = index === currentValute ? "block" : "none";
    });
  }, [valute]);

  useEffect(() => {
    const currencies = document.querySelectorAll(".currency-list li");
    const totalCurrencies = currencies.length;

    const intervalId = setInterval(() => {
      currencies.forEach((el, index) => {
        const shouldBeVisible = index === currentValute;
        el.style.display = shouldBeVisible ? "block" : "none";
        el.style.animation = shouldBeVisible ? "goDown 1s" : "none";
      });

      setCurrentValute((prevIndex) => (prevIndex + 1) % totalCurrencies);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [currentValute, valute]);

  useEffect(() => {
    if (theme) {
      document.documentElement.dataset.theme = "light";
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
    }
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.dataset.theme = "dark";
    }
  }, []);

  const changeTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.dataset.theme = "dark";
    }
  });

  useEffect(() => {
    async function getWeather() {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=baku&appid=daf23bcd6e2a7097959c3849d264e8be&units=metric`,
        {
          next: { revalidate: 300 },
        }
      );
      const data = await res.json();
      
      setCelsius(Math.round(data.main.temp));
      setWindSpeed(Math.round(data.wind.speed));
    }

    getWeather();
  });

  return (
    <>
      <header>
        <div className="header-top">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="ht-left">
                  <div className="weather">
                    <ul>
                      <li>
                        <Link href="/">
                          <Image
                            src="/images/weather.png"
                            alt="Weather Image"
                            width={19}
                            height={19}
                            priority={true}
                            loading="eager"
                            quality={100}
                          />
                          Bakı {celsius}° C
                        </Link>
                      </li>
                      <li>
                        <Link href="/">{windSpeed} m/s</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="currency">
                    <Image
                      src="/images/currency.png"
                      alt="Currency Image"
                      width={19}
                      height={19}
                      priority={true}
                      loading="eager"
                      quality={100}
                    />
                    <ul className="currency-list">
                      {valute &&
                        Object.entries(valute).map(([currency, rate]) => (
                          <li key={currency}>
                            <Link href="/">
                              {currency} - {rate}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="ht-right">
                  <div className="about-link">
                    <Link href="/haqqimizda">Haqqımızda</Link>
                  </div>
                  <ul className="socials">
                    {[
                      { icon: faFacebookF },
                      { icon: faInstagram },
                      { icon: faPaperPlane },
                      { icon: faTwitter },
                      { icon: faLinkedinIn },
                      { icon: faYoutube },
                    ].map((social, index) => (
                      <li key={index}>
                        <Link href="/">
                          <FontAwesomeIcon icon={social.icon} />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="theme-button">
                    <button onClick={changeTheme}>
                      {theme ? (
                        <FontAwesomeIcon icon={faMoon} />
                      ) : (
                        <FontAwesomeIcon icon={faSun} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="logo-langs">
                  <ul className="langs">
                    {lang &&
                      lang.map((item, index) => (
                        <li key={index}>
                          <Link
                            href={item.path}
                            className={`${
                              item.path === pathname ? "active" : ""
                            } ${index === 0 ? "active" : ""}`}
                          >
                            {item.lang}
                          </Link>
                        </li>
                      ))}
                  </ul>
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

                  <button
                    className={`hamburger-menu ${open ? "close-menu" : ""}`}
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>

                <div className="main-menu">
                  {isSearch ? (
                    <div className="search-block">
                      <form onSubmit={handleSubmit}>
                        <div className="form-input">
                          <input
                            type="text"
                            placeholder="Açar sözü daxil edin"
                            value={query}
                            onChange={handleInputChange}
                          />
                        </div>
                      </form>
                    </div>
                  ) : (
                    <Links posts={category} />
                  )}

                  <button
                    className="search"
                    onClick={() => setIsSearch((prevAction) => !prevAction)}
                  >
                    {isSearch ? (
                      <FontAwesomeIcon icon={faXmark} />
                    ) : (
                      <FontAwesomeIcon icon={faSearch} />
                    )}
                  </button>
                </div>

                <div className={`sidebar ${open ? "open" : ""}`}>
                  <div className="sidebar-menu">
                    <Links posts={category} />
                    <div className="search-block">
                      <form onSubmit={handleSubmit}>
                        <div className="form-input">
                          <input
                            type="text"
                            placeholder="Açar sözü daxil edin"
                            value={query}
                            onChange={handleInputChange}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="content-overlay"
        style={{ display: `${open ? "block" : "none"}` }}
      ></div>
    </>
  );
};

export default Header;
