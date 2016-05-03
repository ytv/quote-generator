var apiURL = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";

var quoteCallBack = function(data){
  $("#quote").html(data.quoteText);
  $("#author").html("- " + data.quoteAuthor);

  var quote = data.quoteText;
  var author = data.quoteAuthor;
  tweet = quote + " -" + author

}

$(document).ready(function(){

  $.getJSON(apiURL, quoteCallBack);

  $("#getQuoteBtn").on('click', function(){
    $.getJSON(apiURL, quoteCallBack);
  });

  $("#tweetBtn").on('click', function(){
    window.open("https://twitter.com/intent/tweet?text=" + tweet);
  });
});
