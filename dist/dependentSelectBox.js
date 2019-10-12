(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DependentSelectBox", [], factory);
	else if(typeof exports === 'object')
		exports["DependentSelectBox"] = factory();
	else
		root["DependentSelectBox"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/assets/DependentSelectBox/constants.ts
var DATA_LINK = 'data-dependent-data-link';
var DEPENDENT_SELECT_BOX_SELECTOR = '[data-dependent-select-box]';
var EVENT_LOADED = 'dependentSelectBoxLoaded';
var EVENT_LOADING = 'dependentSelectBoxLoading';
var PARENTS_DATA = 'data-parents';
var PARENT_HAS_EVENT_LISTENER = 'data-has-dependent-listener';

// CONCATENATED MODULE: ./src/assets/DependentSelectBox/RequestManager.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var RequestManager_RequestManager = /** @class */ (function () {
    function RequestManager(naja) {
        var _this = this;
        this.handleResponse = function (form, dependentSelectBoxes, response) {
            for (var id in response) {
                var element = document.getElementById(id);
                if (element && element instanceof HTMLSelectElement) {
                    element.disabled = response[id].disabled;
                    element.innerHTML = response[id].options;
                }
            }
            _this.naja.fireEvent(EVENT_LOADED, { form: form, dependentSelectBoxes: dependentSelectBoxes });
        };
        this.handleRequest = function (form, dependentSelectBoxes, data) { return __awaiter(_this, void 0, Promise, function () {
            var link, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        link = form.getAttribute(DATA_LINK);
                        if (!link) {
                            throw new Error("Form " + form.id + " must have \"data-dependent-data-link\" attribute!");
                        }
                        this.naja.fireEvent(EVENT_LOADING, { form: form, dependentSelectBoxes: dependentSelectBoxes });
                        return [4 /*yield*/, this.naja.makeRequest('POST', link, data, {
                                dataType: 'json',
                                history: false,
                                responseType: 'json',
                            })];
                    case 1:
                        response = _a.sent();
                        this.handleResponse(form, dependentSelectBoxes, response);
                        return [2 /*return*/];
                }
            });
        }); };
        this.naja = naja;
    }
    return RequestManager;
}());
/* harmony default export */ var DependentSelectBox_RequestManager = (RequestManager_RequestManager);

// CONCATENATED MODULE: ./src/assets/DependentSelectBox/ParentsManager.ts

var getParents = function (selectBox) {
    var parentsData = selectBox.getAttribute(PARENTS_DATA);
    if (parentsData) {
        return JSON.parse(parentsData);
    }
    return [];
};
var getParentValue = function (element) {
    if (element.type === 'checkbox')
        return element.checked;
    var value = element.value.trim();
    if (value === '')
        return null;
    var number = Number(value);
    if (!Number.isNaN(number))
        return number;
    return value;
};
var getParentsData = function (form, parents) {
    var data = {};
    for (var _i = 0, parents_1 = parents; _i < parents_1.length; _i++) {
        var parent = parents_1[_i];
        var element = form.elements.namedItem(parent);
        if (element) {
            data[element.name] = getParentValue(element);
        }
    }
    return data;
};
var parentHasListener = function (parent) {
    return parent.getAttribute(PARENT_HAS_EVENT_LISTENER) !== null;
};
var setParentHasListener = function (parent) {
    return parent.setAttribute(PARENT_HAS_EVENT_LISTENER, 'true');
};
/* harmony default export */ var ParentsManager = ({
    getParents: getParents,
    getParentsData: getParentsData,
    parentHasListener: parentHasListener,
    setParentHasListener: setParentHasListener,
});

// CONCATENATED MODULE: ./src/assets/DependentSelectBox/DOMManager.ts



var DOMManager_DOMManager = /** @class */ (function () {
    function DOMManager(naja) {
        var _this = this;
        this.addListeners = function (parent, parents, selectBoxes) {
            var events = ['change'];
            if (_this.isParentTextBased(parent)) {
                events.push('keydown');
            }
            events.forEach(function (e) {
                return parent.addEventListener(e, _this.handleChange(parents, selectBoxes));
            });
            ParentsManager.setParentHasListener(parent);
        };
        this.findParent = function (id) {
            return document.getElementById(id);
        };
        this.findSelectBoxes = function () {
            return document.querySelectorAll(DEPENDENT_SELECT_BOX_SELECTOR);
        };
        this.handleChange = function (parents, selectBoxes) { return function (event) {
            var input = event.target;
            var form = input.form;
            for (var _i = 0, selectBoxes_1 = selectBoxes; _i < selectBoxes_1.length; _i++) {
                var selectBox = selectBoxes_1[_i];
                if (selectBox instanceof HTMLSelectElement) {
                    var selectBoxParents = ParentsManager.getParents(selectBox);
                    selectBox.disabled = selectBoxParents.includes(input.id);
                }
            }
            _this.requestManager.handleRequest(form, selectBoxes, {
                trigger: input.id,
                data: ParentsManager.getParentsData(form, parents),
            });
        }; };
        this.isParentTextBased = function (parent) {
            return ['text', 'number', 'textarea'].includes(parent.type);
        };
        this.requestManager = new DependentSelectBox_RequestManager(naja);
    }
    return DOMManager;
}());
/* harmony default export */ var DependentSelectBox_DOMManager = (DOMManager_DOMManager);

// CONCATENATED MODULE: ./src/assets/DependentSelectBox/index.ts


var DependentSelectBox_DependentSelectBox = /** @class */ (function () {
    function DependentSelectBox(naja) {
        var _this = this;
        this.init = function () {
            var selectBoxes = _this.domManager.findSelectBoxes();
            for (var _i = 0, selectBoxes_1 = selectBoxes; _i < selectBoxes_1.length; _i++) {
                var selectBox = selectBoxes_1[_i];
                var parents = ParentsManager.getParents(selectBox);
                parents.forEach(_this.initParent(parents, selectBoxes));
            }
        };
        this.initParent = function (parents, selectBoxes) { return function (id) {
            var parent = _this.domManager.findParent(id);
            if (parent !== null && !ParentsManager.parentHasListener(parent)) {
                _this.domManager.addListeners(parent, parents, selectBoxes);
            }
        }; };
        this.naja = naja;
        this.domManager = new DependentSelectBox_DOMManager(this.naja);
        this.naja.addEventListener('load', this.init);
    }
    return DependentSelectBox;
}());
/* harmony default export */ var assets_DependentSelectBox = (DependentSelectBox_DependentSelectBox);

// CONCATENATED MODULE: ./src/assets/index.ts
/* concated harmony reexport default */__webpack_require__.d(__webpack_exports__, "default", function() { return assets_DependentSelectBox; });



/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=dependentSelectBox.js.map