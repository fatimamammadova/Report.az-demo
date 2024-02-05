import Image from 'next/image'
import Link from 'next/link'
import "./_header.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { 
        faFacebookF, 
        faInstagram, 
        faTelegram, 
        faTwitter,
        faLinkedinIn,
        faYoutube
    } from "@fortawesome/free-brands-svg-icons";

import { 
        faMoon,
        faSun 
    } from "@fortawesome/free-solid-svg-icons"

const Header = () => {

    return (
        <header>
            <div className="header-top">
                <div className="container"> 
                    <div className="row">
                        <div className="ht-left">
                            <div className="weather">
                                <ul>
                                    <li>
                                        <Link href=''>
                                            <Image src='/images/weather.png' width={19} height={19}/>
                                            Bakı 13° C
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href=''>
                                            13 m/s
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="currency">
                                <Image src="/images/currency.png" width={19} height={19}/>
                                <ul className="currency-list">
                                    <li>
                                        <Link href="">
                                            USD - 1.7000
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="ht-right">
                            <div className="about-link">
                                <Link href=''>Haqqımızda</Link>
                            </div>

                            <ul className="socials">
                                <li>
                                    <Link href="">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <FontAwesomeIcon icon={faTelegram} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </Link>
                                </li>
                                <li>
                                    <Link href="">
                                        <FontAwesomeIcon icon={faYoutube} />
                                    </Link>
                                </li>
                            </ul>

                            <div className="theme-button">
                                <button className="light-theme">
                                    <FontAwesomeIcon icon={faSun} />
                                </button>
                                <button className="dark-theme">
                                    <FontAwesomeIcon icon={faMoon} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;