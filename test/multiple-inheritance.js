var assert = require('assert');
var Class = require('../lib/active-class');
var Parent = Class({
  _constructor: function (name) {
    this.name = name;
  },
  say: function (prefix) {
    return prefix + ' ' + this.name;
  }
});
var Teacher = Class({
  _constructor: function (name) {
    this.name = name;
  },
  teach: function () {
    return 'Teach ' + this.name;
  }
});
var Child = Class(Parent, Teacher, {
  _constructor: function (name) {
    this.name = name;
  },
  getName: function () {
    return this.name;
  },
  setName: function (name) {
    this.name = name;
  },
  say: function (prefix, postfix) {
    return Parent.prototype.say.call(this, prefix) + ' ' + postfix;
  }
});
var child;

describe('Class(Parent,{})', function () {
  beforeEach(function () {
    child = new Child('starandtina');
  });

  describe('with mulitple inheritance', function () {
    it('should call the _constructor', function () {
      assert(child.getName() === 'starandtina');
    });

    it('should call say method', function () {
      assert(child.say('Hello', '!') === 'Hello starandtina !');
    });
  });
});