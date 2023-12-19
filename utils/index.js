export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      "^https?:\\/\\/(.*\\.(png|jpg|jpeg|bmp|gif|webp)|encrypted-tbn0.gstatic.com)",
      "i"
    );
    return pattern.test(url);
  }
};
