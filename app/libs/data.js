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


const menuLinks = [
    {
        link: "Əsas xəbərlər",
        path: "/"
    },
    {
        link: "Son xəbərlər",
        path: "/son-xəbərlər"
    },
    {
        link: "Siyasət",
        path: "/siyasət"
    },
    {
        link: "İqtisadiyyat",
        path: "/iqtisadiyyat"
    },
    {
        link: "COP29",
        path: "/cop29"
    },
    {
        link: "Cəmiyyət",
        path: "/cəmiyyət"
    },
    {
        link: "İdman",
        path: "/idman"
    },
    {
        link: "Mədəniyyət",
        path: "/mədəniyyət"
    },
    {
        link: "Dünya",
        path: "/dünya"
    },
    {
        link: "Analitika",
        path: "/analitika"
    },
    {
        link: "Multimedia",
        path: "/multimedia"
    }
]


export const getMenuLink = async () => {
    return menuLinks
}