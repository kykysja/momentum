import { getRandomNum } from "./helpers";

const quoteContainer = document.querySelector(".quote");
const quoteAuthorContainer = document.querySelector(".author");
const changeQuoteBtn = document.querySelector(".change-quote");

let randomNum;

const showQuote = (data) => {
  quoteContainer.textContent = `${data[randomNum].text}`;
  quoteAuthorContainer.textContent = `${data[randomNum].author}`;
};

export async function getQuote() {
  const newRandomNum = getRandomNum(0, 10);

  if (newRandomNum === randomNum) {
    getQuote();
  } else {
    randomNum = newRandomNum;
    const quotes = "../assets/data.json";
    const res = await fetch(quotes);
    const data = await res.json();

    showQuote(data);
  }
}

changeQuoteBtn.addEventListener("click", getQuote);
