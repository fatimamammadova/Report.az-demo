export const getValutes = async () => {
  try {
    const res = await fetch(`http://localhost:4000/valutes`);

    return res.json();
  } catch (err) {
    console.error("Something went wrong!", err);
  }
};

const langs = [
  {
    id: 1,
    lang: "Azərbaycanca",
    path: "/",
  },
  {
    id: 2,
    lang: "Русский",
    path: "/ru",
  },
  {
    id: 3,
    lang: "English",
    path: "/en",
  },
];

export const getLang = async () => {
  return langs;
};

export async function getNews() {
  try {
    const res = await fetch("http://localhost:4000/news", {
      cache: "no-store",
    });
    const data = await res.json();
    const sortedData = data
      .filter((item) => item.date)
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

    return sortedData;
  } catch (err) {
    console.error("Data Fetch error!", err);
  }
}

export async function getVideoNews() {
  try {
    const res = await fetch("http://localhost:4000/videoNews", {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Data Fetch error!", err);
  }
}

export async function getCategory() {
  try {
    const res = await fetch("http://localhost:4000/links", {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Data Fetch error!", err);
  }
}

export async function getPost(slug) {
  try {
    const res = await fetch(`http://localhost:4000/news?slug=${slug}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log("Data Fetch error!", err);
  }
}

export async function getUser(userId) {
  try {
    const res = await fetch(`http://localhost:4000/users?id=${userId}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (err) {
    console.log("Data Fetch error!", err);
  }
}

export async function getDelete(id) {
  try {
    const res = await fetch(`http://localhost:4000/news/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete news");
    }

  } catch (err) {
    console.log("Data Fetch error!", err);
  }
}


export async function getUpdate(id, newsDetails) {
  try {
    const res = await fetch(`http://localhost:4000/news/${id}`, {
      method: "PUT",
      body: JSON.stringify(newsDetails)
    });

    if (!res.ok) {
      throw new Error("Failed to update news");
    }

  } catch (err) {
    console.log("Data Fetch error!", err);
  }
}

export async function addNewsFunction(newsDetails) {
  try {
    const res = await fetch(`http://localhost:4000/news`, {
      method: "POST",
      body: JSON.stringify(newsDetails),
    });

  } catch (err) {
    console.error("Error adding news:", err);
  }
}

