"use strict";

// Get quotes from API
const parentEl = document.querySelector(".quote-container");
const newQuoteBtn = document.querySelector("#new-quote");
const twitterBtn = document.querySelector("#twitter");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const loader = document.querySelector("#loader");
const errorMsg = document.querySelector(".error");

let apiQuotes = [];

// Show loading
function showLoading() {
  loader.hidden = false;
  parentEl.hidden = true;
}

// Hide loading
function hideLoading() {
  parentEl.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  // showloader
  showLoading();

  // pick a random quotes from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;

  // if the author field is null replace it with 'unknown'
  if (!quote.author) authorText.textContent = "unknown";

  // check quote length to determine the styling
  if (quote.text.length > 50) quoteText.classList.add("long-quote-text");

  // hide loader
  hideLoading();
}

// getting data from api
async function getQuote() {
  try {
    // show loader
    showLoading();

    const apiURL = "https://type.fit/api/quotes";
    const res = await fetch(apiURL);
    apiQuotes = await res.json();

    newQuote();
  } catch (error) {
    errorMsg.classList.remove("hidden");
    parentEl.classList.add("hidden");
    hideLoading();
  }
}

// tweet quote
function tweetQuote() {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetURL, "_blank");
}

// event handlers
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuote();
