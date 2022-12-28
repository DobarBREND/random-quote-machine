let quotesData;

var colors = ["rgb(85, 15, 30)", "rgb(43, 5, 64)", "rgb(27, 54, 72)", "rgb(12, 35, 20)", "rgb(82, 72, 3)", "rgb(82, 50, 55)", "rgb(7, 28, 68)", "rgb(31, 83, 86)", "rgb(42, 53, 23)", "rgb(74, 35, 7)"];
var currentQuote = '',
  currentAuthor = '';



function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function fetchRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = fetchRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  /*--------------------------------- Twitter post -----------------------------*/
  
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

/*--------------------------- background color underlying the quotes and the "New Quote" button ------------------------*/ 

 var color = Math.floor(Math.random() * colors.length);
  $('#quote-box').animate(
    {
      backgroundColor: colors[color],
     },
    2000
  );
  $('.button').animate(
    {
      backgroundColor: colors[color]
    },
    2000
  );
}

/*---------------------------------------------------------------------------------------------------------------------------*/

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
