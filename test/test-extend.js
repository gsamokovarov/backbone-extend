$(document).ready(function() {

  // Zepto and ender does not have it, so stub it out for them.
  $.noop || ($.noop = function() {});

  var extend = Backbone.extend;
  var lastProtoProps, lastClassProps;

  module("Backbone.Extend", {
    setup: function() {
      Backbone.extend = function(protoProps, classProps) {
        lastProtoProps = protoProps;
        lastClassProps = classProps;

        return extend.apply(this, arguments);
      }
    },

    teardown: function() {
      Backbone.extend = extend;
    }
  });

  test("Backbone#extend can be overriden", function() {
    var Model = Backbone.Model.extend({
      urlRoot: '/'
    });
    equal(lastProtoProps.urlRoot, Model.prototype.urlRoot);

    var Collection = Backbone.Collection.extend({
      model: Model
    });
    equal(lastProtoProps.model, Collection.prototype.model);

    var View = Backbone.View.extend({
      display: $.noop()
    }, {
      anyDisplayed: true
    });
    equal(lastProtoProps.display, View.prototype.display);
    equal(lastClassProps.anyDisplayed, true);

    var Router = Backbone.Router.extend();
    ok(_.isUndefined(lastProtoProps));
    ok(_.isUndefined(lastClassProps));
  });

  _.each(['Model', 'Collection', 'History', 'Router', 'View'], function(kind) {
    test('Backbone.extend propagated to ' + kind, 1, function() {
      Backbone.extend = function() {
        ok(true);
      };

      var type = Backbone[kind].extend();
    });
  });

});
