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
  const words = title.split(" ");
  const letterNum = query.length;
  const handleWords = [];

  words.forEach((item) => {
    const word = getSlugWithoutSymbols(item);
    const querySlugFormat = getSlugWithoutSymbols(query);
    const index = word.indexOf(querySlugFormat);
    if (index !== -1) {
      const firstPart = item.slice(0, index);
      const highlightedPart = item.slice(index, index + letterNum);
      const lastPart = item.slice(index + letterNum);

      handleWords.push(
        `${firstPart}<span class="highlight">${highlightedPart}</span>${lastPart}`
      );
    } else {
      handleWords.push(item);
    }
  });

  return handleWords.join(" ");
}

export function isHighlightedWord(text, query) {
  const words = text.split(" ");
  for (let item of words) {
    const word = getSlugWithoutSymbols(item);
    const querySlugFormat = getSlugWithoutSymbols(query);
    const index = word.indexOf(querySlugFormat);
    if (index !== -1) {
      return true;
    }
  }
  return false;
}

const title =
  "Birləşmiş Millətlər Təşkilatının İqlim Dəyişmələri üzrə Çərçivə Konvensiyasının Tərəflər Konfransının 29-cu sessiyasının (COP29), Kioto Protokolunun Tərəflər Görüşünün 19-cu sessiyasının və Paris Sazişinin Tərəflər Görüşünün 6-cı sessiyasının 2024-cü ildə Azərbaycan Respublikasında təşkili ilə əlaqədar həyata keçiriləcək layihələr üçün sahibkarlara kredit təşkilatlarından manatla aldıqları kreditlər üzrə faiz subsidiyalarının verilməsi qaydası müəyyənləşib.";
const query = "salam";
console.log(isHighlightedWord(title, query));


// export function sortedData(data) {
//   data.sort((a, b) => {
//     return new Date(b.date).getTime() - new Date(a.date).getTime();
//   })
// }
