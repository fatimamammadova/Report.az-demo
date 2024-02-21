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
  const words = title.split(" ");

  const letterNum = query.length;

  const handleWords = [];

  words.forEach((item) => {
    const word = getSlug(item).slice(0);
    const querySlugFormat = getSlug(query).slice(0);

    if (word === querySlugFormat) {
      const index = item.indexOf(query);
      if (index !== -1) {
        const firstPart = item.slice(0, index);
        const highlightedPart = item.slice(index, index + letterNum);
        const lastPart = item.slice(index + letterNum);
        handleWords.push(
          `${firstPart}<span class="highlighted">${highlightedPart}</span>${lastPart}`
        );
      }
    } else {
      handleWords.push(item);
    }
  });

  return handleWords.join(" ");
}

// export function sortedData(data) {
//   data.sort((a, b) => {
//     return new Date(b.date).getTime() - new Date(a.date).getTime();
//   })
// }
