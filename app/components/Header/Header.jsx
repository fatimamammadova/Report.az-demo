"use client"
import Image from 'next/image'
import Link from 'next/link'
import Links from './Links/Links'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { getValutes, getLang } from '../../libs/data'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faMoon, faSun, faSearch, faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

import "./_header.scss"

const Header = () => {

    const [lang, setLang] =useState()
    const [valute, setValute] = useState()
    const [currentValute, setCurrentValute] = useState(0)
    const [theme,setTheme] = useState(true)
    const pathname = usePathname()
    const [isSearch,setIsSearch] = useState(false)
    const [open, setOpen] = useState(false)
    const [size,setSize] = useState()


    useEffect(() => {
        window.addEventListener('resize', () => {
            setSize(document.documentElement.scrollWidth)
            if(size>1024) {
                setOpen(false)
            }
        })
    },[size])

    useEffect(() => {
        const fetchData = async () => {
            const valutes = await getValutes()
            const langs = await getLang()
            setValute(valutes)
            setLang(langs)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const currencies = document.querySelectorAll('.currency-list li')
        currencies.forEach((el, index) => {
          el.style.display = index === currentValute ? "block" : "none"
        })
    }, [valute])
    
    useEffect(() => {
        const currencies = document.querySelectorAll('.currency-list li')
        const totalCurrencies = currencies.length;
    
        const intervalId = setInterval(() => {
            currencies.forEach((el, index) => {
                const shouldBeVisible = index === currentValute
                el.style.display = shouldBeVisible ? "block" : "none"
                el.style.animation = shouldBeVisible ? "goDown 1s" : "none"
            })
    
            setCurrentValute((prevIndex) => (prevIndex + 1) % totalCurrencies)
        }, 2500)
    
        return () => clearInterval(intervalId)
    }, [currentValute, valute])

    useEffect(() => {
        if(theme) {
            document.documentElement.dataset.theme = 'light'
            
        } else {
            document.documentElement.dataset.theme = 'dark'
        }
        
        return () => {
            document.documentElement.dataset.theme = 'light'
        }
    },[theme])

    const changeTheme = () => {
        setTheme((prevTheme) => !prevTheme)
        console.log(theme)
    }

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
                                                <Link href='javascript:void(0)'>
                                                    <Image
                                                        src="/images/weather.png"
                                                        alt="Weather Image"
                                                        width={19} 
                                                        height={19}
                                                        priority={true}
                                                        loading="eager"
                                                        quality={100}
                                                    />
                                                    Bakı 13° C
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href='javascript:void(0)'>
                                                    13 m/s
                                                </Link>
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
                                            {valute && Object.entries(valute).map(([currency, rate]) => (
                                                <li key={currency}>
                                                    <Link href="javascript:void(0)">{currency} - {rate}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="ht-right">
                                    <div className="about-link">
                                        <Link href='javascript:void(0)'>Haqqımızda</Link>
                                    </div>
                                    <ul className="socials">
                                        {[
                                            { icon: faFacebookF },
                                            { icon: faInstagram },
                                            {icon: faPaperPlane },
                                            {icon: faTwitter },
                                            {icon: faLinkedinIn },
                                            {icon: faYoutube }
                                        ].map((social, index) => (
                                            <li key={index}>
                                                <Link href="javascript:void(0)">
                                                    <FontAwesomeIcon icon={social.icon} />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="theme-button">
                                        <button onClick={changeTheme}>
                                            {theme ? (<FontAwesomeIcon icon={faMoon} />) : (<FontAwesomeIcon icon={faSun} />)}
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
                                        {lang && lang.map((item) => (
                                            <li>
                                                <Link href={item.path} className={`${item.path === pathname ? "active": ""}`}>
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

                                    <button className={`hamburger-menu ${open ? 'close-menu' : ''}`} onClick={() => setOpen((prev) => !prev)}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                                
                                <div className="main-menu">
                                    
                                    {isSearch ? (
                                        <div className="search-block">
                                            <form>
                                                <div className="form-input">
                                                    <input type="text" placeholder='Açar sözü daxil edin'/>
                                                </div>
                                            </form>
                                        </div>
                                        ) : (<Links/>)
                                    }
                                    
                                    <button className="search" onClick={() => setIsSearch(prevAction => !prevAction) }>
                                        {isSearch ? ( <FontAwesomeIcon icon={faXmark} />) : (<FontAwesomeIcon icon={faSearch} />)}
                                    </button>
                                </div>

                                <div className={`sidebar ${open ? 'open' : ''}`}>
                                    <div className="sidebar-menu">
                                        <Links/>
                                        <div className="search-block">
                                            <form>
                                                <div className="form-input">
                                                    <input type="text" placeholder='Açar sözü daxil edin'/>
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

            <div className="content-overlay" style={{ display: `${open ? "block": "none"}` }}></div>
        </>
    )
}

export default Header