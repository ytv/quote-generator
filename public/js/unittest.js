// Unit tests
$(document).ready(function(){
  QUnit.test('Unit - new App.QuoteModel()', function(assert) {
    assert.expect(2);
    var done = assert.async();
    var test = function(model) {
      var value = model.get('value'),
        author = model.get('author');
      assert.expect(2);
      assert.ok(value, 'model.value is not null or undefined');
      assert.ok(author, 'model.author is not null or undefined');
      done();
    };

    var model = new App.QuoteModel();
    model.fetch({
      dataType: 'jsonp',
      success: function(model) {
        test(model);
      }
    });
  });

  QUnit.test('Unit - App._getQuoteView()', function(assert) {
    assert.expect(2);
    var view = App._getQuoteView();
    assert.ok($(view.el).find('.quote-text'), 'quote exists in view');
    assert.ok($(view.el).find('.author-text'), 'author exists in view');
  });
});
