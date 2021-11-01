import { getRandomNum } from "./helpers";

const quoteContainer = document.querySelector(".quote");
const quoteAuthorContainer = document.querySelector(".author");
const changeQuoteBtn = document.querySelector(".change-quote");

let randomNum;

const showQuote = (data) => {
  if (localStorage.getItem("app-language") === "en") {
    quoteContainer.textContent = `${data[randomNum].text}`;
    quoteAuthorContainer.textContent = `${data[randomNum].author}`;
  } else {
    quoteContainer.textContent = `${data[randomNum].textRu}`;
    quoteAuthorContainer.textContent = `${data[randomNum].authorRu}`;
  }
};

export async function getQuote() {
  const newRandomNum = getRandomNum(0, 17);

  if (newRandomNum === randomNum) {
    getQuote();
  } else {
    randomNum = newRandomNum;
    const quotes = "../assets/quotes.json";
    const res = await fetch(quotes);
    const data = await res.json();

    showQuote(data);
  }
}

export const translateQuote = async () => {
  const quotes = "../assets/quotes.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const currentQuote = document.querySelector(".quote");
  const currentAuthor = document.querySelector(".author");
  const currentQuoteIndex = data.findIndex(
    (el) => el.text === currentQuote.textContent || el.textRu === currentQuote.textContent,
  );
  if (localStorage.getItem("app-language") === "en") {
    currentQuote.textContent = data[currentQuoteIndex].text;
    currentAuthor.textContent = data[currentQuoteIndex].author;
  } else {
    currentQuote.textContent = data[currentQuoteIndex].textRu;
    currentAuthor.textContent = data[currentQuoteIndex].authorRu;
  }
};

changeQuoteBtn.addEventListener("click", getQuote);
