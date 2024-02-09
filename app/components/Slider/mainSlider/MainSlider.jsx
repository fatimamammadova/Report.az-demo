"use client"
import { formatDate, formatHours, sortedData, getSlug } from '@/app/libs/function'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'



export const MainSlider = () => {

    const [slide,setSlide] = useState()

    useEffect(() => {
        async function getNews() {
            const res = await fetch('http://localhost:4000/news')
            const data = await res.json()

            sortedData(data)
            setSlide(data)
        }
        getNews()
    }, [])
    
    return (
        <div className="mainSlider">
            <div className="slider">
                <div className="slider-wrapper">
                    <div className="slides">
                        {slide && slide.slice(0,5).map((item,index) => (
                            <div className="slide" key={index}>
                                <div className="slide-bg">
                                    <Image src={`${item.image}`} width={816} height={500} priority={true} alt='News Image'/>
                                </div>
                                <div className="slide-content">
                                    <Link className='news-category' href={`${getSlug(item.category)}`}>{`${item.category}`}</Link>
                                    <Link className='news-title' href={item.slug}>{`${item.title}`}</Link>

                                    <div className="news-date">
                                        <span>{`${formatDate(item.date)}`}</span>
                                        <span>{`${formatHours(item.date)}`}</span>
                                    </div>
                                </div>
                                <div className="divider">
                                    <Image src={`/images/divider-bg-light.svg`} width={100} height={100} priority={true} alt='Divider Image'/>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="slider-pagination">

                    </div>
                </div>
            </div>
        </div>        
    )
}

export default MainSlider