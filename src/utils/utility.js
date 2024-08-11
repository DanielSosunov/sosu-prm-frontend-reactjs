function pullQueryParamsFromUrl(url) {
  const urlObj = new URL(url);
  return urlObj.searchParams.toString();
}

module.exports = {
  pullQueryParamsFromUrl,
};
