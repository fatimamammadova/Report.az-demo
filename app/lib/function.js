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
      "Dekabr"
  ];

  const date = new Date(time);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} , ${year}`;
}

export function formatHours(time) {
  const date = new Date(time)
  const hours = date.getHours()
  const minute = date.getMinutes()

  return `${hours.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
}


// export function sortedData(data) {
//   data.sort((a, b) => {
//     return new Date(b.date).getTime() - new Date(a.date).getTime();
//   })
// }