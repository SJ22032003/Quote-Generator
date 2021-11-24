const quoteContainer = document.getElementById("quoto-contianer");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
// Loader
const loader = document.getElementById('loader');

let apiQuotes = [];

//Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}
//Show Loadong
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Show New Quote
function newQuote() {
  loading();
  let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if(quote.author !== null){
  authorText.textContent = `- ${quote.author}`;
  }
  else{
    authorText.textContent = '- Anonymous';
  }
// set quote , hide loader
    quoteText.textContent = quote.text; 
complete();
}

// Get Quotes From API
async function getQuotes() {
    loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
    alert(error);
  }
}

// to Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Button Event Listner
twitterBtn.addEventListener('click' , tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

//On Load
getQuotes();
