
export const getValutes = async () => {
    try {
        const res = await fetch(`http://localhost:4000/valutes`)

        return res.json()
    }
    catch(err) {
        console.error('Something went wrong!', err);
    }
}

const langs = [
    {
        id: 1,
        lang: "Azərbaycanca",
        path: "/"
    },
    {
        id: 2,
        lang: "Русский",
        path: "/ru"
    },
    {
        id: 3,
        lang: "English",
        path: "/en"
    }
]

export const getLang = async () => {
    return langs
}


export async function getCategory() {
    try {
        const res = await fetch('http://localhost:4000/news')
        const data = res.json()

        return data
    }
    catch(err) {
        console.error("Data Fetch error!", err)
    }
}
