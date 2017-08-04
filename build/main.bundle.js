/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _gameobject = __webpack_require__(1);

var _gameobject2 = _interopRequireDefault(_gameobject);

var _vector = __webpack_require__(2);

var _vector2 = _interopRequireDefault(_vector);

var _quadtreeLib = __webpack_require__(3);

var _quadtreeLib2 = _interopRequireDefault(_quadtreeLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vendors = ['webkit', 'moz']; // Imports

for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

// global accessible canvas members and quadtree
var canvas = void 0,
    context = void 0,
    qTree = void 0;

// Timing / game loop settings
var fps = 30,
    interval = 1000 / fps,
    lastTime = new Date().getTime(),
    currentTime = 0,
    delta = 0;

// Array to hold all active game objects
var gameObjects = [];

var isGameRunning = false;

// Get our canvas
function init() {
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext("2d");

    if (canvas !== undefined) {
        canvas.addEventListener("click", createGameObject);

        // Create Quadtree
        qTree = new _quadtreeLib2.default({
            width: canvas.width,
            height: canvas.height,
            maxElements: 5
        });

        gameLoop();
    }
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = new Date().getTime();
    delta = currentTime - lastTime;

    if (delta > interval) {

        frameActions();

        lastTime = currentTime - delta % interval;
    }
}

function frameActions() {
    // Clear canvas and quadTree every frame
    context.clearRect(0, 0, canvas.width, canvas.height);

    gameObjects.forEach(function (element) {
        element.move();
        element.render(context);

        qTree.push({
            x: element.x,
            y: element.y,
            width: element.radius,
            height: element.radius
        });
    });
}

function createGameObject(event) {
    var x = getMousePos(event).x,
        y = getMousePos(event).y,
        radius = 5,
        color = "#ffcd22";

    var velX = randomFromInterval(-1, 1),
        velY = randomFromInterval(-1, 1);

    var velVector = new _vector2.default(velX, velY);

    var obj = new _gameobject2.default(x, y, radius, velVector, color);
    gameObjects.push(obj);
}

function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function randomFromInterval(min, max) {
    return Math.random() * (max - min + 1) + min;
}

// Start the game
init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameObject = function () {
    function GameObject(x, y, radius, velVector, color) {
        _classCallCheck(this, GameObject);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velVector = velVector;
        this.color = color;
    }

    _createClass(GameObject, [{
        key: "render",
        value: function render(canvasContext) {
            canvasContext.beginPath();
            canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
            canvasContext.fillStyle = this.color;
            canvasContext.fill();
        }
    }, {
        key: "move",
        value: function move() {
            this.x += this.velVector.x;
            this.y += this.velVector.y;
        }
    }]);

    return GameObject;
}();

exports.default = GameObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
    function Vector(x, y) {
        _classCallCheck(this, Vector);

        this.x = x;
        this.y = y;
    }

    _createClass(Vector, [{
        key: "inverse",
        value: function inverse() {
            return new Vector(-this.x, -this.y);
        }
    }]);

    return Vector;
}();

exports.default = Vector;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
   true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && module.exports ? module.exports = t() : e.Quadtree = t();
}(undefined, function () {
  return function () {
    function e(t) {
      var n, i;if (this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this.maxElements = t.maxElements, null == this.width || null == this.height) throw new Error("Missing quadtree dimensions.");if (null == this.x && (this.x = 0), null == this.y && (this.y = 0), null == this.maxElements && (this.maxElements = 1), this.contents = [], this.oversized = [], this.size = 0, this.width < 1 || this.height < 1) throw new Error("Dimensions must be positive integers.");if (!Number.isInteger(this.x) || !Number.isInteger(this.y)) throw new Error("Coordinates must be integers");if (this.maxElements < 1) throw new Error("The maximum number of elements before a split must be a positive integer.");i = this, this.children = { NW: { create: function create() {
            return new e({ x: i.x, y: i.y, width: Math.max(Math.floor(i.width / 2), 1), height: Math.max(Math.floor(i.height / 2), 1), maxElements: i.maxElements });
          }, tree: null }, NE: { create: function create() {
            return new e({ x: i.x + Math.max(Math.floor(i.width / 2), 1), y: i.y, width: Math.ceil(i.width / 2), height: Math.max(Math.floor(i.height / 2), 1), maxElements: i.maxElements });
          }, tree: null }, SW: { create: function create() {
            return new e({ x: i.x, y: i.y + Math.max(Math.floor(i.height / 2), 1), width: Math.max(Math.floor(i.width / 2), 1), height: Math.ceil(i.height / 2), maxElements: i.maxElements });
          }, tree: null }, SE: { create: function create() {
            return new e({ x: i.x + Math.max(Math.floor(i.width / 2), 1), y: i.y + Math.max(Math.floor(i.height / 2), 1), width: Math.ceil(i.width / 2), height: Math.ceil(i.height / 2), maxElements: i.maxElements });
          }, tree: null } };for (n in this.children) {
        this.children[n].get = function () {
          return null != this.tree ? this.tree : (this.tree = this.create(), this.tree);
        };
      }
    }var t, n, i, r, h, l, o, s;return r = function r(e) {
      var t, n;return { x: Math.floor((null != (t = e.width) ? t : 1) / 2) + e.x, y: Math.floor((null != (n = e.height) ? n : 1) / 2) + e.y };
    }, t = function t(e, _t) {
      var n, i, r, h;return !(e.x >= _t.x + (null != (n = _t.width) ? n : 1) || e.x + (null != (i = e.width) ? i : 1) <= _t.x || e.y >= _t.y + (null != (r = _t.height) ? r : 1) || e.y + (null != (h = e.height) ? h : 1) <= _t.y);
    }, n = function n(e, t) {
      var n;return n = r(t), e.x < n.x ? e.y < n.y ? "NW" : "SW" : e.y < n.y ? "NE" : "SE";
    }, s = function s(e) {
      if ("object" != (typeof e === "undefined" ? "undefined" : _typeof(e))) throw new Error("Element must be an Object.");if (null == e.x || null == e.y) throw new Error("Coordinates properties are missing.");if ((null != e ? e.width : void 0) < 0 || (null != e ? e.height : void 0) < 0) throw new Error("Width and height must be positive integers.");
    }, l = function l(e) {
      var t, n, i, r;return n = Math.max(Math.floor(e.width / 2), 1), i = Math.ceil(e.width / 2), r = Math.max(Math.floor(e.height / 2), 1), t = Math.ceil(e.height / 2), { NW: { x: e.x, y: e.y, width: n, height: r }, NE: { x: e.x + n, y: e.y, width: i, height: r }, SW: { x: e.x, y: e.y + r, width: n, height: t }, SE: { x: e.x + n, y: e.y + r, width: i, height: t } };
    }, i = function i(e, n) {
      var i, r, h, o;o = [], h = l(n);for (r in h) {
        i = h[r], t(e, i) && o.push(r);
      }return o;
    }, h = function h(e, t) {
      var n;return n = function n(_n) {
        return e["_" + _n] = e[_n], Object.defineProperty(e, _n, { set: function set(e) {
            return t.remove(this, !0), this["_" + _n] = e, t.push(this);
          }, get: function get() {
            return this["_" + _n];
          }, configurable: !0 });
      }, n("x"), n("y"), n("width"), n("height");
    }, o = function o(e) {
      var t;return t = function t(_t2) {
        if (null != e["_" + _t2]) return delete e[_t2], e[_t2] = e["_" + _t2], delete e["_" + _t2];
      }, t("x"), t("y"), t("width"), t("height");
    }, e.prototype.push = function (e, t) {
      return this.pushAll([e], t);
    }, e.prototype.pushAll = function (e, t) {
      var n, r, l, o, u, f, c, d, a, g, p, m, x, y, v, w, E, M, z, b;for (p = 0, y = e.length; p < y; p++) {
        g = e[p], s(g), t && h(g, this);
      }for (c = [{ tree: this, elements: e }]; c.length > 0;) {
        for (E = c.shift(), b = E.tree, f = E.elements, d = { NW: null, NE: null, SW: null, SE: null }, m = 0, v = f.length; m < v; m++) {
          if (u = f[m], b.size++, a = i(u, b), 1 !== a.length || 1 === b.width || 1 === b.height) b.oversized.push(u);else if (b.size - b.oversized.length <= b.maxElements) b.contents.push(u);else {
            for (o = a[0], z = b.children[o], null == d[o] && (d[o] = { tree: z.get(), elements: [] }), d[o].elements.push(u), M = b.contents, x = 0, w = M.length; x < w; x++) {
              r = M[x], l = i(r, b)[0], null == d[l] && (d[l] = { tree: b.children[l].get(), elements: [] }), d[l].elements.push(r);
            }b.contents = [];
          }
        }for (o in d) {
          null != (n = d[o]) && c.push(n);
        }
      }return this;
    }, e.prototype.remove = function (e, t) {
      var i, r;return s(e), (i = this.oversized.indexOf(e)) > -1 ? (this.oversized.splice(i, 1), this.size--, t || o(e), !0) : (i = this.contents.indexOf(e)) > -1 ? (this.contents.splice(i, 1), this.size--, t || o(e), !0) : (r = this.children[n(e, this)], !(null == r.tree || !r.tree.remove(e, t)) && (this.size--, 0 === r.tree.size && (r.tree = null), !0));
    }, e.prototype.colliding = function (e, n) {
      var r, h, l, o, u, f, c, d, a, g, p, m, x, y;for (null == n && (n = t), s(e), u = [], l = [this]; l.length > 0;) {
        for (y = l.shift(), m = y.oversized, f = 0, a = m.length; f < a; f++) {
          (h = m[f]) !== e && n(e, h) && u.push(h);
        }for (x = y.contents, c = 0, g = x.length; c < g; c++) {
          (h = x[c]) !== e && n(e, h) && u.push(h);
        }for (o = i(e, y), 0 === o.length && (o = [], e.x >= y.x + y.width && o.push("NE"), e.y >= y.y + y.height && o.push("SW"), o.length > 0 && (1 === o.length ? o.push("SE") : o = ["SE"])), d = 0, p = o.length; d < p; d++) {
          r = o[d], null != y.children[r].tree && l.push(y.children[r].tree);
        }
      }return u;
    }, e.prototype.onCollision = function (e, n, r) {
      var h, l, o, u, f, c, d, a, g, p, m, x, y;for (null == r && (r = t), s(e), o = [this]; o.length > 0;) {
        for (y = o.shift(), m = y.oversized, f = 0, a = m.length; f < a; f++) {
          (l = m[f]) !== e && r(e, l) && n(l);
        }for (x = y.contents, c = 0, g = x.length; c < g; c++) {
          (l = x[c]) !== e && r(e, l) && n(l);
        }for (u = i(e, y), 0 === u.length && (u = [], e.x >= y.x + y.width && u.push("NE"), e.y >= y.y + y.height && u.push("SW"), u.length > 0 && (1 === u.length ? u.push("SE") : u = ["SE"])), d = 0, p = u.length; d < p; d++) {
          h = u[d], null != y.children[h].tree && o.push(y.children[h].tree);
        }
      }return null;
    }, e.prototype.get = function (e) {
      return this.where(e);
    }, e.prototype.where = function (e) {
      var t, i, r, h, l, o, u, f, c, d, a, g, p;if ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && (null == e.x || null == e.y)) return this.find(function (t) {
        var n, i;n = !0;for (i in e) {
          e[i] !== t[i] && (n = !1);
        }return n;
      });for (s(e), h = [], r = [this]; r.length > 0;) {
        for (p = r.shift(), d = p.oversized, l = 0, f = d.length; l < f; l++) {
          i = d[l], t = !0;for (u in e) {
            e[u] !== i[u] && (t = !1);
          }t && h.push(i);
        }for (a = p.contents, o = 0, c = a.length; o < c; o++) {
          i = a[o], t = !0;for (u in e) {
            e[u] !== i[u] && (t = !1);
          }t && h.push(i);
        }g = p.children[n(e, p)], null != g.tree && r.push(g.tree);
      }return h;
    }, e.prototype.each = function (e) {
      var t, n, i, r, h, l, o, s, u, f;for (n = [this]; n.length > 0;) {
        for (f = n.shift(), s = f.oversized, r = 0, l = s.length; r < l; r++) {
          i = s[r], "function" == typeof e && e(i);
        }for (u = f.contents, h = 0, o = u.length; h < o; h++) {
          i = u[h], "function" == typeof e && e(i);
        }for (t in f.children) {
          null != f.children[t].tree && n.push(f.children[t].tree);
        }
      }return this;
    }, e.prototype.find = function (e) {
      var t, n, i, r, h, l, o, s, u, f, c;for (n = [this], r = []; n.length > 0;) {
        for (c = n.shift(), u = c.oversized, h = 0, o = u.length; h < o; h++) {
          i = u[h], ("function" == typeof e ? e(i) : void 0) && r.push(i);
        }for (f = c.contents, l = 0, s = f.length; l < s; l++) {
          i = f[l], ("function" == typeof e ? e(i) : void 0) && r.push(i);
        }for (t in c.children) {
          null != c.children[t].tree && n.push(c.children[t].tree);
        }
      }return r;
    }, e.prototype.filter = function (t) {
      var _n2;return (_n2 = function n(i) {
        var r, h, l, o, s, u, f, c, d, a, g;h = new e({ x: i.x, y: i.y, width: i.width, height: i.height, maxElements: i.maxElements }), h.size = 0;for (r in i.children) {
          null != i.children[r].tree && (h.children[r].tree = _n2(i.children[r].tree), h.size += null != (c = null != (d = h.children[r].tree) ? d.size : void 0) ? c : 0);
        }for (a = i.oversized, o = 0, u = a.length; o < u; o++) {
          l = a[o], (null == t || ("function" == typeof t ? t(l) : void 0)) && h.oversized.push(l);
        }for (g = i.contents, s = 0, f = g.length; s < f; s++) {
          l = g[s], (null == t || ("function" == typeof t ? t(l) : void 0)) && h.contents.push(l);
        }return h.size += h.oversized.length + h.contents.length, 0 === h.size ? null : h;
      })(this);
    }, e.prototype.reject = function (e) {
      return this.filter(function (t) {
        return !("function" == typeof e ? e(t) : void 0);
      });
    }, e.prototype.visit = function (e) {
      var t, n, i;for (n = [this]; n.length > 0;) {
        i = n.shift(), e.bind(i)();for (t in i.children) {
          null != i.children[t].tree && n.push(i.children[t].tree);
        }
      }return this;
    }, e.prototype.pretty = function () {
      var e, t, n, i, r, h, l;for (h = "", n = function n(e) {
        var t, n, i;for (i = "", t = n = e; n <= 0 ? t < 0 : t > 0; n <= 0 ? ++t : --t) {
          i += "   ";
        }return i;
      }, t = [{ label: "ROOT", tree: this, level: 0 }]; t.length > 0;) {
        l = t.shift(), i = n(l.level), h += i + "| " + l.label + "\n" + i + "| ------------\n", l.tree.oversized.length > 0 && (h += i + "| * Oversized elements *\n" + i + "|   " + l.tree.oversized + "\n"), l.tree.contents.length > 0 && (h += i + "| * Leaf content *\n" + i + "|   " + l.tree.contents + "\n"), r = !1;for (e in l.tree.children) {
          null != l.tree.children[e].tree && (r = !0, t.unshift({ label: e, tree: l.tree.children[e].tree, level: l.level + 1 }));
        }r && (h += i + "└──┐\n");
      }return h;
    }, e;
  }();
});
//# sourceMappingURL=quadtree.min.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map