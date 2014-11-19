var assert = require('assert');
var Class = require('../lib/active-class');
var Foo = Class({
  _constructor: function (name) {
    this.name = name;
  }
}).extend([function () {
  this.getName = function () {
    return this.name;
  };
}, function () {
  this.setName = function (name) {
    this.name = name;
  };
}]).extend(function () {
  this.say = function (prefix) {
    return prefix + ' ' + this.name;
  }
});
var foo;

describe('Class({})', function () {
  beforeEach(function () {
    foo = new Foo('starandtina');
  });

  describe('with simple prototype object', function () {
    describe('with extend(function)', function () {
      it('should call say method', function () {
        assert(foo.say('Hello') === 'Hello starandtina');
      });
    });
    describe('with extend([function,function])', function () {
      it('should call getName method', function () {
        assert(foo.getName() === 'starandtina');
      });

      it('should call setName method', function () {
        foo.setName('foo');
        assert(foo.getName() === 'foo');
      });
    });
  });
});
