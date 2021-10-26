export const getLinkToImage = async () => {
  const category = localStorage.getItem("photoCategory");
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${category}&client_id=fGlV0HC45V7V87jE1wKsTowzFiC9xI6nSVz7F9ll-EY`;
  const res = await fetch(url);
  const data = await res.json();
  document.body.style.backgroundImage = `url(${data.urls.regular})`;
};
