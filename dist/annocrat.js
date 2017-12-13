// annocrat  built Wed Dec 13 2017 15:29:06 GMT-0500 (EST)


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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Anno;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Anno(oaAnnotation) {
  return new Annotation(oaAnnotation);
}

var Annotation = function () {
  function Annotation(oaAnnotation) {
    _classCallCheck(this, Annotation);

    this.oaAnnotation = oaAnnotation;
  }

  _createClass(Annotation, [{
    key: 'addTag',
    value: function addTag(tag) {
      var resources = this._makeArray(this.oaAnnotation.resource);
      resources.push(this._createTag(tag));
      this.oaAnnotation.resource = resources;
    }
  }, {
    key: 'addTarget',


    /**
     * Add target ("on" attribute) to annotation
     */
    value: function addTarget(target) {
      var anno = this.oaAnnotation;

      anno.on = this._makeArray(anno.on);
      anno.on.push(target);
    }
  }, {
    key: 'addInverseTarget',
    value: function addInverseTarget(annotation) {
      var anno = this.oaAnnotation;

      anno.targetedBy = this._makeArray(anno.targetedBy);
      anno.targetedBy.push(annotation);
    }
  }, {
    key: '_makeArray',
    value: function _makeArray(object) {
      if (typeof object === 'null' || typeof object === 'undefined') {
        return [];
      }
      if (object instanceof Array) {
        return object;
      }
      return [object];
    }
  }, {
    key: '_getTextResource',
    value: function _getTextResource() {
      var resources = this._makeArray(this.oaAnnotation.resource);

      var items = resources.filter(function (item) {
        return item['@type'] === 'dctypes:Text';
      });
      if (items.length > 0) {
        if (items.length > 1) {
          console.log('WARNING Annotation#_getTextResource too many text items:', items.length);
        }
        return items[0];
      } else {
        return null;
      }
    }
  }, {
    key: '_createTag',
    value: function _createTag(tagString) {
      return {
        '@type': 'oa:Tag',
        chars: tagString
      };
    }
  }, {
    key: 'id',
    get: function get() {
      return this.oaAnnotation['@id'];
    }
  }, {
    key: 'layerId',
    get: function get() {
      return this.oaAnnotation.layerId;
    }

    /**
     * @returns {Array} IDs of layers associated with the annotation
     */

  }, {
    key: 'layers',
    get: function get() {
      return this.oaAnnotation.layers;
    }

    /**
     * Returns content of first text (non-tag) resource it finds from the annotation.
     */

  }, {
    key: 'bodyText',
    get: function get() {
      var textResource = this._getTextResource();
      return textResource ? textResource.chars : null;
    },
    set: function set(s) {
      var textResource = this._getTextResource();
      if (textResource) {
        textResource.chars = s;
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'bodyStyle',
    get: function get() {
      var textResource = this._getTextResource();
      return textResource ? textResource.style : null;
    }

    /**
     * Is Mirador implementation of tags IIIF non-conforming?
     */

  }, {
    key: 'tags',
    get: function get() {
      var resources = this._makeArray(this.oaAnnotation.resource);
      var tags = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = resources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item['@type'] === "oa:Tag") {
            tags.push(item.chars);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return tags;
    }
  }, {
    key: 'targets',
    get: function get() {
      return this._makeArray(this.oaAnnotation.on);
    }
  }, {
    key: 'targetedBy',
    get: function get() {
      return this._makeArray(this.oaAnnotation.targetedBy);
    }
  }]);

  return Annotation;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _anno = __webpack_require__(0);

var _anno2 = _interopRequireDefault(_anno);

var _annoUtil = __webpack_require__(2);

var _annoUtil2 = _interopRequireDefault(_annoUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.annocrat = {
  Anno: _anno2.default,
  util: _annoUtil2.default
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _anno = __webpack_require__(0);

var _anno2 = _interopRequireDefault(_anno);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  logger: { debug: function debug() {}, info: function info() {}, warning: function warning() {}, error: function error() {} },

  setLogger: function setLogger(logger) {
    this.logger = logger;
  },

  /**
   * @param {object} target "on" attribute of an annotation
   * @returns {boolean} true if the target is a canvas fragment, not another annotation
   */
  targetIsAnnotationOnCanvas: function targetIsAnnotationOnCanvas(target) {
    return target['@type'] !== 'oa:Annotation';
  },

  hasTargetOnCanvas: function hasTargetOnCanvas(annotation) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _anno2.default)(annotation).targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var target = _step.value;

        if (this.targetIsAnnotationOnCanvas(target)) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  },

  findAnnotationFromListById: function findAnnotationFromListById(annotationId, annotations) {
    var matched = annotations.filter(function (anno) {
      if (!anno || (typeof anno === 'undefined' ? 'undefined' : _typeof(anno)) !== 'object') {
        logger.error('AnnotationUtil#findAnnotationFromListById invalid annotation', anno);
        return false;
      }
      return anno['@id'] === annotationId;
    });
    if (matched.length > 1) {
      logger.error('AnnotationUtil#findAnnotationFromListById duplicate IDs', matched);
    }
    return matched[0];
  },


  // For an annotation that targets other annotation(s), follow the
  // "on" relations recursively until no more targets are found.
  findTransitiveTargetAnnotations: function findTransitiveTargetAnnotations(annotation, annotationMap) {
    //this.logger.debug('annoUtil.findTransitiveTargetAnnotations annotation:', annotation, 'annotationMap:', annotationMap);
    var $anno = (0, _anno2.default)(annotation);
    var targetAnnos = $anno.targets.map(function (target) {
      var annoId = target.full;
      return annotationMap[annoId];
    }).filter(function (anno) {
      return anno !== undefined && anno !== null;
    });

    if (targetAnnos.length === 0) {
      return [];
    }

    var result = targetAnnos;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = targetAnnos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var targetAnno = _step2.value;

        var tempResult = this.findTransitiveTargetAnnotations(targetAnno, annotationMap);
        result = result.concat(tempResult);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return result;
  },

  // For an annotation that targets other annotation(s), follow the
  // "on" relations recursively until no more targets are found.
  findTransitiveTargetingAnnotations: function findTransitiveTargetingAnnotations(annotation, annotationMap) {
    //this.logger.debug('annoUtil.findTransitiveTargetingAnnotations annotation:', annotation, 'annotationMap:', annotationMap);
    var $anno = (0, _anno2.default)(annotation);
    var targetingAnnos = $anno.targetedBy;

    targetingAnnos = targetingAnnos.filter(function (anno) {
      var annoInMap = annotationMap[anno['@id']];
      return annoInMap !== undefined && annoInMap !== null;
    });

    if (targetingAnnos.length === 0) {
      return [];
    }
    var result = targetingAnnos;

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = targetingAnnos[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var targetingAnno = _step3.value;

        var tempResult = this.findTransitiveTargetingAnnotations(targetingAnno, annotationMap);
        result = result.concat(tempResult);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return result;
  },

  findTargetAnnotationsOnCanvas: function findTargetAnnotationsOnCanvas(annotation, annotationMap) {
    var _this = this;

    //this.logger.debug('AnnotationUtil.findTargetAnnotationsOnCanvas anno:', annotation, 'annoMap:', annotationMap);
    var allTargetAnnos = this.findTransitiveTargetAnnotations(annotation, annotationMap);
    return allTargetAnnos.filter(function (anno) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = (0, _anno2.default)(anno).targets[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var target = _step4.value;

          if (_this.targetIsAnnotationOnCanvas(target)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      return false;
    });
  },

  /**
   * XXX this version of mergeTargets will probably have to be removed
   * because SVG to SVG merge will likely turn out to be illegal against
   * the IIIF spec. The selector SVG of a target should always contains
   * a single path and if multiple targets exist for an annotation,
   * the "on" field should be an array of targets.
   *
   * Merge annotation's target ("on" attribute) with a new "on" attribute (sourceTarget).
   */
  mergeTargetsOld: function mergeTargetsOld(annotation, sourceTarget) {
    var destTarget = annotation.on;
    var destCanvasId = destTarget.full;
    var sourceCanvasId = sourceTarget.full;

    if (destTarget instanceof Array) {
      // (destination) annotation has (possibly) multiple targets
      var targetsWithSameCanvasId = destTarget.filter(function (on) {
        return on.full === sourceCanvasId;
      });
      if (targetsWithSameCanvasId.length === 1) {
        // there's a destination target on the same canvas as the source target
        var target = targetsWithSameCanvasId[0];
        target.selector.value = svgUtil.mergeSvgs(target.selector.value, sourceTarget.selector.value);
      } else if (targetsWithSameCanvasId.length === 0) {
        // there's no existing target on the same canvas
        annotation.on.push(sourceTarget);
      } else {
        throw 'multiple targets on same canvas';
      }
    } else {
      // (destination) annotation has a single target
      var destTargetId = destTarget.full;
      if (destCanvasId === sourceCanvasId) {
        destTarget.selector.value = svgUtil.mergeSvgs(destTarget.selector.value, sourceTarget.selector.value);
      } else {
        annotation.on = [destTarget, sourceTarget];
      }
    }
  }
};

/***/ })
/******/ ]);