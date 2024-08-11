function pullQueryParamsFromUrl(url) {
  const urlObj = new URL(url);
  return urlObj.searchParams.toString();
}

function formatYYYYMMtoReadable(dateString) {
  const [year, month] = dateString.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = parseInt(month, 10) - 1; // Convert to 0-based index
  const monthName = monthNames[monthIndex];

  return `${monthName}, ${year}`;
}
module.exports = {
  pullQueryParamsFromUrl,
  formatYYYYMMtoReadable,
};
