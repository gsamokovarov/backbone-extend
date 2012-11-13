(function(Backbone) {

  // Expose the overridable self-propagating extend function.
  Backbone.extend = Backbone.Model.extend;

  // Set up inheritance to use the exposed extend so it can be overriden.
  _.each(['Model', 'Collection', 'Router', 'View', 'History'], function(kind) {
    Backbone[kind].extend = function() {
      return Backbone.extend.apply(this, arguments);
    };
  });

}).call(this, Backbone);
