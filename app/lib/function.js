export function getSlug(title) {
  return `/${title
    .toLowerCase()
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/ş/g, "s")
    .replace(/ə/g, "e")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()}`;
}

export function getSlugWithoutSymbols(title) {
  return `${title
    .toLowerCase()
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/ş/g, "s")
    .replace(/ə/g, "e")
    .trim()}`;
}

export function formatDate(time) {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const date = new Date(time);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} , ${year}`;
}

export function formatHours(time) {
  const date = new Date(time);
  const hours = date.getHours();
  const minute = date.getMinutes();

  return `${hours.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

export function getHighlightedWord(title, query) {
  let words = title.split(" ");
  let queryWords = query.split(" ");
  const handleWords = [];

  if (queryWords.length > 1) {
    const querySlugFormat = getSlugWithoutSymbols(query);
    const index = getSlugWithoutSymbols(title).indexOf(querySlugFormat);
    if (index !== -1) {
      handleWords.push(
        `${title.slice(0, index)}<span class="highlight">${title.slice(
          index,
          index + querySlugFormat.length
        )}</span>${title.slice(index + querySlugFormat.length)}`
      );
    } else {
      handleWords.push(title);
    }
  } else {
    words.forEach((item) => {
      const word = getSlugWithoutSymbols(item);
      let matchFound = false;
      for (const queryWord of queryWords) {
        const querySlugFormat = getSlugWithoutSymbols(queryWord);
        const index = word.indexOf(querySlugFormat);
        if (index !== -1) {
          const firstPart = item.slice(0, index);
          const highlightedPart = item.slice(index, index + queryWord.length);
          const lastPart = item.slice(index + queryWord.length);

          handleWords.push(
            `${firstPart}<span class="highlight">${highlightedPart}</span>${lastPart}`
          );

          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        handleWords.push(item);
      }
    });
  }

  return handleWords.join(" ");
}

export function isHighlightedWord(text, query) {
  const words = text.split(" ");
  const queryWords = query.split(" ");

  if (queryWords.length > 0) {
    const querySlugFormat = getSlugWithoutSymbols(query);
    const index = getSlugWithoutSymbols(text).indexOf(querySlugFormat);
    if (index !== -1) {
      return true;
    }
  } else {
    for (let item of words) {
      const word = getSlugWithoutSymbols(item);
      for (const queryWord of queryWords) {
        const querySlugFormat = getSlugWithoutSymbols(queryWord);
        const index = word.indexOf(querySlugFormat);
        if (index !== -1) {
          return true;
        }
      }
    }
  }

  return false;
}

export function setTextHtml(text) {
  const paragraphs = text.split("\n");
  let html = "";

  for (let item of paragraphs) {
    html += `<p>${item}</p>`;
  }
  const mainLink = html.indexOf("Report") - 1;

  html =
    html.slice(0, mainLink) +
    `<a href="http://localhost:3000/" style="color: #3a86ff">${html.slice(
      mainLink,
      mainLink + 8
    )}</a>` +
    html.slice(mainLink + 8);

  return html;
}
