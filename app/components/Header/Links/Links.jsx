import { useEffect, useState } from 'react'
import { getMenuLink } from '../../../libs/data'
import Link from "next/link"

const Links = () => {

    const [link, setLink] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const links = await getMenuLink()
            setLink(links)
        }

        fetchData()
    },[])

    return (
        <nav>
            <ul className="navbar">
                {link && link.map((item) => (
                    <li>
                        <Link href={item.path}>{item.link}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Links