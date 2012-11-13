(function(Backbone) {

  // Expose the overridable self-propagating extend function.
  Backbone.extend = Backbone.Model.extend;

  // Find all of the extendables types in Backbone. This will cause types
  // introduced by plugins to use our generalized extend mechanism.
  var extendables = _.chain(Backbone).functions().filter(function(func) {
    return Backbone[func].extend === Backbone.extend;
  }).value();

  // Set up inheritance to use the exposed extend so it can be overriden.
  _.each(extendables, function(kind) {
    Backbone[kind].extend = function() {
      return Backbone.extend.apply(this, arguments);
    };
  });

}).call(this, Backbone);
