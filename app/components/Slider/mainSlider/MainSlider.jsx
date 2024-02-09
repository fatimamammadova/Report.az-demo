"use client"
import { formatDate, formatHours, sortedData, getSlug } from '@/app/libs/function'
import { useEffect, useState } from 'react'
import Link from 'next/link'



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
                                <div className="slide-bg" style={{backgroundImage: `url(${item.image})`}}>
                                </div>
                                <div className="slide-content">
                                    <Link className='news-category' href={`${getSlug(item.category)}`}>{`${item.category}`}</Link>
                                    <Link className='news-title' href={item.slug}>{`${item.title}`}</Link>

                                    <div className="news-date">
                                        <span>{`${formatDate(item.date)}`}</span>
                                        <span>{`${formatHours(item.date)}`}</span>
                                    </div>
                                </div>
                                <div className="divider" style={{backgroundImage: `url(/images/divider-bg-light.svg)`}}></div>
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