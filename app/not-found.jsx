import Link from "next/link"

const NotFound = () => {
    return (
        <main>
            <div className="container messageBox">
                <h1>Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Link href='/'>Return Home</Link>
            </div>
        </main>
    )
}

export default NotFound