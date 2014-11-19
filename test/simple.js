var assert = require('assert');
var Class = require('../lib/active-class');
var Foo = Class({
  _constructor: function (name) {
    this.name = name;
  },
  say: function (prefix) {
    return prefix + ' ' + this.name;
  }
});
var foo;

describe('Class({})', function () {
  beforeEach(function () {
    foo = new Foo('starandtina');
  });

  describe('with simple prototype object', function () {
    it('should call the _constructor', function () {
      assert(foo.name === 'starandtina');
    });

    it('should call say method', function () {
      assert(foo.say('Hello') === 'Hello starandtina');
    });
  });
});
