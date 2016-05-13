(function() {
  $(document).ready(function(){
    App.init();
  });

  App = {
      init: function() {
        var self = this,
          quoteContainer = $('.quote-container'),
          getQuoteBtn = $('#get-quote-btn');
        quoteContainer.append(self._getQuoteView().el);
        getQuoteBtn.click(function() {
          quoteContainer.append(self._getQuoteView().el);
        });
      },
      _getQuoteView: function() {
        var model = new this.QuoteModel();
        var view = new this.QuoteView({
          model: model
        });
        return view;
      }
  };

  App.QuoteView = Backbone.View.extend({
    events: {
      'click .quote-remove': 'destroy',
      'click .quote-change': 'changeQuote',
      'click .tweet-btn': 'tweetQuote'
    },
    template: _.template(
      '<div class="quote">' +
        '<div class="text-right">' +
          '<i class="quote-change fa fa-refresh text-info"></i>' +
          '<i class="quote-remove fa fa-trash text-danger"></i>' +
        '</div>' +
        '<p class="quote-text"><%- value %></p>' +
        '<p class="quote-author">- <%- author %></p>' +
        '<button type="button" class="tweet-btn btn btn-twitter"><i class="fa fa-twitter"></i> Tweet it</button>' +
      '</div>'
    ),
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
      this.model.fetch({
        dataType: 'jsonp'
      });
    },
    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },
    destroy: function() {
      this.remove();
    },
    changeQuote: function() {
      this.model.fetch({
        dataType: 'jsonp'
      });
    },
    tweetQuote: function() {
      var tweet = tweet = this.model.get('value') + " -" + this.model.get('author');
      window.open("https://twitter.com/intent/tweet?text=" + tweet);
    }
  });

  App.QuoteModel = Backbone.Model.extend({
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
    parse: function(response) {
      return {
        value: response.quoteText,
        author: response.quoteAuthor || 'Unknown'
      };
    }
  });
})();
