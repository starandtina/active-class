# active-class

[![Build Status](https://travis-ci.org/starandtina/active-class.svg)](https://travis-ci.org/starandtina/active-class)
[![Coverage Status](https://coveralls.io/repos/starandtina/active-class/badge.png)](https://coveralls.io/r/starandtina/active-class)

Define your Class with JavaScript.

## Installation

```
$ npm install -g bower
$ bower install active-class
```

Or just use the bundled version in the __dist__ directory.

## Usage

### Simple Inheritane

To create a new class, use the following syntax:

```
var MyClass = Class(prototype);
```

```
var Foo = Class({
  _constructor: function (name) {
    this.name = name;
  },
  say: function (prefix) {
    return prefix + ' ' + this.name;
  }
});

var foo = new Foo('foo');
foo.say('hello'); // hello foo
```

### Multiple Inheritance

To create a new class with multiple inheritance, use the following syntax:

```
var MyClass = Class(Class1, Class2, prototype);
```

Note that instanceof reflection will only reveal Class1 as superclass.

```
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
```

## Documentation

Refer to __doc__ directory.

## Build

```
$ Grunt
```

## Test

```
$ npm test
```

## TODO

* Add Getter & Setter support
* Add static method inheritance support
* ...

## License

MIT
