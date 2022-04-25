function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fixmath = {}));
})(this, function (exports) {
  'use strict';
  /** 乘法 */

  var _multiply = function multiply(multiplier, multiplicand) {
    var cardinality = 0;

    var _multiplier = multiplier.toString();

    var _multiplicand = multiplicand.toString();

    try {
      cardinality += _multiplier.split('.')[1].length;
    } catch (e) {
      /** ignore */
    }

    try {
      cardinality += _multiplicand.split('.')[1].length;
    } catch (e) {
      /** ignore */
    }

    return Number(_multiplier.replace('.', '')) * Number(_multiplicand.replace('.', '')) / Math.pow(10, cardinality);
  };
  /** 减法 */


  var _subtract = function subtract(minuend, subtrahend) {
    var _minuend = 0;
    var _subtrahend = 0;

    try {
      _minuend = minuend.toString().split('.')[1].length;
    } catch (e) {
      /** ignore */
    }

    try {
      _subtrahend = subtrahend.toString().split('.')[1].length;
    } catch (e) {
      /** ignore */
    }

    var cardinality = Math.pow(10, Math.max(_minuend, _subtrahend));
    return (_multiply(minuend, cardinality) - _multiply(subtrahend, cardinality)) / cardinality;
  };
  /** 加法 */


  var _addition = function addition(augend, addend) {
    var _augend = 0;
    var _addend = 0;

    try {
      _augend = augend.toString().split('.')[1].length;
    } catch (e) {
      /** ignore */
    }

    try {
      _addend = addend.toString().split('.')[1].length;
    } catch (e) {
      /** ignore */
    }

    var cardinality = Math.pow(10, Math.max(_augend, _addend));
    return (_multiply(augend, cardinality) + _multiply(addend, cardinality)) / cardinality;
  };
  /** 除法 */


  var _divide = function divide(dividend, divisor) {
    var _dividend = 0;
    var _divisor = 0;

    var __dividend = dividend.toString();

    var __divisor = divisor.toString();

    try {
      _dividend = __dividend.split('.')[1].length;
    } catch (e) {
      /** ignore */
    }

    try {
      _divisor = __divisor.split('.')[1].length;
    } catch (e) {
      /** ignore */
    }

    return _multiply(Number(__dividend.replace('.', '')) / Number(__divisor.replace('.', '')), Math.pow(10, _divisor - _dividend));
  };

  var Implement = /*#__PURE__*/Object.freeze({
    __proto__: null,
    multiply: _multiply,
    subtract: _subtract,
    addition: _addition,
    divide: _divide
  });

  var isNumberic = function isNumberic(value) {
    return typeof value === 'number' && !isNaN(value) || /^\d+(\.\d+)?$/.test(value);
  };

  var Chain = /*#__PURE__*/function () {
    function Chain(args, type) {
      _classCallCheck(this, Chain);

      this.value = 0;
      this.value = this.__init(args, type);
    }

    _createClass(Chain, [{
      key: "__exec",
      value: function __exec(args, type) {
        return args.reduce(function (ret, value) {
          ret = Implement[type](ret, value);
          return ret;
        }, this.value);
      }
    }, {
      key: "__init",
      value: function __init(args, type) {
        if (typeof args === 'undefined') {
          args = [0];
        } else if (isNumberic(args)) {
          args = [args];
        }

        return this.__exec(args, type || 'addition');
      }
    }, {
      key: "multiply",
      value: function multiply(multiplicand) {
        this.value = _multiply(this.value, multiplicand);
        return this;
      }
    }, {
      key: "subtract",
      value: function subtract(subtrahend) {
        this.value = _subtract(this.value, subtrahend);
        return this;
      }
    }, {
      key: "addition",
      value: function addition(addend) {
        this.value = _addition(this.value, addend);
        return this;
      }
    }, {
      key: "divide",
      value: function divide(divisor) {
        this.value = _divide(this.value, divisor);
        return this;
      }
    }, {
      key: "getValue",
      value: function getValue() {
        return this.value;
      }
    }]);

    return Chain;
  }();

  var version = "0.1.2";

  var chain = function chain() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(Chain, args);
  };

  exports.VERSION = version;
  exports.addition = _addition;
  exports.chain = chain;
  exports.divide = _divide;
  exports.multiply = _multiply;
  exports.subtract = _subtract;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
