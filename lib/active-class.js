(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.Class = factory();
  }
}(this, function () {
  'use strict';

  // Constructor: Class
  // Base class used to construct all other classes. Includes support for multiple inheritance.
  //
  // To create a new class, use the following syntax:
  //
  //     var MyClass = Class(prototype);
  //
  // To create a new class with multiple inheritance, use the following syntax:
  //
  //     var MyClass = Class(Class1, Class2, prototype);
  //
  // Note that instanceof reflection will only reveal Class1 as superclass.
  var Class = function () {
    var len = arguments.length;
    // The fist one is the superclass
    var P = arguments[0];
    // By default, the last one is the prototype object
    var F = arguments[len - 1];

    // The default constructor
    // If the parent Class has `_constructor` property, then call it fristly
    var C = function () {
      if (C.uber && C.uber.hasOwnProperty('_constructor')) {
        C.uber._constructor.apply(this, arguments);
      }

      if (C.prototype.hasOwnProperty('_constructor')) {
        C.prototype._constructor.apply(this, arguments);
      }
    };

    if (len > 1) {
      var newArgs = [C, P].concat(
        Array.prototype.slice.call(arguments).slice(1, len - 1), F);
      inherit.apply(null, newArgs);
    } else {
      C.prototype = F;
    }

    // Binding `extend` method on the `constructor`, so we could use it like:
    //
    //     var MyClass = Class(prototype).extend(callback);
    //
    // The callback function is exectued in the context of `C.prototype`.
    C.extend = function (components) {
      if ('[object Array]' !== Object.prototype.toString.call(components)) {
        components = Array.prototype.concat.call(components);
      }

      var i = components.length;
      while (i--) {
        components[i].call(C.prototype);
      }

      return C;
    };

    return C;
  };

  // C will inherit from P
  // In addition to the mandatory C and P parameters, an arbitrary number of
  // objects can be passed, which will extend C.
  var inherit = function (C, P) {
    var F = function () {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.uber = P.prototype;
    var i, l, o;
    for (i = 2, l = arguments.length; i < l; i++) {
      o = arguments[i];
      if (typeof o === 'function') {
        o = o.prototype;
      }
      extend(C.prototype, o);
    }
  };

  // Copy all properties of a source object to a destination object.
  // Modifies the passed in destination object.  Any properties on the source object
  // that are set to undefined will not be (re)set on the destination object.
  var extend = function (destination, source) {
    destination = destination || {};
    if (source) {
      for (var property in source) {
        var value = source[property];
        if (value !== undefined) {
          destination[property] = value;
        }
      }
    }

    return destination;
  };

  return Class;
}));
