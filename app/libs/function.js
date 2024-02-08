export function getSlug(title) {
    return `/${title.toLowerCase().replace(/ə/g, "e").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/--+/g, "-").trim()}/`
}

// export function 


async function getNews() {
    const res = await fetch('http://localhost:4000/news')
    const data = await res.json()

    data.forEach(element => {
      console.log(element.date)  
    })
}

getNews()