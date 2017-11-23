webpackJsonp([0],{

/***/ 109:
/*!***************************************************!*\
  !*** ./packages/annotation-bridge/src/helpers.js ***!
  \***************************************************/
/*! exports provided: castBool, parseSelectorTarget, caseIdWithContext, castId, get, getMotivationInstance, motivationFromForm, labelId, iteratorGenerator, warning */
/*! exports used: castBool, castId, get, labelId, motivationFromForm, parseSelectorTarget, warning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = castBool;
/* harmony export (immutable) */ __webpack_exports__["f"] = parseSelectorTarget;
/* unused harmony export caseIdWithContext */
/* harmony export (immutable) */ __webpack_exports__["b"] = castId;
/* harmony export (immutable) */ __webpack_exports__["c"] = get;
/* unused harmony export getMotivationInstance */
/* harmony export (immutable) */ __webpack_exports__["e"] = motivationFromForm;
/* harmony export (immutable) */ __webpack_exports__["d"] = labelId;
/* unused harmony export iteratorGenerator */
/* harmony export (immutable) */ __webpack_exports__["g"] = warning;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vocab__ = __webpack_require__(/*! ./vocab */ 69);


// HELPER
function castBool(str) {
  if (str === undefined) {
    return false;
  }
  if (str === true) return true;
  if (str === false) return false;
  if (typeof str !== 'string') {
    return false;
  }
  return str.toLowerCase() === 'true';
}

function parseSelectorTarget(toParse, scale = 1) {
  if (!toParse) {
    return toParse;
  }
  const W3C_SELECTOR = /[#&?](xywh=)?(pixel:|percent:)?([0-9]+(\.[0-9]+)?),([0-9]+(\.[0-9]+)?),([0-9]+(\.[0-9]+)?),([0-9]+(\.[0-9]+)?)/;
  const match = W3C_SELECTOR.exec(toParse);

  if (match) {
    return {
      unit: match[2] === 'percent:' ? 'percent' : 'pixel',
      scale,
      expanded: true,
      x: parseFloat(match[3]) * scale,
      y: parseFloat(match[5]) * scale,
      width: parseFloat(match[7]) * scale,
      height: parseFloat(match[9]) * scale,
      toString() {
        // @todo maybe something else?
        return toParse.split('#')[0];
      }
    };
  }
  return toParse;
}

function caseIdWithContext(value, context) {
  const contexts = Object.keys(context).map(key => {
    return { key, id: context[key] && context[key][__WEBPACK_IMPORTED_MODULE_0__vocab__["j" /* ID */]] ? context[key][__WEBPACK_IMPORTED_MODULE_0__vocab__["j" /* ID */]] : null };
  });

  const found = contexts.find(v => {
    if (!v.id) {
      return false;
    }
    return value.substr(0, v.id.length) === v.id;
  });
  if (!found) {
    return value.replace('#', ':');
  }
  return `${found.key}:${value.substr(found.id.length + 1)}`;
}

function castId(value, defaultValue, context) {
  const returnValue = (value[__WEBPACK_IMPORTED_MODULE_0__vocab__["j" /* ID */]] ? value[__WEBPACK_IMPORTED_MODULE_0__vocab__["j" /* ID */]] : value) || defaultValue || '';
  return context ? caseIdWithContext(returnValue, context) : returnValue;
}

function get(value, context) {
  return (prop, defaultValue) => value ? value[prop] : defaultValue;
}

function getMotivationInstance(str) {
  const motive = str.toLowerCase();
  // Remove the open annotation prefix.
  if (motive.indexOf('oa:') === 0) {
    return getMotivationInstance(motive.substr(3));
  }
  if (motive.indexOf('o:') === 0) {
    return getMotivationInstance(motive.substr(2));
  }
  if (['assessing', 'bookmarking', 'classifying', 'commenting', 'describing', 'editing', 'highlighting', 'identifying', 'linking', 'moderating', 'questioning', 'replying', 'tagging'].indexOf(motive) !== -1) {
    return motive;
  }

  // This is the default to fallback to.
  return 'tagging';
}

function motivationFromForm(motivatedBy) {
  if (!motivatedBy) {
    return null;
  }
  if (!motivatedBy.id) {
    return null;
  }
  return {
    id: motivatedBy.id,
    label: motivatedBy.label ? motivatedBy.label : motivatedBy.id,
    instance: getMotivationInstance(motivatedBy.id)
  };
}

function labelId(res, defaultValue) {
  if (!res) {
    return defaultValue ? defaultValue : {
      id: null,
      label: 'unknown'
    };
  }
  if (Object.prototype.toString.call(res) === '[object Array]') {
    return res.map(labelId);
  } else if (typeof res === 'string' || res instanceof String) {
    return {
      id: res,
      label: res
    };
  }

  return {
    id: res[__WEBPACK_IMPORTED_MODULE_0__vocab__["j" /* ID */]],
    label: res[__WEBPACK_IMPORTED_MODULE_0__vocab__["q" /* OMEKA_LABEL */]]
  };
}

function iteratorGenerator(generator) {
  const instance = generator();
  return (...props) => {
    return instance.next(props).value;
  };
}

function warning(component, id, message) {
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test' && console.warn(`WARNING: ${component}
==================================================
Please check model at:
${id}

${message}
`);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../../node_modules/node-libs-browser/node_modules/process/browser.js */ 2)))

/***/ }),

/***/ 130:
/*!**************************************************!*\
  !*** ./packages/annotation-redux/src/utility.js ***!
  \**************************************************/
/*! exports provided: selectorCompat */
/*! exports used: selectorCompat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = selectorCompat;
const SHOW_LOGS = false;
const SHOW_WARNINGS = false;

function log(...args) {
  if (SHOW_LOGS) {
    console.info(...args);
  }
}
function warn(...args) {
  if (SHOW_WARNINGS) {
    warn(...args);
  }
}

function selectorCompat(item) {
  if (!item) {
    return item;
  }

  if (item.x && !item.left) {
    log('Selector compatibility: Adding left property.');
    Object.defineProperty(item, 'left', {
      get: function () {
        warn('Selector compatibility: Using deprecated `left` property.');
        return this.x;
      }
    });
  }
  if (item.y && !item.top) {
    log('Selector compatibility: Adding top property.');
    Object.defineProperty(item, 'top', {
      get: function () {
        warn('Selector compatibility: Using deprecated `top` property.');
        return this.y;
      }
    });
  }

  if (item.left && !item.x) {
    warn('Selector compatibility: Missing `x` property, but found `left`, shimming.');
    item.x = item.left;
  }

  if (item.top && !item.y) {
    warn('Selector compatibility: Missing `y` property, but found `top`, shimming.');
    item.y = item.top;
  }

  return item;
}

/***/ }),

/***/ 131:
/*!**************************************************************!*\
  !*** ./packages/annotation-redux/src/query/selectorQuery.js ***!
  \**************************************************************/
/*! exports provided: getCurrentSelector, isSelecting, currentSelectorIsSecondary */
/*! exports used: currentSelectorIsSecondary, getCurrentSelector, isSelecting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getCurrentSelector;
/* harmony export (immutable) */ __webpack_exports__["c"] = isSelecting;
/* harmony export (immutable) */ __webpack_exports__["a"] = currentSelectorIsSecondary;
function getCurrentSelector(state) {
  return state.selector.currentSelector;
}

function isSelecting(state) {
  return state.selector && state.selector.currentSelector && state.selector.currentSelector.type;
}

function currentSelectorIsSecondary(state) {
  return isSelecting(state) && state.selector.currentSelector.secondary && state.selector.currentSelector.secondary === true;
}

/***/ }),

/***/ 132:
/*!************************************************************!*\
  !*** ./packages/annotation-redux/src/actions/elucidate.js ***!
  \************************************************************/
/*! exports provided: ELUCIDATE_SET_SERVER, ELUCIDATE_SET_RESOURCE, ELUCIDATE_CREATE_COLLECTION, ELUCIDATE_SET_COLLECTION, ELUCIDATE_SEND_ANNOTATION, ELUCIDATE_ADD_ANNOTATION, initialiseElucidate, setServer, setResource, createCollection, setCollection, addElucidateAnnotation, elucidateSendAnnotation, createAnnotation, updateAnnotation, sendAnnotation */
/*! exports used: ELUCIDATE_ADD_ANNOTATION, ELUCIDATE_CREATE_COLLECTION, ELUCIDATE_SEND_ANNOTATION, ELUCIDATE_SET_COLLECTION, ELUCIDATE_SET_RESOURCE, ELUCIDATE_SET_SERVER, addElucidateAnnotation, createAnnotation, createCollection, sendAnnotation, setCollection, setResource, setServer, updateAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export initialiseElucidate */
/* harmony export (immutable) */ __webpack_exports__["m"] = setServer;
/* harmony export (immutable) */ __webpack_exports__["l"] = setResource;
/* harmony export (immutable) */ __webpack_exports__["i"] = createCollection;
/* harmony export (immutable) */ __webpack_exports__["k"] = setCollection;
/* harmony export (immutable) */ __webpack_exports__["g"] = addElucidateAnnotation;
/* unused harmony export elucidateSendAnnotation */
/* harmony export (immutable) */ __webpack_exports__["h"] = createAnnotation;
/* harmony export (immutable) */ __webpack_exports__["n"] = updateAnnotation;
/* harmony export (immutable) */ __webpack_exports__["j"] = sendAnnotation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blueimp_md5__ = __webpack_require__(/*! blueimp-md5 */ 576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_blueimp_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_blueimp_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__query_elucidateQuery__ = __webpack_require__(/*! ../query/elucidateQuery */ 133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_elucidate__ = __webpack_require__(/*! ../lib/elucidate */ 88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_annotation_Annotation__ = __webpack_require__(/*! ../lib/annotation/Annotation */ 226);




const ELUCIDATE_SET_SERVER = 'ELUCIDATE_SET_SERVER';
/* harmony export (immutable) */ __webpack_exports__["f"] = ELUCIDATE_SET_SERVER;

const ELUCIDATE_SET_RESOURCE = 'ELUCIDATE_SET_RESOURCE';
/* harmony export (immutable) */ __webpack_exports__["e"] = ELUCIDATE_SET_RESOURCE;

const ELUCIDATE_CREATE_COLLECTION = 'ELUCIDATE_CREATE_COLLECTION';
/* harmony export (immutable) */ __webpack_exports__["b"] = ELUCIDATE_CREATE_COLLECTION;

const ELUCIDATE_SET_COLLECTION = 'ELUCIDATE_SET_COLLECTION';
/* harmony export (immutable) */ __webpack_exports__["d"] = ELUCIDATE_SET_COLLECTION;

const ELUCIDATE_SEND_ANNOTATION = 'ELUCIDATE_SEND_ANNOTATION';
/* harmony export (immutable) */ __webpack_exports__["c"] = ELUCIDATE_SEND_ANNOTATION;

const ELUCIDATE_ADD_ANNOTATION = 'ELUCIDATE_ADD_ANNOTATION';
/* harmony export (immutable) */ __webpack_exports__["a"] = ELUCIDATE_ADD_ANNOTATION;


function initialiseElucidate(elucidateServer, resource, resourceLabel) {
  return (dispatch, state) => {
    if (!elucidateServer) {
      return null;
    }
    dispatch(setServer(elucidateServer));
    dispatch(setResource(resource));
    dispatch(createCollection(resourceLabel, resource));
  };
}

function setServer(server) {
  return { type: ELUCIDATE_SET_SERVER, payload: { server } };
}

function setResource(resource) {
  return { type: ELUCIDATE_SET_RESOURCE, payload: { resource } };
}

function createCollection(label, resourceId) {
  return (dispatch, state) => {
    dispatch({ type: ELUCIDATE_CREATE_COLLECTION, payload: { label, resourceId } });
    const elucidateServer = Object(__WEBPACK_IMPORTED_MODULE_1__query_elucidateQuery__["b" /* getServer */])(state());
    return Object(__WEBPACK_IMPORTED_MODULE_2__lib_elucidate__["b" /* createElucidateCollection */])(elucidateServer, label, __WEBPACK_IMPORTED_MODULE_0_blueimp_md5___default()(resourceId)).then(collection => {
      dispatch(setCollection(resourceId, collection));
      return collection;
    });
  };
}

function setCollection(resourceId, collection) {
  return {
    type: ELUCIDATE_SET_COLLECTION,
    payload: { resourceId, collection }
  };
}

function addElucidateAnnotation(annotation) {
  return { type: ELUCIDATE_ADD_ANNOTATION, payload: { id: annotation.id, annotation } };
}

function elucidateSendAnnotation(annotation) {
  return {
    type: ELUCIDATE_SEND_ANNOTATION,
    payload: { annotation: annotation.toJSON() }
  };
}

function createAnnotation(annotation) {
  return (dispatch, state) => {
    dispatch(elucidateSendAnnotation(annotation));
    const collection = Object(__WEBPACK_IMPORTED_MODULE_1__query_elucidateQuery__["a" /* getCollectionId */])(state());
    return Object(__WEBPACK_IMPORTED_MODULE_2__lib_elucidate__["d" /* postAnnotation */])(collection, annotation).then(annotation => dispatch(addElucidateAnnotation(annotation)));
  };
}

function updateAnnotation(id, annotation) {
  return (dispatch, state) => {
    const collection = Object(__WEBPACK_IMPORTED_MODULE_1__query_elucidateQuery__["a" /* getCollectionId */])(state());
    dispatch(elucidateSendAnnotation(annotation));
    const annoationId = (collection.substr(collection.length - 1) === '/' ? collection : collection + '/') + id;
    annotation.id = annoationId;
    return Object(__WEBPACK_IMPORTED_MODULE_2__lib_elucidate__["e" /* putAnnotation */])(annoationId, annotation).then(annotation => dispatch(addElucidateAnnotation(annotation)));
  };
}

/**
 * @deprecated
 */
function sendAnnotation(body, target, motivation, label) {
  return (dispatch, state) => {
    dispatch({ type: ELUCIDATE_SEND_ANNOTATION, payload: { annotation: { body, target, motivation, label } } });
    const collection = Object(__WEBPACK_IMPORTED_MODULE_1__query_elucidateQuery__["a" /* getCollectionId */])(state());
    return Object(__WEBPACK_IMPORTED_MODULE_2__lib_elucidate__["f" /* sendAnnotationToServer */])(collection, body, target, motivation, label).then(annotation => dispatch(addElucidateAnnotation(annotation)));
  };
}

/***/ }),

/***/ 133:
/*!***************************************************************!*\
  !*** ./packages/annotation-redux/src/query/elucidateQuery.js ***!
  \***************************************************************/
/*! exports provided: getServer, getAnnotationById, isSendingAnnotations, getCanvasFromManifest, getCollectionId, richAnnotationList, annotationList */
/*! exports used: getCollectionId, getServer, richAnnotationList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getServer;
/* unused harmony export getAnnotationById */
/* unused harmony export isSendingAnnotations */
/* unused harmony export getCanvasFromManifest */
/* harmony export (immutable) */ __webpack_exports__["a"] = getCollectionId;
/* harmony export (immutable) */ __webpack_exports__["c"] = richAnnotationList;
/* unused harmony export annotationList */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_elucidate_index__ = __webpack_require__(/*! ../lib/elucidate/index */ 88);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


function getServer(state) {
  return state.elucidate.server;
}

function getAnnotationById(state, id) {
  return state.elucidate.annotations[id];
}

function isSendingAnnotations(state) {
  return state.elucidate.pendingAnnotations > 0;
}

function getCanvasFromManifest(manifest, canvasId) {
  if (!(manifest || manifest.sequences || manifest.sequences[0] || manifest.sequences[0].canvases)) {
    return null;
  }
  const canvases = manifest.sequences[0].canvases;
  for (let canvas of canvases) {
    if (canvas['@id'] === canvasId) {
      return canvas;
    }
  }
  return null;
}

function getCollectionId(state) {
  return state.elucidate.collection.id;
}

// @todo swap into annotationList eventually.
function richAnnotationList(state) {
  return annotationList(state).map(annotation => _extends({}, annotation, {
    selector: __WEBPACK_IMPORTED_MODULE_0__lib_elucidate_index__["a" /* AnnotationSelector */].parse(annotation.target)
  }));
}

function annotationList(state) {
  const elucidateAnnotations = Object.keys(state.elucidate.annotations).map(key => state.elucidate.annotations[key]);
  const elucidateAnnotationsExist = !!elucidateAnnotations.length;
  if (!elucidateAnnotationsExist) {
    return [];
  }
  return elucidateAnnotations;
}

/***/ }),

/***/ 134:
/*!***********************************************************!*\
  !*** ./packages/annotation-redux/src/actions/manifest.js ***!
  \***********************************************************/
/*! exports provided: MANIFEST_ADD, MANIFEST_SELECT, MANIFEST_REMOVE, MANIFEST_REQUEST, MANIFEST_CANVAS_SELECT, requestManifest, selectCanvas, selectManifest, addManifest, removeManifest */
/*! exports used: MANIFEST_ADD, MANIFEST_CANVAS_SELECT, MANIFEST_REMOVE, MANIFEST_REQUEST, MANIFEST_SELECT, addManifest, removeManifest, requestManifest, selectCanvas, selectManifest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["h"] = requestManifest;
/* harmony export (immutable) */ __webpack_exports__["i"] = selectCanvas;
/* harmony export (immutable) */ __webpack_exports__["j"] = selectManifest;
/* harmony export (immutable) */ __webpack_exports__["f"] = addManifest;
/* harmony export (immutable) */ __webpack_exports__["g"] = removeManifest;
const MANIFEST_ADD = 'MANIFEST_ADD';
/* harmony export (immutable) */ __webpack_exports__["a"] = MANIFEST_ADD;

const MANIFEST_SELECT = 'MANIFEST_SELECT';
/* harmony export (immutable) */ __webpack_exports__["e"] = MANIFEST_SELECT;

const MANIFEST_REMOVE = 'MANIFEST_REMOVE';
/* harmony export (immutable) */ __webpack_exports__["c"] = MANIFEST_REMOVE;

const MANIFEST_REQUEST = 'MANIFEST_REQUEST';
/* harmony export (immutable) */ __webpack_exports__["d"] = MANIFEST_REQUEST;

const MANIFEST_CANVAS_SELECT = 'MANIFEST_CANVAS_SELECT';
/* harmony export (immutable) */ __webpack_exports__["b"] = MANIFEST_CANVAS_SELECT;


function requestManifest(url, select = true) {
  return dispatch => {
    dispatch({ type: MANIFEST_REQUEST, payload: { url } });
    return fetch(url).then(response => response.json()).then(body => {
      dispatch(addManifest(url, body));
      if (select) {
        dispatch(selectCanvas(url));
      }
      return body;
    });
  };
}

function selectCanvas(url) {
  return { type: MANIFEST_CANVAS_SELECT, payload: { url } };
}

function selectManifest(url) {
  return { type: MANIFEST_SELECT, payload: { url } };
}

function addManifest(url, manifest) {
  return { type: MANIFEST_ADD, payload: { url, manifest } };
}

function removeManifest(url) {
  return { type: MANIFEST_REMOVE, payload: { url } };
}

/***/ }),

/***/ 135:
/*!***********************************************************!*\
  !*** ./packages/annotation-plugin-core/src/core.utils.js ***!
  \***********************************************************/
/*! exports provided: getAttributes, deferred, unknownPropertyWarning, connectedBehaviour, prettyName, renderWhen, asyncForEach */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["getAttributes"] = getAttributes;
/* harmony export (immutable) */ __webpack_exports__["deferred"] = deferred;
/* harmony export (immutable) */ __webpack_exports__["unknownPropertyWarning"] = unknownPropertyWarning;
/* harmony export (immutable) */ __webpack_exports__["connectedBehaviour"] = connectedBehaviour;
/* harmony export (immutable) */ __webpack_exports__["prettyName"] = prettyName;
/* harmony export (immutable) */ __webpack_exports__["renderWhen"] = renderWhen;
/* harmony export (immutable) */ __webpack_exports__["asyncForEach"] = asyncForEach;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ 26);




function getAttributes($el) {
  const attributes = {};
  const length = $el.attributes.length;
  if (length > 0) {
    for (let i = 0; i < length; i++) {
      attributes[prettyName($el.attributes[i].nodeName)] = $el.attributes[i].nodeValue;
    }
  }
  return attributes;
}

function deferred() {
  let resolve = null;
  const promise = new Promise(r => {
    resolve = r;
  });
  return { resolve, promise };
}

function unknownPropertyWarning(unknownProps) {
  delete unknownProps['class'];
  delete unknownProps['behaviour'];
  delete unknownProps['style'];
  if (Object.keys(unknownProps).length) {
    console.warn('Found unknown properties passed to component', unknownProps);
  }
}

function connectedBehaviour($el, store, Component) {
  return Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["a" /* Provider */],
    { store: store },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component, null)
  ), $el);
}

function prettyName(attr) {
  if (attr.indexOf('data-') === 0) {
    return attr.substring(5).replace(/-([a-z])/g, g => g[1].toUpperCase());
  }
  return attr;
}

function renderWhen(store, shouldRender, component, root) {
  return new Promise(resolve => {
    let subscription = store.subscribe(() => {
      if (shouldRender(store.getState())) {
        resolve(Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(component, root));
        subscription();
      }
    });
  });
}

function asyncForEach(iterable, fn) {
  iterable.next().then(nextIterate => {
    if (nextIterate.done) {
      return;
    }
    fn(nextIterate.value);
    return asyncForEach(iterable, fn);
  }).catch(e => {
    console.warn('asyncForEach: ', e, iterable);
  });
}

/***/ }),

/***/ 141:
/*!**************************************************************!*\
  !*** ./packages/annotation-redux/src/query/manifestQuery.js ***!
  \**************************************************************/
/*! exports provided: currentManifest, getImageServiceFromCanvas, currentImageService, currentCanvas, manifestById, allManifests */
/*! exports used: currentCanvas, currentImageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export currentManifest */
/* unused harmony export getImageServiceFromCanvas */
/* harmony export (immutable) */ __webpack_exports__["b"] = currentImageService;
/* harmony export (immutable) */ __webpack_exports__["a"] = currentCanvas;
/* unused harmony export manifestById */
/* unused harmony export allManifests */
function currentManifest(state) {
  return manifestById(state, state.manifest.current);
}

function getImageServiceFromCanvas(canvas) {
  if (canvas.images && canvas.images[0] && canvas.images[0].resource && canvas.images[0].resource.service && canvas.images[0].resource.service['@id']) {
    return `${canvas.images[0].resource.service['@id']}/info.json`;
  }

  if (canvas.thumbnail && canvas.thumbnail.service && canvas.thumbnail.service['@id']) {
    return `${canvas.thumbnail.service['@id']}/info.json`;
  }
  if (canvas.thumbnail && canvas.thumbnail['@id']) {
    return canvas.thumbnail['@id'];
  }

  return null;
}

function currentImageService(state) {
  const canvas = currentCanvas(state);
  if (!canvas) {
    return null;
  }

  return getImageServiceFromCanvas(canvas);
}

function currentCanvas(state) {
  const manifest = currentManifest(state);
  const canvasId = state.manifest.currentCanvas;
  if (!(manifest && canvasId && manifest.sequences && manifest.sequences[0] && manifest.sequences[0].canvases)) {
    return null;
  }
  const canvases = manifest.sequences[0].canvases;
  for (let canvas of canvases) {
    if (canvas['@id'] === canvasId) {
      return canvas;
    }
  }
}

function manifestById(state, id) {
  if (!id) {
    return null;
  }
  if (!state.manifest.list[id]) {
    return null;
  }
  return state.manifest.list[id];
}

function allManifests(state) {
  const manifestKeys = Object.keys(state.manifest.list);
  if (!manifestKeys || !manifestKeys.length) {
    return [];
  }
  return manifestKeys.map(key => state.manifest.list[key]);
}

/***/ }),

/***/ 144:
/*!***************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/TextBox.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./TextBox.scss */ 671);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./TextBox.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./TextBox.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 178:
/*!****************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/EmbeddedResourceEditor.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EmbeddedResourceEditor_scss__ = __webpack_require__(/*! ./EmbeddedResourceEditor.scss */ 870);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EmbeddedResourceEditor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__EmbeddedResourceEditor_scss__);





const style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('embedded-resource-editor');

class EmbeddedResourceEditor extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { isLoaded: false, isLoading: false }, this.renderCurrentValue = (value, props, style) => {
      const { renderResource } = this.props;
      if (renderResource) {
        return renderResource(value, props, style);
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        value.label ? value.label : value
      );
    }, this.renderResourceEditor = ({ captureModel, postSave, props, style, onBack }) => {
      const { renderResourceEditor } = this.props;
      const { isLoading, isLoaded, captureModelId } = this.state;
      if (isLoading) return 'loading...';
      if (isLoaded) {
        return renderResourceEditor(captureModelId, postSave, props, style, onBack);
      }
    }, _temp;
  }

  componentDidMount() {
    const { captureModel, importCaptureModel } = this.props;
    const { isLoading, isLoaded } = this.state;
    if (isLoading) return null;
    if (isLoaded) return null;
    this.setState({ isLoading: true });
    importCaptureModel(captureModel).then(resourceTemplate => {
      this.setState({ isLoaded: true, isLoading: false, captureModelId: resourceTemplate['@id'] });
    });
  }

  render() {
    const { captureModel, value, metaData, id, displayFieldSelector, postSave, onBack } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style },
      metaData ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'label',
          { className: style.element('label'), htmlFor: id },
          metaData.title,
          ' ',
          ' ',
          metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { onClick: e => {
                e.preventDefault();
                displayFieldSelector(id);
              }, href: '#' },
            'edit'
          ) : null,
          metaData.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2__ui_HelpTooltip__["a" /* default */],
            null,
            metaData.description
          ) : null
        )
      ) : null,
      value ? this.renderCurrentValue(value, this.props, style) : this.renderResourceEditor({
        captureModel,
        postSave,
        props: this.props,
        style,
        onBack
      })
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EmbeddedResourceEditor;


/***/ }),

/***/ 179:
/*!*****************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/ComboButton.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ComboButton_scss__ = __webpack_require__(/*! ./ComboButton.scss */ 890);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ComboButton_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ComboButton_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





const $style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('combo-button');
class ComboButton extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { isOpen: false, isHovered: false }, this.close = () => {
      this.setState({ isOpen: false });
    }, this.open = () => {
      this.setState({ isOpen: true });
    }, _temp;
  }

  render() {
    const _props = this.props,
          { children, disabled = false } = _props,
          props = _objectWithoutProperties(_props, ['children', 'disabled']);
    const options = __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(children, (child, i) => i < 1 ? null : child);
    const label = __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(children, (child, i) => i < 1 ? child : null);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: $style.modifiers({ disabled }), onMouseLeave: this.close },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { onMouseEnter: this.close, className: $style.element('button') },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          _extends({ className: $style.element('cta').modifiers({ single: options.length === 0 }) }, props),
          label
        ),
        options.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: $style.element('toggle').modifiers({ 'open': this.state.isOpen }), onClick: this.open },
          '\u203A'
        ) : null
      ),
      options.length && this.state.isOpen ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: $style.element('list') },
        options
      ) : null
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ComboButton;


ComboButton.Option = (_ref) => {
  let { children } = _ref,
      props = _objectWithoutProperties(_ref, ['children']);

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'li',
    _extends({ className: $style.element('list-item') }, props),
    children
  );
};

/***/ }),

/***/ 180:
/*!**************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/resourceEditor.js ***!
  \**************************************************************************/
/*! exports provided: ConnectedResourceEditor, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_components__ = __webpack_require__(/*! digirati-annotation-components */ 91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__ = __webpack_require__(/*! digirati-annotation-bridge */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_digirati_annotation_redux_es_query_resourceQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/resourceQuery */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__ = __webpack_require__(/*! digirati-annotation-redux/es/actions/drafts */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_digirati_annotation_redux_es_lib_annotation_mapping__ = __webpack_require__(/*! digirati-annotation-redux/es/lib/annotation/mapping */ 904);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_renderForm__ = __webpack_require__(/*! ./views/renderForm */ 905);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__resourceEditor_utility__ = __webpack_require__(/*! ./resourceEditor.utility */ 908);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__views_confirmationPage__ = __webpack_require__(/*! ./views/confirmationPage */ 909);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__views_resourceNavigation__ = __webpack_require__(/*! ./views/resourceNavigation */ 912);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };













class ResourceEditor extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.annotationCreationUpdateFirstCreateRest = (annotationId, annotations) => {
      const { createAnnotation, updateAnnotation } = this.props;
      const first = annotations.shift();
      return [updateAnnotation(annotationId, first), ...annotations.map(singleAnnotation => createAnnotation(singleAnnotation))];
    }, this.createAnnotationToBeMovedToAnnotationRedux = targetResource => {
      const { currentResource, asyncPublishDraft, updateAnnotation, currentDraft, createAnnotation } = this.props;

      // Create our annotation.
      const annotation = Object(__WEBPACK_IMPORTED_MODULE_6_digirati_annotation_redux_es_lib_annotation_mapping__["b" /* createAnnotationFromCaptureModelAndDraft */])(targetResource, currentResource, currentDraft);

      const annotationId = currentDraft.fingerprint.identity ? currentDraft.fingerprint.identity : null;
      // Make a single promise we can wait on for sending one or many annotations.
      const promise = annotationId ?
      // Update annotation.
      Array.isArray(annotation) ? Promise.all(this.annotationCreationUpdateFirstCreateRest(annotationId, annotation)) : updateAnnotation(annotationId, annotation) :

      // Create annotation.
      Array.isArray(annotation) ? Promise.all(annotation.map(singleAnnotation => createAnnotation(singleAnnotation))) : createAnnotation(annotation);

      // Publish the draft after the annotations.
      const result = asyncPublishDraft(currentDraft.id, promise);

      return { result, annotation };
    }, this.createAnnotationWithoutTechDebt = () => {
      const { target, manifest, canvas, postSave } = this.props;
      const { result, annotation } = this.createAnnotationToBeMovedToAnnotationRedux(target === 'manifest' ? manifest : canvas);
      if (postSave) {
        postSave(result, annotation);
      }
    }, this.goBack = (discard = false) => {
      const { moveBack, tree, discardCurrentDraft, currentDraft, deselectDraft, onBack, commitToCurrentDraft, state } = this.props;
      moveBack(tree);
      // Discard the draft.
      if (discard) {
        Object(__WEBPACK_IMPORTED_MODULE_8__resourceEditor_utility__["b" /* mutateLocalStorage */])(currentList => {
          if (currentDraft && currentList[currentDraft.template] && currentList[currentDraft.template][currentDraft.id]) {
            currentList[currentDraft.template][currentDraft.id] = null;
            delete currentList[currentDraft.template][currentDraft.id];
          }
          return currentList;
        });
        discardCurrentDraft();
      } else {
        // @todo this commits it even if its not been used. Its not correct.
        // @todo What it should do is cancel the draft and come back to it in place, not currently supported.
        commitToCurrentDraft();
        deselectDraft();
      }
      if (onBack) {
        onBack(state);
      }
    }, this.saveLocally = draft => {
      const { importDraft } = this.props;
      if (draft.fingerprint.source === 'elucidate' && draft.fingerprint.identity) {
        const originalDraft = Object(__WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["u" /* changeFingerPrintLifecyle */])(draft, __WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["f" /* DRAFT_LIFECYCLE_NEW */]);
        importDraft(draft.id, originalDraft);
        draft.id = Object(__WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["D" /* generateDraftId */])();
      }
      const changedDraft = Object(__WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["u" /* changeFingerPrintLifecyle */])(Object(__WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["w" /* changeFingerprintSource */])(draft, 'localStorage'), __WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["f" /* DRAFT_LIFECYCLE_NEW */]);
      importDraft(draft.id, changedDraft);
      Object(__WEBPACK_IMPORTED_MODULE_8__resourceEditor_utility__["b" /* mutateLocalStorage */])(currentList => {
        currentList[draft.template] = currentList[draft.template] ? currentList[draft.template] : {};
        currentList[draft.template][draft.id] = changedDraft;
        return currentList;
      });
    }, this.saveAsInProgress = draft => {
      // Save to local storage for now.
      this.saveLocally(draft);
      // And take user back without discarding draft.
      this.goBack(false);
    }, this.onSaveAsIncomplete = draft => {
      const { createAnnotation, updateAnnotation, target, discardDraft, manifest, publishDraft, importDraft, canvas, getDraftsByFingerprintIdentity } = this.props;
      // Change draft source to be elucidate.
      const changedDraft = Object(__WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["u" /* changeFingerPrintLifecyle */])(Object(__WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["w" /* changeFingerprintSource */])(draft, 'elucidate'), __WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_actions_drafts__["f" /* DRAFT_LIFECYCLE_NEW */]);
      // Update locally.
      importDraft(draft.id, changedDraft);

      if (draft.fingerprint.identity) {
        const oldDraft = getDraftsByFingerprintIdentity(draft.id, draft.fingerprint.identity);
        if (oldDraft) {
          discardDraft(oldDraft.id);
        }
        // This is trying to be re-saved, we need to do a put.
        updateAnnotation(draft.fingerprint.identity, Object(__WEBPACK_IMPORTED_MODULE_6_digirati_annotation_redux_es_lib_annotation_mapping__["c" /* createInProgressAnnotation */])('In progress annotation', target === 'manifest' ? manifest : canvas, changedDraft, draft.fingerprint.scope, draft.fingerprint.identity));
      } else {
        // Create annotation in elucidate.
        createAnnotation(Object(__WEBPACK_IMPORTED_MODULE_6_digirati_annotation_redux_es_lib_annotation_mapping__["c" /* createInProgressAnnotation */])('In progress annotation', target === 'manifest' ? manifest : canvas, changedDraft, draft.fingerprint.scope));
      }
      // Delete from local storage
      Object(__WEBPACK_IMPORTED_MODULE_8__resourceEditor_utility__["b" /* mutateLocalStorage */])(currentList => {
        if (currentList[draft.template] && currentList[draft.template][draft.id]) {
          currentList[draft.template][draft.id] = null;
          delete currentList[draft.template][draft.id];
        }
        return currentList;
      });
      // Mark draft as published.
      publishDraft(draft.id);
      // Take user back without discarding draft.
      this.goBack(false);
    }, this.createAnnotation = () => {
      const { currentResource, target, manifest, canvas, asyncPublishDraft, currentDraft, updateAnnotation, createAnnotation, postSave } = this.props;
      const targetResource = target === 'manifest' ? manifest : canvas;
      this.resolveSelector(target, targetResource, currentDraft).then(draft => {
        // Create our annotation.
        const annotation = Object(__WEBPACK_IMPORTED_MODULE_6_digirati_annotation_redux_es_lib_annotation_mapping__["b" /* createAnnotationFromCaptureModelAndDraft */])(targetResource, currentResource, draft);

        const annotationId = currentDraft.fingerprint.source === 'elucidate' && currentDraft.fingerprint.identity ? currentDraft.fingerprint.identity : null;
        // Make a single promise we can wait on for sending one or many annotations.
        const promise = annotationId ?
        // Update annotation.
        Array.isArray(annotation) ? Promise.all(this.annotationCreationUpdateFirstCreateRest(annotationId, annotation)) : updateAnnotation(annotationId, annotation) :

        // Create annotation.
        Array.isArray(annotation) ? Promise.all(annotation.map(singleAnnotation => createAnnotation(singleAnnotation))) : createAnnotation(annotation);

        // Publish the draft after the annotations.
        const result = asyncPublishDraft(currentDraft.id, promise);

        // Run our post save.
        if (postSave) {
          postSave(result, annotation);
        }

        // Take user back without discarding draft.
        this.goBack();
      });
    }, _temp;
  }

  // This can in theory be moved to annotation-redux, once tech debt addressed.


  // This will replace createAnnotation


  hasMultipleSelectorsWithPercentages(currentDraft) {
    let hasSelectors = false;
    try {
      hasSelectors = Object.keys(currentDraft.selectors).map(k => currentDraft.selectors[k]).reduce((state, action) => !!(state || action.type && action.unit === 'percent'), false);
    } catch (e) {
      return false;
    }
    return hasSelectors;
  }

  resolveSelector(target, targetResource, draft) {
    const selector = draft.selector;

    if (target === 'manifest' || !selector) {
      return Promise.resolve(_extends({}, draft, { selector: targetResource }));
    }

    // ########################################################################
    //       !     Everything below this is technical debt.       !           #
    // ########################################################################
    // In order to remove this we need to be sure that
    // in a draft all selectors, both on the draft and the
    // draft fields are always pixel values, and not percentages.
    // work has been done, but the previous code was not removed, so
    // I've added this in to replace it, and tried to make sure that
    // it doesn't execute if its doesn't need to. I've also added console
    // warnings for us to check during execution.
    // The problem with this code is the dependency on the current state of the
    // viewer. We need to get the pixel sizes from the viewer in order to resolve
    // percent values.
    // For these reasons it did not make it into the annotation-redux package,
    // and should be verified that it is not being used, and removed, including
    // the whole resolve selector method itself.
    // See also: createAnnotationWithoutTechDebt()
    if (selector.unit === 'percent') {
      console.warn('ResourceEditor', 'Percentage selectors should not reach drafts, please report.');
      const { withViewer } = this.props;
      return new Promise(function (resolve, err) {
        withViewer(viewer => {
          const { height, width } = viewer.getImageSize();
          resolve(this.resolveSelector(_extends({}, draft, {
            selector: Object(__WEBPACK_IMPORTED_MODULE_6_digirati_annotation_redux_es_lib_annotation_mapping__["a" /* convertPercentToPixel */])(selector, height, width)
          })));
        });
      });
    }

    if (this.hasMultipleSelectorsWithPercentages(draft)) {
      console.warn('ResourceEditor', 'Percentage selectors should not reach draft fields, please report.');
      const { withViewer } = this.props;
      return new Promise(function (done, err) {
        withViewer(viewer => {
          const { height, width } = viewer.getImageSize();
          const draftFieldSelectors = Object.keys(draft.selectors).reduce((selectors, key) => {
            selectors[key] = Object(__WEBPACK_IMPORTED_MODULE_6_digirati_annotation_redux_es_lib_annotation_mapping__["a" /* convertPercentToPixel */])(draft.selectors[key], height, width);
          }, {});
          done(_extends({}, draft, { selectors: draftFieldSelectors }));
        });
      });
    }
    // ########################################################################
    //           !          End of technical debt.           !                #
    // ########################################################################

    return Promise.resolve(draft);
  }

  render() {
    const {
      // Variables
      currentSelector,
      currentResourceTemplate,
      currentDraft,
      resourceForm,
      tree,
      isConfirmingDraft,
      isSelecting,
      renderResourceEditor,
      importCaptureModel,
      treeRoute,
      enablePublishing = true,

      // Embedded specifics.
      immutableSelector,
      postSave,

      // Actions
      updateDraft,
      unpreviewDraft,
      confirmDraft,
      previewDraft,
      discardCurrentDraft,
      createDraft,
      isSelectingSecondary,
      editCurrentDraftSelector,
      editCurrentDraftSecondarySelector,
      editCurrentDraftFieldSelector,
      state,
      currentResource,

      moveForward,
      moveBack,
      onBack,
      reset,

      target,
      manifest,
      canvas,

      // UI Options
      hideTitle = false,
      draftDefaults = {}
    } = this.props;

    if (!currentResource) {
      console.warn(`
  ======================================================================
    WARNING: Something has gone wrong on this page.
  ======================================================================
     1. Check the capture model has the correct crowds:uiChoice value.
     2. Check the capture model has crowds:uiGroup (madoc:form)
     3. ¯\\_(ツ)_/¯

   ======================================================================
      `);
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', null);
    }

    if (currentResource.choice && Object.values(currentResource.choice).length === 0) {
      console.warn('ResourceEditor', 'This should probably never happen, please report.');
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', null); // Nothing for us to render!
    }
    if (currentResource.choice && Object.values(currentResource.choice).length === 0) {
      console.warn(`
  ======================================================================
    WARNING: Something may have gone wrong on this page
  ======================================================================
     We found a choice with only one option.
     This may be incorrect and causing issues.
     `);
    }

    // ################################################
    //               New proposed API                 #
    // ################################################
    /*
    return (
      <Router {...props}>
        <Branch match={(props) => (
          currentDraft &&
          currentDraft.template !== currentResource.id
        )}>
          <div>Matched this route.</div>
        </Branch>
      </Router>
    )
      */
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_components__["d" /* Router */], { routes: [{
          matches: () => isConfirmingDraft,
          render: () => Object(__WEBPACK_IMPORTED_MODULE_9__views_confirmationPage__["a" /* default */])({ onConfirm: () => reset(tree) && confirmDraft() })
        }, {
          matches: () => currentDraft && currentDraft.template !== currentResource.id,
          render: () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            'Please finish the current annotation you are creating.'
          )
        }, {
          matches: () => currentResource.choice,
          render: () => Object(__WEBPACK_IMPORTED_MODULE_10__views_resourceNavigation__["a" /* default */])({
            currentResource,
            showBackButton: Object(__WEBPACK_IMPORTED_MODULE_4_digirati_annotation_redux_es_query_resourceQuery__["f" /* isAtRoot */])(tree, state) === false,
            resourceTemplates: currentResource.choice,
            moveForward: id => moveForward(tree, id),
            moveBack: id => moveBack(tree),
            createDraft: rt => {
              const { resources, motivation, selectors } = Object(__WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__["c" /* getDraftFromCaptureModel */])(Object(__WEBPACK_IMPORTED_MODULE_4_digirati_annotation_redux_es_query_resourceQuery__["e" /* getResourceById */])(state, rt.id));
              createDraft(resources, rt.id, motivation || 'tagging', selectors, draftDefaults, null, [...treeRoute, rt.id]);
            }
          })
        }, {
          matches: () => currentResourceTemplate && resourceForm.fields,
          render: () => Object(__WEBPACK_IMPORTED_MODULE_7__views_renderForm__["a" /* default */])({
            currentResourceTemplate,
            resourceForm,
            currentDraft,
            renderResourceEditor,
            immutableSelector,
            importCaptureModel,
            previewDraft,
            updateDraft,
            onSave: this.createAnnotation,
            unpreviewDraft,
            onSaveAsInProgress: postSave ? null : this.saveAsInProgress,
            onSaveAsIncomplete: postSave ? null : this.onSaveAsIncomplete,
            editSelector: editCurrentDraftSelector,
            isSelecting,
            target,
            manifest,
            canvas,
            currentSelector,
            isSelectingSecondary,
            enablePublishing,
            goBack: this.goBack,
            editFieldSelector: editCurrentDraftSecondarySelector,
            currentTree: currentResource.id,
            elementEvents: {
              onFocus: id => editCurrentDraftFieldSelector(id, {
                focused: true
              }),
              onBlur: id => editCurrentDraftFieldSelector(id, {
                focused: false
              })
            },
            hideTitle
          })
        }, {
          matches: () => currentResource,
          render: () => {
            const Choose = Object(__WEBPACK_IMPORTED_MODULE_8__resourceEditor_utility__["a" /* immediate */])('loading...', () => {
              const { resources, motivation, selectors } = Object(__WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__["c" /* getDraftFromCaptureModel */])(Object(__WEBPACK_IMPORTED_MODULE_4_digirati_annotation_redux_es_query_resourceQuery__["e" /* getResourceById */])(state, currentResource.id));
              createDraft(resources, currentResource.id, motivation || 'tagging', selectors, draftDefaults, immutableSelector, treeRoute);
            });
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Choose, null);
          }
        }, {
          matches: () => true,
          render: () => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'strong',
              null,
              'Loading, or debugging...'
            )
          )
        }] })
    );
  }

}

const ConnectedResourceEditor = Object(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__["a" /* connector */])(ResourceEditor);
/* unused harmony export ConnectedResourceEditor */


/* harmony default export */ __webpack_exports__["a"] = (class extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ConnectedResourceEditor, _extends({ renderResourceEditor: (captureModel, postSave, ownProps, style, onBack) => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ConnectedResourceEditor, _extends({
        tree: captureModel,
        postSave: postSave,
        onBack: onBack,
        immutableSelector: ownProps.currentDraft.selector,
        style: style
      }, ownProps)) }, this.props));
  }
});;

/***/ }),

/***/ 224:
/*!**********************************************************!*\
  !*** ./packages/annotation-redux/src/actions/logging.js ***!
  \**********************************************************/
/*! exports provided: LOGGING_LOG, log */
/*! exports used: LOGGING_LOG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export log */
const LOGGING_LOG = 'LOGGING_LOG';
/* harmony export (immutable) */ __webpack_exports__["a"] = LOGGING_LOG;


function log(message) {
  return { type: LOGGING_LOG, payload: { message } };
}

/***/ }),

/***/ 226:
/*!********************************************************************!*\
  !*** ./packages/annotation-redux/src/lib/annotation/Annotation.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AnnotationSelector__ = __webpack_require__(/*! ./AnnotationSelector */ 227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnnotationBodyList__ = __webpack_require__(/*! ./AnnotationBodyList */ 228);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




class Annotation {

  // Serialized fields
  constructor(id, label, body, target, motivation, generator) {
    this.type = 'Annotation';

    this['@context'] = 'http://www.w3.org/ns/anno.jsonld';
    this.id = id;
    this.label = label;
    this.body = body;
    this.target = target;
    this.motivation = motivation;
    this.generator = generator;
  }

  toJSON() {
    return _extends({}, this, {
      id: this.id === null ? undefined : this.id,
      generator: this.generator === null ? undefined : this.generator
    });
  }

  static fromJsonLD(jsonLd) {
    return new Annotation(jsonLd.id, jsonLd.label, __WEBPACK_IMPORTED_MODULE_1__AnnotationBodyList__["a" /* default */].fromJsonLD(jsonLd.body), __WEBPACK_IMPORTED_MODULE_0__AnnotationSelector__["a" /* default */].fromJsonLD(jsonLd.target), jsonLd.motivation);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Annotation;


/***/ }),

/***/ 227:
/*!****************************************************************************!*\
  !*** ./packages/annotation-redux/src/lib/annotation/AnnotationSelector.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AnnotationSelector {

  static fromJsonLD(jsonLd) {
    return AnnotationSelector.parse(jsonLd);
  }

  static fromArray(multipleSelectors) {
    return multipleSelectors.map(annotation => AnnotationSelector.parse(annotation));
  }

  constructor(id, scale, format, language, processingLanguage, textDirection, selector) {
    if (textDirection && textDirection !== AnnotationSelector.DIRECTION_AUTO && textDirection !== AnnotationSelector.DIRECTION_LTR && textDirection !== AnnotationSelector.DIRECTION_RTL) {
      throw new Error('textDirection must be ONE of [ltr, rtl, auto]');
    }

    this.id = id;
    this.source = (id || '').split('#')[0];
    this.format = format;
    this.language = language;
    this.processingLanguage = processingLanguage;
    this.textDirection = textDirection;
    this.selector = AnnotationSelector.parseTarget(id, scale, selector);
  }

  static fromTarget(target, selector) {
    const annotationSelector = new AnnotationSelector();
    annotationSelector.source = target;
    annotationSelector.selector = selector;
    return annotationSelector;
  }

  static parse(text, scale = 1) {
    if (!text) {
      return null;
    }

    // https://www.w3.org/TR/annotation-model/#bodies-and-targets
    if (text.id) {
      return new AnnotationSelector(text.id, scale, text.format, text.language, text.processingLanguage, text.textDirection);
    }

    // https://www.w3.org/TR/annotation-model/#selectors
    if (text.source) {
      return new AnnotationSelector(text.source, scale, text.format, text.language, text.processingLanguage, text.textDirection, text.selector);
    }

    // @todo check for is text or is object and construct accordingly.
    return new AnnotationSelector(text, scale);
  }

  static parseTarget(source, scale = 1, selector = null) {
    let toParse = source;
    if (selector && selector.type === 'FragmentSelector') {
      toParse = `${source}#${selector.value}`;
    }

    const match = AnnotationSelector.W3C_SELECTOR.exec(toParse);
    if (match) {
      const [_, __, x, y, width, height] = match.map(v => parseInt(v, 10) * scale);
      return {
        unit: match[1] === 'percent:' ? 'percent' : 'pixel',
        scale,
        expanded: true,
        x,
        y,
        width,
        height,
        toString() {
          return source.split('#')[0];
        }
      };
    }
    return source;
  }

  toJSON() {
    if (!this.selector || this.selector.x === null || isNaN(Math.floor(this.selector.x)) || this.selector.y === null || isNaN(Math.floor(this.selector.y))) {
      return this.source;
    }

    if (this.selector.width === null || isNaN(this.selector.width) || this.selector.height === null || isNaN(this.selector.height)) {
      return `${this.source}#xywh=${Math.floor(this.selector.x)},${Math.floor(this.selector.y)},0,0`;
    }

    return `${this.source}#xywh=${Math.floor(this.selector.x)},${Math.floor(this.selector.y)},${Math.floor(this.selector.width)},${Math.floor(this.selector.height)}`;
  }

  toString() {
    return this.id;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnnotationSelector;

AnnotationSelector.DIRECTION_LTR = 'ltr';
AnnotationSelector.DIRECTION_RTL = 'rtl';
AnnotationSelector.DIRECTION_AUTO = 'auto';
AnnotationSelector.W3C_SELECTOR = /[#&\?]xywh\=(pixel\:|percent\:)?(\d+),(\d+),(\d+),(\d+)/;

/***/ }),

/***/ 228:
/*!****************************************************************************!*\
  !*** ./packages/annotation-redux/src/lib/annotation/AnnotationBodyList.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AnnotationBody__ = __webpack_require__(/*! ./AnnotationBody */ 229);


class AnnotationBodyList {

  constructor(list) {
    this.getOfType = type => {
      return this.list.find(function (item) {
        return item.type.indexOf(type) !== -1;
      }).value || null;
    };

    if (list instanceof __WEBPACK_IMPORTED_MODULE_0__AnnotationBody__["a" /* default */]) {
      this.list = [list];
    } else {
      this.list = list || [];
    }
  }

  // Computed fields.
  get TextualBody() {
    return this.getOfType('TextualBody');
  }

  get Image() {
    return this.getOfType('Image');
  }

  get Video() {
    return this.getOfType('Video');
  }

  get Sound() {
    return this.getOfType('Sound');
  }

  get Text() {
    return this.getOfType('Text');
  }

  get SpecificResource() {
    return this.getOfType('SpecificResource');
  }

  get Dataset() {
    return JSON.parse(this.getOfType('Dataset'));
  }

  toJSON() {
    if (this.list.length === 1) {
      return this.list[0].toJSON();
    }
    return this.list.map(j => j.toJSON());
  }

  static fromJsonLD(body) {
    if (Object.prototype.toString.call(body) === '[object Object]' && body.value) {
      return new AnnotationBodyList([__WEBPACK_IMPORTED_MODULE_0__AnnotationBody__["a" /* default */].fromJsonLD(body)]);
    }

    if (Object.prototype.toString.call(body) !== '[object Array]') {
      return null;
    }

    return new AnnotationBodyList(body.map(anno => __WEBPACK_IMPORTED_MODULE_0__AnnotationBody__["a" /* default */].fromJsonLD(anno)));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnnotationBodyList;


/***/ }),

/***/ 229:
/*!************************************************************************!*\
  !*** ./packages/annotation-redux/src/lib/annotation/AnnotationBody.js ***!
  \************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * This is a port of: https://github.com/digirati-co-uk/omeka-elucidate-module/blob/master/src/Domain/AnnotationBody.php
 */

class AnnotationBody {
  // @todo add enum
  constructor(id, value, format, type, purpose, source, language, processingLanguage, textDirection) {
    this.id = id;
    this.value = value;
    this.type = Array.isArray(type) ? type : [type];
    this.purpose = purpose;
    this.format = format;
    this.source = source;
    this.language = language;
    this.processingLanguage = processingLanguage;
    this.textDirection = textDirection;
  }

  static fromJsonLD(jsonLd) {
    return AnnotationBody.fromBody(jsonLd);
  }

  toJSON() {
    return _extends({}, this, {
      id: this.id === null ? undefined : this.id,
      value: this.value === null ? undefined : this.value,
      purpose: this.purpose === null ? undefined : this.purpose,
      type: this.type.length === 1 ? this.type[0] : this.type
    });
  }

  static fromBody(body) {
    if (!body) {
      return new AnnotationBody();
    }
    return new AnnotationBody(body.id, body.value, body.format, body.type, body.purpose, body.source, body.language, body.processingLanguage, body.textDirection);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnnotationBody;


/***/ }),

/***/ 230:
/*!*******************************************************!*\
  !*** ./packages/annotation-redux/src/actions/help.js ***!
  \*******************************************************/
/*! exports provided: HELP_INFO_ADD, HELP_INFO_REMOVE, HELP_CONTEXT_ADD, HELP_CONTEXT_REMOVE, addInfo, removeInfo, setContext, removeContext */
/*! exports used: HELP_CONTEXT_ADD, HELP_CONTEXT_REMOVE, HELP_INFO_ADD, HELP_INFO_REMOVE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export addInfo */
/* unused harmony export removeInfo */
/* unused harmony export setContext */
/* unused harmony export removeContext */
const HELP_INFO_ADD = 'INFO_ADD';
/* harmony export (immutable) */ __webpack_exports__["c"] = HELP_INFO_ADD;

const HELP_INFO_REMOVE = 'INFO_REMOVE';
/* harmony export (immutable) */ __webpack_exports__["d"] = HELP_INFO_REMOVE;

const HELP_CONTEXT_ADD = 'HELP_CONTEXT_ADD';
/* harmony export (immutable) */ __webpack_exports__["a"] = HELP_CONTEXT_ADD;

const HELP_CONTEXT_REMOVE = 'HELP_CONTEXT_REMOVE';
/* harmony export (immutable) */ __webpack_exports__["b"] = HELP_CONTEXT_REMOVE;


function addInfo(key, content, type = 'info') {
  return { type: HELP_INFO_ADD, payload: { key, content, type } };
}

function removeInfo(key, type = 'info') {
  return { type: HELP_INFO_REMOVE, payload: { key, type } };
}

function setContext(content) {
  return { type: HELP_CONTEXT_ADD, payload: { content } };
}

function removeContext() {
  return { type: HELP_CONTEXT_REMOVE };
}

/***/ }),

/***/ 231:
/*!**************************************************************!*\
  !*** ./packages/annotation-plugin-core/src/core.provider.js ***!
  \**************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core__ = __webpack_require__(/*! ./core */ 232);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class CoreProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  render() {
    const _props = this.props,
          { store } = _props,
          props = _objectWithoutProperties(_props, ['store']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_redux__["a" /* Provider */],
      { store: store },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__core__["a" /* default */], props)
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (CoreProvider);

/***/ }),

/***/ 232:
/*!*****************************************************!*\
  !*** ./packages/annotation-plugin-core/src/core.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_actions_drafts__ = __webpack_require__(/*! digirati-annotation-redux/es/actions/drafts */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_redux_es_lib_elucidate_index__ = __webpack_require__(/*! digirati-annotation-redux/es/lib/elucidate/index */ 88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_utils__ = __webpack_require__(/*! ./core.utils */ 135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_whatwg_fetch__ = __webpack_require__(/*! whatwg-fetch */ 225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_whatwg_fetch__);







class Core extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      onlineStatus: Core.ONLINE
    }, this.setOnline = () => {
      this.setState({ onlineStatus: Core.ONLINE_NOTIFICATION });
      setTimeout(() => {
        this.setState({ onlineStatus: Core.ONLINE });
      }, 2000);
    }, this.setOffline = () => {
      this.setState({ onlineStatus: Core.OFFLINE });
    }, this.warnUser = event => {
      const { drafts } = this.props;
      const changes = drafts ? Object.values(drafts).filter(draft => draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_CHANGED') : [];
      if (changes.length) {
        const message = `You have ${changes} unsaved annotation${changes.length > 1 ? 's' : null}, if you leave the page they will be lost.`;;
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
      return null;
    }, _temp;
  }

  componentDidMount() {
    const {
      setServer,
      canvas: canvasId,
      manifest,
      createCollection,
      addElucidateAnnotation,
      setResource,
      elucidateServer,
      addManifest,
      selectManifest,
      selectCanvas,
      importDraft,
      savedDraftList
    } = this.props;

    const subject = canvasId ? canvasId : manifest;

    if (!elucidateServer) {
      return;
    }
    if (canvasId) {
      fetch(manifest).then(response => response.json()).then(response => addManifest(manifest, response)).then(response => selectManifest(manifest)).then(response => canvasId ? selectCanvas(canvasId) : null);
    }
    // Set the server.
    setServer(elucidateServer, subject);
    // Set the resource.
    if (subject) {
      setResource(subject);
    }

    window.addEventListener('online', this.setOnline);
    window.addEventListener('offline', this.setOffline);
    window.addEventListener('beforeunload', this.warnUser);

    this.setState({ onlineStatus: navigator.onLine ? Core.ONLINE : Core.OFFLINE });

    // Import local storage saved items
    if (savedDraftList && Object.keys(savedDraftList).length) {
      Object.values(savedDraftList).forEach(drafts => Object.values(drafts).forEach(draft => {
        importDraft(draft.id, Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_actions_drafts__["t" /* changeFingerPrintCreator */])(draft, 'you'));
      }));
    }

    const isSavedDraft = annotation => {
      if (annotation.motivation !== 'http://www.digirati.com/ns/crowds#drafting') {
        return false;
      }
      if (Array.isArray(annotation.body)) {
        return false;
      }
      return annotation.body.purpose === 'editing';
    };

    // Set collection.
    createCollection(subject, subject).then(c => Object(__WEBPACK_IMPORTED_MODULE_3_digirati_annotation_redux_es_lib_elucidate_index__["c" /* getAllAnnotationsFromCollection */])(c)).then(iterable => Object(__WEBPACK_IMPORTED_MODULE_4__core_utils__["asyncForEach"])(iterable, i => {
      if (isSavedDraft(i)) {
        const draft = JSON.parse(i.body.value);
        const identity = i.id.substr(i.id.length - 1) === '/' ? i.id.substr(0, i.id.length - 1).split('/').pop() : i.id.split('/').pop();
        if (draft) {
          importDraft(draft.id, Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_actions_drafts__["t" /* changeFingerPrintCreator */])(Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_actions_drafts__["v" /* changeFingerprintIdentity */])(draft, identity), i.creator && i.creator.name ? i.creator.name : 'unknown'));
        }
      } else {
        addElucidateAnnotation(i);
      }
    }));
  }

  renderOffline() {
    const { drafts } = this.props;
    const changes = drafts ? Object.values(drafts).filter(draft => draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_CHANGED') : [];
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'offline-notice' },
      'This page is currently offline. ',
      ` `,
      changes.length ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        'If you leave this page you may lose your progress on ',
        changes.length,
        ' annotation',
        changes.length > 1 ? 's' : null
      ) : null
    );
  }

  renderOnline() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'online-notice' },
      'Internet connection restored'
    );
  }

  render() {
    const { onlineStatus } = this.state;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      onlineStatus === Core.OFFLINE ? this.renderOffline() : null,
      onlineStatus === Core.ONLINE_NOTIFICATION ? this.renderOnline() : null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { style: { display: 'none' } },
        'Annotation studio is running on this page. React ',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.version
      )
    );
  }
}

Core.ONLINE = 0;
Core.ONLINE_NOTIFICATION = 1;
Core.OFFLINE = 2;
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__["a" /* connector */])(Core));

/***/ }),

/***/ 29:
/*!************************************************!*\
  !*** ./packages/annotation-redux/src/index.js ***!
  \************************************************/
/*! exports provided: actions, query, reducers, createStore, connector */
/*! exports used: connector, createStore, reducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions__ = __webpack_require__(/*! ./actions */ 572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__query__ = __webpack_require__(/*! ./query */ 578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers__ = __webpack_require__(/*! ./reducers */ 579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__connector__ = __webpack_require__(/*! ./connector */ 588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createStore__ = __webpack_require__(/*! ./createStore */ 589);
/* unused harmony reexport actions */
/* unused harmony reexport query */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__reducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__createStore__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__connector__["a"]; });








/***/ }),

/***/ 31:
/*!*************************************************************************!*\
  !*** ./packages/annotation-components/src/components/ui/HelpTooltip.js ***!
  \*************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HelpTooltip_scss__ = __webpack_require__(/*! ./HelpTooltip.scss */ 657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HelpTooltip_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__HelpTooltip_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__);




const $style = __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default.a.block('help-tooltip');
class HelpTooltip extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
  render() {
    const { label, children } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: $style },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: $style.element('label') },
        label ? label : null
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { className: $style.element('tooltip') },
        children
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = HelpTooltip;


/***/ }),

/***/ 348:
/*!******************************************************************!*\
  !*** ./packages/annotation-plugin-viewer/src/viewer.provider.js ***!
  \******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewer__ = __webpack_require__(/*! ./viewer */ 349);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class ViewerProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  render() {
    const _props = this.props,
          { store } = _props,
          props = _objectWithoutProperties(_props, ['store']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_redux__["a" /* Provider */],
      { store: store },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__viewer__["a" /* default */], props)
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ViewerProvider);

/***/ }),

/***/ 349:
/*!*********************************************************!*\
  !*** ./packages/annotation-plugin-viewer/src/viewer.js ***!
  \*********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es6_object_keys__ = __webpack_require__(/*! core-js/modules/es6.object.keys */ 605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_modules_es6_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_modules_es6_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_bridge_es_annotations__ = __webpack_require__(/*! digirati-annotation-bridge/es/annotations */ 90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_redux_es_query_elucidateQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/elucidateQuery */ 133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_digirati_annotation_redux_es_query_manifestQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/manifestQuery */ 141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_query_resourceQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/resourceQuery */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_digirati_annotation_components__ = __webpack_require__(/*! digirati-annotation-components */ 91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_digirati_annotation_redux_es_utility__ = __webpack_require__(/*! digirati-annotation-redux/es/utility */ 130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_measure__ = __webpack_require__(/*! react-measure */ 894);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_react_measure___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_react_measure__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_recompose__ = __webpack_require__(/*! recompose */ 92);












class Viewer extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  setViewer(viewer) {
    if (this.viewer) {
      return;
    }
    this.viewer = viewer;
    this.props.setViewer(viewer);
  }

  render() {
    const MAX_HEIGHT = window.innerHeight - 250;

    const {
      image,
      selectedViewer,
      updateDimensions,
      editableRegions,
      dimensions,
      state,
      toggleable,
      drafts,
      currentDraftSelectors,
      updateSelector,
      editCurrentDraftSecondarySelector,
      commitToCurrentDraft,
      editCurrentDraftSelector,
      currentSelector,
      showControls
    } = this.props;
    const VIEWER_WIDTH = dimensions.width;

    const regions = [...editableRegions, ...Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_bridge_es_annotations__["b" /* immutableRegionsFromAnnotations */])(Object(__WEBPACK_IMPORTED_MODULE_3_digirati_annotation_redux_es_query_elucidateQuery__["c" /* richAnnotationList */])(state), Object(__WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_query_resourceQuery__["g" /* resourceTemplateList */])(state)), ...currentDraftSelectors].map(region => Object(__WEBPACK_IMPORTED_MODULE_8_digirati_annotation_redux_es_utility__["a" /* selectorCompat */])(region));

    // @todo move to selector
    const selectedCanvas = Object(__WEBPACK_IMPORTED_MODULE_4_digirati_annotation_redux_es_query_manifestQuery__["a" /* currentCanvas */])(state);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_9_react_measure___default.a,
      {
        onMeasure: dimensions => updateDimensions(dimensions)
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: { height: '100%' } },
        selectedCanvas ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_digirati_annotation_components__["b" /* Canvas */], { ref: ref => this.setViewer(ref),
          showAnnotationToggle: toggleable === "true",
          onUpdateSelector: updateSelector,
          showControls: showControls,
          onSaveSelector: commitToCurrentDraft,
          selector: currentSelector && currentSelector.type ? currentSelector : null,
          selectedViewer: selectedViewer,
          image: image,
          canvas: selectedCanvas,
          regions: regions,
          displayWidth: VIEWER_WIDTH,
          onEditRegion: e => {
            if (e.isSecondary) {
              if (!e.id) {
                return;
              }
              editCurrentDraftSecondarySelector(e.id);
            }
            editCurrentDraftSelector();
          },
          maxHeight: MAX_HEIGHT }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { style: { height: '80vh', textAlign: 'center' } },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: image.src, style: { maxHeight: '100%', margin: '0 auto' } })
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_7_digirati_annotation_redux__["a" /* connector */])(Object(__WEBPACK_IMPORTED_MODULE_10_recompose__["g" /* withState */])('dimensions', 'updateDimensions', { width: -1, height: -1 })(
/*onlyUpdateForKeys([
 'image',
 'selectedViewer',
 'drafts',
 'currentDraft',
 'updateSelector',
 'commitToCurrentDraft',
 'currentSelector',
 ])(*/Viewer /*)*/
)));

/***/ }),

/***/ 35:
/*!**************************************************************!*\
  !*** ./packages/annotation-redux/src/query/resourceQuery.js ***!
  \**************************************************************/
/*! exports provided: getResourceById, applyDefaultsToDraft, getCurrentResource, isAtRoot, hasLandedOnForm, getCurrentResourceTemplate, getForm, resourceTemplateList, getCurrentPath */
/*! exports used: applyDefaultsToDraft, getCurrentResource, getCurrentResourceTemplate, getForm, getResourceById, isAtRoot, resourceTemplateList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = getResourceById;
/* harmony export (immutable) */ __webpack_exports__["a"] = applyDefaultsToDraft;
/* harmony export (immutable) */ __webpack_exports__["b"] = getCurrentResource;
/* harmony export (immutable) */ __webpack_exports__["f"] = isAtRoot;
/* unused harmony export hasLandedOnForm */
/* harmony export (immutable) */ __webpack_exports__["c"] = getCurrentResourceTemplate;
/* harmony export (immutable) */ __webpack_exports__["d"] = getForm;
/* harmony export (immutable) */ __webpack_exports__["g"] = resourceTemplateList;
/* unused harmony export getCurrentPath */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draftQuery__ = __webpack_require__(/*! ./draftQuery */ 53);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



function getResourceById(state, id) {
  return state.resource.list[id];
}

function applyDefaultsToDraft(state, template, input, draftDefaults) {
  const form = getForm(getResourceById(state, template));
  if (!form || !form.fields) {
    return input;
  }

  const fields = Object.values(form.fields).reduce((s, f) => (s[f.id] = f) && s, {});
  const draftDefaultKeys = Object.keys(draftDefaults);
  const filledInputs = Object.keys(input).reduce((input, url) => {
    if (fields && fields[url] && fields[url].metaData && fields[url].metaData.conformsTo && fields[url].metaData.conformsTo.label && draftDefaultKeys.indexOf(fields[url].metaData.conformsTo.label) !== -1) {
      input[url] = draftDefaults[fields[url].metaData.conformsTo.label];
    }
    return input;
  }, input);

  return _extends({}, input, filledInputs);
}

function getCurrentResource(tree, state) {
  if (!(state && state.resource && state.resource.currentPaths)) {
    return null;
  }

  const value = state.resource.currentPaths[tree];

  if (!value) {
    return getResourceById(state, tree);
  }

  if (value && value.length === 0) {
    return state.resource.trees[tree];
  }

  const node = value.reduce((curState, path) => curState.choice[path], state.resource.trees[tree]);

  if (!node) {
    console.error('Invalid path', value, state.resource.trees[tree]);
    return null;
  }

  // @todo add isReference field to pick up.
  if (node.type === 'captureModel') {
    return state.resource.list[node.id];
  }

  return node;
}

function isAtRoot(tree, state) {
  if (!(state && state.resource && state.resource.currentPaths && state.resource.currentPaths[tree])) {
    return true; // default to true to hide UI.
  }

  return state.resource.currentPaths[tree].length === 0;
}

function hasLandedOnForm(tree, state) {
  const currentItem = getCurrentResource(state, tree);
  if (!currentItem) {
    return false;
  }
  return currentItem.type === 'captureModel';
}

function getCurrentResourceTemplate(state, scope) {
  const currentDraft = Object(__WEBPACK_IMPORTED_MODULE_0__draftQuery__["b" /* getCurrentDraft */])(state, scope);
  return currentDraft && currentDraft.template ? state.resource.list[currentDraft.template] : null;
}

function getForm(resourceTemplate) {
  if (!resourceTemplate) {
    return null;
  }
  const { id, fields } = resourceTemplate,
        meta = _objectWithoutProperties(resourceTemplate, ['id', 'fields']);
  return {
    id,
    fields,
    meta: _extends({}, meta, meta.metaData)
  };
}

function resourceTemplateList(state) {
  const list = state.resource.list;
  const keys = Object.keys(list);
  if (!keys[0]) {
    return [];
  }
  return list[keys[0]];
}

function getCurrentPath(obj, state) {
  return state.resource.currentPath.reduce((o, i) => o[i], obj);
}

/***/ }),

/***/ 356:
/*!*************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/Viewer.js ***!
  \*************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose__ = __webpack_require__(/*! recompose */ 92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__openseadragon_utility__ = __webpack_require__(/*! ./openseadragon/utility */ 630);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__openseadragon_viewer__ = __webpack_require__(/*! ./openseadragon/viewer */ 631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__openseadragon_withCanvas__ = __webpack_require__(/*! ./openseadragon/withCanvas */ 636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ScaledImageViewer__ = __webpack_require__(/*! ./ScaledImageViewer */ 358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__StaticImageViewer__ = __webpack_require__(/*! ./StaticImageViewer */ 359);








/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["b" /* compose */])(
// @todo optimise this!
// shouldUpdate(
//   (props, nextProps) => (
//     true ||
//     props.type !== nextProps.type ||
//     props.regions !== nextProps.regions ||
//     props.tileSource !== nextProps.tileSource ||
//     props.scale !== nextProps.scale
//   ),
// ),
// Branches are conditional render. First parameter is a bool
// the second argument is the truth-y and the third is the false-y
Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["a" /* branch */])(props => props.type === 'ScaledImageViewer',
// Needs withStaticCanvas for interoperability
// Needs to accept children that get drawn on.
Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["e" /* renderComponent */])(__WEBPACK_IMPORTED_MODULE_5__ScaledImageViewer__["a" /* default */]),
// I've nested the false-y to add another condition.
Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["a" /* branch */])(props => props.type === 'OpenSeadragonViewer', Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["e" /* renderComponent */])(Object(__WEBPACK_IMPORTED_MODULE_2__openseadragon_utility__["a" /* withManifest */])(Object(__WEBPACK_IMPORTED_MODULE_4__openseadragon_withCanvas__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_3__openseadragon_viewer__["a" /* default */]))),
// Fallback.
Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["e" /* renderComponent */])(__WEBPACK_IMPORTED_MODULE_6__StaticImageViewer__["a" /* default */])))
// pure,
)(Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["f" /* renderNothing */])()));

/***/ }),

/***/ 358:
/*!************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/ScaledImageViewer.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StaticImageViewer__ = __webpack_require__(/*! ./StaticImageViewer */ 359);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




class ScaledImageViewer extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  // static propTypes = {
  //     ...viewerPropTypes,
  //     scale: PropTypes.number.isRequired
  // };

  getSelectedRegion() {
    const { regions, scale } = this.props;
    const r = regions.filter(region => region.selected).pop();
    if (!r) return null;
    return {
      height: r.height / scale,
      width: r.width / scale,
      top: r.top / scale,
      left: r.left / scale
    };
  }

  createRelativePoint(x, y) {
    const { scale } = this.props;
    return {
      x: x / scale, y: y / scale
    };
  }

  createViewportPoint(x, y) {
    const { scale } = this.props;
    return {
      x: x * scale, y: y * scale
    };
  }

  getImageSize() {
    return {
      height: this.props.height,
      width: this.props.width
    };
  }

  getRef() {
    const { getRef } = this.props;
    if (getRef) {
      getRef(this);
    }
  }

  getRegions() {
    const { regions, scale } = this.props;
    return regions.map(r => ({
      height: r.height / scale,
      width: r.width / scale,
      top: r.top / scale,
      left: r.left / scale
    }));
  }

  render() {
    const _props = this.props,
          { height, width, top, left, scale } = _props,
          props = _objectWithoutProperties(_props, ['height', 'width', 'top', 'left', 'scale']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__StaticImageViewer__["a" /* default */], _extends({
      height: height * scale,
      width: width * scale,
      top: top * scale,
      left: left * scale,
      modifiers: { scaled: true }
    }, props));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ScaledImageViewer);

/***/ }),

/***/ 359:
/*!************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/StaticImageViewer.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StaticImageView_scss__ = __webpack_require__(/*! ./StaticImageView.scss */ 634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StaticImageView_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__StaticImageView_scss__);




const style = __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default.a.block('static-image-viewer');

class StaticImageViewer extends __WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"] {

  // propTypes = {
  //   ...viewerPropTypes,
  //   modifiers: PropTypes.object
  // };

  getSelectedRegion() {
    const { regions } = this.props;
    const r = regions.filter(region => region.selected).pop();
    if (!r) return null;
    return {
      type: r.type,
      height: r.height,
      width: r.width,
      top: r.top,
      left: r.left
    };
  }

  getImageSize() {
    return {
      height: this.props.height,
      width: this.props.width
    };
  }

  createRelativePoint(x, y) {
    return { x, y };
  }

  createViewportPoint(x, y) {
    return { x, y };
  }

  getRef() {
    const { getRef } = this.props;
    if (getRef) {
      getRef(this);
    }
  }

  resolveRegion(r) {
    if (r.unit === 'percent') {
      return this.resolveRegion({
        unit: 'pixel',
        type: r.type,
        left: r.left * this.props.width,
        top: r.top * this.props.height,
        width: r.width * this.props.width,
        height: r.height * this.props.height
      });
    }

    return {
      type: r.type,
      height: r.height,
      width: r.width,
      top: r.top,
      left: r.left
    };
  }

  getRegions() {
    return this.props.regions.map(r => this.resolveRegion(r));
  }

  render() {
    const { resource, regions, height, width, modifiers } = this.props;
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { className: style.modifiers(modifiers), style: { height, width } },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: style.element('regions') },
        regions && regions.map((region, key) => __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', {
          key: key,
          className: style.element('region-item').modifiers({
            'selected': region.selected,
            'editing': region.editing
          }),
          style: {
            height: region.height,
            width: region.width,
            top: region.top,
            left: region.left
          },
          onClick: region.onClick ? () => region.onClick(region) : null }))
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', { className: style.element('image'), src: resource, height: height, width: width })
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (StaticImageViewer);

/***/ }),

/***/ 360:
/*!*****************************************************************************!*\
  !*** ./packages/annotation-components/src/components/selectors/Selector.js ***!
  \*****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectorPropTypes__ = __webpack_require__(/*! ./_selectorPropTypes */ 361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BoxSelector__ = __webpack_require__(/*! ./BoxSelector */ 637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PinSelector__ = __webpack_require__(/*! ./PinSelector */ 644);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__WholeCanvasSelector__ = __webpack_require__(/*! ./WholeCanvasSelector */ 650);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }







function Selector(_ref) {
  let { type } = _ref,
      props = _objectWithoutProperties(_ref, ['type']);

  switch (type) {
    case 'WholeCanvasSelector':
    case 'wholecanvasselector':
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__WholeCanvasSelector__["a" /* default */], props);
    case 'madoc:pin':
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__PinSelector__["a" /* default */], props);
    case 'BoxSelector':
    case 'madoc:boxdraw':
    default:
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__BoxSelector__["a" /* default */], props);
  }
}

Selector.PropTypes = _extends({
  type: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired
}, __WEBPACK_IMPORTED_MODULE_1__selectorPropTypes__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Selector);

/***/ }),

/***/ 361:
/*!***************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/selectors/_selectorPropTypes.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


/* harmony default export */ __webpack_exports__["a"] = ({
  onSave: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
  onCancel: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,
  initialPosition: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
    left: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    top: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    height: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    width: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number
  })
});

/***/ }),

/***/ 362:
/*!**********************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/Form.js ***!
  \**********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Form_scss__ = __webpack_require__(/*! ./Form.scss */ 653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Form_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Form_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FormGroup__ = __webpack_require__(/*! ./FormGroup */ 655);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






const style = __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default.a.block('input-form');

class Form extends __WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"] {

  renderGroups(draft, props, { render, groups }) {
    const groupKeys = [__WEBPACK_IMPORTED_MODULE_3__FormGroup__["a" /* default */].DEFAULT_GROUP, ...Object.keys(groups)];
    return groupKeys.map(key => render[key].length !== 0 ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__FormGroup__["a" /* default */], _extends({
      key: key,
      groupKey: key,
      style: style,
      draft: draft,
      fields: render[key],
      group: groups[key] }, props)) : null);
  }

  render() {
    const _props = this.props,
          { fields, draft } = _props,
          props = _objectWithoutProperties(_props, ['fields', 'draft']);
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { className: style },
      this.renderGroups(draft, props, fields.reduce(({ render, groups }, field) => {
        if (!field.omekaMetaData.group.id) {
          render[__WEBPACK_IMPORTED_MODULE_3__FormGroup__["a" /* default */].DEFAULT_GROUP].push(field);
          return { render, groups };
        }
        if (!groups[field.omekaMetaData.group.id]) {
          groups[field.omekaMetaData.group.id] = field.omekaMetaData.group;
          render[field.omekaMetaData.group.id] = [];
        }
        render[field.omekaMetaData.group.id].push(field);
        return { render, groups };
      }, { render: { defaultGroup: [] }, groups: {} }))
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Form);

/***/ }),

/***/ 363:
/*!******************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/Autocomplete.js ***!
  \******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_debounce__ = __webpack_require__(/*! lodash/debounce */ 659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Autocomplete_scss__ = __webpack_require__(/*! ./Autocomplete.scss */ 663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Autocomplete_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Autocomplete_scss__);






const style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('autocomplete');

const AUTOCOMPLETE_DEBOUNCE_DELAY = 250;
const KEYCODE_ESCAPE = 27;

class Autocomplete extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      suggestionListHidden: false,
      suggestions: [],
      label: ''
    }, this.fetchNewSuggestions = __WEBPACK_IMPORTED_MODULE_3_lodash_debounce___default()(() => {
      const { suggestionProvider } = this.props;

      suggestionProvider(this.state.label).then(suggestions => {
        this.setState({
          suggestions,
          suggestionListHidden: false
        });
      });
    }, AUTOCOMPLETE_DEBOUNCE_DELAY), this.handleInputReference = ref => {
      this.input = ref;
    }, this.handleCompletionSelection = selection => {
      this.updateValue({
        label: selection.label,
        uri: selection.uri
      });

      this.setState({
        suggestionListHidden: true
      });

      if (this.input) {
        this.input.focus();
      }
    }, this.handleKeyUp = evt => {
      switch (evt.keyCode) {
        case KEYCODE_ESCAPE:
          this.setState({
            suggestionListHidden: true
          });
          break;
        default:
          this.fetchNewSuggestions();
          break;
      }
    }, _temp;
  }

  componentDidMount() {
    if (this.props.value && this.props.value.label) {
      this.setState(() => ({
        label: this.props.value.label
      }));
    }
  }

  updateValue(value) {
    this.setState({
      label: value.label
    });

    const { update } = this.props;
    update({ label: value.label, url: value.uri });
  }

  render() {
    const { preview, id, metaData } = this.props;
    const { suggestionListHidden, label } = this.state;

    if (preview) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: style.element('preview') },
        label
      );
    }

    const suggestionList = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'ul',
      { className: style.element('suggestions') },
      this.state.suggestions.map((suggestion, key) => {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { key: key,
            onClick: e => this.handleCompletionSelection(suggestion) },
          suggestion.label
        );
      })
    );

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'label',
        { className: style.element('label'), htmlFor: id },
        metaData.title,
        ' ',
        ' ',
        metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              displayFieldSelector(id);
            }, href: '#' },
          'edit'
        ) : null,
        metaData.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2__ui_HelpTooltip__["a" /* default */],
          null,
          metaData.description
        ) : null
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { id: id, type: 'text', className: style.element('input'), value: label,
        ref: this.handleInputReference,
        onChange: e => this.setState({ label: e.currentTarget.value }),
        onKeyUp: e => this.handleKeyUp(e) }),
      suggestionListHidden ? '' : suggestionList
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Autocomplete;


/***/ }),

/***/ 419:
/*!*****************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/index.js ***!
  \*****************************************************************/
/*! exports provided: Component, provider, plugin, default */
/*! exports used: Component, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__resourceEditor_plugin__ = __webpack_require__(/*! ./resourceEditor.plugin */ 899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resourceEditor_provider__ = __webpack_require__(/*! ./resourceEditor.provider */ 420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resourceEditor__ = __webpack_require__(/*! ./resourceEditor */ 180);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__resourceEditor__["a"]; });
/* unused harmony reexport provider */
/* unused harmony reexport plugin */






/* harmony default export */ __webpack_exports__["b"] = (__WEBPACK_IMPORTED_MODULE_0__resourceEditor_plugin__["a" /* default */]);

/***/ }),

/***/ 42:
/*!*********************************************************!*\
  !*** ./packages/annotation-redux/src/actions/drafts.js ***!
  \*********************************************************/
/*! exports provided: DRAFT_CREATE, DRAFT_UPDATE_SELECTOR, DRAFT_REMOVE_SELECTOR, DRAFT_UPDATE_FIELD_SELECTOR, DRAFT_REMOVE_FIELD_SELECTOR, DRAFT_UPDATE_INPUT, DRAFT_SELECT, DRAFT_DESELECT, DRAFT_PUBLISHING, DRAFT_PUBLISHED, DRAFT_PREVIEW, DRAFT_UNPREVIEW, DRAFT_CONFIRM, DRAFT_DISCARD, DRAFT_IMPORT, DRAFT_LIFECYCLE_NEW, DRAFT_LIFECYCLE_CHANGED, DRAFT_LIFECYCLE_READ, generateDraftId, createDraft, chooseDraftSelector, changeFingerPrintLifecyle, changeFingerPrintCreator, changeFingerprintSource, changeFingerprintIdentity, createFingerprint, createDirectDraft, importDraft, confirmDraft, deselectDraft, discardDraft, discardCurrentDraft, removeSelectorFromDraft, removeSelectorFromCurrentDraft, markDraftAs, updateDraft, addSelectorToDraftField, editCurrentDraftFieldSelector, addSelectorToDraftFieldFromViewer, removeSelectorFromDraftField, convertSelectorFromCanvas, addSelectorToDraftFromViewer, addSelectorToDraft, selectDraft, previewDraft, unpreviewDraft, asyncPublishDraft, publishDraft */
/*! exports used: DRAFT_CONFIRM, DRAFT_CREATE, DRAFT_DESELECT, DRAFT_DISCARD, DRAFT_IMPORT, DRAFT_LIFECYCLE_NEW, DRAFT_PREVIEW, DRAFT_PUBLISHED, DRAFT_PUBLISHING, DRAFT_REMOVE_SELECTOR, DRAFT_SELECT, DRAFT_UNPREVIEW, DRAFT_UPDATE_FIELD_SELECTOR, DRAFT_UPDATE_INPUT, DRAFT_UPDATE_SELECTOR, addSelectorToDraft, addSelectorToDraftFieldFromViewer, addSelectorToDraftFromViewer, asyncPublishDraft, changeFingerPrintCreator, changeFingerPrintLifecyle, changeFingerprintIdentity, changeFingerprintSource, confirmDraft, createDraft, deselectDraft, discardCurrentDraft, discardDraft, editCurrentDraftFieldSelector, generateDraftId, importDraft, previewDraft, publishDraft, removeSelectorFromCurrentDraft, removeSelectorFromDraft, removeSelectorFromDraftField, selectDraft, unpreviewDraft, updateDraft */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["D"] = generateDraftId;
/* harmony export (immutable) */ __webpack_exports__["y"] = createDraft;
/* unused harmony export chooseDraftSelector */
/* harmony export (immutable) */ __webpack_exports__["u"] = changeFingerPrintLifecyle;
/* harmony export (immutable) */ __webpack_exports__["t"] = changeFingerPrintCreator;
/* harmony export (immutable) */ __webpack_exports__["w"] = changeFingerprintSource;
/* harmony export (immutable) */ __webpack_exports__["v"] = changeFingerprintIdentity;
/* unused harmony export createFingerprint */
/* unused harmony export createDirectDraft */
/* harmony export (immutable) */ __webpack_exports__["E"] = importDraft;
/* harmony export (immutable) */ __webpack_exports__["x"] = confirmDraft;
/* harmony export (immutable) */ __webpack_exports__["z"] = deselectDraft;
/* harmony export (immutable) */ __webpack_exports__["B"] = discardDraft;
/* harmony export (immutable) */ __webpack_exports__["A"] = discardCurrentDraft;
/* harmony export (immutable) */ __webpack_exports__["I"] = removeSelectorFromDraft;
/* harmony export (immutable) */ __webpack_exports__["H"] = removeSelectorFromCurrentDraft;
/* unused harmony export markDraftAs */
/* harmony export (immutable) */ __webpack_exports__["M"] = updateDraft;
/* unused harmony export addSelectorToDraftField */
/* harmony export (immutable) */ __webpack_exports__["C"] = editCurrentDraftFieldSelector;
/* harmony export (immutable) */ __webpack_exports__["q"] = addSelectorToDraftFieldFromViewer;
/* harmony export (immutable) */ __webpack_exports__["J"] = removeSelectorFromDraftField;
/* unused harmony export convertSelectorFromCanvas */
/* harmony export (immutable) */ __webpack_exports__["r"] = addSelectorToDraftFromViewer;
/* harmony export (immutable) */ __webpack_exports__["p"] = addSelectorToDraft;
/* harmony export (immutable) */ __webpack_exports__["K"] = selectDraft;
/* harmony export (immutable) */ __webpack_exports__["F"] = previewDraft;
/* harmony export (immutable) */ __webpack_exports__["L"] = unpreviewDraft;
/* harmony export (immutable) */ __webpack_exports__["s"] = asyncPublishDraft;
/* harmony export (immutable) */ __webpack_exports__["G"] = publishDraft;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4__ = __webpack_require__(/*! uuid/v4 */ 573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_uuid_v4__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__annotations__ = __webpack_require__(/*! ./annotations */ 85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors__ = __webpack_require__(/*! ./selectors */ 86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__query_resourceQuery__ = __webpack_require__(/*! ../query/resourceQuery */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__query_draftQuery__ = __webpack_require__(/*! ../query/draftQuery */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utility__ = __webpack_require__(/*! ../utility */ 130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__viewer__ = __webpack_require__(/*! ./viewer */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__query_selectorQuery__ = __webpack_require__(/*! ../query/selectorQuery */ 131);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }










const DRAFT_CREATE = 'DRAFT_CREATE';
/* harmony export (immutable) */ __webpack_exports__["b"] = DRAFT_CREATE;

const DRAFT_UPDATE_SELECTOR = 'DRAFT_UPDATE_SELECTOR';
/* harmony export (immutable) */ __webpack_exports__["o"] = DRAFT_UPDATE_SELECTOR;

const DRAFT_REMOVE_SELECTOR = 'DRAFT_REMOVE_SELECTOR';
/* harmony export (immutable) */ __webpack_exports__["j"] = DRAFT_REMOVE_SELECTOR;

const DRAFT_UPDATE_FIELD_SELECTOR = 'DRAFT_UPDATE_FIELD_SELECTOR';
/* harmony export (immutable) */ __webpack_exports__["m"] = DRAFT_UPDATE_FIELD_SELECTOR;

const DRAFT_REMOVE_FIELD_SELECTOR = 'DRAFT_REMOVE_FIELD_SELECTOR';
/* unused harmony export DRAFT_REMOVE_FIELD_SELECTOR */

const DRAFT_UPDATE_INPUT = 'DRAFT_UPDATE_INPUT';
/* harmony export (immutable) */ __webpack_exports__["n"] = DRAFT_UPDATE_INPUT;

const DRAFT_SELECT = 'DRAFT_SELECT';
/* harmony export (immutable) */ __webpack_exports__["k"] = DRAFT_SELECT;

const DRAFT_DESELECT = 'DRAFT_DESELECT';
/* harmony export (immutable) */ __webpack_exports__["c"] = DRAFT_DESELECT;

const DRAFT_PUBLISHING = 'DRAFT_PUBLISHING';
/* harmony export (immutable) */ __webpack_exports__["i"] = DRAFT_PUBLISHING;

const DRAFT_PUBLISHED = 'DRAFT_PUBLISHED';
/* harmony export (immutable) */ __webpack_exports__["h"] = DRAFT_PUBLISHED;

const DRAFT_PREVIEW = 'DRAFT_PREVIEW';
/* harmony export (immutable) */ __webpack_exports__["g"] = DRAFT_PREVIEW;

const DRAFT_UNPREVIEW = 'DRAFT_UNPREVIEW';
/* harmony export (immutable) */ __webpack_exports__["l"] = DRAFT_UNPREVIEW;

const DRAFT_CONFIRM = 'DRAFT_CONFIRM';
/* harmony export (immutable) */ __webpack_exports__["a"] = DRAFT_CONFIRM;

const DRAFT_DISCARD = 'DRAFT_DISCARD';
/* harmony export (immutable) */ __webpack_exports__["d"] = DRAFT_DISCARD;

const DRAFT_IMPORT = 'DRAFT_IMPORT';
/* harmony export (immutable) */ __webpack_exports__["e"] = DRAFT_IMPORT;


const DRAFT_LIFECYCLE_NEW = 'DRAFT_LIFECYCLE_NEW';
/* harmony export (immutable) */ __webpack_exports__["f"] = DRAFT_LIFECYCLE_NEW;

const DRAFT_LIFECYCLE_CHANGED = 'DRAFT_LIFECYCLE_CHANGED';
/* unused harmony export DRAFT_LIFECYCLE_CHANGED */

const DRAFT_LIFECYCLE_READ = 'DRAFT_LIFECYCLE_READ';
/* unused harmony export DRAFT_LIFECYCLE_READ */


function generateDraftId() {
  return __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default()();
}

function createDraft(scope, emptyInput, template, motivation = 'tagging', selectors = null, draftDefaults = null, immutableSelector = null, path = []) {
  return (dispatch, getState) => {
    const id = __WEBPACK_IMPORTED_MODULE_0_uuid_v4___default()();
    const input = draftDefaults ? Object(__WEBPACK_IMPORTED_MODULE_3__query_resourceQuery__["a" /* applyDefaultsToDraft */])(getState(), template, emptyInput, draftDefaults) : emptyInput;
    // Create draft.
    dispatch(createDirectDraft(scope, id, input, template, selectors, motivation, path));
    // And select it straight away.
    dispatch(selectDraft(scope, id));
    // Choose the selector attached to the draft.
    dispatch(chooseDraftSelector(scope, id, immutableSelector));
  };
}

function chooseDraftSelector(scope, draftId, immutableSelector = null) {
  return (dispatch, getState) => {
    const currentTemplate = Object(__WEBPACK_IMPORTED_MODULE_3__query_resourceQuery__["c" /* getCurrentResourceTemplate */])(getState(), scope);
    if (currentTemplate) {
      if (currentTemplate.metaData && currentTemplate.metaData.selector) {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__selectors__["i" /* chooseSelector */])(currentTemplate.metaData.selector, {
          template: currentTemplate.id,
          scope,
          draft: draftId
        }, immutableSelector, null, !!immutableSelector));
      } else {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__selectors__["i" /* chooseSelector */])('WholeCanvasSelector', { template: currentTemplate.id, scope, draft: draftId }));
      }
    }
  };
}

function getValidLifecycle(desiredLifecycle, defaultLifecycle) {
  // desiredLifecycle must be one of these constants.
  return [DRAFT_LIFECYCLE_CHANGED, DRAFT_LIFECYCLE_NEW, DRAFT_LIFECYCLE_READ].indexOf(desiredLifecycle) === -1 ?
  // If not, the default lifecycle.
  defaultLifecycle ? defaultLifecycle :
  // Defaulting to new.
  DRAFT_LIFECYCLE_NEW
  // If its valid, use it.
  : desiredLifecycle;
}

function changeFingerPrintLifecyle(_ref, desiredLifecycle) {
  let { fingerprint } = _ref,
      draft = _objectWithoutProperties(_ref, ['fingerprint']);

  const lifecycle = getValidLifecycle(desiredLifecycle, draft.lifecycle);

  return _extends({}, draft, {
    fingerprint: createFingerprint(fingerprint.scope, fingerprint.path, fingerprint.identity, fingerprint.created, lifecycle, fingerprint.source, fingerprint.creator)
  });
}

function changeFingerPrintCreator(_ref2, creator) {
  let { fingerprint } = _ref2,
      draft = _objectWithoutProperties(_ref2, ['fingerprint']);

  return _extends({}, draft, {
    fingerprint: createFingerprint(fingerprint.scope, fingerprint.path, fingerprint.identity, fingerprint.created, fingerprint.lifecycle, fingerprint.source, creator)
  });
}

function changeFingerprintSource(_ref3, source) {
  let { fingerprint } = _ref3,
      draft = _objectWithoutProperties(_ref3, ['fingerprint']);

  return _extends({}, draft, {
    fingerprint: createFingerprint(fingerprint.scope, fingerprint.path, fingerprint.identity, fingerprint.created, fingerprint.lifecycle, source, fingerprint.creator)
  });
}

function changeFingerprintIdentity(_ref4, identity) {
  let { fingerprint } = _ref4,
      draft = _objectWithoutProperties(_ref4, ['fingerprint']);

  return _extends({}, draft, {
    fingerprint: createFingerprint(fingerprint.scope, fingerprint.path, identity, fingerprint.created, fingerprint.lifecycle, fingerprint.source, fingerprint.creator)
  });
}

function createFingerprint(scope, path, identity, created = null, lifecycle = null, source = null, creator = null) {
  return {
    scope,
    path,
    identity,
    created: created ? created : new Date().toISOString(),
    lifecycle: lifecycle ? lifecycle : DRAFT_LIFECYCLE_NEW, // DRAFT_LIFECYCLE_NEW | DRAFT_LIFECYCLE_CHANGED
    source: source ? source : 'memory', // memory | elucidate | localStorage
    creator: creator ? creator : 'unknown'
  };
}

function createDirectDraft(scope, id, input, template, selectors = null, motivation = 'tagging', path = [], created = null) {
  return {
    type: DRAFT_CREATE,
    payload: {
      id,
      input,
      template,
      selectors: selectors ? selectors : input,
      motivation,
      fingerprint: createFingerprint(scope, path, null, created, null, null, 'you')
    }
  };
}

function importDraft(id, draft) {
  return { type: DRAFT_IMPORT, payload: draft };
}

function confirmDraft(scope) {
  return { type: DRAFT_CONFIRM, payload: { scope } };
}

function deselectDraft(scope) {
  return { type: DRAFT_DESELECT, payload: { scope } };
}

function discardDraft(scope, id) {
  return { type: DRAFT_DISCARD, payload: { id, scope } };
}

function discardCurrentDraft(scope) {
  return (dispatch, getState) => {
    const currentDraft = Object(__WEBPACK_IMPORTED_MODULE_4__query_draftQuery__["b" /* getCurrentDraft */])(getState(), scope);
    if (currentDraft) {
      dispatch(discardDraft(scope, currentDraft.id));
      const selector = Object(__WEBPACK_IMPORTED_MODULE_7__query_selectorQuery__["b" /* getCurrentSelector */])(getState());
      // @todo make sure this actually works or change selectors too.
      if (selector.source && selector.source.template === currentDraft.template) {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__selectors__["g" /* cancelSelector */])());
      }
    }
  };
}

function removeSelectorFromDraft(id) {
  return { type: DRAFT_REMOVE_SELECTOR, payload: { id } };
}

function removeSelectorFromCurrentDraft(scope) {
  return (dispatch, getState) => {
    const { id } = Object(__WEBPACK_IMPORTED_MODULE_4__query_draftQuery__["b" /* getCurrentDraft */])(getState(), scope);
    if (id) {
      dispatch(removeSelectorFromDraft(id));
    }
  };
}

function markDraftAs(id, whenEqual, changeTo) {
  return (dispatch, getState) => {
    const state = getState();
    const draft = Object(__WEBPACK_IMPORTED_MODULE_4__query_draftQuery__["c" /* getDraftById */])(state, id);
    if (draft.fingerprint.lifecycle === whenEqual) {
      dispatch(importDraft(draft.id, changeFingerPrintLifecyle(draft, changeTo)));
    }
  };
}

function updateDraft(id, fields) {
  return (dispatch, getState) => {
    markDraftAs(id, DRAFT_LIFECYCLE_READ, DRAFT_LIFECYCLE_CHANGED)(dispatch, getState);
    dispatch({ type: DRAFT_UPDATE_INPUT, payload: { id, fields } });
  };
}

function addSelectorToDraftField(id, selector, fieldId) {
  return { type: DRAFT_UPDATE_FIELD_SELECTOR, payload: { id, selectors: { [fieldId]: Object(__WEBPACK_IMPORTED_MODULE_5__utility__["a" /* selectorCompat */])(selector) } } };
}

function editCurrentDraftFieldSelector(scope, fieldId, data) {
  return (dispatch, getState) => {
    const currentDraft = Object(__WEBPACK_IMPORTED_MODULE_4__query_draftQuery__["b" /* getCurrentDraft */])(getState(), scope);
    if (!currentDraft) {
      return;
    }
    if (!currentDraft.selectors || !currentDraft.selectors[fieldId]) {
      return;
    }
    const selector = _extends({}, currentDraft.selectors[fieldId], data);
    dispatch(addSelectorToDraftField(currentDraft.id, selector, fieldId));
  };
}

function addSelectorToDraftFieldFromViewer(id, props, fieldId, done) {
  return Object(__WEBPACK_IMPORTED_MODULE_6__viewer__["b" /* withViewer */])((Canvas, dispatch) => {
    const topLeft = Canvas.createRelativePoint(props.x, props.y);
    const bottomRight = Canvas.createRelativePoint(props.x + props.width, props.y + props.height);

    const selector = Object(__WEBPACK_IMPORTED_MODULE_5__utility__["a" /* selectorCompat */])({
      type: props.type,
      x: topLeft.x,
      y: topLeft.y,
      width: bottomRight.x - topLeft.x,
      height: bottomRight.y - topLeft.y
    });
    dispatch(addSelectorToDraftField(id, selector, fieldId));
    if (done) {
      done();
    }
  });
}

function removeSelectorFromDraftField(id, fieldId) {
  return { type: DRAFT_REMOVE_FIELD_SELECTOR, payload: { id, fieldId } };
}

function convertSelectorFromCanvas(Canvas, props) {
  if (!props.x && !props.y) {
    return { type: props.type || 'WholeCanvasSelector' };
  }
  const topLeft = Canvas.createRelativePoint(props.x, props.y);
  if (props.type !== 'boxSelector' && props.type !== 'madoc:boxdraw') {
    return Object(__WEBPACK_IMPORTED_MODULE_5__utility__["a" /* selectorCompat */])({
      type: props.type,
      x: topLeft.x,
      y: topLeft.y
    });
  }

  const bottomRight = Canvas.createRelativePoint(props.x + props.width, props.y + props.height);
  return Object(__WEBPACK_IMPORTED_MODULE_5__utility__["a" /* selectorCompat */])({
    type: props.type,
    x: topLeft.x,
    y: topLeft.y,
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y
  });
}

function addSelectorToDraftFromViewer(id, props, done) {
  return Object(__WEBPACK_IMPORTED_MODULE_6__viewer__["b" /* withViewer */])((Canvas, dispatch) => {
    const selector = convertSelectorFromCanvas(Canvas, props);

    dispatch(addSelectorToDraft(id, selector));
    if (done) {
      done();
    }
  });
}

function addSelectorToDraft(id, selector) {
  return (dispatch, getState) => {
    markDraftAs(id, DRAFT_LIFECYCLE_READ, DRAFT_LIFECYCLE_CHANGED)(dispatch, getState);
    dispatch({ type: DRAFT_UPDATE_SELECTOR, payload: { id, selector: Object(__WEBPACK_IMPORTED_MODULE_5__utility__["a" /* selectorCompat */])(selector) } });
  };
}

function selectDraft(scope, id) {
  return (dispatch, getState) => {
    markDraftAs(id, DRAFT_LIFECYCLE_NEW, DRAFT_LIFECYCLE_READ)(dispatch, getState);
    dispatch({ type: DRAFT_SELECT, payload: { id, scope } });
  };
}

function previewDraft(id) {
  return (dispatch, getState) => {
    const state = getState();
    if (Object(__WEBPACK_IMPORTED_MODULE_7__query_selectorQuery__["c" /* isSelecting */])(state)) {
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__selectors__["j" /* commitToCurrentDraft */])(true
      /* state.selector.currentSelector.type.toLowerCase() === 'wholecanvasselector', */
      ));
    }
    dispatch({ type: DRAFT_PREVIEW, payload: { id } });
  };
}

function unpreviewDraft(scope, id, editSelector = false) {
  return (dispatch, getState) => {
    dispatch({ type: DRAFT_UNPREVIEW, payload: { id } });
    if (editSelector) {
      const state = getState();
      const currentDraft = Object(__WEBPACK_IMPORTED_MODULE_4__query_draftQuery__["b" /* getCurrentDraft */])(state, scope);
      if (currentDraft.id === id && currentDraft.selector && currentDraft.selector.type && currentDraft.selector.type.toLowerCase() !== 'wholecanvasselector') {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__selectors__["m" /* editCurrentDraftSelector */])(scope));
      }
    }
  };
}

function asyncPublishDraft(scope, id, promise) {
  return dispatch => {
    dispatch({ type: DRAFT_PUBLISHING, payload: { id } });
    return promise.then(result => {
      dispatch(publishDraft(scope, id));
      return result;
    });
  };
}

function publishDraft(scope, id) {
  return (dispatch, getState) => {
    markDraftAs(id, DRAFT_LIFECYCLE_CHANGED, DRAFT_LIFECYCLE_NEW)(dispatch, getState);
    dispatch(Object(__WEBPACK_IMPORTED_MODULE_1__annotations__["b" /* addAnnotation */])(getState().drafts.list[id]));
    dispatch({ type: DRAFT_PUBLISHED, payload: { id, scope } });
  };
}

/***/ }),

/***/ 420:
/*!***********************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/resourceEditor.provider.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resourceEditor__ = __webpack_require__(/*! ./resourceEditor */ 180);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class ResourceEditorProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  render() {
    const _props = this.props,
          { store } = _props,
          props = _objectWithoutProperties(_props, ['store']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_redux__["a" /* Provider */],
      { store: store },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__resourceEditor__["a" /* default */], props)
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ResourceEditorProvider);

/***/ }),

/***/ 421:
/*!****************************************************************************!*\
  !*** ./packages/annotation-plugin-transcriber/src/transcriber.provider.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transcriber__ = __webpack_require__(/*! ./transcriber */ 422);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class TranscriberProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  render() {
    const _props = this.props,
          { store } = _props,
          props = _objectWithoutProperties(_props, ['store']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_redux__["a" /* Provider */],
      { store: store },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__transcriber__["a" /* default */], props)
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TranscriberProvider);

/***/ }),

/***/ 422:
/*!*******************************************************************!*\
  !*** ./packages/annotation-plugin-transcriber/src/transcriber.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_plugin_resource_editor_es_resourceEditor__ = __webpack_require__(/*! digirati-annotation-plugin-resource-editor/es/resourceEditor */ 180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__ = __webpack_require__(/*! digirati-annotation-bridge */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_digirati_bem_js__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }







const $style = __WEBPACK_IMPORTED_MODULE_4_digirati_bem_js___default.a.block('transcriber');

class Transcriber extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.createDraft = draftDefaults => () => {
      const { createDraftFromCaptureModel, tree } = this.props;
      createDraftFromCaptureModel(tree, tree, draftDefaults);
    }, _temp;
  }

  render() {
    const _props = this.props,
          { transcriptionVocab = 'dcterms:description', currentDraft, transcriptionLabel, transcription } = _props,
          props = _objectWithoutProperties(_props, ['transcriptionVocab', 'currentDraft', 'transcriptionLabel', 'transcription']);
    if (!currentDraft) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: $style },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { className: $style.element('edit'), onClick: this.createDraft({ [transcriptionVocab]: transcription }) },
          transcriptionLabel ? transcriptionLabel : 'edit'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: $style.element('transcription') },
          transcription
        )
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: $style.modifier('editing') },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_plugin_resource_editor_es_resourceEditor__["a" /* default */], _extends({ draftDefaults: { [transcriptionVocab]: transcription }, hideTitle: true }, props))
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux__["a" /* connector */])(Transcriber, { createDraftFromCaptureModel: __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__["b" /* createDraftFromCaptureModel */] }));

/***/ }),

/***/ 423:
/*!******************************************************************!*\
  !*** ./packages/annotation-plugin-drafts/src/drafts.provider.js ***!
  \******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drafts__ = __webpack_require__(/*! ./drafts */ 424);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class DraftsProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  render() {
    const _props = this.props,
          { store } = _props,
          props = _objectWithoutProperties(_props, ['store']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_redux__["a" /* Provider */],
      { store: store },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__drafts__["a" /* default */], props)
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DraftsProvider);

/***/ }),

/***/ 424:
/*!*********************************************************!*\
  !*** ./packages/annotation-plugin-drafts/src/drafts.js ***!
  \*********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_components__ = __webpack_require__(/*! digirati-annotation-components */ 91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_components_es_components_inputs_ComboButton__ = __webpack_require__(/*! digirati-annotation-components/es/components/inputs/ComboButton */ 179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_digirati_annotation_redux_es_query_manifestQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/manifestQuery */ 141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_digirati_annotation_bridge_es_annotations__ = __webpack_require__(/*! digirati-annotation-bridge/es/annotations */ 90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__drafts_scss__ = __webpack_require__(/*! ./drafts.scss */ 919);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__drafts_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__drafts_scss__);









function getImageFromTarget(state, draft, size) {
  const imageService = Object(__WEBPACK_IMPORTED_MODULE_4_digirati_annotation_redux_es_query_manifestQuery__["b" /* currentImageService */])(state);
  if (imageService) {
    const prefix = imageService.split('info.json')[0];
    if (!draft || !draft.selector) {
      return null;
    }
    if (draft.selector.type.toLowerCase() === 'wholecanvasselector') {
      return `${prefix}full/${size},/0/default.jpg`;
    }
    return `${prefix}${draft.selector.x},${draft.selector.y},${draft.selector.width || size},${draft.selector.height || size}/${size},/0/default.jpg`;
  }
  return null;
}

const $style = __WEBPACK_IMPORTED_MODULE_6_digirati_bem_js___default.a.block('drafts-list');
class Drafts extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  getUserName(draft) {
    return draft.fingerprint.creator || 'unknown';
  }

  render() {
    const {
      state,
      label,
      description,
      drafts,
      selectScopedDraft,
      currentDrafts,
      moveForward,
      reset,
      filterBy,
      emptyState,
      hideIfEmpty,
      showThumbnail = false,
      thumbnailSize = 150
    } = this.props;
    const draftList = drafts ? Object.values(drafts) : [];
    const filterByMultiple = filterBy.split(',');
    const filteredDraftLIst = draftList.length ? draftList.filter(draft => {
      return !(filterByMultiple && filterByMultiple.indexOf(draft.fingerprint.source) === -1);
    }) : [];
    if (filteredDraftLIst.length === 0 && hideIfEmpty) {
      return null;
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: $style },
      label ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h3',
        { className: $style.element('label') },
        label
      ) : null,
      description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { className: $style.element('description') },
        description
      ) : null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: $style.element('list').modifiers({ hasThumbnail: showThumbnail, [`thumbnail-${thumbnailSize}`]: showThumbnail }) },
        filteredDraftLIst.length ? filteredDraftLIst.map(draft => {
          const thumbnail = showThumbnail && getImageFromTarget(state, draft, 40);

          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'li',
            { className: $style.element('list-item').modifier({
                'selected': currentDrafts && draft.fingerprint && draft.fingerprint.scope && currentDrafts[draft.fingerprint.scope] === draft.id
              }), key: draft.id, onClick: () => {
                // moveForward(draft.selector.source.scope);
                if (draft.fingerprint && draft.fingerprint.scope && draft.fingerprint.path) {
                  if (draft.fingerprint.path.length) {
                    reset(draft.fingerprint.scope);
                    draft.fingerprint.path.forEach(forward => moveForward(draft.fingerprint.scope, forward));
                  }
                  selectScopedDraft(draft.fingerprint.scope, draft.id);
                }
              } },
            showThumbnail && thumbnail ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: $style.element('thumbnail') },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: getImageFromTarget(state, draft, thumbnailSize) })
            ) : null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_components__["a" /* ActionTimeAgo */], { verb: 'Created', subject: this.getUserName(draft), time: draft.fingerprint.created }),
            draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_CHANGED' ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: $style.element('unsaved') },
              'unsaved changes'
            ) : null
          );
        }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: $style.element('empty-state') },
          emptyState ? emptyState : 'Any annotations you mark as in progress will show here'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__["a" /* connector */])(Drafts));

/***/ }),

/***/ 425:
/*!*********************************************************************************!*\
  !*** ./packages/annotation-plugin-tagging/src/tagging-annotations.component.js ***!
  \*********************************************************************************/
/*! exports provided: TaggingAnnotations, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tagging_utils__ = __webpack_require__(/*! ./tagging.utils */ 922);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class TaggingAnnotations extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

    render() {
        const _props = this.props,
              { entityTypes } = _props,
              props = _objectWithoutProperties(_props, ['entityTypes']);

        let annotations = props.regionAnnotations.concat(props.wholeCanvasAnnotations).filter(Object(__WEBPACK_IMPORTED_MODULE_2__tagging_utils__["b" /* isTaggedAs */])(entityTypes)).sort((a, b) => {
            let source = Object(__WEBPACK_IMPORTED_MODULE_2__tagging_utils__["c" /* tagDetails */])(a).uri;
            let target = Object(__WEBPACK_IMPORTED_MODULE_2__tagging_utils__["c" /* tagDetails */])(b).uri;

            return source.localeCompare(target);
        }).reduce((output, next) => {
            let slice = output.slice(-1);
            let prev = slice[0];

            if (prev) {
                let prevUri = Object(__WEBPACK_IMPORTED_MODULE_2__tagging_utils__["c" /* tagDetails */])(prev).uri;
                let nextUri = Object(__WEBPACK_IMPORTED_MODULE_2__tagging_utils__["c" /* tagDetails */])(next).uri;

                if (prevUri !== nextUri) {
                    output.push(next);
                }
            } else {
                output.push(next);
            }

            return output;
        }, []);

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            annotations.map(__WEBPACK_IMPORTED_MODULE_2__tagging_utils__["a" /* annotationToTag */])
        );
    }
}
/* unused harmony export TaggingAnnotations */


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__["a" /* connector */])(TaggingAnnotations));

/***/ }),

/***/ 426:
/*!********************************************************************************!*\
  !*** ./packages/annotation-plugin-tagging/src/tagging-annotations.provider.js ***!
  \********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tagging_annotations_component__ = __webpack_require__(/*! ./tagging-annotations.component */ 425);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class TaggingAnnotationsProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

    render() {
        const _props = this.props,
              { store } = _props,
              props = _objectWithoutProperties(_props, ['store']);
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_1_react_redux__["a" /* Provider */],
            { store: store },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__tagging_annotations_component__["a" /* default */], props)
        );
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TaggingAnnotationsProvider);

/***/ }),

/***/ 427:
/*!***********************************************************!*\
  !*** ./packages/annotation-plugin-tagging/src/tagging.js ***!
  \***********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_plugin_resource_editor__ = __webpack_require__(/*! digirati-annotation-plugin-resource-editor */ 419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__ = __webpack_require__(/*! digirati-annotation-bridge */ 46);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






class Tagging extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      isAdding: false
    }, this.handleAdd = () => {
      const { createDraftFromCaptureModel, tree } = this.props;
      createDraftFromCaptureModel(tree, tree, {});

      this.setState({
        isAdding: true
      });
    }, _temp;
  }

  render() {
    const _props = this.props,
          { currentDraft, content } = _props,
          props = _objectWithoutProperties(_props, ['currentDraft', 'content']);
    const hasDraft = !!currentDraft;

    if (!currentDraft) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { className: 'c-tag', disabled: hasDraft,
            type: 'submit', onClick: this.handleAdd },
          content
        )
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_plugin_resource_editor__["a" /* Component */], _extends({}, props, { hideTitle: true }))
    );
  }
}
/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__["a" /* connector */])(Tagging, { createDraftFromCaptureModel: __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__["b" /* createDraftFromCaptureModel */] }));

/***/ }),

/***/ 428:
/*!********************************************************************!*\
  !*** ./packages/annotation-plugin-tagging/src/tagging.provider.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tagging__ = __webpack_require__(/*! ./tagging */ 427);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class TaggingProvider extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  render() {
    const _props = this.props,
          { store } = _props,
          props = _objectWithoutProperties(_props, ['store']);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_redux__["a" /* Provider */],
      { store: store },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__tagging__["a" /* default */], props)
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (TaggingProvider);

/***/ }),

/***/ 429:
/*!************************************************************!*\
  !*** multi ./packages/annotation-application/src/index.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/stephen.fraser/github.com/digirati-co-uk/annotation-studio/packages/annotation-application/src/index.js */430);


/***/ }),

/***/ 430:
/*!******************************************************!*\
  !*** ./packages/annotation-application/src/index.js ***!
  \******************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_style_scss__ = __webpack_require__(/*! ./css/style.scss */ 552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__css_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__css_style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_base_scss__ = __webpack_require__(/*! ./css/base.scss */ 555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__css_base_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__css_base_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__css_grid_scss__ = __webpack_require__(/*! ./css/grid.scss */ 557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__css_grid_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__css_grid_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__css_image_grid_scss__ = __webpack_require__(/*! ./css/image-grid.scss */ 559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__css_image_grid_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__css_image_grid_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__css_collection_list_scss__ = __webpack_require__(/*! ./css/collection-list.scss */ 561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__css_collection_list_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__css_collection_list_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__css_collection_item_scss__ = __webpack_require__(/*! ./css/collection-item.scss */ 563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__css_collection_item_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__css_collection_item_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__css_topic_list_scss__ = __webpack_require__(/*! ./css/topic-list.scss */ 565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__css_topic_list_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__css_topic_list_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__css_prev_next_scss__ = __webpack_require__(/*! ./css/prev-next.scss */ 567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__css_prev_next_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__css_prev_next_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__css_pagination_scss__ = __webpack_require__(/*! ./css/pagination.scss */ 569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__css_pagination_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__css_pagination_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_digirati_annotation_plugin_core__ = __webpack_require__(/*! digirati-annotation-plugin-core */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_digirati_annotation_plugin_viewer__ = __webpack_require__(/*! digirati-annotation-plugin-viewer */ 603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_digirati_annotation_plugin_resource_editor__ = __webpack_require__(/*! digirati-annotation-plugin-resource-editor */ 419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_digirati_annotation_plugin_transcriber__ = __webpack_require__(/*! digirati-annotation-plugin-transcriber */ 915);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_digirati_annotation_plugin_drafts__ = __webpack_require__(/*! digirati-annotation-plugin-drafts */ 917);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_digirati_annotation_plugin_tagging__ = __webpack_require__(/*! digirati-annotation-plugin-tagging */ 921);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__js_region_annotations__ = __webpack_require__(/*! ./js/region-annotations */ 925);






















if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = __webpack_require__(/*! why-did-you-update */ 926);
  let createClass = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createClass;
  Object.defineProperty(__WEBPACK_IMPORTED_MODULE_0_react___default.a, 'createClass', {
    set: nextCreateClass => {
      createClass = nextCreateClass;
    }
  });
  // whyDidYouUpdate(React, { exclude: /^Core|Measure/ })
}

const behaviours = resolveSharedStore => ({
  'annotation-studio-core': (image, attributes) => Object(__WEBPACK_IMPORTED_MODULE_12_digirati_annotation_plugin_core__["a" /* default */])(image, attributes).then(store => resolveSharedStore(store)),
  'annotation-studio-viewer': __WEBPACK_IMPORTED_MODULE_13_digirati_annotation_plugin_viewer__["a" /* default */],
  'annotation-studio-resource-editor': __WEBPACK_IMPORTED_MODULE_14_digirati_annotation_plugin_resource_editor__["b" /* default */],
  'annotation-studio-transcriber': __WEBPACK_IMPORTED_MODULE_15_digirati_annotation_plugin_transcriber__["a" /* default */],
  'annotation-studio-drafts': __WEBPACK_IMPORTED_MODULE_16_digirati_annotation_plugin_drafts__["a" /* default */],
  'annotation-studio-region-annotations': ($el, attributes, store) => {
    return Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_react_redux__["a" /* Provider */],
      { store: store },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_18__js_region_annotations__["a" /* default */], null)
    ), $el);
  },
  'annotation-studio-tagging-annotations': __WEBPACK_IMPORTED_MODULE_17_digirati_annotation_plugin_tagging__["a" /* TaggingAnnotationsPlugin */],
  'annotation-studio-tagging': __WEBPACK_IMPORTED_MODULE_17_digirati_annotation_plugin_tagging__["b" /* TaggingPlugin */]
});

const { resolve, promise: whenToRender } = __WEBPACK_IMPORTED_MODULE_12_digirati_annotation_plugin_core__["b" /* utils */].deferred();

document.addEventListener("DOMContentLoaded", () => {
  // Small error-prone example of data behaviour factory.
  for (const $el of document.querySelectorAll('[data-behaviour]')) {
    const register = behaviours(resolve);
    try {
      const attribute = $el.getAttribute('data-behaviour');
      const behaviour = register[attribute];
      if (behaviour.length === 3) {
        whenToRender.then(store => behaviour($el, __WEBPACK_IMPORTED_MODULE_12_digirati_annotation_plugin_core__["b" /* utils */].getAttributes($el), store));
      } else {
        register[$el.getAttribute('data-behaviour')]($el, __WEBPACK_IMPORTED_MODULE_12_digirati_annotation_plugin_core__["b" /* utils */].getAttributes($el));
      }
    } catch (e) {
      console.error('Behaviour does not exist: ' + $el.getAttribute('data-behaviour'), e);
    }
  }
});

/* harmony default export */ __webpack_exports__["default"] = ({});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../../node_modules/node-libs-browser/node_modules/process/browser.js */ 2)))

/***/ }),

/***/ 46:
/*!*************************************************!*\
  !*** ./packages/annotation-bridge/src/index.js ***!
  \*************************************************/
/*! exports provided: mapDraftToDataSet, dataSetToAnnotation, dataSetToSingleAnnotation, getIndividualW3CAnnotationBodies, getW3CAnnotationBody, createDraftFromCaptureModel, getDraftFromCaptureModel, getDraftTemplateFromCaptureModel, getDraftSelectorsFromCaptureModel, constructUnknownTemplate, importResourceTemplate, createDraftFromAnnotation, mapAnnotationBody, mapTarget, parseTarget, resourceTemplateReverseTypeLookup */
/*! exports used: constructUnknownTemplate, createDraftFromCaptureModel, getDraftFromCaptureModel, importResourceTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mapDraftToDataSet */
/* unused harmony export dataSetToAnnotation */
/* unused harmony export dataSetToSingleAnnotation */
/* unused harmony export getIndividualW3CAnnotationBodies */
/* unused harmony export getW3CAnnotationBody */
/* harmony export (immutable) */ __webpack_exports__["b"] = createDraftFromCaptureModel;
/* harmony export (immutable) */ __webpack_exports__["c"] = getDraftFromCaptureModel;
/* unused harmony export getDraftTemplateFromCaptureModel */
/* unused harmony export getDraftSelectorsFromCaptureModel */
/* harmony export (immutable) */ __webpack_exports__["a"] = constructUnknownTemplate;
/* harmony export (immutable) */ __webpack_exports__["d"] = importResourceTemplate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_annotation_redux_es_query_resourceQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/resourceQuery */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux_es_query_draftQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/draftQuery */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_actions_resources__ = __webpack_require__(/*! digirati-annotation-redux/es/actions/resources */ 87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__annotations__ = __webpack_require__(/*! ./annotations */ 90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers__ = __webpack_require__(/*! ./helpers */ 109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_Choice__ = __webpack_require__(/*! ./model/Choice */ 900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_CaptureModel__ = __webpack_require__(/*! ./model/CaptureModel */ 902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_digirati_annotation_redux_es_actions_drafts__ = __webpack_require__(/*! digirati-annotation-redux/es/actions/drafts */ 42);
/* unused harmony reexport createDraftFromAnnotation */
/* unused harmony reexport mapAnnotationBody */
/* unused harmony reexport mapTarget */
/* unused harmony reexport parseTarget */
/* unused harmony reexport resourceTemplateReverseTypeLookup */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };












/**
 * @deprecated
 */
function mapDraftToDataSet(fields, values) {
  const contexts = {};
  const body = {};

  fields.forEach(model => {
    if (model.metaData.conformsTo && values[model.id]) {
      contexts[model.metaData.conformsTo.label] = model.metaData.conformsTo.id;
      body[model.metaData.conformsTo.label] = values[model.id];
    }
  });

  return _extends({
    '@context': contexts
  }, body);
}

/**
 * @deprecated
 */
function getLabelFromResourceTemplate(template, data) {
  if (!(template.metaData.labelParts && template.metaData.labelParts.label)) {
    return null;
  }
  const labelField = template.metaData.labelParts.label;

  return data[labelField] ? data[labelField] : null;
}

/**
 * @deprecated
 */
function dataSetToAnnotation(template, dataset) {
  const body = {
    type: ['TextualBody', 'Dataset'],
    value: JSON.stringify(dataset),
    format: 'text/plain'
  };
  const label = getLabelFromResourceTemplate(template, dataset);

  return { body, label };
}

function dataSetToSingleAnnotation(template, dataset) {
  const { metaData: { title, description } } = template;

  dataset.context = dataset.context ? dataset.context : {};
  if (title) {
    dataset.context.Title = 'http://dublincore.org/documents/dcmi-terms/#terms-title';
    dataset.Title = title;
  }
  if (description) {
    dataset.context.Description = 'http://dublincore.org/documents/dcmi-terms/#terms-description';
    dataset.Description = description;
  }

  const body = {
    type: ['TextualBody', 'Dataset'],
    value: JSON.stringify(dataset),
    format: 'text/plain'
  };

  return { body, label: title };
}

/**
 * @deprecated
 */
function getIndividualW3CAnnotationBodies(state, scope) {
  const currentDraft = Object(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux_es_query_draftQuery__["b" /* getCurrentDraft */])(state, scope);
  const resourceTemplate = Object(__WEBPACK_IMPORTED_MODULE_0_digirati_annotation_redux_es_query_resourceQuery__["c" /* getCurrentResourceTemplate */])(state, scope);
  const fields = Object.values(Object(__WEBPACK_IMPORTED_MODULE_0_digirati_annotation_redux_es_query_resourceQuery__["d" /* getForm */])(resourceTemplate).fields);

  const selectors = Object.keys(currentDraft.selectors || {}).map(key => ({ id: key, value: currentDraft.selectors[key] })).map(selector => {
    const capModel = fields.find(model => model.id === selector.id);
    return {
      id: selector.id,
      annotation: dataSetToSingleAnnotation(capModel, mapDraftToDataSet(fields, { [selector.id]: currentDraft.input[selector.id] }))
    };
  });
  const keyedSelectors = {};
  for (let selector of selectors) {
    keyedSelectors[selector.id] = selector.annotation;
  }

  return keyedSelectors;
}

function getW3CAnnotationBody(state, scope) {
  const currentDraft = Object(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux_es_query_draftQuery__["b" /* getCurrentDraft */])(state, scope);
  const resourceTemplate = Object(__WEBPACK_IMPORTED_MODULE_0_digirati_annotation_redux_es_query_resourceQuery__["c" /* getCurrentResourceTemplate */])(state, scope);
  const fields = Object.values(Object(__WEBPACK_IMPORTED_MODULE_0_digirati_annotation_redux_es_query_resourceQuery__["d" /* getForm */])(resourceTemplate).fields);

  return dataSetToAnnotation(resourceTemplate, mapDraftToDataSet(fields, currentDraft.input));
}

function createDraftFromCaptureModel(scope, captureModelId, draftDefaults = {}, defaultMotivation = 'tagging', path = []) {
  return (dispatch, getState) => {
    const state = getState();
    const { resources, motivation, selectors } = getDraftFromCaptureModel(Object(__WEBPACK_IMPORTED_MODULE_0_digirati_annotation_redux_es_query_resourceQuery__["e" /* getResourceById */])(state, captureModelId));
    dispatch(Object(__WEBPACK_IMPORTED_MODULE_7_digirati_annotation_redux_es_actions_drafts__["y" /* createDraft */])(scope, resources, captureModelId, motivation || defaultMotivation, selectors, draftDefaults, null, path));
  };
}

function getDraftFromCaptureModel(template) {
  return {
    motivation: Object(__WEBPACK_IMPORTED_MODULE_4__helpers__["e" /* motivationFromForm */])(template && template.metaData && template.metaData.motivatedBy ? template.metaData.motivatedBy : {
      id: 'oa:tagging',
      label: 'Tagging'
    }),
    resources: getDraftTemplateFromCaptureModel(template),
    selectors: getDraftSelectorsFromCaptureModel(template)
  };
}

function getDraftTemplateFromCaptureModel(template) {
  const resources = template.fields;
  return Object.keys(resources).reduce((obj, key) => {
    obj[resources[key].id] = null;
    return obj;
  }, {});
}

function getDraftSelectorsFromCaptureModel(template) {
  const resources = template.fields;
  return Object.keys(resources).reduce((obj, key) => {
    obj[resources[key].id] = _extends({
      type: resources[key].metaData.selector
    }, resources[key].metaData.selectorValue);
    return obj;
  }, {});
}

function constructUnknownTemplate(resourceTemplate) {
  if (__WEBPACK_IMPORTED_MODULE_5__model_Choice__["a" /* default */].is(resourceTemplate)) {
    return __WEBPACK_IMPORTED_MODULE_5__model_Choice__["a" /* default */].fromJsonLD(resourceTemplate);
  }
  if (__WEBPACK_IMPORTED_MODULE_6__model_CaptureModel__["a" /* default */].is(resourceTemplate)) {
    return __WEBPACK_IMPORTED_MODULE_6__model_CaptureModel__["a" /* default */].fromJsonLD(resourceTemplate);
  }
}

function importResourceTemplate(resourceTemplate, target = 'canvas') {
  return dispatch => {
    const tree = constructUnknownTemplate(resourceTemplate);

    if (!tree) {
      return;
    }
    if (tree instanceof __WEBPACK_IMPORTED_MODULE_6__model_CaptureModel__["a" /* default */]) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_actions_resources__["i" /* importResource */])(tree));
    }

    dispatch(Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_actions_resources__["j" /* importResourceTree */])(tree.getTree(target)));

    tree.flatten().forEach(r => dispatch(Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_actions_resources__["i" /* importResource */])(r)));
  };
}



/***/ }),

/***/ 52:
/*!******************************************************!*\
  !*** ./packages/annotation-plugin-core/src/index.js ***!
  \******************************************************/
/*! exports provided: Component, provider, utils, plugin, default */
/*! exports used: default, utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_plugin__ = __webpack_require__(/*! ./core.plugin */ 571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_provider__ = __webpack_require__(/*! ./core.provider */ 231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_utils__ = __webpack_require__(/*! ./core.utils */ 135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__(/*! ./core */ 232);
/* unused harmony reexport Component */
/* unused harmony reexport provider */
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__core_utils__; });
/* unused harmony reexport plugin */







/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__core_plugin__["a" /* default */]);

/***/ }),

/***/ 53:
/*!***********************************************************!*\
  !*** ./packages/annotation-redux/src/query/draftQuery.js ***!
  \***********************************************************/
/*! exports provided: getCurrentDraftId, getCurrentDrafts, getDraftById, getCurrentDraft, getAllDraftsWithSelectors, getDraftsByFingerprintIdentity, getDraftsWithSelectors, currentDraftEditableRegions, mapDraftSelectorToRegion, editableRegionsFromDraftList */
/*! exports used: currentDraftEditableRegions, getCurrentDraft, getDraftById, getDraftsByFingerprintIdentity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export getCurrentDraftId */
/* unused harmony export getCurrentDrafts */
/* harmony export (immutable) */ __webpack_exports__["c"] = getDraftById;
/* harmony export (immutable) */ __webpack_exports__["b"] = getCurrentDraft;
/* unused harmony export getAllDraftsWithSelectors */
/* harmony export (immutable) */ __webpack_exports__["d"] = getDraftsByFingerprintIdentity;
/* unused harmony export getDraftsWithSelectors */
/* harmony export (immutable) */ __webpack_exports__["a"] = currentDraftEditableRegions;
/* unused harmony export mapDraftSelectorToRegion */
/* unused harmony export editableRegionsFromDraftList */
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function getCurrentDraftId(state, scope) {
  return state.drafts.currentDrafts[scope];
}

function getCurrentDrafts(state) {
  return Object.values(state.drafts.currentDrafts);
}

function getDraftById(state, id) {
  return state.drafts.list[id];
}

function getCurrentDraft(state, scope) {
  return getDraftById(state, getCurrentDraftId(state, scope));
}

function getAllDraftsWithSelectors(state) {
  return getDraftsWithSelectors(state.drafts.list);
}

function getDraftsByFingerprintIdentity(state) {
  return (id, identity) => {
    const drafts = state.drafts.list;
    return Object.values(drafts).reduce((state, draft) => {
      if (state) return state;
      if (draft.id !== id && draft.fingerprint.identity === identity) {
        return draft;
      }
    }, null);
  };
}

function getDraftsWithSelectors(drafts) {
  return Object.keys(drafts).filter(k => drafts[k] && drafts[k].selector).map(k => drafts[k]);
}

function currentDraftEditableRegions(state) {
  const currentDrafts = getCurrentDrafts(state);
  if (!currentDrafts) {
    return [];
  }
  return editableRegionsFromDraftList(state.drafts.list, currentDrafts);
}

// @todo to revise.
function mapDraftSelectorToRegion(draft, currentDraftKeys, onClickRegion, currentSelectorExists) {
  const selector = draft.selector;
  const keysAsString = currentDraftKeys.map(e => `${e}`);
  return _extends({
    id: draft.id,
    onClick: () => onClickRegion(draft.id),
    selected: keysAsString.indexOf(`${draft.id}`) !== -1,
    editing: keysAsString.indexOf(`${draft.id}`) !== -1 && currentSelectorExists,
    immutable: false
  }, selector);
}

function editableRegionsFromDraftList(drafts, currentDraftKeys = [], onClickRegion = () => null, currentSelectorExists = true) {
  return getDraftsWithSelectors(drafts).map(draft => mapDraftSelectorToRegion(draft, currentDraftKeys, onClickRegion, currentSelectorExists));
}

/***/ }),

/***/ 552:
/*!************************************************************!*\
  !*** ./packages/annotation-application/src/css/style.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./style.scss */ 553);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 553:
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/style.scss ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".iiif-integration p {\n  line-height: 1.25em;\n  margin-bottom: 1rem; }\n\n.iiif-integration-spec {\n  font-style: italic;\n  padding: 1em 2em;\n  border: 1px dotted grey;\n  margin-bottom: 10px; }\n\n.iiif-integration-spec__list li {\n  line-height: 1.75em; }\n\n.iiif-integration-description {\n  font-size: 1.25rem; }\n\n.iiif-integration-admin {\n  padding: 10px;\n  background-color: #ffc; }\n\n.iiif-integration__row {\n  display: block;\n  clear: both; }\n\n.iiif-integration__image--large {\n  width: 100%;\n  height: 200px;\n  background-color: #999; }\n\n.iiif-integration__image--small {\n  display: block;\n  float: left;\n  width: 12.5%;\n  margin: 2%;\n  height: 180px;\n  margin-bottom: 20px;\n  background-color: #999; }\n\n.iiif-integration-places {\n  display: block;\n  float: left;\n  width: 31.3%;\n  margin: 0 1%; }\n\n.iiif-integration-places__list {\n  padding: 0 1em; }\n\n.iiif-integration-places__list li {\n  line-height: 1.75em; }\n\n.iiif-integration-schools {\n  display: block;\n  float: left;\n  width: 31.3%;\n  margin: 0 1%; }\n\n.iiif-integration-schools__list {\n  padding: 0 1em; }\n\n.iiif-integration-schools__list li {\n  line-height: 1.75em; }\n\n.iiif-integration-organisations {\n  display: block;\n  float: left;\n  width: 31.3%;\n  margin: 0 1%; }\n\n.iiif-integration-organisations__list {\n  padding: 0 1em; }\n\n.iiif-integration-organisations__list li {\n  line-height: 1.75em; }\n\n.iiif-integration-collection {\n  display: block;\n  float: left;\n  width: 46%;\n  margin: 0 2%;\n  height: 300px; }\n\n#iiif-integration-canvas-image {\n  width: 100%;\n  height: 750px; }\n", ""]);

// exports


/***/ }),

/***/ 555:
/*!***********************************************************!*\
  !*** ./packages/annotation-application/src/css/base.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./base.scss */ 556);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./base.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./base.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 556:
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/base.scss ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, "body.minimal {\n  width: 95% !important;\n  margin: 30px 0 !important;\n  margin-left: auto !important;\n  margin-right: auto !important; }\n\nbody.minimal div[role=\"main\"] {\n  padding: 5% !important; }\n\n.osd-viewer__region-item {\n  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.4); }\n\n[data-selector-type=\"WholeCanvasSelector\"] .osd-viewer__region-item {\n  display: none; }\n", ""]);

// exports


/***/ }),

/***/ 557:
/*!***********************************************************!*\
  !*** ./packages/annotation-application/src/css/grid.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./grid.scss */ 558);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./grid.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./grid.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 558:
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/grid.scss ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".iiifi-grid {\n  display: block;\n  box-sizing: border-box; }\n  .iiifi-grid > div ~ div {\n    padding-left: 20px; }\n  .iiifi-grid__third {\n    float: left;\n    width: 33.333333%; }\n  .iiifi-grid__two-thirds {\n    float: left;\n    width: 66.666666%; }\n  .iiifi-grid:after, .iiifi-grid:before {\n    content: '';\n    display: table;\n    clear: both; }\n", ""]);

// exports


/***/ }),

/***/ 559:
/*!*****************************************************************!*\
  !*** ./packages/annotation-application/src/css/image-grid.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./image-grid.scss */ 560);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./image-grid.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./image-grid.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 560:
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/image-grid.scss ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".iiifi-image-grid__item {\n  display: inline-block;\n  vertical-align: middle;\n  transform: perspective(1px) translateZ(0);\n  box-shadow: 0 0 1px transparent;\n  transition-duration: 0.3s;\n  transition-property: transform;\n  width: 180px;\n  height: 190px;\n  float: left;\n  white-space: nowrap;\n  display: block;\n  padding: 20px 10px;\n  margin: 10px;\n  background-color: #535353;\n  text-align: center; }\n  .iiifi-image-grid__item:hover, .iiifi-image-grid__item:focus, .iiifi-image-grid__item:active {\n    transform: scale(1.02); }\n  .iiifi-image-grid__item:before {\n    content: '';\n    display: inline-block;\n    height: 100%;\n    vertical-align: middle;\n    margin-right: -0.25em;\n    /* Adjusts for spacing */ }\n  .iiifi-image-grid__item:hover {\n    background-color: #2f2f2f; }\n\n.iiifi-image-grid__image {\n  display: inline-block;\n  vertical-align: middle; }\n\n.iiifi-image-grid:after, .iiifi-image-grid:before {\n  content: '';\n  display: table;\n  clear: both; }\n", ""]);

// exports


/***/ }),

/***/ 561:
/*!**********************************************************************!*\
  !*** ./packages/annotation-application/src/css/collection-list.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./collection-list.scss */ 562);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./collection-list.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./collection-list.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 562:
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/collection-list.scss ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".iiifi-collection-list {\n  width: 100%; }\n  .iiifi-collection-list ul {\n    padding: 0;\n    margin: 0 -10px; }\n  .iiifi-collection-list__item {\n    margin: 0;\n    list-style-type: none;\n    float: left;\n    width: 50%;\n    padding: 5px 10px; }\n  .iiifi-collection-list__item-inline {\n    padding: 5px 15px;\n    list-style-type: none; }\n  .iiifi-collection-list:after, .iiifi-collection-list:before {\n    content: '';\n    display: table;\n    clear: both; }\n", ""]);

// exports


/***/ }),

/***/ 563:
/*!**********************************************************************!*\
  !*** ./packages/annotation-application/src/css/collection-item.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./collection-item.scss */ 564);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./collection-item.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./collection-item.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 564:
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/collection-item.scss ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".iiifi-collection-item {\n  margin-bottom: 20px; }\n  .iiifi-collection-item__image-container {\n    width: 100%; }\n  .iiifi-collection-item__image {\n    max-width: 100%; }\n  .iiifi-collection-item__caption {\n    padding: 10px; }\n", ""]);

// exports


/***/ }),

/***/ 565:
/*!*****************************************************************!*\
  !*** ./packages/annotation-application/src/css/topic-list.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./topic-list.scss */ 566);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./topic-list.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./topic-list.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 566:
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/topic-list.scss ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".iiifi-topic-list ul {\n  padding: 0;\n  margin: 0 0 1.4em; }\n\n.iiifi-topic-list__item {\n  list-style-type: none; }\n\n.iiifi-topic-list--inline {\n  display: inline; }\n  .iiifi-topic-list--inline ul {\n    display: inline; }\n  .iiifi-topic-list--inline .iiifi-topic-list__item {\n    display: inline; }\n    .iiifi-topic-list--inline .iiifi-topic-list__item ~ .iiifi-topic-list__item:before {\n      content: ', ';\n      width: 0.4em;\n      display: inline-block; }\n", ""]);

// exports


/***/ }),

/***/ 567:
/*!****************************************************************!*\
  !*** ./packages/annotation-application/src/css/prev-next.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./prev-next.scss */ 568);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./prev-next.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./prev-next.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 568:
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/prev-next.scss ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".iiifi-prev-next ul {\n  padding: 0; }\n\n.iiifi-prev-next__item {\n  display: inline-block;\n  list-style: none;\n  float: left;\n  width: 200px; }\n  .iiifi-prev-next__item a {\n    padding: 10px;\n    display: block;\n    background: #f1f1f1;\n    text-align: center;\n    margin: 0 0 30px; }\n  .iiifi-prev-next__item--next {\n    text-align: right;\n    float: right; }\n\n.iiifi-prev-next:after, .iiifi-prev-next:before {\n  content: '';\n  display: table;\n  clear: both; }\n", ""]);

// exports


/***/ }),

/***/ 569:
/*!*****************************************************************!*\
  !*** ./packages/annotation-application/src/css/pagination.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./pagination.scss */ 570);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./pagination.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./pagination.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 570:
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-application/src/css/pagination.scss ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".iiifi-pagination__item {\n  display: inline-block;\n  list-style: none; }\n  .iiifi-pagination__item a {\n    display: block;\n    border: 1px solid #ccc;\n    padding: 5px 10px;\n    margin: 5px 3px;\n    width: 3em;\n    text-align: center; }\n    .iiifi-pagination__item a.active {\n      border-color: #afafaf;\n      background-color: #f1f1f1; }\n", ""]);

// exports


/***/ }),

/***/ 571:
/*!************************************************************!*\
  !*** ./packages/annotation-plugin-core/src/core.plugin.js ***!
  \************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = CorePlugin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_utils__ = __webpack_require__(/*! ./core.utils */ 135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_provider__ = __webpack_require__(/*! ./core.provider */ 231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_store__ = __webpack_require__(/*! store */ 136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_store__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(/*! moment */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }









function CorePlugin($el, _ref) {
  let {
    manifest,
    canvas,
    elucidateServer,
    locale
  } = _ref,
      unknownProps = _objectWithoutProperties(_ref, ['manifest', 'canvas', 'elucidateServer', 'locale']);

  Object(__WEBPACK_IMPORTED_MODULE_3__core_utils__["unknownPropertyWarning"])(unknownProps);

  if (locale) {
    __WEBPACK_IMPORTED_MODULE_6_moment___default.a.locale(locale);
  }

  const url = window.location.href;
  const savedDraftList = __WEBPACK_IMPORTED_MODULE_5_store___default.a.get(`annotation-studio/${url}`) || {};

  const store = Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux__["b" /* createStore */])(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux__["c" /* reducers */]);
  Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__core_provider__["a" /* default */], {
    store: store,
    manifest: manifest,
    savedDraftList: savedDraftList,
    elucidateServer: elucidateServer,
    canvas: canvas
  }), $el);

  return Promise.resolve(store);
}

/***/ }),

/***/ 572:
/*!********************************************************!*\
  !*** ./packages/annotation-redux/src/actions/index.js ***!
  \********************************************************/
/*! exports provided: logging, annotations, selectors, drafts, resources, elucidate, manifest, viewer, help */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__logging__ = __webpack_require__(/*! ./logging */ 224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__annotations__ = __webpack_require__(/*! ./annotations */ 85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors__ = __webpack_require__(/*! ./selectors */ 86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drafts__ = __webpack_require__(/*! ./drafts */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__resources__ = __webpack_require__(/*! ./resources */ 87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__elucidate__ = __webpack_require__(/*! ./elucidate */ 132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__manifest__ = __webpack_require__(/*! ./manifest */ 134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__viewer__ = __webpack_require__(/*! ./viewer */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__help__ = __webpack_require__(/*! ./help */ 230);
/* unused harmony reexport logging */
/* unused harmony reexport annotations */
/* unused harmony reexport selectors */
/* unused harmony reexport drafts */
/* unused harmony reexport resources */
/* unused harmony reexport elucidate */
/* unused harmony reexport manifest */
/* unused harmony reexport viewer */
/* unused harmony reexport help */












/***/ }),

/***/ 577:
/*!***************************************************************************!*\
  !*** ./packages/annotation-redux/src/lib/elucidate/AnnotationSelector.js ***!
  \***************************************************************************/
/*! exports provided: AnnotationSelector */
/*! exports used: AnnotationSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class AnnotationSelector {

  static fromArray(multipleSelectors) {
    return multipleSelectors.map(annotation => AnnotationSelector.parse(annotation));
  }

  constructor(id, scale, format, language, processingLanguage, textDirection, selector) {
    if (!id) {
      throw new Error('ID is required in selector');
    }
    if (textDirection && textDirection !== AnnotationSelector.DIRECTION_AUTO && textDirection !== AnnotationSelector.DIRECTION_LTR && textDirection !== AnnotationSelector.DIRECTION_RTL) {
      throw new Error('textDirection must be ONE of [ltr, rtl, auto]');
    }

    this.id = id;
    this.format = format;
    this.language = language;
    this.processingLanguage = processingLanguage;
    this.textDirection = textDirection;
    this.target = AnnotationSelector.parseTarget(id, scale, selector);
  }

  static parse(text, scale = 1) {
    if (!text) {
      return null;
    }

    // https://www.w3.org/TR/annotation-model/#bodies-and-targets
    if (text.id) {
      return new AnnotationSelector(text.id, scale, text.format, text.language, text.processingLanguage, text.textDirection);
    }

    // https://www.w3.org/TR/annotation-model/#selectors
    if (text.source) {
      return new AnnotationSelector(text.source, scale, text.format, text.language, text.processingLanguage, text.textDirection, text.selector);
    }

    // @todo check for is text or is object and construct accordingly.
    return new AnnotationSelector(text, scale);
  }

  static parseTarget(source, scale = 1, selector = null) {
    let toParse = source;
    if (selector && selector.type === 'FragmentSelector') {
      toParse = `${source}#${selector.value}`;
    }

    const match = AnnotationSelector.W3C_SELECTOR.exec(toParse);
    if (match) {
      return {
        unit: match[1] === 'percent:' ? 'percent' : 'pixel',
        scale,
        expanded: true,
        x: parseInt(match[2], 10) * scale,
        y: parseInt(match[3], 10) * scale,
        width: parseInt(match[4], 10) * scale,
        height: parseInt(match[5], 10) * scale,
        toString() {
          // @todo maybe something else?
          return source.split('#')[0];
        }
      };
    }
    return source;
  }

  toString() {
    return this.id;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnnotationSelector;

AnnotationSelector.DIRECTION_LTR = 'ltr';
AnnotationSelector.DIRECTION_RTL = 'rtl';
AnnotationSelector.DIRECTION_AUTO = 'auto';
AnnotationSelector.W3C_SELECTOR = /[#&\?]xywh\=(pixel\:|percent\:)?(\d+),(\d+),(\d+),(\d+)/;

/***/ }),

/***/ 578:
/*!******************************************************!*\
  !*** ./packages/annotation-redux/src/query/index.js ***!
  \******************************************************/
/*! exports provided: getResourceById, applyDefaultsToDraft, getCurrentResource, isAtRoot, hasLandedOnForm, getCurrentResourceTemplate, getForm, resourceTemplateList, getCurrentPath, getCurrentDraftId, getCurrentDrafts, getDraftById, getCurrentDraft, getAllDraftsWithSelectors, getDraftsByFingerprintIdentity, getDraftsWithSelectors, currentDraftEditableRegions, mapDraftSelectorToRegion, editableRegionsFromDraftList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__draftQuery__ = __webpack_require__(/*! ./draftQuery */ 53);
/* unused harmony reexport namespace */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resourceQuery__ = __webpack_require__(/*! ./resourceQuery */ 35);
/* unused harmony reexport namespace */



/***/ }),

/***/ 579:
/*!*********************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loggingReducer__ = __webpack_require__(/*! ./loggingReducer */ 580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__draftReducer__ = __webpack_require__(/*! ./draftReducer */ 581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__annotationReducer__ = __webpack_require__(/*! ./annotationReducer */ 582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__selectorReducer__ = __webpack_require__(/*! ./selectorReducer */ 583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__elucidateReducer__ = __webpack_require__(/*! ./elucidateReducer */ 584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__manifestReducer__ = __webpack_require__(/*! ./manifestReducer */ 585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__resourceReducer__ = __webpack_require__(/*! ./resourceReducer */ 586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__helpReducer__ = __webpack_require__(/*! ./helpReducer */ 587);









/* harmony default export */ __webpack_exports__["a"] = ({
  logging: __WEBPACK_IMPORTED_MODULE_0__loggingReducer__["a" /* default */],
  drafts: __WEBPACK_IMPORTED_MODULE_1__draftReducer__["a" /* default */],
  resource: __WEBPACK_IMPORTED_MODULE_6__resourceReducer__["a" /* default */],
  annotations: __WEBPACK_IMPORTED_MODULE_2__annotationReducer__["a" /* default */],
  selector: __WEBPACK_IMPORTED_MODULE_3__selectorReducer__["a" /* default */],
  elucidate: __WEBPACK_IMPORTED_MODULE_4__elucidateReducer__["a" /* default */],
  manifest: __WEBPACK_IMPORTED_MODULE_5__manifestReducer__["a" /* default */],
  help: __WEBPACK_IMPORTED_MODULE_7__helpReducer__["a" /* default */]
});

/***/ }),

/***/ 580:
/*!******************************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/loggingReducer.js ***!
  \******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loggingReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_logging__ = __webpack_require__(/*! ../actions/logging */ 224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutability_helper__);



const defaultState = {
  messages: []
};

function loggingReducer(state = defaultState, action) {
  if (action.type === __WEBPACK_IMPORTED_MODULE_0__actions_logging__["a" /* LOGGING_LOG */]) {
    return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
      messages: { $push: [action.payload.message] }
    });
  }
  return state;
}

/***/ }),

/***/ 581:
/*!****************************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/draftReducer.js ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = draftReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_drafts__ = __webpack_require__(/*! ../actions/drafts */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutability_helper__);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




const defaultState = {
  currentDrafts: {},
  isConfirmed: {},
  list: {}
};

function draftModel(draft) {
  return {
    id: draft.id,
    input: draft.input || {},
    selectors: draft.selectors || {},
    template: draft.template,
    motivation: draft.motivation,
    isPublishing: draft.isPublishing || false,
    isPreviewing: draft.isPreviewing || false,
    selector: draft.selector || null,
    fingerprint: draft.fingerprint ? draft.fingerprint : {
      scope: draft.template,
      path: [],
      lifecycle: __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["f" /* DRAFT_LIFECYCLE_NEW */], // DRAFT_LIFECYCLE_NEW | DRAFT_LIFECYCLE_CHANGED
      source: 'memory', // memory | elucidate | localStorage
      // To detect this default.
      unstable: true
    }
  };
}

function draftReducer(state = defaultState, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["b" /* DRAFT_CREATE */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["e" /* DRAFT_IMPORT */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            $set: draftModel(action.payload)
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["m" /* DRAFT_UPDATE_FIELD_SELECTOR */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            selectors: { $merge: action.payload.selectors }
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["n" /* DRAFT_UPDATE_INPUT */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            input: { $merge: action.payload.fields }
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["j" /* DRAFT_REMOVE_SELECTOR */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            selector: { $set: null }
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["o" /* DRAFT_UPDATE_SELECTOR */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            selector: { $set: action.payload.selector ? action.payload.selector : state.list[action.payload.id].selector }
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["k" /* DRAFT_SELECT */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentDrafts: { [action.payload.scope]: { $set: action.payload.id } }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["c" /* DRAFT_DESELECT */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentDrafts: { [action.payload.scope]: { $set: null } }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["i" /* DRAFT_PUBLISHING */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            isPublishing: { $set: true }
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["g" /* DRAFT_PREVIEW */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            isPreviewing: { $set: true }
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["l" /* DRAFT_UNPREVIEW */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            isPreviewing: { $set: false }
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["a" /* DRAFT_CONFIRM */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        isConfirmed: { [action.payload.scope]: { $set: true } }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["h" /* DRAFT_PUBLISHED */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentDrafts: { [action.payload.scope]: { $set: null } },
        isConfirmed: { [action.payload.scope]: { $set: false } },
        list: {
          $apply: function (obj) {
            const { [action.payload.id]: _ } = obj,
                  copy = _objectWithoutProperties(obj, [action.payload.id]);
            return copy;
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_drafts__["d" /* DRAFT_DISCARD */]:
      const listUpdate = {
        $apply: function (obj) {
          const { [action.payload.id]: _ } = obj,
                copy = _objectWithoutProperties(obj, [action.payload.id]);
          return copy;
        }
      };
      if (state.currentDrafts[action.payload.scope] !== action.payload.id) {
        return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
          list: listUpdate
        });
      }
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentDrafts: { [action.payload.scope]: { $set: null } },
        list: listUpdate
      });

  }
  return state;
}

/***/ }),

/***/ 582:
/*!*********************************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/annotationReducer.js ***!
  \*********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = annotationReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_annotations__ = __webpack_require__(/*! ../actions/annotations */ 85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutability_helper__);



const defaultState = {
  list: []
};

function annotationReducer(state = defaultState, action) {
  if (action.type === __WEBPACK_IMPORTED_MODULE_0__actions_annotations__["a" /* ANNOTATIONS_ADD */]) {
    return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
      list: { $push: [action.payload.annotation] }
    });
  }
  return state;
}

/***/ }),

/***/ 583:
/*!*******************************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/selectorReducer.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = selectorReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_selectors__ = __webpack_require__(/*! ../actions/selectors */ 86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutability_helper__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




const defaultState = {
  available: [],
  currentSelector: {}
};

function selectorReducer(state = defaultState, action) {

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_selectors__["e" /* SELECTOR_SET_AVAILABLE */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        available: { $set: action.payload.selectors }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_selectors__["b" /* SELECTOR_CHOOSE */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentSelector: {
          $set: _extends({
            type: action.payload.type,
            source: action.payload.source
          }, action.payload.defaults)
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_selectors__["f" /* SELECTOR_UPDATE */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentSelector: { $merge: action.payload.data }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_selectors__["c" /* SELECTOR_COMMIT_TO_DRAFT */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_selectors__["d" /* SELECTOR_COMMIT_TO_DRAFT_FIELD */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_selectors__["a" /* SELECTOR_CANCEL */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentSelector: { $set: {} }
      });

  }

  return state;
}

/***/ }),

/***/ 584:
/*!********************************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/elucidateReducer.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = elucidateReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_elucidate__ = __webpack_require__(/*! ../actions/elucidate */ 132);



const defaultState = {
  server: null,
  resource: null,
  collection: {
    id: null,
    label: null,
    resourceId: null,
    loading: false
  },
  annotations: {},
  pendingAnnotations: 0
};

function elucidateReducer(state = defaultState, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__actions_elucidate__["f" /* ELUCIDATE_SET_SERVER */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        server: { $set: action.payload.server }
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_elucidate__["e" /* ELUCIDATE_SET_RESOURCE */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        resource: { $set: action.payload.resource }
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_elucidate__["b" /* ELUCIDATE_CREATE_COLLECTION */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        collection: {
          loading: { $set: true },
          label: { $set: action.payload.label },
          resourceId: { $set: action.payload.resourceId }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_elucidate__["d" /* ELUCIDATE_SET_COLLECTION */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        collection: {
          $set: Object.assign({}, action.payload.collection, { loading: false })
        }
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_elucidate__["c" /* ELUCIDATE_SEND_ANNOTATION */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        pendingAnnotations: { $apply: n => n + 1 }
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_elucidate__["a" /* ELUCIDATE_ADD_ANNOTATION */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        pendingAnnotations: { $apply: n => n - 1 },
        annotations: {
          [action.payload.id]: {
            $set: action.payload.annotation
          }
        }
      });

    default:
      return state;
  }
}

/***/ }),

/***/ 585:
/*!*******************************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/manifestReducer.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = manifestReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_immutability_helper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_manifest__ = __webpack_require__(/*! ../actions/manifest */ 134);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




const defaultState = {
  currentCanvas: null,
  current: null,
  list: {},
  pending: []
};

function manifestReducer(state = defaultState, action) {

  switch (action.type) {

    case __WEBPACK_IMPORTED_MODULE_1__actions_manifest__["a" /* MANIFEST_ADD */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        list: {
          $set: {
            [action.payload.url]: action.payload.manifest
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_manifest__["e" /* MANIFEST_SELECT */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        current: {
          $set: action.payload.url
        }
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_manifest__["b" /* MANIFEST_CANVAS_SELECT */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        currentCanvas: {
          $set: action.payload.url
        }
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_manifest__["c" /* MANIFEST_REMOVE */]:
      const listUpdate = {
        $apply: function (obj) {
          const { [action.payload.url]: _ } = obj,
                copy = _objectWithoutProperties(obj, [action.payload.url]);
          return copy;
        }
      };
      if (state.current !== action.payload.url) {
        return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
          list: listUpdate
        });
      }
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        current: { $set: null },
        list: listUpdate
      });

    case __WEBPACK_IMPORTED_MODULE_1__actions_manifest__["d" /* MANIFEST_REQUEST */]:
      return __WEBPACK_IMPORTED_MODULE_0_immutability_helper___default()(state, {
        pending: { $push: [action.payload.url] }
      });
  }

  return state;
}

/***/ }),

/***/ 586:
/*!*******************************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/resourceReducer.js ***!
  \*******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = resourceReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_resources__ = __webpack_require__(/*! ../actions/resources */ 87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutability_helper__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





const defaultState = {
  currentPaths: {},
  trees: {},
  list: {}
};

const captureModelDefaults = {
  fields: {}
};

function resourceReducer(state = defaultState, action) {
  if (action.error) {
    switch (action.type) {
      case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["d" /* IMPORT_RESOURCE_TREE */]:
      case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["e" /* IMPORT_UNKNOWN_RESOURCE */]:
      case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["c" /* IMPORT_RESOURCE_FIELD */]:
        console.error(action.payload);
        return state;
    }

    return state;
  }

  switch (action.type) {

    case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["g" /* RESOURCE_NAV_FORWARD */]:
      if (!state.currentPaths[action.payload.tree]) {
        // @todo Log error.
        return state;
      }
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentPaths: { [action.payload.tree]: { $push: [action.payload.path] } }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["f" /* RESOURCE_NAV_BACK */]:
      if (!state.currentPaths[action.payload.tree]) {
        // @todo Log error.
        return state;
      }
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentPaths: { [action.payload.tree]: { $apply: path => path.length > 0 ? path.slice(0, -1) : [] } }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["h" /* RESOURCE_NAV_RESET */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentPaths: { [action.payload.tree]: { $set: [] } }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["d" /* IMPORT_RESOURCE_TREE */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        currentPaths: {
          [action.payload.id]: { $set: [] }
        },
        trees: {
          [action.payload.id]: { $set: action.payload.tree }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["b" /* IMPORT_RESOURCE_CHOICE */]:
      return state; // This all exists in the tree for now.

    case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["a" /* IMPORT_CAPTURE_MODEL */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: { $set: _extends({}, captureModelDefaults, action.payload.resource) }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_resources__["c" /* IMPORT_RESOURCE_FIELD */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        list: {
          [action.payload.id]: {
            fields: {
              [action.payload.resource.id]: { $set: action.payload.resource }
            }
          }
        }
      });
      return state;
  }

  return state;
}

/***/ }),

/***/ 587:
/*!***************************************************************!*\
  !*** ./packages/annotation-redux/src/reducers/helpReducer.js ***!
  \***************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = elucidateReducer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_help__ = __webpack_require__(/*! ../actions/help */ 230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutability_helper__);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




const defaultState = {
  context: null,
  info: {},
  warning: {},
  error: {}
};

function elucidateReducer(state = defaultState, action) {

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_help__["c" /* HELP_INFO_ADD */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        [action.payload.type]: {
          [action.payload.key]: { $set: action.payload.content }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_help__["d" /* HELP_INFO_REMOVE */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        [action.payload.type]: {
          $apply: function (obj) {
            const { [action.payload.key]: _ } = obj,
                  copy = _objectWithoutProperties(obj, [action.payload.key]);
            return copy;
          }
        }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_help__["a" /* HELP_CONTEXT_ADD */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        context: { $set: action.payload.content }
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_help__["b" /* HELP_CONTEXT_REMOVE */]:
      return __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(state, {
        context: { $set: null }
      });
    default:
      return state;
  }
}

/***/ }),

/***/ 588:
/*!****************************************************!*\
  !*** ./packages/annotation-redux/src/connector.js ***!
  \****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux__ = __webpack_require__(/*! redux */ 128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(/*! react-redux */ 26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_drafts__ = __webpack_require__(/*! ./actions/drafts */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions_annotations__ = __webpack_require__(/*! ./actions/annotations */ 85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__actions_selectors__ = __webpack_require__(/*! ./actions/selectors */ 86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__ = __webpack_require__(/*! ./actions/elucidate */ 132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_resources__ = __webpack_require__(/*! ./actions/resources */ 87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__query_draftQuery__ = __webpack_require__(/*! ./query/draftQuery */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__query_resourceQuery__ = __webpack_require__(/*! ./query/resourceQuery */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__actions_manifest__ = __webpack_require__(/*! ./actions/manifest */ 134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__query_elucidateQuery__ = __webpack_require__(/*! ./query/elucidateQuery */ 133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__actions_viewer__ = __webpack_require__(/*! ./actions/viewer */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__query_selectorQuery__ = __webpack_require__(/*! ./query/selectorQuery */ 131);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
















function bindCurrentResource(currentResource, actions) {
  if (!currentResource) {
    return {};
  }
  return Object.keys(actions).reduce((state, key) => {
    state[key] = (...args) => actions[key](currentResource, ...args);
    return state;
  }, {});
}

/* harmony default export */ __webpack_exports__["a"] = ((WrappedComponent, actions = {}) => Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["b" /* connect */])((state, props) => {
  const annotationList = Object(__WEBPACK_IMPORTED_MODULE_11__query_elucidateQuery__["c" /* richAnnotationList */])(state);
  const currentResource = props.tree ? Object(__WEBPACK_IMPORTED_MODULE_9__query_resourceQuery__["b" /* getCurrentResource */])(props.tree, state) : null;
  const currentResourceTemplate = props.tree ? Object(__WEBPACK_IMPORTED_MODULE_9__query_resourceQuery__["c" /* getCurrentResourceTemplate */])(state, props.tree) : null;
  const currentDraft = props.tree ? Object(__WEBPACK_IMPORTED_MODULE_8__query_draftQuery__["b" /* getCurrentDraft */])(state, props.tree) : null;
  const currentSelector = state.selector && state.selector.currentSelector ? state.selector.currentSelector : null;
  const treeRoute = props.tree && state.resource.currentPaths ? state.resource.currentPaths[props.tree] : null;

  // @todo move to query.
  const currentDraftList = Object.values(state.drafts.currentDrafts);
  const currentDraftSelectors = currentDraftList.length ? currentDraftList.reduce((selectors, currentDraftId) => {
    if (!currentDraftId) {
      return [];
    }
    const currentDraft = Object(__WEBPACK_IMPORTED_MODULE_8__query_draftQuery__["c" /* getDraftById */])(state, currentDraftId);
    if (!currentDraft) {
      return [];
    }
    Object.keys(currentDraft.selectors).forEach(k => {
      selectors.push(_extends({}, currentDraft.selectors[k], { id: k, isSecondary: true }));
    });
    return selectors;
  }, []) : [];

  return {
    state,
    treeRoute,
    currentSelector,
    currentDraft,
    currentDrafts: state.drafts.currentDrafts,
    currentResource,
    isSelecting: Object(__WEBPACK_IMPORTED_MODULE_13__query_selectorQuery__["c" /* isSelecting */])(state),
    isSelectingPrimary: Object(__WEBPACK_IMPORTED_MODULE_13__query_selectorQuery__["c" /* isSelecting */])(state) && Object(__WEBPACK_IMPORTED_MODULE_13__query_selectorQuery__["a" /* currentSelectorIsSecondary */])(state) === false,
    isSelectingSecondary: Object(__WEBPACK_IMPORTED_MODULE_13__query_selectorQuery__["c" /* isSelecting */])(state) && Object(__WEBPACK_IMPORTED_MODULE_13__query_selectorQuery__["a" /* currentSelectorIsSecondary */])(state) === true,
    isConfirmingDraft: props.tree ? state.drafts.isConfirmed[props.tree] === false : true,
    editableRegions: Object(__WEBPACK_IMPORTED_MODULE_8__query_draftQuery__["a" /* currentDraftEditableRegions */])(state),
    drafts: state.drafts.list,
    currentResourceTemplate,
    currentDraftSelectors,
    draftIsCurrentlySelecting: (!currentDraft || !currentDraft.selector) && currentSelector.type,
    draftHasSelector: !currentDraft || !currentDraft.selector,
    resourceTemplateList: Object(__WEBPACK_IMPORTED_MODULE_9__query_resourceQuery__["g" /* resourceTemplateList */])(state),
    wholeCanvasAnnotations: annotationList ? annotationList.filter(anno => anno.selector && !anno.selector.target.expanded) : [],
    regionAnnotations: annotationList ? annotationList.filter(anno => anno.selector && anno.selector.target.expanded) : [],
    resourceForm: currentResourceTemplate ? Object(__WEBPACK_IMPORTED_MODULE_9__query_resourceQuery__["d" /* getForm */])(currentResourceTemplate) : null,
    resourceTemplates: state.resource,
    getDraftsByFingerprintIdentity: Object(__WEBPACK_IMPORTED_MODULE_8__query_draftQuery__["d" /* getDraftsByFingerprintIdentity */])(state)
  };
}, (dispatch, ownProps) => Object(__WEBPACK_IMPORTED_MODULE_1_redux__["b" /* bindActionCreators */])(_extends({}, bindCurrentResource(ownProps.tree, {
  confirmDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["x" /* confirmDraft */],
  deselectDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["z" /* deselectDraft */],
  discardDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["B" /* discardDraft */],
  discardCurrentDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["A" /* discardCurrentDraft */],
  removeSelectorFromCurrentDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["H" /* removeSelectorFromCurrentDraft */],
  selectDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["K" /* selectDraft */],
  editCurrentDraftSecondarySelector: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["l" /* editCurrentDraftSecondarySelector */],
  editCurrentDraftSelector: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["m" /* editCurrentDraftSelector */],
  editCurrentDraftFieldSelector: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["C" /* editCurrentDraftFieldSelector */],
  unpreviewDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["L" /* unpreviewDraft */],
  createDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["y" /* createDraft */],
  publishDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["G" /* publishDraft */],
  asyncPublishDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["s" /* asyncPublishDraft */]
}), {
  selectScopedDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["K" /* selectDraft */],
  importDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["E" /* importDraft */],
  commitToCurrentDraft: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["j" /* commitToCurrentDraft */],
  commitToCurrentDraftField: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["k" /* commitToCurrentDraftField */],
  cancelSelector: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["g" /* cancelSelector */],
  chooseSecondarySelector: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["h" /* chooseSecondarySelector */],
  setAvailableSelectors: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["n" /* setAvailableSelectors */],
  chooseSelector: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["i" /* chooseSelector */],
  updateSelector: __WEBPACK_IMPORTED_MODULE_5__actions_selectors__["o" /* updateSelector */],
  getCurrentDraft: __WEBPACK_IMPORTED_MODULE_8__query_draftQuery__["b" /* getCurrentDraft */],
  updateDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["M" /* updateDraft */],
  previewDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["F" /* previewDraft */],
  addSelectorToDraftFromViewer: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["r" /* addSelectorToDraftFromViewer */],
  removeSelectorFromDraft: __WEBPACK_IMPORTED_MODULE_3__actions_drafts__["I" /* removeSelectorFromDraft */],
  setViewer: __WEBPACK_IMPORTED_MODULE_12__actions_viewer__["a" /* setViewer */],
  withViewer: __WEBPACK_IMPORTED_MODULE_12__actions_viewer__["b" /* withViewer */],
  setServer: __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__["m" /* setServer */],
  createCollection: __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__["i" /* createCollection */],
  setCollection: __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__["k" /* setCollection */],
  sendAnnotation: __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__["j" /* sendAnnotation */],
  updateAnnotation: __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__["n" /* updateAnnotation */],
  createAnnotation: __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__["h" /* createAnnotation */],
  addElucidateAnnotation: __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__["g" /* addElucidateAnnotation */],
  addAnnotation: __WEBPACK_IMPORTED_MODULE_4__actions_annotations__["b" /* addAnnotation */],
  setResource: __WEBPACK_IMPORTED_MODULE_6__actions_elucidate__["l" /* setResource */],
  requestManifest: __WEBPACK_IMPORTED_MODULE_10__actions_manifest__["h" /* requestManifest */],
  addManifest: __WEBPACK_IMPORTED_MODULE_10__actions_manifest__["f" /* addManifest */],
  removeManifest: __WEBPACK_IMPORTED_MODULE_10__actions_manifest__["g" /* removeManifest */],
  selectCanvas: __WEBPACK_IMPORTED_MODULE_10__actions_manifest__["i" /* selectCanvas */],
  selectManifest: __WEBPACK_IMPORTED_MODULE_10__actions_manifest__["j" /* selectManifest */],
  moveForward: __WEBPACK_IMPORTED_MODULE_7__actions_resources__["l" /* moveForward */],
  moveBack: __WEBPACK_IMPORTED_MODULE_7__actions_resources__["k" /* moveBack */],
  reset: __WEBPACK_IMPORTED_MODULE_7__actions_resources__["m" /* reset */]
}, actions), dispatch), null, { withRef: true })(WrappedComponent));

/***/ }),

/***/ 589:
/*!******************************************************!*\
  !*** ./packages/annotation-redux/src/createStore.js ***!
  \******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createCustomStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(/*! redux */ 128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__middleware__ = __webpack_require__(/*! ./middleware */ 590);



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || __WEBPACK_IMPORTED_MODULE_0_redux__["d" /* compose */];

function createCustomStore(reducers = [e => e || {}], extraMiddleware = []) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_redux__["e" /* createStore */])(Object(__WEBPACK_IMPORTED_MODULE_0_redux__["c" /* combineReducers */])(reducers), composeEnhancers(Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* applyMiddleware */])(...[...__WEBPACK_IMPORTED_MODULE_1__middleware__["a" /* default */], ...extraMiddleware])));
}

/***/ }),

/***/ 590:
/*!*****************************************************!*\
  !*** ./packages/annotation-redux/src/middleware.js ***!
  \*****************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_thunk__ = __webpack_require__(/*! redux-thunk */ 591);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux_thunk__);


const logger = store => next => action => {
  if (typeof action !== 'function' && process.env.__DEV__ === true) {
    // console.log('dispatching', action);
  }
  return next(action);
};
const ViewerStore = { viewer: null, resolve: null, err: null };
const viewerReady = new Promise((resolve, err) => {
  ViewerStore.resolve = resolve;
  ViewerStore.err = err;
});

const viewerAware = store => next => action => {
  if (action.type === 'VIEWER_MUTATION') {
    ViewerStore.resolve(action.payload.viewer);
  }
  if (action.type === 'VIEWER_ACCESS') {
    return viewerReady.then(viewer => {
      action.payload.func(viewer, store.dispatch, store.getState);
    });
  }
  return next(action);
};

const showUntilQueue = {};

const showUntil = store => next => action => {
  if (action.type === 'SHOW_UNTIL') {
    showUntilQueue[action.payload.type] = showUntilQueue[action.payload.type] ? showUntilQueue[action.payload.type] : [];
    showUntilQueue[action.payload.type].push(action.payload.name);
  }
  if (showUntilQueue[action.type]) {
    store.dispatch({ type: 'SHOW_UNTIL_REMOVED', payload: { names: showUntilQueue[action.type] } });
    showUntilQueue[action.type] = [];
  }
  return next(action);
};

/* harmony default export */ __webpack_exports__["a"] = ([logger, __WEBPACK_IMPORTED_MODULE_0_redux_thunk___default.a, viewerAware, showUntil]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../../node_modules/node-libs-browser/node_modules/process/browser.js */ 2)))

/***/ }),

/***/ 603:
/*!********************************************************!*\
  !*** ./packages/annotation-plugin-viewer/src/index.js ***!
  \********************************************************/
/*! exports provided: Component, provider, plugin, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer_plugin__ = __webpack_require__(/*! ./viewer.plugin */ 604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_provider__ = __webpack_require__(/*! ./viewer.provider */ 348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewer__ = __webpack_require__(/*! ./viewer */ 349);
/* unused harmony reexport Component */
/* unused harmony reexport provider */
/* unused harmony reexport plugin */






/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__viewer_plugin__["a" /* default */]);

/***/ }),

/***/ 604:
/*!****************************************************************!*\
  !*** ./packages/annotation-plugin-viewer/src/viewer.plugin.js ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ViewerPlugin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_plugin_core__ = __webpack_require__(/*! digirati-annotation-plugin-core */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__viewer_provider__ = __webpack_require__(/*! ./viewer.provider */ 348);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






function ViewerPlugin($el, _ref, store) {
  let {
    viewer,
    height,
    width,
    toggleable,
    showControls
  } = _ref,
      unknownProps = _objectWithoutProperties(_ref, ['viewer', 'height', 'width', 'toggleable', 'showControls']);

  __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_plugin_core__["b" /* utils */].unknownPropertyWarning(unknownProps);

  const image = {
    src: $el.querySelector('img').src,
    height: parseInt(height, 10) || 0,
    width: parseInt(width, 10) || 0
  };

  Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__viewer_provider__["a" /* default */], { toggleable: toggleable, showControls: showControls, selectedViewer: viewer, image: image, store: store }), $el);
}

/***/ }),

/***/ 628:
/*!**********************************************************!*\
  !*** ./packages/annotation-bridge/src/annotationBody.js ***!
  \**********************************************************/
/*! exports provided: tagClassForUri, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export tagClassForUri */
/**
 * This is a port of: https://github.com/digirati-co-uk/omeka-elucidate-module/blob/master/src/Domain/AnnotationBody.php
 */

/**
 * Parse and return the entity class for a given source URI.
 *
 * @param uri
 */
function tagClassForUri(uri) {
  if (!uri) {
    return null;
  }
  const regex = /\/topics\/(?:virtual:)?([A-Za-z_+-].+)\//;
  const matches = regex.exec(uri);
  if (!matches) {
    return null;
  }

  if (matches.length > 1) {
    return matches[1];
  } else {
    return null;
  }
}

class AnnotationBody {

  constructor(type = null, textualBody = null, source = null) {
    this.type = type;
    this.textualBody = textualBody;
    this.source = source;
  }

  static fromJsonLD(jsonLd) {
    return AnnotationBody.fromBody(jsonLd);
  }

  static fromBody(body) {
    if (!body) {
      return new AnnotationBody();
    }
    if (Object.prototype.toString.call(body) === '[object Object]' && body.value) {
      return new AnnotationBody(null, body['value']);
    }

    if (Object.prototype.toString.call(body) !== '[object Array]' || body.length === 0) {
      return new AnnotationBody();
    }

    const textualBody = body.filter(function (item) {
      return (item.type ? item.type : '').toLowerCase() === 'textualbody' || (item.type ? item.type : '').toLowerCase() === 'text';
    }) || null;

    const specificResource = body.filter(function (item) {
      return item.type === 'SpecificResource';
    }) || '';

    const source = specificResource && specificResource[0] ? specificResource[0]['source'] : null;
    const type = source ? tagClassForUri(source) : null;

    return new AnnotationBody(type, AnnotationBody.getFirstBody(textualBody), source);
  }

  static getFirstBody(textualBody) {
    if (Array.isArray(textualBody) && textualBody.length > 0 && textualBody[0] !== null) {
      return textualBody[0].value;
    }
    return {};
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnnotationBody;


/***/ }),

/***/ 630:
/*!****************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/openseadragon/utility.js ***!
  \****************************************************************************************/
/*! exports provided: isValidTileSource, getCanonicalImage, resolveRealTileSourceFromCanvas, resolveRealTileSource, createElement, withManifest */
/*! exports used: withManifest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isValidTileSource */
/* unused harmony export getCanonicalImage */
/* unused harmony export resolveRealTileSourceFromCanvas */
/* unused harmony export resolveRealTileSource */
/* unused harmony export createElement */
/* harmony export (immutable) */ __webpack_exports__["a"] = withManifest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_recompose__ = __webpack_require__(/*! recompose */ 92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





const style = __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default.a.block('osd-viewer');

function isValidTileSource(tileSource) {
  return !!(tileSource && tileSource['@context'] && tileSource['@id'] && tileSource.protocol === 'http://iiif.io/api/image' && tileSource.width && tileSource.height && tileSource.profile);
}

function getCanonicalImage(image) {
  if (image.substr(-9, 9) === 'info.json') {
    return image;
  }
  if (image.substr(-1, 1) === '/') {
    return `${image}info.json`;
  }
  return `${image}/info.json`;
}

function resolveRealTileSourceFromCanvas(canvas) {
  return resolveRealTileSource(canvas.images.map(image => image.resource.service || null).filter(e => e).pop());
}

function resolveRealTileSource(image) {
  if (isValidTileSource(image)) {
    return Promise.resolve(image);
  }

  if (image['@id']) {
    return fetch(getCanonicalImage(image['@id'])).then(r => r.json()).then(tileSource => isValidTileSource(tileSource) ? tileSource : null);
  }

  return Promise.resolve(null);
}

function createElement(isSelected, id, type) {
  const container = document.createElement('div');
  const $el = document.createElement('div');
  container.setAttribute('data-selected', isSelected);
  if (type) {
    container.setAttribute('data-selector-type', type);
  }
  container.id = `overlay-${id}`;
  $el.classList.add(...style.element('region-item').modifiers({ selected: isSelected }, false));
  container.appendChild($el);
  return container;
}

function withManifest(BaseComponent) {
  return Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["b" /* compose */])(Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["d" /* mapProps */])(props => _extends({
    regionIds: props.regions ? props.regions.map(region => region.id) : []
  }, props)), Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["c" /* lifecycle */])({
    componentWillMount() {
      const { canvas } = this.props;
      resolveRealTileSourceFromCanvas(canvas).then(tileSource => this.setState({ tileSource }));
    }
  }), Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["a" /* branch */])(({ tileSource }) => tileSource, Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["e" /* renderComponent */])(BaseComponent), Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["e" /* renderComponent */])(props => {
    if (props.resource) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: props.resource, style: { maxHeight: '80vh' } });
    }
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      'this? loading...'
    );
  })))(Object(__WEBPACK_IMPORTED_MODULE_1_recompose__["f" /* renderNothing */])());
}

/***/ }),

/***/ 631:
/*!***************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/openseadragon/viewer.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_openseadragon__ = __webpack_require__(/*! openseadragon */ 357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_openseadragon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_openseadragon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewer_scss__ = __webpack_require__(/*! ./viewer.scss */ 632);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__viewer_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__viewer_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ScaledImageViewer__ = __webpack_require__(/*! ../ScaledImageViewer */ 358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_recompose__ = __webpack_require__(/*! recompose */ 92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_digirati_bem_js__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };








const style = __WEBPACK_IMPORTED_MODULE_5_digirati_bem_js___default.a.block('osd-viewer');

class Viewer extends __WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.zoomIn = e => {
      e.preventDefault();
      this.viewer.viewport.zoomBy(1 / 0.7);
    }, this.zoomOut = e => {
      e.preventDefault();
      this.viewer.viewport.zoomBy(0.7);
    }, this.setRef = el => this.element = el, _temp;
  }

  asyncAddTile(args) {
    return new Promise((success, err) => {
      try {
        this.viewer.addTiledImage.call(this.viewer, _extends({ success }, args));
      } catch (e) {
        err(e);
      }
    });
  }

  createRelativePoint(x, y) {
    return this.viewer.viewport.viewerElementToImageCoordinates(new __WEBPACK_IMPORTED_MODULE_0_openseadragon___default.a.Point(x, y));
  }

  createViewportPoint(x, y) {
    return this.viewer.viewport.imageToViewerElementCoordinates(new __WEBPACK_IMPORTED_MODULE_0_openseadragon___default.a.Point(x, y));
  }

  getImageSize() {
    return {
      width: this.props.width,
      height: this.props.height
    };
  }

  componentDidMount() {
    const { getRef, setFallback, onImageLoaded, tileSource } = this.props;
    if (!tileSource) {
      console.error('Something went wrong, we cannot display the open sea dragon');
      setFallback(true);
    }
    this.viewer = new __WEBPACK_IMPORTED_MODULE_0_openseadragon___default.a({
      element: this.element,
      ajaxWithCredentials: false,
      showNavigator: true,
      showRotationControl: true,
      defaultZoomLevel: 0,
      maxZoomPixelRatio: 1,
      navigatorPosition: 'BOTTOM_RIGHT',
      animationTime: 0.3,
      immediateRender: true,
      preserveViewport: true,
      blendTime: 0.1,
      minPixelRatio: 0.5,
      visibilityRatio: 0.65,
      constrainDuringPan: false,
      showSequenceControl: false,
      showNavigationControl: false,
      showZoomControl: true,
      showHomeControl: false,
      showFullPageControl: false,
      sequenceMode: true,
      prefixUrl: 'http://zimeon.github.io/iiif-dragndrop/openseadragon/images/'
    });
    if (getRef) {
      getRef(this);
    }

    this.asyncAddTile({ tileSource }).then(e => {
      this.viewer.viewport.goHome(true);
      if (onImageLoaded) {
        onImageLoaded(this.viewer, e);
      }
    });
  }

  render() {
    const { height, fallback, width, maxHeight = Infinity, scale, showControls } = this.props;

    if (fallback) {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__ScaledImageViewer__["a" /* default */], this.props);
    }

    const actualHeight = height * scale < maxHeight ? height * scale : maxHeight;
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { className: style, style: { position: 'relative' } },
      showControls ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: style.element('controls') },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { onClick: this.zoomIn, className: style.element('control').modifier('plus') },
          `+`
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { onClick: this.zoomOut, className: style.element('control').modifier('minus') },
          `-`
        )
      ) : null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { ref: this.setRef, style: { height: actualHeight, width: width * scale } })
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_4_recompose__["g" /* withState */])('fallback', 'setFallback', false)(Viewer));

/***/ }),

/***/ 632:
/*!*****************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/openseadragon/viewer.scss ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../../node_modules/css-loader?importLoaders=1!../../../../../../node_modules/sass-loader/lib/loader.js!./viewer.scss */ 633);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../../node_modules/sass-loader/lib/loader.js!./viewer.scss", function() {
			var newContent = require("!!../../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../../node_modules/sass-loader/lib/loader.js!./viewer.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 633:
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/viewers/openseadragon/viewer.scss ***!
  \****************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".osd-viewer__region-item {\n  height: 100%;\n  width: 100%;\n  border: 1px solid #FFF;\n  background-color: rgba(255, 255, 255, 0.3); }\n  .osd-viewer__region-item--selected {\n    border-width: 3px; }\n  .osd-viewer__region-item--editing {\n    opacity: .1; }\n\n.osd-viewer__controls {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  padding: 10px;\n  z-index: 999; }\n\n.osd-viewer__control {\n  user-select: none;\n  cursor: pointer;\n  border-radius: 1px;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n  text-align: center;\n  display: inline-block;\n  color: #fff;\n  margin: 5px;\n  background: rgba(0, 0, 0, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.8); }\n", ""]);

// exports


/***/ }),

/***/ 634:
/*!************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/StaticImageView.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./StaticImageView.scss */ 635);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./StaticImageView.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./StaticImageView.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 635:
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/viewers/StaticImageView.scss ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".static-image-viewer--scaled {\n  border: 1px solid #000; }\n\n.static-image-viewer__regions {\n  position: relative; }\n\n.static-image-viewer__image {\n  pointer-events: none; }\n  .static-image-viewer__image::selection {\n    color: transparent;\n    background-color: transparent; }\n\n.static-image-viewer__region-item {\n  position: absolute;\n  border: 1px solid #FFF;\n  background-color: rgba(255, 255, 255, 0.3); }\n  .static-image-viewer__region-item--selected {\n    border-width: 3px; }\n  .static-image-viewer__region-item--editing {\n    opacity: .1; }\n", ""]);

// exports


/***/ }),

/***/ 636:
/*!*******************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/openseadragon/withCanvas.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = withCanvas;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_openseadragon__ = __webpack_require__(/*! openseadragon */ 357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_openseadragon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_openseadragon__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    pointerEvents: 'none',
    overflow: 'hidden'
  },

  canvas: (transform, height, width) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    transformOrigin: 'left top',
    pointerEvents: 'none',
    transform,
    height,
    width
  })
};

function withCanvas(WrappedComponent) {

  return class extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.state = {
        transform: null,
        scale: 3
      }, _temp;
    }

    componentDidMount() {
      if (this.viewer) {
        this.bindEvents(this.viewer);
      }
    }

    bindEvents(viewer) {
      viewer.addHandler('update-viewport', () => this.resize(viewer));
      viewer.addHandler('open', () => this.resize(viewer));
      this.resize(viewer);
    }

    resize(viewer) {
      const firstImage = viewer.world.getItemAt(0);
      if (!firstImage) {
        return;
      }
      const imgWidth = firstImage.source.dimensions.x;
      const imgHeight = firstImage.source.dimensions.y;
      const imgAspectRatio = imgWidth / imgHeight;
      const boundsRect = viewer.viewport.getBounds(true);
      const viewportOrigin = new __WEBPACK_IMPORTED_MODULE_2_openseadragon___default.a.Point(boundsRect.x, boundsRect.y * imgAspectRatio);

      const viewportWidth = boundsRect.width;
      const viewportHeight = boundsRect.height * imgAspectRatio;

      // Redraw
      const viewportZoom = viewer.viewport.getZoom(true);
      const zoom = firstImage.viewportToImageZoom(viewportZoom);
      const rotation = viewer.viewport.getRotation();

      const x = (viewportOrigin.x / imgWidth - viewportOrigin.x) / viewportWidth * viewer.container.clientWidth;
      const y = (viewportOrigin.y / imgHeight - viewportOrigin.y) / viewportHeight * viewer.container.clientHeight;

      if (this.viewer) {

        // Set position for parents.
        if (this.props.getPosition) {
          this.props.getPosition({
            x, y, zoom, scale: this.state.scale, rotation
          });
        }

        // Set state for transform.
        this.setState(() => ({
          canvasScale: this.state.scale * zoom,
          transform: `translate(${x}px,${y}px) scale(${zoom * this.state.scale}) rotate(${rotation})`
        }));
      }
    }

    setViewer(viewer, onImageLoaded) {
      if (this.viewer) {
        return;
      }
      this.viewer = viewer;
      if (onImageLoaded) {
        onImageLoaded(viewer);
      }
      this.bindEvents(viewer);
    }

    transformOut(_ref) {
      let { x, y, height, width } = _ref,
          props = _objectWithoutProperties(_ref, ['x', 'y', 'height', 'width']);

      const { scale } = this.state;
      return _extends({
        width: width * scale,
        height: height * scale,
        x: x * scale,
        y: y * scale
      }, props);
    }

    transformIn(_ref2) {
      let { x, y, defaultX, defaultY, height, width, onChange, onUpdate, onCommit, onClick } = _ref2,
          props = _objectWithoutProperties(_ref2, ['x', 'y', 'defaultX', 'defaultY', 'height', 'width', 'onChange', 'onUpdate', 'onCommit', 'onClick']);

      const { scale, canvasScale } = this.state;
      return _extends({
        width: width / scale,
        height: height / scale,
        x: x / scale,
        y: y / scale,
        defaultX: defaultX / scale,
        defaultY: defaultY / scale,
        onChange: onChange ? e => onChange(this.transformOut(e)) : null,
        onUpdate: onUpdate ? e => onUpdate(this.transformOut(e)) : null,
        onCommit: onCommit ? e => onCommit(this.transformOut(e)) : null,
        onClick: onClick ? e => onClick(this.transformOut(e)) : null,
        canvasScale
      }, props);
    }

    render() {
      const { scale, transform, canvasScale } = this.state;
      const _props = this.props,
            { children, onImageLoaded } = _props,
            props = _objectWithoutProperties(_props, ['children', 'onImageLoaded']);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: { position: 'relative' } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, _extends({ canvasScale: canvasScale, onImageLoaded: viewer => this.setViewer(viewer, onImageLoaded) }, props)),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { style: Object.assign({}, styles.container, {
              right: 0,
              bottom: 0
              // width: this.props.width / scale,
              // height: this.props.height / scale,
            }), ref: el => this.container = el },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { id: 'withCanvas', style: styles.canvas(transform, this.props.height / scale, this.props.width / scale) },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.map(children, child => child ? child.props && (child.props.x && child.props.y || child.props.defaultX && child.props.defaultY) ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.cloneElement(child, this.transformIn({
              width: child.props.width,
              height: child.props.height,
              x: child.props.x,
              defaultX: child.props.defaultX,
              defaultY: child.props.defaultY,
              onChange: child.props.onChange,
              onUpdate: child.props.onUpdate,
              onCommit: child.props.onCommit,
              onClick: child.props.onClick,
              y: child.props.y
            })) : child : null)
          )
        )
      );
    }
  };
}

/***/ }),

/***/ 637:
/*!********************************************************************************!*\
  !*** ./packages/annotation-components/src/components/selectors/BoxSelector.js ***!
  \********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_rnd__ = __webpack_require__(/*! react-rnd */ 638);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_rnd___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_rnd__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectorPropTypes__ = __webpack_require__(/*! ./_selectorPropTypes */ 361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__BoxSelector_scss__ = __webpack_require__(/*! ./BoxSelector.scss */ 642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__BoxSelector_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__BoxSelector_scss__);






const style = __WEBPACK_IMPORTED_MODULE_3_digirati_bem_js___default.a.block('box-selector');

class BoxSelector extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  // static propTypes = {
  //   ...selectorPropTypes,
  //   onUpdate: PropTypes.func.isRequired,
  // };

  updateHeightWidth() {
    this.props.onUpdate({
      height: this.rnd.resizable.state.height,
      width: this.rnd.resizable.state.width,
      y: this.rnd.state.y,
      x: this.rnd.state.x
    });
  }

  save() {
    this.props.onSave({
      height: this.rnd.resizable.state.height,
      width: this.rnd.resizable.state.width,
      y: this.rnd.state.y,
      x: this.rnd.state.x
    });
  }

  getInitialPosition() {
    const { x, y, height, width } = this.props;

    return {
      x: x ? x > 0 ? x : 0 : 100,
      y: y ? y > 0 ? y : 0 : 100,
      width: width ? width : 100,
      height: height ? height : 100
    };
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_1_react_rnd___default.a,
      { ref: c => this.rnd = c,
        initial: this.getInitialPosition(),
        onResizeStop: () => this.updateHeightWidth(),
        onDragStop: () => this.updateHeightWidth(),
        className: style,
        bounds: 'parent' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        { style: { color: '#000' } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          { className: style.element('button'), onClick: e => this.save() },
          'Save'
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BoxSelector);

/***/ }),

/***/ 642:
/*!**********************************************************************************!*\
  !*** ./packages/annotation-components/src/components/selectors/BoxSelector.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./BoxSelector.scss */ 643);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./BoxSelector.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./BoxSelector.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 643:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/selectors/BoxSelector.scss ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".box-selector {\n  border: 2px dashed blueviolet;\n  padding: 0.5rem 1rem;\n  cursor: move;\n  background: rgba(255, 255, 255, 0.3);\n  pointer-events: auto; }\n  .box-selector__button {\n    top: 100%;\n    margin-top: 10px;\n    right: 0;\n    position: absolute; }\n", ""]);

// exports


/***/ }),

/***/ 644:
/*!********************************************************************************!*\
  !*** ./packages/annotation-components/src/components/selectors/PinSelector.js ***!
  \********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PinSelector_scss__ = __webpack_require__(/*! ./PinSelector.scss */ 645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PinSelector_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__PinSelector_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__viewers_openseadragon_withDraggable__ = __webpack_require__(/*! ../viewers/openseadragon/withDraggable */ 647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__viewers_openseadragon_withFixedScale__ = __webpack_require__(/*! ../viewers/openseadragon/withFixedScale */ 649);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







const $pin = __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default.a.block('pin-selector');

class PinSelector extends __WEBPACK_IMPORTED_MODULE_1_react__["Component"] {

  render() {
    const { x, y, style } = this.props;
    return x && y ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { className: $pin.element('icon'),
      style: _extends({ top: y - 17, left: x - 17, pointerEvents: 'auto' }, style) }) : __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', null);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_3__viewers_openseadragon_withDraggable__["a" /* default */])(Object(__WEBPACK_IMPORTED_MODULE_4__viewers_openseadragon_withFixedScale__["a" /* default */])(PinSelector)));

/***/ }),

/***/ 645:
/*!**********************************************************************************!*\
  !*** ./packages/annotation-components/src/components/selectors/PinSelector.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./PinSelector.scss */ 646);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./PinSelector.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./PinSelector.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 646:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/selectors/PinSelector.scss ***!
  \*********************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".pin-selector {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 10;\n  cursor: crosshair; }\n  .pin-selector__icon {\n    position: absolute;\n    width: 3px;\n    height: 3px;\n    border-radius: 17px;\n    background: #FFF;\n    background-clip: content-box;\n    border: 16px solid rgba(66, 133, 244, 0.3); }\n  .pin-selector__image {\n    position: absolute;\n    top: -15px;\n    left: -6px; }\n  .pin-selector__edit {\n    position: absolute;\n    top: -50px;\n    pointer-events: initial; }\n", ""]);

// exports


/***/ }),

/***/ 647:
/*!**********************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/openseadragon/withDraggable.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = withDraggable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patches_react_draggable__ = __webpack_require__(/*! ../../../patches/react-draggable */ 648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__patches_react_draggable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__patches_react_draggable__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




function withDraggable(WrappedComponent) {

  return class extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.state = {
        x: 0,
        y: 0
      }, this.onDrag = (e, { deltaX, deltaY }) => this.setState(() => ({
        x: this.state.x + deltaX,
        y: this.state.y + deltaY
      })), this.onStop = () => {
        this.props.onUpdate({
          x: this.props.x + this.state.x,
          y: this.props.y + this.state.y
        });
        this.setState({
          x: 0,
          y: 0
        });
      }, _temp;
    }

    render() {
      const { canvasScale, drag = false } = this.props;

      if (drag === false) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, this.props);
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1__patches_react_draggable___default.a,
        {
          scale: canvasScale,
          position: { x: 0, y: 0 },
          grid: [1, 1],
          onDrag: this.onDrag,
          onStop: this.onStop
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { style: { pointerEvents: 'auto', zIndex: 999999 } },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, _extends({}, this.props, { onUpdate: null }))
        )
      );
    }

  };
}

/***/ }),

/***/ 648:
/*!***********************************************************************!*\
  !*** ./packages/annotation-components/src/patches/react-draggable.js ***!
  \***********************************************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
  if (true) module.exports = factory(__webpack_require__(/*! react */ 1), __webpack_require__(/*! react-dom */ 11));else if (typeof define === 'function' && define.amd) define(["react", "react-dom"], factory);else if (typeof exports === 'object') exports["ReactDraggable"] = factory(require("react"), require("react-dom"));else root["ReactDraggable"] = factory(root["React"], root["ReactDOM"]);
})(this, function (__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
  return (/******/function (modules) {
      // webpackBootstrap
      /******/ // The module cache
      /******/var installedModules = {};
      /******/
      /******/ // The require function
      /******/function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/if (installedModules[moduleId])
          /******/return installedModules[moduleId].exports;
        /******/
        /******/ // Create a new module (and put it into the cache)
        /******/var module = installedModules[moduleId] = {
          /******/exports: {},
          /******/id: moduleId,
          /******/loaded: false
          /******/ };
        /******/
        /******/ // Execute the module function
        /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/module.loaded = true;
        /******/
        /******/ // Return the exports of the module
        /******/return module.exports;
        /******/
      }
      /******/
      /******/
      /******/ // expose the modules object (__webpack_modules__)
      /******/__webpack_require__.m = modules;
      /******/
      /******/ // expose the module cache
      /******/__webpack_require__.c = installedModules;
      /******/
      /******/ // __webpack_public_path__
      /******/__webpack_require__.p = "";
      /******/
      /******/ // Load entry module and return exports
      /******/return __webpack_require__(0);
      /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

      'use strict';

      module.exports = __webpack_require__(1).default;
      module.exports.DraggableCore = __webpack_require__(9).default;

      /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }return target;
      };

      var _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;_e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }return _arr;
        }return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _react = __webpack_require__(2);

      var _react2 = _interopRequireDefault(_react);

      var _reactDom = __webpack_require__(3);

      var _reactDom2 = _interopRequireDefault(_reactDom);

      var _classnames = __webpack_require__(4);

      var _classnames2 = _interopRequireDefault(_classnames);

      var _domFns = __webpack_require__(5);

      var _positionFns = __webpack_require__(8);

      var _shims = __webpack_require__(6);

      var _DraggableCore = __webpack_require__(9);

      var _DraggableCore2 = _interopRequireDefault(_DraggableCore);

      var _log = __webpack_require__(11);

      var _log2 = _interopRequireDefault(_log);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }return obj;
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function _possibleConstructorReturn(self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && (typeof call === "object" || typeof call === "function") ? call : self;
      }

      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      }
      // $FlowIgnore


      /*:: import type {DraggableEventHandler} from './utils/types';*/
      /*:: type DraggableState = {
       dragging: boolean,
       dragged: boolean,
       x: number, y: number,
       slackX: number, slackY: number,
       isElementSVG: boolean
       };*/

      //
      // Define <Draggable>
      //

      /*:: type ConstructorProps = {
       position: { x: number, y: number },
       defaultPosition: { x: number, y: number }
       };*/

      var Draggable = function (_React$Component) {
        _inherits(Draggable, _React$Component);

        function Draggable(props /*: ConstructorProps*/) {
          _classCallCheck(this, Draggable);

          var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));

          _this.onDragStart = function (e, coreData) {
            (0, _log2.default)('Draggable: onDragStart: %j', coreData);

            // Short-circuit if user's callback killed it.
            var shouldStart = _this.props.onStart(e, (0, _positionFns.createDraggableData)(_this, coreData));
            // Kills start event on core as well, so move handlers are never bound.
            if (shouldStart === false) return false;

            _this.setState({ dragging: true, dragged: true });
          };

          _this.onDrag = function (e, coreData) {
            if (!_this.state.dragging) return false;
            (0, _log2.default)('Draggable: onDrag: %j', coreData);

            var uiData = (0, _positionFns.createDraggableData)(_this, coreData);

            var newState /*: $Shape<DraggableState>*/ = {
              x: uiData.x,
              y: uiData.y
            };

            // Keep within bounds.
            if (_this.props.bounds) {
              // Save original x and y.
              var _x = newState.x,
                  _y = newState.y;

              // Add slack to the values used to calculate bound position. This will ensure that if
              // we start removing slack, the element won't react to it right away until it's been
              // completely removed.

              newState.x += _this.state.slackX;
              newState.y += _this.state.slackY;

              // Get bound position. This will ceil/floor the x and y within the boundaries.
              // $FlowBug

              // Recalculate slack by noting how much was shaved by the boundPosition handler.
              var _getBoundPosition = (0, _positionFns.getBoundPosition)(_this, newState.x, newState.y);

              var _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2);

              newState.x = _getBoundPosition2[0];
              newState.y = _getBoundPosition2[1];
              newState.slackX = _this.state.slackX + (_x - newState.x);
              newState.slackY = _this.state.slackY + (_y - newState.y);

              // Update the event we fire to reflect what really happened after bounds took effect.
              uiData.x = _x;
              uiData.y = _y;
              uiData.deltaX = newState.x - _this.state.x;
              uiData.deltaY = newState.y - _this.state.y;
            }

            // Short-circuit if user's callback killed it.
            var shouldUpdate = _this.props.onDrag(e, uiData);
            if (shouldUpdate === false) return false;

            _this.setState(newState);
          };

          _this.onDragStop = function (e, coreData) {
            if (!_this.state.dragging) return false;

            // Short-circuit if user's callback killed it.
            var shouldStop = _this.props.onStop(e, (0, _positionFns.createDraggableData)(_this, coreData));
            if (shouldStop === false) return false;

            (0, _log2.default)('Draggable: onDragStop: %j', coreData);

            var newState /*: $Shape<DraggableState>*/ = {
              dragging: false,
              slackX: 0,
              slackY: 0
            };

            // If this is a controlled component, the result of this operation will be to
            // revert back to the old position. We expect a handler on `onDragStop`, at the least.
            var controlled = Boolean(_this.props.position);
            if (controlled) {
              var _this$props$position = _this.props.position,
                  _x2 = _this$props$position.x,
                  _y2 = _this$props$position.y;

              newState.x = _x2;
              newState.y = _y2;
            }

            _this.setState(newState);
          };

          _this.state = {
            // Whether or not we are currently dragging.
            dragging: false,

            // Whether or not we have been dragged before.
            dragged: false,

            // Current transform x and y.
            x: props.position ? props.position.x : props.defaultPosition.x,
            y: props.position ? props.position.y : props.defaultPosition.y,

            // Used for compensating for out-of-bounds drags
            slackX: 0, slackY: 0,

            // Can only determine if SVG after mounting
            isElementSVG: false
          };
          return _this;
        }

        _createClass(Draggable, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            if (this.props.position && !(this.props.onDrag || this.props.onStop)) {
              // eslint-disable-next-line
              console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
            }
          }
        }, {
          key: 'componentDidMount',
          value: function componentDidMount() {
            // Check to see if the element passed is an instanceof SVGElement
            if (typeof SVGElement !== 'undefined' && _reactDom2.default.findDOMNode(this) instanceof SVGElement) {
              this.setState({ isElementSVG: true });
            }
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps /*: Object*/) {
            // Set x/y if position has changed
            if (nextProps.position && (!this.props.position || nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y)) {
              this.setState({ x: nextProps.position.x, y: nextProps.position.y });
            }
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            this.setState({ dragging: false }); // prevents invariant if unmounted while dragging
          }
        }, {
          key: 'render',
          value: function render() /*: React.Element<any>*/{
            var _classNames;

            var style = {},
                svgTransform = null;

            // If this is controlled, we don't want to move it - unless it's dragging.
            var controlled = Boolean(this.props.position);
            var draggable = !controlled || this.state.dragging;

            var position = this.props.position || this.props.defaultPosition;
            var transformOpts = {
              // Set left if horizontal drag is enabled
              x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : position.x,

              // Set top if vertical drag is enabled
              y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : position.y
            };

            // If this element was SVG, we use the `transform` attribute.
            if (this.state.isElementSVG) {
              svgTransform = (0, _domFns.createSVGTransform)(transformOpts);
            } else {
              // Add a CSS transform to move the element around. This allows us to move the element around
              // without worrying about whether or not it is relatively or absolutely positioned.
              // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
              // has a clean slate.
              style = (0, _domFns.createCSSTransform)(transformOpts);
            }

            var _props = this.props,
                defaultClassName = _props.defaultClassName,
                defaultClassNameDragging = _props.defaultClassNameDragging,
                defaultClassNameDragged = _props.defaultClassNameDragged;

            // Mark with class while dragging

            var className = (0, _classnames2.default)(this.props.children.props.className || '', defaultClassName, (_classNames = {}, _defineProperty(_classNames, defaultClassNameDragging, this.state.dragging), _defineProperty(_classNames, defaultClassNameDragged, this.state.dragged), _classNames));

            // Reuse the child provided
            // This makes it flexible to use whatever element is wanted (div, ul, etc)
            return _react2.default.createElement(_DraggableCore2.default, _extends({}, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }), _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
              className: className,
              style: _extends({}, this.props.children.props.style, style),
              transform: svgTransform
            }));
          }
        }]);

        return Draggable;
      }(_react2.default.Component);

      Draggable.displayName = 'Draggable';
      Draggable.propTypes = _extends({}, _DraggableCore2.default.propTypes, {

        /**
         * `axis` determines which axis the draggable can move.
         *
         *  Note that all callbacks will still return data as normal. This only
         *  controls flushing to the DOM.
         *
         * 'both' allows movement horizontally and vertically.
         * 'x' limits movement to horizontal axis.
         * 'y' limits movement to vertical axis.
         * 'none' limits all movement.
         *
         * Defaults to 'both'.
         */
        axis: _react.PropTypes.oneOf(['both', 'x', 'y', 'none']),

        /**
         * `bounds` determines the range of movement available to the element.
         * Available values are:
         *
         * 'parent' restricts movement within the Draggable's parent node.
         *
         * Alternatively, pass an object with the following properties, all of which are optional:
         *
         * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
         *
         * All values are in px.
         *
         * Example:
         *
         * ```jsx
         *   let App = React.createClass({
        *       render: function () {
        *         return (
        *            <Draggable bounds={{right: 300, bottom: 300}}>
        *              <div>Content</div>
        *           </Draggable>
        *         );
        *       }
        *   });
         * ```
         */
        bounds: _react.PropTypes.oneOfType([_react.PropTypes.shape({
          left: _react.PropTypes.number,
          right: _react.PropTypes.number,
          top: _react.PropTypes.number,
          bottom: _react.PropTypes.number
        }), _react.PropTypes.string, _react.PropTypes.oneOf([false])]),

        defaultClassName: _react.PropTypes.string,
        defaultClassNameDragging: _react.PropTypes.string,
        defaultClassNameDragged: _react.PropTypes.string,

        /**
         * `defaultPosition` specifies the x and y that the dragged item should start at
         *
         * Example:
         *
         * ```jsx
         *      let App = React.createClass({
        *          render: function () {
        *              return (
        *                  <Draggable defaultPosition={{x: 25, y: 25}}>
        *                      <div>I start with transformX: 25px and transformY: 25px;</div>
        *                  </Draggable>
        *              );
        *          }
        *      });
         * ```
         */
        defaultPosition: _react.PropTypes.shape({
          x: _react.PropTypes.number,
          y: _react.PropTypes.number
        }),

        /**
         * `position`, if present, defines the current position of the element.
         *
         *  This is similar to how form elements in React work - if no `position` is supplied, the component
         *  is uncontrolled.
         *
         * Example:
         *
         * ```jsx
         *      let App = React.createClass({
        *          render: function () {
        *              return (
        *                  <Draggable position={{x: 25, y: 25}}>
        *                      <div>I start with transformX: 25px and transformY: 25px;</div>
        *                  </Draggable>
        *              );
        *          }
        *      });
         * ```
         */
        position: _react.PropTypes.shape({
          x: _react.PropTypes.number,
          y: _react.PropTypes.number
        }),

        /**
         * These properties should be defined on the child, not here.
         */
        className: _shims.dontSetMe,
        style: _shims.dontSetMe,
        transform: _shims.dontSetMe
      });
      Draggable.defaultProps = _extends({}, _DraggableCore2.default.defaultProps, {
        axis: 'both',
        bounds: false,
        defaultClassName: 'react-draggable',
        defaultClassNameDragging: 'react-draggable-dragging',
        defaultClassNameDragged: 'react-draggable-dragged',
        defaultPosition: { x: 0, y: 0 },
        position: null,
        scale: 1
      });
      exports.default = Draggable;

      /***/
    },
    /* 2 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

      /***/
    },
    /* 3 */
    /***/function (module, exports) {

      module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

      /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

      var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__; /*!
                                                                       Copyright (c) 2016 Jed Watson.
                                                                       Licensed under the MIT License (MIT), see
                                                                       http://jedwatson.github.io/classnames
                                                                       */
      /* global define */

      (function () {
        'use strict';

        var hasOwn = {}.hasOwnProperty;

        function classNames() {
          var classes = [];

          for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (!arg) continue;

            var argType = typeof arg;

            if (argType === 'string' || argType === 'number') {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              classes.push(classNames.apply(null, arg));
            } else if (argType === 'object') {
              for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                  classes.push(key);
                }
              }
            }
          }

          return classes.join(' ');
        }

        if (typeof module !== 'undefined' && module.exports) {
          module.exports = classNames;
        } else if (true) {
          // register as 'classnames', consistent with npm package name
          !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return classNames;
          }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {
          window.classNames = classNames;
        }
      })();

      /***/
    },
    /* 5 */
    /***/function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }return target;
      };

      exports.matchesSelector = matchesSelector;
      exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
      exports.addEvent = addEvent;
      exports.removeEvent = removeEvent;
      exports.outerHeight = outerHeight;
      exports.outerWidth = outerWidth;
      exports.innerHeight = innerHeight;
      exports.innerWidth = innerWidth;
      exports.offsetXYFromParent = offsetXYFromParent;
      exports.createCSSTransform = createCSSTransform;
      exports.createSVGTransform = createSVGTransform;
      exports.getTouch = getTouch;
      exports.getTouchIdentifier = getTouchIdentifier;
      exports.addUserSelectStyles = addUserSelectStyles;
      exports.removeUserSelectStyles = removeUserSelectStyles;
      exports.styleHacks = styleHacks;

      var _shims = __webpack_require__(6);

      var _getPrefix = __webpack_require__(7);

      var _getPrefix2 = _interopRequireDefault(_getPrefix);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }return obj;
      }

      /*:: import type {ControlPosition} from './types';*/

      var matchesSelectorFunc = '';
      function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/{
        if (!matchesSelectorFunc) {
          matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
            // $FlowIgnore: Doesn't think elements are indexable
            return (0, _shims.isFunction)(el[method]);
          });
        }

        // $FlowIgnore: Doesn't think elements are indexable
        return el[matchesSelectorFunc].call(el, selector);
      }

      // Works up the tree to the draggable itself attempting to match selector.
      function matchesSelectorAndParentsTo(el /*: Node*/, selector /*: string*/, baseNode /*: Node*/) /*: boolean*/{
        var node = el;
        do {
          if (matchesSelector(node, selector)) return true;
          if (node === baseNode) return false;
          node = node.parentNode;
        } while (node);

        return false;
      }

      function addEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/{
        if (!el) {
          return;
        }
        if (el.attachEvent) {
          el.attachEvent('on' + event, handler);
        } else if (el.addEventListener) {
          el.addEventListener(event, handler, true);
        } else {
          // $FlowIgnore: Doesn't think elements are indexable
          el['on' + event] = handler;
        }
      }

      function removeEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/{
        if (!el) {
          return;
        }
        if (el.detachEvent) {
          el.detachEvent('on' + event, handler);
        } else if (el.removeEventListener) {
          el.removeEventListener(event, handler, true);
        } else {
          // $FlowIgnore: Doesn't think elements are indexable
          el['on' + event] = null;
        }
      }

      function outerHeight(node /*: HTMLElement*/) /*: number*/{
        // This is deliberately excluding margin for our calculations, since we are using
        // offsetTop which is including margin. See getBoundPosition
        var height = node.clientHeight;
        var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
        height += (0, _shims.int)(computedStyle.borderTopWidth);
        height += (0, _shims.int)(computedStyle.borderBottomWidth);
        return height;
      }

      function outerWidth(node /*: HTMLElement*/) /*: number*/{
        // This is deliberately excluding margin for our calculations, since we are using
        // offsetLeft which is including margin. See getBoundPosition
        var width = node.clientWidth;
        var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
        width += (0, _shims.int)(computedStyle.borderLeftWidth);
        width += (0, _shims.int)(computedStyle.borderRightWidth);
        return width;
      }
      function innerHeight(node /*: HTMLElement*/) /*: number*/{
        var height = node.clientHeight;
        var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
        height -= (0, _shims.int)(computedStyle.paddingTop);
        height -= (0, _shims.int)(computedStyle.paddingBottom);
        return height;
      }

      function innerWidth(node /*: HTMLElement*/) /*: number*/{
        var width = node.clientWidth;
        var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
        width -= (0, _shims.int)(computedStyle.paddingLeft);
        width -= (0, _shims.int)(computedStyle.paddingRight);
        return width;
      }

      // Get from offsetParent
      function offsetXYFromParent(evt /*: {clientX: number, clientY: number}*/, offsetParent /*: HTMLElement*/) /*: ControlPosition*/{
        var isBody = offsetParent === offsetParent.ownerDocument.body;
        var offsetParentRect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect();

        var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
        var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

        return { x: x, y: y };
      }

      function createCSSTransform(_ref) /*: Object*/{
        var x = _ref.x,
            y = _ref.y;

        // Replace unitless items with px
        return _defineProperty({}, (0, _getPrefix.browserPrefixToKey)('transform', _getPrefix2.default), 'translate(' + x + 'px,' + y + 'px)');
      }

      function createSVGTransform(_ref3) /*: string*/{
        var x = _ref3.x,
            y = _ref3.y;

        return 'translate(' + x + ',' + y + ')';
      }

      function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{clientX: number, clientY: number}*/{
        return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, function (t) {
          return identifier === t.identifier;
        }) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, function (t) {
          return identifier === t.identifier;
        });
      }

      function getTouchIdentifier(e /*: MouseTouchEvent*/) /*: ?number*/{
        if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
        if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
      }

      // User-select Hacks:
      //
      // Useful for preventing blue highlights all over everything when dragging.
      var userSelectPrefix = (0, _getPrefix.getPrefix)('user-select');
      var userSelect = (0, _getPrefix.browserPrefixToStyle)('user-select', userSelectPrefix);
      var userSelectStyle = ';' + userSelect + ': none;';
      var userSelectReplaceRegExp = new RegExp(';?' + userSelect + ': none;'); // leading ; not present on IE

      // Note we're passing `document` b/c we could be iframed
      function addUserSelectStyles(body /*: HTMLElement*/) {
        var style = body.getAttribute('style') || '';
        body.setAttribute('style', style + userSelectStyle);
      }

      function removeUserSelectStyles(body /*: HTMLElement*/) {
        var style = body.getAttribute('style') || '';
        body.setAttribute('style', style.replace(userSelectReplaceRegExp, ''));
      }

      function styleHacks() /*: Object*/{
        var childStyle /*: Object*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        // Workaround IE pointer events; see #51
        // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
        return _extends({
          touchAction: 'none'
        }, childStyle);
      }

      /***/
    },
    /* 6 */
    /***/function (module, exports) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.findInArray = findInArray;
      exports.isFunction = isFunction;
      exports.isNum = isNum;
      exports.int = int;
      exports.dontSetMe = dontSetMe;

      // @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
      function findInArray(array /*: Array<any> | TouchList*/, callback /*: Function*/) /*: any*/{
        for (var i = 0, length = array.length; i < length; i++) {
          if (callback.apply(callback, [array[i], i, array])) return array[i];
        }
      }

      function isFunction(func /*: any*/) /*: boolean*/{
        return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
      }

      function isNum(num /*: any*/) /*: boolean*/{
        return typeof num === 'number' && !isNaN(num);
      }

      function int(a /*: string*/) /*: number*/{
        return parseInt(a, 10);
      }

      function dontSetMe(props /*: Object*/, propName /*: string*/, componentName /*: string*/) {
        if (props[propName]) {
          return new Error('Invalid prop ' + propName + ' passed to ' + componentName + ' - do not set this, set it on the child.');
        }
      }

      /***/
    },
    /* 7 */
    /***/function (module, exports) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getPrefix = getPrefix;
      exports.browserPrefixToKey = browserPrefixToKey;
      exports.browserPrefixToStyle = browserPrefixToStyle;
      var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
      function getPrefix() /*: string*/{
        var prop /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

        // Checking specifically for 'window.document' is for pseudo-browser server-side
        // environments that define 'window' as the global context.
        // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
        if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

        var style = window.document.documentElement.style;

        if (prop in style) return '';

        for (var i = 0; i < prefixes.length; i++) {
          if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
        }

        return '';
      }

      function browserPrefixToKey(prop /*: string*/, prefix /*: string*/) /*: string*/{
        return prefix ? '' + prefix + kebabToTitleCase(prop) : prop;
      }

      function browserPrefixToStyle(prop /*: string*/, prefix /*: string*/) /*: string*/{
        return prefix ? '-' + prefix.toLowerCase() + '-' + prop : prop;
      }

      function kebabToTitleCase(str /*: string*/) /*: string*/{
        var out = '';
        var shouldCapitalize = true;
        for (var i = 0; i < str.length; i++) {
          if (shouldCapitalize) {
            out += str[i].toUpperCase();
            shouldCapitalize = false;
          } else if (str[i] === '-') {
            shouldCapitalize = true;
          } else {
            out += str[i];
          }
        }
        return out;
      }

      // Default export is the prefix itself, like 'Moz', 'Webkit', etc
      // Note that you may have to re-test for certain things; for instance, Chrome 50
      // can handle unprefixed `transform`, but not unprefixed `user-select`
      exports.default = getPrefix();

      /***/
    },
    /* 8 */
    /***/function (module, exports, __webpack_require__) {

      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getBoundPosition = getBoundPosition;
      exports.snapToGrid = snapToGrid;
      exports.canDragX = canDragX;
      exports.canDragY = canDragY;
      exports.getControlPosition = getControlPosition;
      exports.createCoreData = createCoreData;
      exports.createDraggableData = createDraggableData;

      var _shims = __webpack_require__(6);

      var _reactDom = __webpack_require__(3);

      var _reactDom2 = _interopRequireDefault(_reactDom);

      var _domFns = __webpack_require__(5);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      /*:: import type Draggable from '../Draggable';*/
      /*:: import type {Bounds, ControlPosition, DraggableData} from './types';*/
      /*:: import type DraggableCore from '../DraggableCore';*/
      function getBoundPosition(draggable /*: Draggable*/, x /*: number*/, y /*: number*/) /*: [number, number]*/{
        // If no bounds, short-circuit and move on
        if (!draggable.props.bounds) return [x, y];

        // Clone new bounds
        var bounds = draggable.props.bounds;

        bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
        var node = _reactDom2.default.findDOMNode(draggable);

        if (typeof bounds === 'string') {
          var ownerDocument = node.ownerDocument;

          var ownerWindow = ownerDocument.defaultView;
          var boundNode = void 0;
          if (bounds === 'parent') {
            boundNode = node.parentNode;
          } else {
            boundNode = ownerDocument.querySelector(bounds);
            if (!boundNode) throw new Error('Bounds selector "' + bounds + '" could not find an element.');
          }
          var nodeStyle = ownerWindow.getComputedStyle(node);
          var boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
          // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
          bounds = {
            left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.borderLeftWidth) + (0, _shims.int)(nodeStyle.marginLeft),
            top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.borderTopWidth) + (0, _shims.int)(nodeStyle.marginTop),
            right: (0, _domFns.innerWidth)(boundNode) - (0, _domFns.outerWidth)(node) - node.offsetLeft,
            bottom: (0, _domFns.innerHeight)(boundNode) - (0, _domFns.outerHeight)(node) - node.offsetTop
          };
        }

        // Keep x and y below right and bottom limits...
        if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
        if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);

        // But above left and top limits.
        if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
        if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);

        return [x, y];
      }

      function snapToGrid(grid /*: [number, number]*/, pendingX /*: number*/, pendingY /*: number*/) /*: [number, number]*/{
        var x = Math.round(pendingX / grid[0]) * grid[0];
        var y = Math.round(pendingY / grid[1]) * grid[1];
        return [x, y];
      }

      function canDragX(draggable /*: Draggable*/) /*: boolean*/{
        return draggable.props.axis === 'both' || draggable.props.axis === 'x';
      }

      function canDragY(draggable /*: Draggable*/) /*: boolean*/{
        return draggable.props.axis === 'both' || draggable.props.axis === 'y';
      }

      // Get {x, y} positions from event.
      function getControlPosition(e /*: MouseTouchEvent*/, touchIdentifier /*: ?number*/, draggableCore /*: DraggableCore*/) /*: ?ControlPosition*/{
        var touchObj = typeof touchIdentifier === 'number' ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
        if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
        var node = _reactDom2.default.findDOMNode(draggableCore);
        // User can provide an offsetParent if desired.
        var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
        return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent);
      }

      // Create an data object exposed by <DraggableCore>'s events
      function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/{
        var state = draggable.state;
        var isStart = !(0, _shims.isNum)(state.lastX);

        if (isStart) {
          // If this is our first move, use the x and y as last coords.
          return {
            node: _reactDom2.default.findDOMNode(draggable),
            deltaX: 0, deltaY: 0,
            lastX: x, lastY: y,
            x: x, y: y
          };
        } else {
          // Otherwise calculate proper values.
          return {
            node: _reactDom2.default.findDOMNode(draggable),
            deltaX: x - state.lastX, deltaY: y - state.lastY,
            lastX: state.lastX, lastY: state.lastY,
            x: x, y: y
          };
        }
      }

      // Create an data exposed by <Draggable>'s events
      function createDraggableData(draggable /*: Draggable*/, coreData /*: DraggableData*/) /*: DraggableData*/{
        var scale = draggable.props.scale;
        return {
          node: coreData.node,
          x: draggable.state.x + coreData.deltaX / scale,
          y: draggable.state.y + coreData.deltaY / scale,
          deltaX: coreData.deltaX / scale,
          deltaY: coreData.deltaY / scale,
          lastX: draggable.state.x,
          lastY: draggable.state.y
        };
      }

      // A lot faster than stringify/parse
      function cloneBounds(bounds /*: Bounds*/) /*: Bounds*/{
        return {
          left: bounds.left,
          top: bounds.top,
          right: bounds.right,
          bottom: bounds.bottom
        };
      }

      /***/
    },
    /* 9 */
    /***/function (module, exports, __webpack_require__) {

      /* WEBPACK VAR INJECTION */(function (process) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
          value: true
        });

        var _slicedToArray = function () {
          function sliceIterator(arr, i) {
            var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;_e = err;
            } finally {
              try {
                if (!_n && _i["return"]) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }return _arr;
          }return function (arr, i) {
            if (Array.isArray(arr)) {
              return arr;
            } else if (Symbol.iterator in Object(arr)) {
              return sliceIterator(arr, i);
            } else {
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
          };
        }();

        var _createClass = function () {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
            }
          }return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
          };
        }();

        var _react = __webpack_require__(2);

        var _react2 = _interopRequireDefault(_react);

        var _reactDom = __webpack_require__(3);

        var _reactDom2 = _interopRequireDefault(_reactDom);

        var _domFns = __webpack_require__(5);

        var _positionFns = __webpack_require__(8);

        var _shims = __webpack_require__(6);

        var _log = __webpack_require__(11);

        var _log2 = _interopRequireDefault(_log);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
          }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        // Simple abstraction for dragging events names.
        /*:: import type {EventHandler} from './utils/types';*/
        var eventsFor = {
          touch: {
            start: 'touchstart',
            move: 'touchmove',
            stop: 'touchend'
          },
          mouse: {
            start: 'mousedown',
            move: 'mousemove',
            stop: 'mouseup'
          }
        };

        // Default to mouse events.
        var dragEventFor = eventsFor.mouse;

        //
        // Define <DraggableCore>.
        //
        // <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
        // work well with libraries that require more control over the element.
        //

        /*:: type CoreState = {
         dragging: boolean,
         lastX: number,
         lastY: number,
         touchIdentifier: ?number
         };*/

        var DraggableCore = function (_React$Component) {
          _inherits(DraggableCore, _React$Component);

          function DraggableCore() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, DraggableCore);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggableCore.__proto__ || Object.getPrototypeOf(DraggableCore)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
              dragging: false,
              // Used while dragging to determine deltas.
              lastX: NaN, lastY: NaN,
              touchIdentifier: null
            }, _this.handleDragStart = function (e) {
              // Make it possible to attach event handlers on top of this one.
              _this.props.onMouseDown(e);

              // Only accept left-clicks.
              if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

              // Get nodes. Be sure to grab relative document (could be iframed)
              var domNode = _reactDom2.default.findDOMNode(_this);
              var ownerDocument = domNode.ownerDocument;

              // Short circuit if handle or cancel prop was provided and selector doesn't match.

              if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, domNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, domNode)) {
                return;
              }

              // Set touch identifier in component state if this is a touch event. This allows us to
              // distinguish between individual touches on multitouch screens by identifying which
              // touchpoint was set to this element.
              var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
              _this.setState({ touchIdentifier: touchIdentifier });

              // Get the current drag point from the event. This is used as the offset.
              var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _this);
              if (position == null) return; // not possible but satisfies flow
              var x = position.x,
                  y = position.y;

              // Create an event object with all the data parents need to make a decision here.

              var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

              (0, _log2.default)('DraggableCore: handleDragStart: %j', coreEvent);

              // Call event handler. If it returns explicit false, cancel.
              (0, _log2.default)('calling', _this.props.onStart);
              var shouldUpdate = _this.props.onStart(e, coreEvent);
              if (shouldUpdate === false) return;

              // Add a style to the body to disable user-select. This prevents text from
              // being selected all over the page.
              if (_this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument.body);

              // Initiate dragging. Set the current x and y as offsets
              // so we know how much we've moved during the drag. This allows us
              // to drag elements around even if they have been moved, without issue.
              _this.setState({
                dragging: true,

                lastX: x,
                lastY: y
              });

              // Add events to the document directly so we catch when the user's mouse/touch moves outside of
              // this element. We use different events depending on whether or not we have detected that this
              // is a touch-capable device.
              (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
              (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
            }, _this.handleDrag = function (e) {

              // Prevent scrolling on mobile devices, like ipad/iphone.
              if (e.type === 'touchmove') e.preventDefault();

              // Get the current drag point from the event. This is used as the offset.
              var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
              if (position == null) return;
              var x = position.x,
                  y = position.y;

              // Snap to grid if prop has been provided

              if (x !== x) debugger;

              if (Array.isArray(_this.props.grid)) {
                var deltaX = x - _this.state.lastX,
                    deltaY = y - _this.state.lastY;

                var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, deltaX, deltaY);

                var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);

                deltaX = _snapToGrid2[0];
                deltaY = _snapToGrid2[1];

                if (!deltaX && !deltaY) return; // skip useless drag
                x = _this.state.lastX + deltaX, y = _this.state.lastY + deltaY;
              }

              var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

              (0, _log2.default)('DraggableCore: handleDrag: %j', coreEvent);

              // Call event handler. If it returns explicit false, trigger end.
              var shouldUpdate = _this.props.onDrag(e, coreEvent);
              if (shouldUpdate === false) {
                try {
                  // $FlowIgnore
                  _this.handleDragStop(new MouseEvent('mouseup'));
                } catch (err) {
                  // Old browsers
                  var event = document.createEvent('MouseEvents') /*: any*/;
                  // I see why this insanity was deprecated
                  // $FlowIgnore
                  event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                  _this.handleDragStop(event);
                }
                return;
              }

              _this.setState({
                lastX: x,
                lastY: y
              });
            }, _this.handleDragStop = function (e) {
              if (!_this.state.dragging) return;

              var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
              if (position == null) return;
              var x = position.x,
                  y = position.y;

              var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

              var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(_this),
                  ownerDocument = _ReactDOM$findDOMNode.ownerDocument;

              // Remove user-select hack


              if (_this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument.body);

              (0, _log2.default)('DraggableCore: handleDragStop: %j', coreEvent);

              // Reset the el.
              _this.setState({
                dragging: false,
                lastX: NaN,
                lastY: NaN
              });

              // Call event handler
              _this.props.onStop(e, coreEvent);

              // Remove event handlers
              (0, _log2.default)('DraggableCore: Removing handlers');
              (0, _domFns.removeEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
              (0, _domFns.removeEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
            }, _this.onMouseDown = function (e) {
              dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

              return _this.handleDragStart(e);
            }, _this.onMouseUp = function (e) {
              dragEventFor = eventsFor.mouse;

              return _this.handleDragStop(e);
            }, _this.onTouchStart = function (e) {
              // We're on a touch device now, so change the event handlers
              dragEventFor = eventsFor.touch;

              return _this.handleDragStart(e);
            }, _this.onTouchEnd = function (e) {
              // We're on a touch device now, so change the event handlers
              dragEventFor = eventsFor.touch;

              return _this.handleDragStop(e);
            }, _temp), _possibleConstructorReturn(_this, _ret);
          }

          _createClass(DraggableCore, [{
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
              // Remove any leftover event handlers. Remove both touch and mouse handlers in case
              // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
              var _ReactDOM$findDOMNode2 = _reactDom2.default.findDOMNode(this),
                  ownerDocument = _ReactDOM$findDOMNode2.ownerDocument;

              (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
              (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
              (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
              (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
              if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument.body);
            }

            // Same as onMouseDown (start drag), but now consider this a touch device.

          }, {
            key: 'render',
            value: function render() /*: React.Element<any>*/{
              // Reuse the child provided
              // This makes it flexible to use whatever element is wanted (div, ul, etc)
              return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
                style: (0, _domFns.styleHacks)(this.props.children.props.style),

                // Note: mouseMove handler is attached to document so it will still function
                // when the user drags quickly and leaves the bounds of the element.
                onMouseDown: this.onMouseDown,
                onTouchStart: this.onTouchStart,
                onMouseUp: this.onMouseUp,
                onTouchEnd: this.onTouchEnd
              });
            }
          }]);

          return DraggableCore;
        }(_react2.default.Component);

        DraggableCore.displayName = 'DraggableCore';
        DraggableCore.propTypes = {
          /**
           * `allowAnyClick` allows dragging using any mouse button.
           * By default, we only accept the left button.
           *
           * Defaults to `false`.
           */
          allowAnyClick: _react.PropTypes.bool,

          /**
           * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
           * with the exception of `onMouseDown`, will not fire.
           */
          disabled: _react.PropTypes.bool,

          /**
           * By default, we add 'user-select:none' attributes to the document body
           * to prevent ugly text selection during drag. If this is causing problems
           * for your app, set this to `false`.
           */
          enableUserSelectHack: _react.PropTypes.bool,

          /**
           * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
           * instead of using the parent node.
           */
          offsetParent: function offsetParent(props, propName) {
            if (process.browser && props[propName] && props[propName].nodeType !== 1) {
              throw new Error('Draggable\'s offsetParent must be a DOM Node.');
            }
          },

          /**
           * `grid` specifies the x and y that dragging should snap to.
           */
          grid: _react.PropTypes.arrayOf(_react.PropTypes.number),

          /**
           * `scale` specifies the scale of the area you are dragging inside of. It allows
           * the drag deltas to scale correctly with how far zoomed in/out you are.
           */
          scale: _react.PropTypes.number,

          /**
           * `handle` specifies a selector to be used as the handle that initiates drag.
           *
           * Example:
           *
           * ```jsx
           *   let App = React.createClass({
          *       render: function () {
          *         return (
          *            <Draggable handle=".handle">
          *              <div>
          *                  <div className="handle">Click me to drag</div>
          *                  <div>This is some other content</div>
          *              </div>
          *           </Draggable>
          *         );
          *       }
          *   });
           * ```
           */
          handle: _react.PropTypes.string,

          /**
           * `cancel` specifies a selector to be used to prevent drag initialization.
           *
           * Example:
           *
           * ```jsx
           *   let App = React.createClass({
          *       render: function () {
          *           return(
          *               <Draggable cancel=".cancel">
          *                   <div>
          *                     <div className="cancel">You can't drag from here</div>
          *                     <div>Dragging here works fine</div>
          *                   </div>
          *               </Draggable>
          *           );
          *       }
          *   });
           * ```
           */
          cancel: _react.PropTypes.string,

          /**
           * Called when dragging starts.
           * If this function returns the boolean false, dragging will be canceled.
           */
          onStart: _react.PropTypes.func,

          /**
           * Called while dragging.
           * If this function returns the boolean false, dragging will be canceled.
           */
          onDrag: _react.PropTypes.func,

          /**
           * Called when dragging stops.
           * If this function returns the boolean false, the drag will remain active.
           */
          onStop: _react.PropTypes.func,

          /**
           * A workaround option which can be passed if onMouseDown needs to be accessed,
           * since it'll always be blocked (as there is internal use of onMouseDown)
           */
          onMouseDown: _react.PropTypes.func,

          /**
           * These properties should be defined on the child, not here.
           */
          className: _shims.dontSetMe,
          style: _shims.dontSetMe,
          transform: _shims.dontSetMe
        };
        DraggableCore.defaultProps = {
          allowAnyClick: false, // by default only accept left click
          cancel: null,
          disabled: false,
          enableUserSelectHack: true,
          offsetParent: null,
          handle: null,
          grid: null,
          transform: null,
          onStart: function onStart() {},
          onDrag: function onDrag() {},
          onStop: function onStop() {},
          onMouseDown: function onMouseDown() {}
        };
        exports.default = DraggableCore;
        /* WEBPACK VAR INJECTION */
      }).call(exports, __webpack_require__(10));

      /***/
    },
    /* 10 */
    /***/function (module, exports) {

      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };

      /***/
    },
    /* 11 */
    /***/function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = log;

      /*eslint no-console:0*/
      function log() {
        var _console;

        if (undefined) (_console = console).log.apply(_console, arguments);
      }

      /***/
    }
    /******/])
  );
});
;
//# sourceMappingURL=react-draggable.js.map

/***/ }),

/***/ 649:
/*!***********************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/openseadragon/withFixedScale.js ***!
  \***********************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = withFixedScale;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function withFixedScale(WrappedComponent) {

  return class extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    render() {

      if (!this.props.canvasScale) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, this.props);
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(WrappedComponent, _extends({ style: { transform: `scale(${1 / this.props.canvasScale})` } }, this.props));
    }
  };
}

/***/ }),

/***/ 650:
/*!****************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/selectors/WholeCanvasSelector.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WholeCanvasSelector_scss__ = __webpack_require__(/*! ./WholeCanvasSelector.scss */ 651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WholeCanvasSelector_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__WholeCanvasSelector_scss__);




const style = __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default.a.block('whole-canvas-selector');

class WholeCanvasSelector extends __WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"] {

  // propTypes = {
  //   skipConfirm: PropTypes.bool,
  //   onSave: PropTypes.func.isRequired,
  //   onCancel: PropTypes.func, // unused
  // };

  componentDidMount() {
    const { skipConfirm = true } = this.props;
    if (skipConfirm) {
      this.props.onSave();
    }
  }

  render() {
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', null);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (WholeCanvasSelector);

/***/ }),

/***/ 651:
/*!******************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/selectors/WholeCanvasSelector.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./WholeCanvasSelector.scss */ 652);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./WholeCanvasSelector.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./WholeCanvasSelector.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 652:
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/selectors/WholeCanvasSelector.scss ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".whole-canvas-selector {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0; }\n  .whole-canvas-selector__button {\n    position: absolute;\n    width: 100px;\n    left: 50%;\n    margin-left: -50px;\n    top: 50%;\n    z-index: 10; }\n", ""]);

// exports


/***/ }),

/***/ 653:
/*!************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/Form.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Form.scss */ 654);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Form.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Form.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 654:
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/Form.scss ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".input-form__error {\n  padding: 5px;\n  border: 3px solid crimson;\n  color: crimson;\n  background: #FFF0F0;\n  margin: 10px; }\n  .input-form__error--hidden {\n    display: none; }\n\n.input-form__group {\n  border: 2px solid #DDD;\n  padding: 20px;\n  margin-bottom: 10px; }\n  .input-form__group--defaultGroup {\n    border-width: 0;\n    padding: 0;\n    margin-bottom: 10px; }\n\n.input-form__group-name {\n  font-weight: bold;\n  margin-bottom: 14px;\n  font-size: 1.4em; }\n\n.input-form__group-fields {\n  display: none; }\n\n.input-form__group-fields--open {\n  display: block; }\n\n.input-form__group-fields--defaultGroup {\n  display: block; }\n", ""]);

// exports


/***/ }),

/***/ 655:
/*!***************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/FormGroup.js ***!
  \***************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormField__ = __webpack_require__(/*! ./FormField */ 656);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




class FormGroup extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      isOpen: false
    }, this.toggle = () => this.setState({ isOpen: !this.state.isOpen }), _temp;
  }

  render() {
    const _props = this.props,
          { groupKey, style, group, fields, draft } = _props,
          props = _objectWithoutProperties(_props, ['groupKey', 'style', 'group', 'fields', 'draft']);
    const { isOpen } = this.state;
    const groupClass = groupKey === FormGroup.DEFAULT_GROUP || isOpen;
    const groupKeyClass = groupKey.replace(/ /g, '-');

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        className: style.element('group').modifiers({ [groupKeyClass]: true, open: groupClass }) },
      groupKey !== FormGroup.DEFAULT_GROUP ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { onClick: this.toggle,
          className: style.element('group-name').modifiers({ [groupKeyClass]: true, open: isOpen }) },
        group.label
      ) : null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: style.element('group-fields').modifiers({ [groupKeyClass]: true, open: isOpen }) },
        fields.map(field => draft.isPreviewing && !draft.input[field.id] ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__FormField__["a" /* default */], _extends({
          key: field.id,
          currentDraft: draft,
          draftId: draft.id,
          field: field,
          value: draft.input[field.id],
          preview: draft.isPreviewing
        }, props)))
      )
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FormGroup;

FormGroup.DEFAULT_GROUP = 'defaultGroup';

/***/ }),

/***/ 656:
/*!***************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/FormField.js ***!
  \***************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Autocomplete__ = __webpack_require__(/*! ./Autocomplete */ 363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DatePicker__ = __webpack_require__(/*! ./DatePicker */ 665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DropDown__ = __webpack_require__(/*! ./DropDown */ 672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GoogleMapSearch__ = __webpack_require__(/*! ./GoogleMapSearch */ 675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TextArea__ = __webpack_require__(/*! ./TextArea */ 867);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TextBox__ = __webpack_require__(/*! ./TextBox */ 868);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Fallback__ = __webpack_require__(/*! ./Fallback */ 869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Hidden__ = __webpack_require__(/*! ./Hidden */ 875);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__NullableCaptureModel__ = __webpack_require__(/*! ./NullableCaptureModel */ 878);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__domain_validation__ = __webpack_require__(/*! ../domain/validation */ 879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__EmbeddedResourceEditor__ = __webpack_require__(/*! ./EmbeddedResourceEditor */ 178);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }














class FormField extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  update(validate, field) {
    const { updateField } = this.props;
    return value => {
      // if (validate) {
      //   const validation = validate(value);
      //   if (!validation.isValid) {
      //     this.setState({error: validation.message});
      //   } else {
      //     if (this.state.error) {
      //       this.setState({error: null});
      //     }
      //   }
      // }
      updateField(field, value);
    };
  }

  render() {
    const _props = this.props,
          { field, draftId } = _props,
          allProps = _objectWithoutProperties(_props, ['field', 'draftId']);
    const validation = field.metaData && field.metaData.conformsTo ? __WEBPACK_IMPORTED_MODULE_10__domain_validation__["a" /* default */][field.metaData.conformsTo.id] : null;
    const update = this.update(validation, field).bind(this);
    const props = _extends({
      key: `${field.id}-${draftId}`,
      update
    }, allProps, field);
    switch (field.inputType) {
      case 'madoc:autocomplete':
        if (field.annotationMetaData.autocomplete) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Autocomplete__["a" /* default */], _extends({ key: props.id }, props, { suggestionProvider: value => {
              const url = field.annotationMetaData.autocomplete + '&q=' + encodeURIComponent(value);

              return fetch(url).then(result => result.json()).then(response => response.completions);
            } }));
        }
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__TextBox__["a" /* default */], _extends({ key: props.id }, props));
      case 'madoc:dropdown':
        if (field.annotationMetaData.options) {
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__DropDown__["a" /* default */], _extends({ key: props.id, options: field.annotationMetaData.options }, props));
        }
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__TextBox__["a" /* default */], _extends({ key: props.id }, props));
      case 'madoc:textarea':
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__TextArea__["a" /* default */], _extends({ key: props.id }, props));
      case 'madoc:datepicker':
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__DatePicker__["a" /* default */], _extends({ key: props.id }, props));
      case 'madoc:map':
      case 'madoc:mappicker':
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__GoogleMapSearch__["a" /* default */], _extends({ key: props.id }, props));
      case 'madoc:nullableCaptureModel':
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__NullableCaptureModel__["a" /* default */], _extends({ key: props.id }, props));
      case 'madoc:resource':
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__EmbeddedResourceEditor__["a" /* default */], _extends({ key: props.id }, props));
      case 'madoc:hiddenvalue':
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__Hidden__["a" /* default */], _extends({ key: props.id }, props));
      case 'madoc:fallbackOptions':
        const isOption = name => option => option['o:label'] === name;
        let opts = field.annotationMetaData.options || [];
        let autocomplete = opts.find(isOption('autocomplete'));
        let captureModel = opts.find(isOption('captureModel'));

        if (!captureModel || !autocomplete) {
          console.warn('Unable to create Fallback component, missing autocomplete or captureModel options');
          return null;
        }

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__Fallback__["a" /* default */], _extends({ autocomplete: autocomplete, captureModel: captureModel, key: props.id }, props));
      case 'madoc:textbox':
      default:
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__TextBox__["a" /* default */], _extends({ key: props.id }, props));
    }
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = FormField;


/***/ }),

/***/ 657:
/*!***************************************************************************!*\
  !*** ./packages/annotation-components/src/components/ui/HelpTooltip.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./HelpTooltip.scss */ 658);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./HelpTooltip.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./HelpTooltip.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 658:
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/ui/HelpTooltip.scss ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".help-tooltip {\n  position: relative; }\n  .help-tooltip__tooltip {\n    display: none; }\n  .help-tooltip__label {\n    font-size: 0.8em; }\n    .help-tooltip__label:after {\n      content: '[?]'; }\n  .help-tooltip:hover .help-tooltip__tooltip {\n    display: block;\n    position: absolute;\n    top: 10px;\n    left: 10px;\n    width: auto;\n    min-width: 160px;\n    padding: 5px;\n    margin-top: 3px;\n    margin-left: 3px;\n    background: rgba(238, 238, 238, 0.8);\n    font-weight: initial;\n    font-size: 0.8em;\n    z-index: 10; }\n", ""]);

// exports


/***/ }),

/***/ 663:
/*!********************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/Autocomplete.scss ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Autocomplete.scss */ 664);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Autocomplete.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Autocomplete.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 664:
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/Autocomplete.scss ***!
  \*******************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".autocomplete__suggestions {\n  display: none;\n  position: absolute;\n  width: 100%;\n  background: #fff;\n  border: 1px solid #EEE;\n  border-radius: 0 0 5px 5px;\n  padding: 0;\n  margin: 0;\n  max-height: 300px;\n  overflow-y: auto; }\n  .autocomplete__suggestions:hover {\n    display: block; }\n  .autocomplete__suggestions li {\n    padding: 3px;\n    list-style: none; }\n    .autocomplete__suggestions li:hover {\n      background: #ddd; }\n\n.autocomplete__suggestions:empty {\n  border: none; }\n\n.autocomplete__input {\n  font-size: 14px;\n  width: 100%;\n  padding: 12px;\n  border: 2px solid #c1c7ca !important;\n  font-weight: bold;\n  margin-bottom: 10px;\n  background-color: #FFF; }\n  .autocomplete__input:focus ~ .autocomplete__suggestions {\n    display: block; }\n  .autocomplete__input:focus {\n    border-color: blueviolet;\n    outline: none; }\n", ""]);

// exports


/***/ }),

/***/ 665:
/*!****************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/DatePicker.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_datepicker__ = __webpack_require__(/*! react-datepicker */ 666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_datepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(/*! moment */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_datepicker_dist_react_datepicker_css__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ 669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_datepicker_dist_react_datepicker_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_datepicker_dist_react_datepicker_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TextBox_scss__ = __webpack_require__(/*! ./TextBox.scss */ 144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TextBox_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__TextBox_scss__);








const style = __WEBPACK_IMPORTED_MODULE_5_digirati_bem_js___default.a.block('input-text-box');

class DatePicker extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      isStarted: false
    }, this.onAddDate = () => {
      this.setState({ isStarted: true });
    }, _temp;
  }

  // propTypes = {
  //   id: PropTypes.string.isRequired,
  //   value: PropTypes.string.isRequired,
  //   update: PropTypes.func.isRequired,
  //   metaData: PropTypes.shape({
  //     title: PropTypes.string.isRequired,
  //     description: PropTypes.string
  //   }).isRequired,
  //   preview: PropTypes.bool,
  // };

  handleChange(time) {
    this.props.update(time.toISOString());
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({ isStarted: true });
    }
  }

  render() {
    const { isStarted } = this.state;
    const { id, value, metaData, preview, displayFieldSelector } = this.props;
    const time = __WEBPACK_IMPORTED_MODULE_2_moment___default()(value);
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'label',
        { className: style.element('label'), htmlFor: id },
        metaData.title,
        ' ',
        ' ',
        metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              displayFieldSelector(id);
            }, href: '#' },
          'edit'
        ) : null,
        isStarted ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              this.setState({ isStarted: false });
              this.props.update(null);
            }, href: '#' },
          ' remove'
        ) : null,
        metaData.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__ui_HelpTooltip__["a" /* default */],
          null,
          metaData.description
        ) : null
      ),
      preview ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: style.element('preview') },
        __WEBPACK_IMPORTED_MODULE_2_moment___default()(value).format('LL')
      ) : isStarted ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_datepicker___default.a, {
        dateFormat: 'DD/MM/YYYY',
        className: style.element('input').modifier('datepicker'),
        selected: time.isValid() ? time : __WEBPACK_IMPORTED_MODULE_2_moment___default()(),
        showYearDropdown: true,
        onChange: e => this.handleChange(e) }) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: style.element('choice'), onClick: this.onAddDate },
        'Choose date'
      )
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DatePicker);

/***/ }),

/***/ 671:
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/TextBox.scss ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".input-text-box {\n  padding: 10px; }\n  .input-text-box__input {\n    width: 100%;\n    padding: 12px;\n    border: 2px solid #000;\n    font-weight: bold;\n    font-size: 14px;\n    margin: 5px 0;\n    background-color: #FFF; }\n    .input-text-box__input--textarea {\n      height: 120px; }\n    .input-text-box__input:focus {\n      border-color: blueviolet;\n      outline: none; }\n  .input-text-box__choice {\n    width: 100%;\n    padding: 12px;\n    border: 2px solid #CCC;\n    margin: 5px 0;\n    cursor: pointer;\n    font-weight: bold; }\n  .input-text-box__label {\n    font-weight: bold;\n    display: block; }\n  .input-text-box__description {\n    color: #888;\n    font-size: .75em; }\n", ""]);

// exports


/***/ }),

/***/ 672:
/*!**************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/DropDown.js ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DropDown_scss__ = __webpack_require__(/*! ./DropDown.scss */ 673);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DropDown_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__DropDown_scss__);





const style = __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default.a.block('input-drop-down');

// Source: https://jsfiddle.net/11szrbx9/
function printf(format, ...values) {
  return values.reduce((str, val) => str.replace(/%s/, val), format);
}

class DropDown extends __WEBPACK_IMPORTED_MODULE_1_react__["Component"] {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: []
    };
  }

  selectSuggestion(suggestion) {
    this.props.update(suggestion.uri);
  }

  updateSuggestions(update, value) {
    update(value);
    fetch(printf(this.props.autocomplete, value)).then(f => f.json()).then(data => this.setState({ suggestions: data.completions })); // probably needs changed?
  }

  renderBox() {
    const { id, value, options, autocomplete, preview, update } = this.props;
    const { suggestions } = this.state;

    if (preview) {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: style.element('preview') },
        value
      );
    }

    if (autocomplete) {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: style.element('autocomplete') },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('input', { onChange: e => this.updateSuggestions(update, e.currentTarget.value), type: 'text', value: value || '', ref: ref => this.input = ref }),
        suggestions ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'ul',
          { className: style.element('suggestions').modifiers({ 'is-empty': !!value }) },
          suggestions.map(suggestion => __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'li',
            { className: style.element('suggestion-item'), key: suggestion.uri, onClick: () => this.selectSuggestion(suggestion) },
            suggestion.label
          ))
        ) : null
      );
    }

    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'select',
      {
        className: style.element('input'),
        id: id,
        value: value || '',
        onChange: e => update(e.currentTarget.value) },
      value ? null : __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'option',
        { value: '' },
        'Please select...'
      ),
      options.map((value, n) => __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'option',
        { key: n, value: value },
        value
      ))
    );
  }

  render() {
    const { id, metaData } = this.props;
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { className: style },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'label',
        { className: style.element('label'), htmlFor: id },
        metaData.title,
        ' ',
        ' ',
        metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              displayFieldSelector(id);
            }, href: '#' },
          'edit'
        ) : null,
        metaData.description ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2__ui_HelpTooltip__["a" /* default */],
          null,
          metaData.description
        ) : null
      ),
      this.renderBox()
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DropDown);

/***/ }),

/***/ 673:
/*!****************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/DropDown.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./DropDown.scss */ 674);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./DropDown.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./DropDown.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 674:
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/DropDown.scss ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".input-drop-down {\n  padding: 10px; }\n  .input-drop-down__input {\n    background: #FFF;\n    height: 40px;\n    width: 200px;\n    border: 2px solid #000;\n    font-weight: bold;\n    font-size: 14px;\n    margin-bottom: 10px; }\n    .input-drop-down__input:focus {\n      border-color: blueviolet;\n      outline: none; }\n  .input-drop-down__label {\n    display: block;\n    font-weight: bold; }\n  .input-drop-down__description {\n    color: #888;\n    font-size: .75em; }\n", ""]);

// exports


/***/ }),

/***/ 675:
/*!*********************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/GoogleMapSearch.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_geosuggest__ = __webpack_require__(/*! react-geosuggest */ 676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_geosuggest___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_geosuggest__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_google_maps__ = __webpack_require__(/*! react-google-maps */ 683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_google_maps___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_google_maps__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GoogleMapSearch_scss__ = __webpack_require__(/*! ./GoogleMapSearch.scss */ 865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__GoogleMapSearch_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__GoogleMapSearch_scss__);







const style = __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default.a.block('google-map-search');

const GoogleMapDraggablePin = Object(__WEBPACK_IMPORTED_MODULE_3_react_google_maps__["withGoogleMap"])(props => {
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_3_react_google_maps__["GoogleMap"],
    {
      ref: props.onMapLoad,
      defaultZoom: 11,
      center: props.location },
    __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_google_maps__["Marker"], { draggable: true, onDragEnd: props.dragEnd, position: props.location })
  );
});

class GoogleMapSearch extends __WEBPACK_IMPORTED_MODULE_1_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      currentLocation: null,
      selected: false
    }, this.handleSuggestSelect = e => {
      this.setState({ selected: e.location });
      this.props.update(`${e.location.lat},${e.location.lng}`);
    }, _temp;
  }

  render() {
    const key = 'AIzaSyD2X9UAJcuDi_8mXF0ESXtZ9B9KbYcgFKs';
    const { value: valueAsString, metaData, preview, update } = this.props;
    const { selected } = this.state;
    const [lat, lng] = valueAsString ? valueAsString.split(',') : [];
    const value = lat && lng ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null;

    if (selected || preview) {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { style: { background: '#FFF' } },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'h4',
          { className: style.element('label') },
          metaData.title
        ),
        value || selected.lat && selected.lng ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          { className: style.element('click-to-edit') },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('img', { width: '300',
            onClick: () => this.setState({ selected: null }),
            src: `http://maps.googleapis.com/maps/api/staticmap?key=${key}&size=300x200&scale=2&center=${selected.lat},${selected.lng}&markers=${selected.lat},${selected.lng}&zoom=11` })
        ) : __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          null,
          'You did not choose a location'
        )
      );
    }
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { className: style },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: style.element('label') },
        metaData.title,
        metaData.description ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__ui_HelpTooltip__["a" /* default */],
          null,
          metaData.description
        ) : null
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: style.element('container') },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_geosuggest___default.a, { onSuggestSelect: this.handleSuggestSelect }),
        value ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(GoogleMapDraggablePin, {
            onMapLoad: map => this.map = map,
            dragEnd: ({ latLng }) => update(`${latLng.lat()},${latLng.lng()}`),
            containerElement: __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { className: style.element('map-object') }),
            mapElement: __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { className: style.element('map-object').modifier('inner') }),
            location: value }),
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
            'button',
            {
              className: style.element('button'),
              onClick: () => this.setState({ selected: value }) },
            'save'
          )
        ) : null
      )
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (GoogleMapSearch);

/***/ }),

/***/ 68:
/*!*********************************************************!*\
  !*** ./packages/annotation-redux/src/actions/viewer.js ***!
  \*********************************************************/
/*! exports provided: VIEWER_MUTATION, VIEWER_ACCESS, setViewer, withViewer */
/*! exports used: setViewer, withViewer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setViewer;
/* harmony export (immutable) */ __webpack_exports__["b"] = withViewer;
const VIEWER_MUTATION = 'VIEWER_MUTATION';
/* unused harmony export VIEWER_MUTATION */

const VIEWER_ACCESS = 'VIEWER_ACCESS';
/* unused harmony export VIEWER_ACCESS */


function setViewer(viewer) {
  return { type: VIEWER_MUTATION, payload: { viewer } };
}

function withViewer(func) {
  return { type: VIEWER_ACCESS, payload: { func } };
}

/***/ }),

/***/ 69:
/*!*************************************************!*\
  !*** ./packages/annotation-bridge/src/vocab.js ***!
  \*************************************************/
/*! exports provided: ID, CONTEXT, TYPE, VALUE, DESCRIPTION, TITLE, CONFORMS_TO, FORM_FIELDS, HAS_PART, RDFS_LABEL, OMEKA_LABEL, COMBINE, FIELD_GROUP, LABEL_PARTS, UI_GROUP, EXTERNALISE, HUMAN_READABLE, MOTIVATED_BY, SERIALIZE, MULTIPLE, UI_CHOICE, SELECTOR, SELECTOR_VALUE, BODY_TYPE, PURPOSE, INPUT_TYPE, INPUT_OPTIONS, INPUT_DEFAULT_VALUE, BOX_SELECTOR, WHOLE_CANVAS_SELECTOR */
/*! exports used: BODY_TYPE, BOX_SELECTOR, COMBINE, CONFORMS_TO, DESCRIPTION, EXTERNALISE, FIELD_GROUP, HAS_PART, HUMAN_READABLE, ID, INPUT_DEFAULT_VALUE, INPUT_OPTIONS, INPUT_TYPE, LABEL_PARTS, MOTIVATED_BY, MULTIPLE, OMEKA_LABEL, PURPOSE, RDFS_LABEL, SELECTOR, SELECTOR_VALUE, SERIALIZE, TITLE, TYPE, UI_CHOICE, UI_GROUP, WHOLE_CANVAS_SELECTOR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// DUBLIN CORE CONSTANTS
const ID = '@id';
/* harmony export (immutable) */ __webpack_exports__["j"] = ID;

const CONTEXT = '@context';
/* unused harmony export CONTEXT */

const TYPE = '@type';
/* harmony export (immutable) */ __webpack_exports__["x"] = TYPE;

const VALUE = '@value';
/* unused harmony export VALUE */

const DESCRIPTION = 'dcterms:description';
/* harmony export (immutable) */ __webpack_exports__["e"] = DESCRIPTION;

const TITLE = 'dcterms:title';
/* harmony export (immutable) */ __webpack_exports__["w"] = TITLE;

const CONFORMS_TO = 'dcterms:conformsTo';
/* harmony export (immutable) */ __webpack_exports__["d"] = CONFORMS_TO;

const FORM_FIELDS = 'dcterms:hasPart';
/* unused harmony export FORM_FIELDS */

const HAS_PART = 'dcterms:hasPart';
/* harmony export (immutable) */ __webpack_exports__["h"] = HAS_PART;

const RDFS_LABEL = 'rdfs:label';
/* harmony export (immutable) */ __webpack_exports__["s"] = RDFS_LABEL;


// OMEKA CONSTANTS
const OMEKA_LABEL = 'o:label';
/* harmony export (immutable) */ __webpack_exports__["q"] = OMEKA_LABEL;


// CROWD CONSTANTS
const COMBINE = 'crowds:derivedAnnoCombine';
/* harmony export (immutable) */ __webpack_exports__["c"] = COMBINE;

const FIELD_GROUP = 'crowds:uiFormGroup';
/* harmony export (immutable) */ __webpack_exports__["g"] = FIELD_GROUP;

const LABEL_PARTS = 'crowds:derivedAnnoBodyLabelParts';
/* harmony export (immutable) */ __webpack_exports__["n"] = LABEL_PARTS;

const UI_GROUP = 'crowds:uiGroup';
/* harmony export (immutable) */ __webpack_exports__["z"] = UI_GROUP;

const EXTERNALISE = 'crowds:derivedAnnoExternalize';
/* harmony export (immutable) */ __webpack_exports__["f"] = EXTERNALISE;

const HUMAN_READABLE = 'crowds:derivedAnnoHumanReadable';
/* harmony export (immutable) */ __webpack_exports__["i"] = HUMAN_READABLE;

const MOTIVATED_BY = 'crowds:derivedAnnoMotivatedBy';
/* harmony export (immutable) */ __webpack_exports__["o"] = MOTIVATED_BY;

const SERIALIZE = 'crowds:derivedAnnoSerialize';
/* harmony export (immutable) */ __webpack_exports__["v"] = SERIALIZE;

const MULTIPLE = 'crowds:uiMultiple';
/* harmony export (immutable) */ __webpack_exports__["p"] = MULTIPLE;

const UI_CHOICE = 'crowds:uiChoice';
/* harmony export (immutable) */ __webpack_exports__["y"] = UI_CHOICE;

const SELECTOR = 'crowds:uiSelectorType';
/* harmony export (immutable) */ __webpack_exports__["t"] = SELECTOR;

const SELECTOR_VALUE = 'crowds:uiSelectorValue';
/* harmony export (immutable) */ __webpack_exports__["u"] = SELECTOR_VALUE;


const BODY_TYPE = 'crowds:derivedAnnoBodyType';
/* harmony export (immutable) */ __webpack_exports__["a"] = BODY_TYPE;

const PURPOSE = 'crowds:derivedAnnoBodyPurpose';
/* harmony export (immutable) */ __webpack_exports__["r"] = PURPOSE;


const INPUT_TYPE = 'crowds:uiInputType';
/* harmony export (immutable) */ __webpack_exports__["m"] = INPUT_TYPE;

const INPUT_OPTIONS = 'crowds:uiInputOptions';
/* harmony export (immutable) */ __webpack_exports__["l"] = INPUT_OPTIONS;

const INPUT_DEFAULT_VALUE = 'crowds:uiInputDefaultValue';
/* harmony export (immutable) */ __webpack_exports__["k"] = INPUT_DEFAULT_VALUE;


const BOX_SELECTOR = 'madoc:boxdraw';
/* harmony export (immutable) */ __webpack_exports__["b"] = BOX_SELECTOR;

const WHOLE_CANVAS_SELECTOR = 'WholeCanvasSelector';
/* harmony export (immutable) */ __webpack_exports__["A"] = WHOLE_CANVAS_SELECTOR;
 // @todo change to madoc: ns

/***/ }),

/***/ 85:
/*!**************************************************************!*\
  !*** ./packages/annotation-redux/src/actions/annotations.js ***!
  \**************************************************************/
/*! exports provided: ANNOTATIONS_ADD, addAnnotation */
/*! exports used: ANNOTATIONS_ADD, addAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = addAnnotation;
const ANNOTATIONS_ADD = 'ANNOTATIONS_ADD';
/* harmony export (immutable) */ __webpack_exports__["a"] = ANNOTATIONS_ADD;


function addAnnotation(annotation) {
  return { type: ANNOTATIONS_ADD, payload: { id: annotation.id, annotation } };
}

/***/ }),

/***/ 86:
/*!************************************************************!*\
  !*** ./packages/annotation-redux/src/actions/selectors.js ***!
  \************************************************************/
/*! exports provided: SELECTOR_SET_AVAILABLE, SELECTOR_CHOOSE, SELECTOR_UPDATE, SELECTOR_COMMIT_TO_DRAFT, SELECTOR_COMMIT_TO_DRAFT_FIELD, SELECTOR_CANCEL, setAvailableSelectors, chooseSelector, cancelSelector, chooseSecondarySelector, updateSelector, commitToCurrentDraftField, editCurrentDraftSecondarySelector, editCurrentDraftSelector, commitToCurrentDraft */
/*! exports used: SELECTOR_CANCEL, SELECTOR_CHOOSE, SELECTOR_COMMIT_TO_DRAFT, SELECTOR_COMMIT_TO_DRAFT_FIELD, SELECTOR_SET_AVAILABLE, SELECTOR_UPDATE, cancelSelector, chooseSecondarySelector, chooseSelector, commitToCurrentDraft, commitToCurrentDraftField, editCurrentDraftSecondarySelector, editCurrentDraftSelector, setAvailableSelectors, updateSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["n"] = setAvailableSelectors;
/* harmony export (immutable) */ __webpack_exports__["i"] = chooseSelector;
/* harmony export (immutable) */ __webpack_exports__["g"] = cancelSelector;
/* harmony export (immutable) */ __webpack_exports__["h"] = chooseSecondarySelector;
/* harmony export (immutable) */ __webpack_exports__["o"] = updateSelector;
/* harmony export (immutable) */ __webpack_exports__["k"] = commitToCurrentDraftField;
/* harmony export (immutable) */ __webpack_exports__["l"] = editCurrentDraftSecondarySelector;
/* harmony export (immutable) */ __webpack_exports__["m"] = editCurrentDraftSelector;
/* harmony export (immutable) */ __webpack_exports__["j"] = commitToCurrentDraft;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drafts__ = __webpack_require__(/*! ./drafts */ 42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__query_draftQuery__ = __webpack_require__(/*! ../query/draftQuery */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility__ = __webpack_require__(/*! ../utility */ 130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__viewer__ = __webpack_require__(/*! ./viewer */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__query_selectorQuery__ = __webpack_require__(/*! ../query/selectorQuery */ 131);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







const SELECTOR_SET_AVAILABLE = 'SELECTOR_SET_AVAILABLE';
/* harmony export (immutable) */ __webpack_exports__["e"] = SELECTOR_SET_AVAILABLE;

const SELECTOR_CHOOSE = 'SELECTOR_CHOOSE';
/* harmony export (immutable) */ __webpack_exports__["b"] = SELECTOR_CHOOSE;

const SELECTOR_UPDATE = 'SELECTOR_UPDATE';
/* harmony export (immutable) */ __webpack_exports__["f"] = SELECTOR_UPDATE;

const SELECTOR_COMMIT_TO_DRAFT = 'SELECTOR_COMMIT_TO_DRAFT';
/* harmony export (immutable) */ __webpack_exports__["c"] = SELECTOR_COMMIT_TO_DRAFT;

const SELECTOR_COMMIT_TO_DRAFT_FIELD = 'SELECTOR_COMMIT_TO_DRAFT_FIELD';
/* harmony export (immutable) */ __webpack_exports__["d"] = SELECTOR_COMMIT_TO_DRAFT_FIELD;

const SELECTOR_CANCEL = 'SELECTOR_CANCEL';
/* harmony export (immutable) */ __webpack_exports__["a"] = SELECTOR_CANCEL;


function setAvailableSelectors(selectors) {
  return { type: SELECTOR_SET_AVAILABLE, payload: { selectors } };
}

function chooseSelector(type, source, defaults, done, immediate = false) {
  // @todo find better way of Canvas relative vs Viewport relative inspections
  if (!defaults || type.toLowerCase() !== 'madoc:boxdraw') {
    return dispatch => {
      dispatch({
        type: SELECTOR_CHOOSE,
        payload: { type, source, defaults: Object(__WEBPACK_IMPORTED_MODULE_2__utility__["a" /* selectorCompat */])(defaults) }
      });
      if (type.toLowerCase() === 'wholecanvasselector' || immediate) {
        dispatch(commitToCurrentDraft(false));
      }
      if (done) {
        done();
      }
    };
  }
  return Object(__WEBPACK_IMPORTED_MODULE_3__viewer__["b" /* withViewer */])((Canvas, dispatch) => {
    const { x, y } = Canvas.createViewportPoint(defaults.x, defaults.y);
    const { x: maxX, y: maxY } = Canvas.createViewportPoint(defaults.x + defaults.width, defaults.y + defaults.height);
    dispatch({
      type: SELECTOR_CHOOSE,
      meta: { fromViewer: true },
      payload: { type, source, defaults: Object(__WEBPACK_IMPORTED_MODULE_2__utility__["a" /* selectorCompat */])(_extends({}, defaults, { x, y, width: maxX - x, height: maxY - y })) }
    });
    if (done) {
      done();
    }
  });
}

function cancelSelector() {
  return { type: SELECTOR_CANCEL };
}

function chooseSecondarySelector(id, source, type, defaults, done) {
  return chooseSelector(type, source, _extends({}, Object(__WEBPACK_IMPORTED_MODULE_2__utility__["a" /* selectorCompat */])(defaults), { id, secondary: true }), done);
}

function updateSelector(data) {
  return { type: SELECTOR_UPDATE, payload: { data: Object(__WEBPACK_IMPORTED_MODULE_2__utility__["a" /* selectorCompat */])(data) } };
}

function commitToCurrentDraftField(fieldId) {
  return (dispatch, getState) => {
    const state = getState();
    const selector = Object(__WEBPACK_IMPORTED_MODULE_4__query_selectorQuery__["b" /* getCurrentSelector */])(state);
    dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__drafts__["q" /* addSelectorToDraftFieldFromViewer */])(selector.source.draft, Object(__WEBPACK_IMPORTED_MODULE_2__utility__["a" /* selectorCompat */])(selector), fieldId, () => dispatch({ type: SELECTOR_COMMIT_TO_DRAFT_FIELD })));
  };
}

function editCurrentDraftSecondarySelector(scope, fieldId) {
  return (dispatch, getState) => {
    const { id, selectors, template } = Object(__WEBPACK_IMPORTED_MODULE_1__query_draftQuery__["b" /* getCurrentDraft */])(getState(), scope);
    if (id && selectors && selectors[fieldId]) {
      dispatch(chooseSecondarySelector(fieldId, { template: template, draft: id, scope }, selectors[fieldId].type, Object(__WEBPACK_IMPORTED_MODULE_2__utility__["a" /* selectorCompat */])(selectors[fieldId]),
      // Remove only after choosing.
      () => dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__drafts__["J" /* removeSelectorFromDraftField */])(id, fieldId))));
    }
  };
}

function editCurrentDraftSelector(scope) {
  return (dispatch, getState) => {
    const { id, selector, template } = Object(__WEBPACK_IMPORTED_MODULE_1__query_draftQuery__["b" /* getCurrentDraft */])(getState(), scope);
    if (id && selector) {
      // @todo remove this, seems like a bug.
      if (selector.type === 'WholeCanvasSelector') {
        return dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__drafts__["A" /* discardCurrentDraft */])(scope));
      }
      dispatch(chooseSelector(selector.type, { template: template, draft: id, scope }, Object(__WEBPACK_IMPORTED_MODULE_2__utility__["a" /* selectorCompat */])(selector), () => dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__drafts__["I" /* removeSelectorFromDraft */])(id))));
    }
  };
}

function commitToCurrentDraft(isViewer = true) {
  return (dispatch, getState) => {
    const state = getState();
    const selector = Object(__WEBPACK_IMPORTED_MODULE_4__query_selectorQuery__["b" /* getCurrentSelector */])(state);
    if (!selector || !selector.source) {
      return null;
    }
    if (!selector.source.draft) {
      console.warn('commitToCurrentDraft', 'Selector with malformed source found.');
    }
    const currentDraft = Object(__WEBPACK_IMPORTED_MODULE_1__query_draftQuery__["c" /* getDraftById */])(state, selector.source.draft);
    if (!currentDraft) {
      console.warn('commitToCurrentDraft', `Draft (${selector.source.draft}) was not found in state.`);
    }
    if (selector.id) {
      return dispatch(commitToCurrentDraftField(selector.id));
    }
    if (isViewer) {
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__drafts__["r" /* addSelectorToDraftFromViewer */])(currentDraft.id, Object(__WEBPACK_IMPORTED_MODULE_2__utility__["a" /* selectorCompat */])(selector), () => dispatch({ type: SELECTOR_COMMIT_TO_DRAFT })));
    } else {
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__drafts__["p" /* addSelectorToDraft */])(currentDraft.id, selector));
      dispatch({ type: SELECTOR_COMMIT_TO_DRAFT });
    }
  };
}

/***/ }),

/***/ 865:
/*!***********************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/GoogleMapSearch.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./GoogleMapSearch.scss */ 866);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./GoogleMapSearch.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./GoogleMapSearch.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 866:
/*!**********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/GoogleMapSearch.scss ***!
  \**********************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".google-map-search__label {\n  display: block;\n  font-weight: bold; }\n\n.google-map-search__description {\n  color: #888;\n  font-size: .75em; }\n\n.google-map-search__container {\n  border: 2px solid #000;\n  background: #FFF; }\n\n.google-map-search__map-object {\n  height: 200px; }\n\n.google-map-search__button {\n  width: 100%;\n  padding: 10px;\n  background: skyblue;\n  font-size: 13px;\n  border: none; }\n\n.google-map-search__click-to-edit {\n  position: relative;\n  box-sizing: border-box; }\n  .google-map-search__click-to-edit img {\n    width: 100%; }\n  .google-map-search__click-to-edit:after {\n    content: '';\n    transition: background .2s;\n    background: transparent;\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0; }\n  .google-map-search__click-to-edit:hover:after {\n    font-weight: bold;\n    background: rgba(0, 0, 0, 0.3);\n    color: #fff;\n    text-align: center;\n    line-height: 100%;\n    padding-top: 50px;\n    text-shadow: 0 1px 0 #000;\n    content: 'click to edit'; }\n\n.geosuggest {\n  font-size: 18px;\n  position: relative;\n  text-align: left; }\n  .geosuggest__input {\n    width: 300px;\n    padding: 12px;\n    border: none;\n    border-bottom: 2px solid #000;\n    font-weight: bold;\n    font-size: 14px;\n    background-color: #FFF; }\n    .geosuggest__input:focus {\n      border-color: blueviolet;\n      outline: none; }\n  .geosuggest__suggests {\n    position: absolute;\n    top: 100%;\n    left: 0;\n    right: 0;\n    max-height: 25em;\n    padding: 0;\n    margin-top: -4px;\n    background: #FFF;\n    border-bottom: 2px solid rgba(0, 0, 0, 0.2);\n    border-top-width: 0;\n    overflow-x: hidden;\n    overflow-y: auto;\n    list-style: none;\n    z-index: 5;\n    -webkit-transition: max-height 0.2s, border 0.2s;\n    transition: max-height 0.2s, border 0.2s; }\n  .geosuggest__suggests--hidden {\n    max-height: 0;\n    overflow: hidden;\n    border-top-width: 0;\n    border-bottom-width: 0; }\n  .geosuggest__item {\n    font-size: 18px;\n    padding: .5em .65em;\n    cursor: pointer; }\n    .geosuggest__item:hover, .geosuggest__item:focus {\n      background: #267dc0;\n      color: #fff; }\n    .geosuggest__item--active:nth-of-type(odd), .geosuggest__item--active {\n      background: #267dc0;\n      color: #fff; }\n      .geosuggest__item--active:nth-of-type(odd):hover, .geosuggest__item--active:nth-of-type(odd):focus, .geosuggest__item--active:hover, .geosuggest__item--active:focus {\n        background: #267dc0; }\n    .geosuggest__item__matched-text {\n      font-weight: bold; }\n", ""]);

// exports


/***/ }),

/***/ 867:
/*!**************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/TextArea.js ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TextBox_scss__ = __webpack_require__(/*! ./TextBox.scss */ 144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TextBox_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__TextBox_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);





const style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('input-text-box');

class TextArea extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  // propTypes = {
  //   id: PropTypes.string.isRequired,
  //   value: PropTypes.string.isRequired,
  //   update: PropTypes.func.isRequired,
  //   metaData: PropTypes.shape({
  //     title: PropTypes.string.isRequired,
  //     description: PropTypes.string
  //   }).isRequired,
  //   preview: PropTypes.bool,
  // };

  render() {
    const { id, value, metaData, preview, displayFieldSelector } = this.props;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'label',
        { className: style.element('label'), htmlFor: id },
        metaData.title,
        ' ',
        ' ',
        metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              displayFieldSelector(id);
            }, href: '#' },
          'edit'
        ) : null,
        metaData.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__ui_HelpTooltip__["a" /* default */],
          null,
          metaData.description
        ) : null
      ),
      preview ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: style.element('preview') },
        value
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', { className: style.element('input').modifier('textarea'),
        id: id,
        value: value || '',
        onChange: e => this.props.update(e.currentTarget.value) })
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (TextArea);

/***/ }),

/***/ 868:
/*!*************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/TextBox.js ***!
  \*************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TextBox_scss__ = __webpack_require__(/*! ./TextBox.scss */ 144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TextBox_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__TextBox_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };






const style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('input-text-box');

class TextBox extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  shouldComponentUpdate(newProps) {
    return newProps.value !== this.props.value || newProps.preview !== this.props.preview;
  }

  render() {
    const { id, value, metaData, preview, update, displayFieldSelector, elementEvents } = this.props;

    const events = _extends({}, elementEvents, {
      onFocus: e => elementEvents.onFocus ? elementEvents.onFocus(id, e) : null,
      onBlur: e => elementEvents.onBlur ? elementEvents.onBlur(id, e) : null
    });

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'label',
        { className: style.element('label'), htmlFor: id },
        metaData.title,
        ' ',
        ' ',
        metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              displayFieldSelector(id);
            }, href: '#' },
          'edit'
        ) : null,
        metaData.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__ui_HelpTooltip__["a" /* default */],
          null,
          metaData.description
        ) : null
      ),
      preview ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: style.element('preview') },
        value
      ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({ className: style.element('input'),
        id: id,
        type: 'text',
        value: value || "",
        onChange: e => update(e.currentTarget.value)
      }, events))
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (TextBox);

/***/ }),

/***/ 869:
/*!**************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/Fallback.js ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EmbeddedResourceEditor__ = __webpack_require__(/*! ./EmbeddedResourceEditor */ 178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Autocomplete__ = __webpack_require__(/*! ./Autocomplete */ 363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_portal__ = __webpack_require__(/*! react-portal */ 872);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_portal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_portal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Fallback_scss__ = __webpack_require__(/*! ./Fallback.scss */ 873);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Fallback_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__Fallback_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }









const style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('fallback-input-box');
class Fallback extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      previousValue: null,
      creatingNew: false,
      fallbackValue: null
    }, this.handleNotFound = () => {
      this.setState({
        previousValue: this.props.value,
        creatingNew: true
      });
      this.props.update(null);
      this.portal.openPortal();
    }, this.handleBack = state => {
      if (this.state.previousValue) {
        this.props.update(this.state.previousValue);
      }
      this.setState({ creatingNew: false, previousValue: null });
    }, this.postSave = (prom, annotation) => {
      prom.then(val => {
        this.setState({ creatingNew: false, previousValue: null, fallbackValue: { url: val.payload.id, label: annotation.label } });
        this.props.update({ url: val.payload.id, label: annotation.label });
      });
    }, this.setPortal = ref => this.portal = ref, _temp;
  }

  render() {
    const { creatingNew, fallbackValue } = this.state;
    const _props = this.props,
          { autocomplete, captureModel, value, preview, metaData, currentDraft } = _props,
          props = _objectWithoutProperties(_props, ['autocomplete', 'captureModel', 'value', 'preview', 'metaData', 'currentDraft']);

    if (preview || this.state.fallbackValue) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        metaData ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          metaData.title
        ) : null,
        value && value.url ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: value.url, target: '_blank', className: style.element('entity') },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: style.element('preview-label') },
            value.label
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: style.element('preview-url') },
            value.url
          )
        ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'span',
          { className: style.element('empty') },
          'Nothing selected'
        )
      );
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        value.label,
        ' (',
        value.url,
        ')'
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style },
      metaData ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'label',
        { className: style.element('label'), htmlFor: props.id },
        metaData.title,
        ' ',
        ' ',
        metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              displayFieldSelector(id);
            }, href: '#' },
          'edit'
        ) : null,
        metaData.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__ui_HelpTooltip__["a" /* default */],
          null,
          metaData.description
        ) : null
      ) : null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Autocomplete__["a" /* default */], _extends({}, props, { value: value, suggestionProvider: value => {
          const url = autocomplete['@id'] + '&q=' + encodeURIComponent(value);

          return fetch(url).then(result => result.json()).then(response => response.completions);
        } })),
      currentDraft.selector ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'a',
        { className: style.element('fallback-button'), onClick: e => this.handleNotFound() },
        metaData.description || 'Can\'t find what you\'re looking for?'
      ) : null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5_react_portal___default.a,
        { ref: this.setPortal, isOpened: this.state.creatingNew },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: style.element('portal') },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: style.element('portal-inner') },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__EmbeddedResourceEditor__["a" /* default */], _extends({}, props, { currentDraft: currentDraft, captureModel: captureModel['@id'], postSave: this.postSave, onBack: this.handleBack }))
          )
        )
      )
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Fallback);

/***/ }),

/***/ 87:
/*!************************************************************!*\
  !*** ./packages/annotation-redux/src/actions/resources.js ***!
  \************************************************************/
/*! exports provided: IMPORT_RESOURCE_TREE, IMPORT_RESOURCE_CHOICE, IMPORT_RESOURCE_FIELD, IMPORT_UNKNOWN_RESOURCE, IMPORT_CAPTURE_MODEL, RESOURCE_NAV_FORWARD, RESOURCE_NAV_BACK, RESOURCE_NAV_RESET, importResource, importChoice, importCaptureModel, importField, moveForward, moveBack, reset, importResourceTree */
/*! exports used: IMPORT_CAPTURE_MODEL, IMPORT_RESOURCE_CHOICE, IMPORT_RESOURCE_FIELD, IMPORT_RESOURCE_TREE, IMPORT_UNKNOWN_RESOURCE, RESOURCE_NAV_BACK, RESOURCE_NAV_FORWARD, RESOURCE_NAV_RESET, importResource, importResourceTree, moveBack, moveForward, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["i"] = importResource;
/* unused harmony export importChoice */
/* unused harmony export importCaptureModel */
/* unused harmony export importField */
/* harmony export (immutable) */ __webpack_exports__["l"] = moveForward;
/* harmony export (immutable) */ __webpack_exports__["k"] = moveBack;
/* harmony export (immutable) */ __webpack_exports__["m"] = reset;
/* harmony export (immutable) */ __webpack_exports__["j"] = importResourceTree;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer__ = __webpack_require__(/*! ./viewer */ 68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper__ = __webpack_require__(/*! immutability-helper */ 30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_immutability_helper__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }




const IMPORT_RESOURCE_TREE = 'IMPORT_RESOURCE_TREE';
/* harmony export (immutable) */ __webpack_exports__["d"] = IMPORT_RESOURCE_TREE;

const IMPORT_RESOURCE_CHOICE = 'IMPORT_RESOURCE_CHOICE';
/* harmony export (immutable) */ __webpack_exports__["b"] = IMPORT_RESOURCE_CHOICE;

const IMPORT_RESOURCE_FIELD = 'IMPORT_RESOURCE_FIELD';
/* harmony export (immutable) */ __webpack_exports__["c"] = IMPORT_RESOURCE_FIELD;

const IMPORT_UNKNOWN_RESOURCE = 'IMPORT_UNKNOWN_RESOURCE';
/* harmony export (immutable) */ __webpack_exports__["e"] = IMPORT_UNKNOWN_RESOURCE;

const IMPORT_CAPTURE_MODEL = 'IMPORT_CAPTURE_MODEL';
/* harmony export (immutable) */ __webpack_exports__["a"] = IMPORT_CAPTURE_MODEL;

const RESOURCE_NAV_FORWARD = 'RESOURCE_NAV_FORWARD';
/* harmony export (immutable) */ __webpack_exports__["g"] = RESOURCE_NAV_FORWARD;

const RESOURCE_NAV_BACK = 'RESOURCE_NAV_BACK';
/* harmony export (immutable) */ __webpack_exports__["f"] = RESOURCE_NAV_BACK;

const RESOURCE_NAV_RESET = 'RESOURCE_NAV_RESET';
/* harmony export (immutable) */ __webpack_exports__["h"] = RESOURCE_NAV_RESET;


function importResource(resource) {
  if (resource.metaData && resource.metaData.selectorValue && resource.metaData.selectorValue.unit && resource.metaData.selectorValue.unit === 'percent') {
    return importResourceWithPercentage(resource);
  }
  if (resource.type === 'choice') {
    return importChoice(resource);
  }
  if (resource.type === 'captureModel') {
    return importCaptureModel(resource);
  }
  if (resource.type === 'field') {
    return importField(resource);
  }
  console.warn('NOT FOUND', resource);
  return {
    type: IMPORT_UNKNOWN_RESOURCE,
    error: true,
    payload: new Error(`Unknown resource (${resource.type}) imported`)
  };
}

function importChoice(resource) {
  return { type: IMPORT_RESOURCE_CHOICE, payload: { resource } };
}

function importCaptureModel(resource) {
  return { type: IMPORT_CAPTURE_MODEL, payload: { id: resource.id, resource } };
}

function importField(_ref) {
  let { parentId } = _ref,
      resource = _objectWithoutProperties(_ref, ['parentId']);

  if (!parentId) {
    return {
      type: IMPORT_RESOURCE_FIELD,
      error: true,
      payload: new Error('Cannot import dereferenced field (expected resource.parentId)')
    };
  }
  return { type: IMPORT_RESOURCE_FIELD, payload: { id: parentId, resource } };
}

/**
 * Moves user forward in path.
 */
function moveForward(tree, path) {
  return { type: RESOURCE_NAV_FORWARD, payload: { tree, path } };
}

/**
 * Moves user back in path.
 */
function moveBack(tree) {
  return { type: RESOURCE_NAV_BACK, payload: { tree } };
}

/**
 * Reset user to root.
 */
function reset(tree) {
  return { type: RESOURCE_NAV_RESET, payload: { tree } };
}

function importResourceTree(tree) {
  if (!(tree.id && (tree.type === 'choice' || tree.type === 'captureModel') /*&&
                                                                            (tree.type === 'choice' ? (tree.choice && Object.keys(tree.choice).length > 1) : true)*/
  )) {
    return { type: IMPORT_RESOURCE_TREE, error: true, payload: new Error('Not a valid tree') };
  }

  return { type: IMPORT_RESOURCE_TREE, payload: { id: tree.id, tree } };
}

function importResourceWithPercentage(resource) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__viewer__["b" /* withViewer */])((Canvas, dispatch) => {
    const { width, height } = Canvas.getImageSize();

    if (!(resource.metaData && resource.metaData.selectorValue && resource.metaData.selectorValue.x && resource.metaData.selectorValue.y && width && height)) {
      return dispatch({
        type: IMPORT_UNKNOWN_RESOURCE,
        error: true,
        payload: new Error('Unknown resource, unable to convert from percentage to pixel format')
      });
    }

    const fixedResource = __WEBPACK_IMPORTED_MODULE_1_immutability_helper___default()(resource, {
      metaData: {
        selectorValue: {
          $merge: _extends({}, resource.metaData.selectorValue, {
            x: resource.metaData.selectorValue.x / 100 * width,
            y: resource.metaData.selectorValue.y / 100 * height,
            width: resource.metaData.selectorValue.width / 100 * width,
            height: resource.metaData.selectorValue.height / 100 * height,
            immutable: true,
            scale: 1,
            unit: 'pixel'
          })
        }
      }
    });

    dispatch(importResource(fixedResource));
  });
}

/***/ }),

/***/ 870:
/*!******************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/EmbeddedResourceEditor.scss ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./EmbeddedResourceEditor.scss */ 871);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./EmbeddedResourceEditor.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./EmbeddedResourceEditor.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 871:
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/EmbeddedResourceEditor.scss ***!
  \*****************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".embedded-resource-editor {\n  border: 1px solid #DDD;\n  padding: 15px; }\n", ""]);

// exports


/***/ }),

/***/ 873:
/*!****************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/Fallback.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Fallback.scss */ 874);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Fallback.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Fallback.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 874:
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/Fallback.scss ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".fallback-input-box__portal {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #fff;\n  overflow: auto;\n  padding: 30px;\n  z-index: 10000; }\n\n.fallback-input-box__portal-inner {\n  margin: 0 auto;\n  padding: 15px;\n  max-width: 500px; }\n\n.fallback-input-box__entity {\n  transition: all .2s;\n  display: block;\n  margin-top: 3px;\n  padding: 5px 10px;\n  border-radius: 3px;\n  border: 1px solid #EEE;\n  border-bottom-color: #CCC; }\n  .fallback-input-box__entity:hover {\n    border-color: royalblue; }\n    .fallback-input-box__entity:hover .fallback-input-box__preview-url {\n      color: royalblue; }\n\n.fallback-input-box__preview-label {\n  color: #000; }\n\n.fallback-input-box__preview-url {\n  transition: all .2s;\n  color: #999;\n  font-size: 11px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: block; }\n", ""]);

// exports


/***/ }),

/***/ 875:
/*!************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/Hidden.js ***!
  \************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Hidden_scss__ = __webpack_require__(/*! ./Hidden.scss */ 876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Hidden_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Hidden_scss__);




const style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('hidden-input');

class Hidden extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  componentDidMount() {
    const { metaData, update } = this.props;
    if (metaData.defaultValue) {
      update(metaData.defaultValue);
    }
  }

  render() {
    const { id, value, metaData, preview, update, displayFieldSelector, elementEvents } = this.props;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style.modifier({ 'labeled-selector': metaData.selector && metaData.title }) },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'label',
        { className: style.element('label'), htmlFor: id },
        metaData.title,
        ' ',
        ' ',
        metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              displayFieldSelector(id);
            }, href: '#' },
          'edit'
        ) : null
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { id: id, type: 'hidden', value: value || '' })
    );
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Hidden;


/***/ }),

/***/ 876:
/*!**************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/Hidden.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Hidden.scss */ 877);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Hidden.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Hidden.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 877:
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/Hidden.scss ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".hidden-input {\n  display: none; }\n  .hidden-input--labeled-selector {\n    display: block; }\n", ""]);

// exports


/***/ }),

/***/ 878:
/*!**************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/NullableCaptureModel.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EmbeddedResourceEditor__ = __webpack_require__(/*! ./EmbeddedResourceEditor */ 178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_HelpTooltip__ = __webpack_require__(/*! ../ui/HelpTooltip */ 31);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






const style = __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default.a.block('nullable-capture-model');
class NullableCaptureModel extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = { isChecked: false, isSaved: false, annotation: null }, this.onReceiveEmbeddedItem = item => item.then(item => {
      const id = item.payload.annotation.id;
      this.props.update(id);
      this.setState({ isSaved: true, annotation: item.payload.annotation });
    }), this.handleChange = () => {
      const captureModel = this.getCaptureModel();
      const isChecked = !this.state.isChecked;
      if (!this.props.value) {
        this.props.update(isChecked ? captureModel['@id'] : null);
      }
      this.setState({ isChecked });
    }, _temp;
  }

  getCaptureModel() {
    return this.props.annotationMetaData.options.find(e => e['o:label'] === 'madoc:capturemodel');
  }

  render() {
    const { isChecked, isSaved, annotation } = this.state;
    const _props = this.props,
          { id, metaData, annotationMetaData, displayFieldSelector, value } = _props,
          props = _objectWithoutProperties(_props, ['id', 'metaData', 'annotationMetaData', 'displayFieldSelector', 'value']);
    const checkbox = annotationMetaData.options.find(e => e['o:label'] === 'madoc:checkbox');
    const captureModel = annotationMetaData.options.find(e => e['o:label'] === 'madoc:capturemodel');
    if (!checkbox || !captureModel) {
      console.warn('NullableCaptureModel component failed to mount.', this.props);
      return;
    }
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: style.element('checkbox-container').modifiers({ 'is-checked': this.state.isChecked }) },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { className: style.element('checkbox'), id: id, type: 'checkbox', value: this.state.isChecked, onChange: this.handleChange })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'label',
        { className: style.element('label'), htmlFor: id },
        metaData.title,
        ' ',
        ' ',
        metaData.selector && metaData.selectorValue ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { onClick: e => {
              e.preventDefault();
              displayFieldSelector(id);
            }, href: '#' },
          'edit'
        ) : null,
        metaData.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__ui_HelpTooltip__["a" /* default */],
          null,
          metaData.description
        ) : null
      ),
      isChecked ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        isSaved ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          annotation.label,
          ' (',
          annotation.id,
          ')'
        ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__EmbeddedResourceEditor__["a" /* default */], _extends({ captureModel: captureModel['@id'], postSave: this.onReceiveEmbeddedItem }, props))
      ) : null
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NullableCaptureModel;


/***/ }),

/***/ 879:
/*!****************************************************************************!*\
  !*** ./packages/annotation-components/src/components/domain/validation.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(/*! moment */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);


/* harmony default export */ __webpack_exports__["a"] = ({
  'http://xmlns.com/foaf/name': item => {
    return {
      isValid: typeof item === 'string' && item.length >= 1,
      message: 'Name must not be blank'
    };
  },
  'https://schema.org/birthDate': item => {
    return {
      isValid: __WEBPACK_IMPORTED_MODULE_0_moment___default()(item).isValid(),
      message: 'You must provide a valid date of birth'
    };
  },
  'https://schema.org/jobTitle': item => {
    return {
      isValid: typeof item === 'string' && item.length >= 1,
      message: 'Job title must not be blank'
    };
  },
  'http://dublincore.org/documents/dcmi-terms/#terms-description': item => {
    return {
      isValid: typeof item === 'string' && item.length >= 1,
      message: 'Description must not be blank'
    };
  }
});

/***/ }),

/***/ 88:
/*!**************************************************************!*\
  !*** ./packages/annotation-redux/src/lib/elucidate/index.js ***!
  \**************************************************************/
/*! exports provided: AnnotationSelector, makeRequest, get, post, putAnnotation, getAnnotation, getAllAnnotationsFromCollection, createElucidateCollection, postAnnotation, sendAnnotationToServer */
/*! exports used: AnnotationSelector, createElucidateCollection, getAllAnnotationsFromCollection, postAnnotation, putAnnotation, sendAnnotationToServer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export makeRequest */
/* unused harmony export get */
/* unused harmony export post */
/* harmony export (immutable) */ __webpack_exports__["e"] = putAnnotation;
/* unused harmony export getAnnotation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getAllAnnotationsFromCollection; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createElucidateCollection;
/* harmony export (immutable) */ __webpack_exports__["d"] = postAnnotation;
/* harmony export (immutable) */ __webpack_exports__["f"] = sendAnnotationToServer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(/*! whatwg-fetch */ 225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnnotationSelector__ = __webpack_require__(/*! ./AnnotationSelector */ 577);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__AnnotationSelector__["a"]; });
var _asyncGenerator = function () { function AwaitValue(value) { this.value = value; } function AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; if (value instanceof AwaitValue) { Promise.resolve(value.value).then(function (arg) { resume("next", arg); }, function (arg) { resume("throw", arg); }); } else { settle(result.done ? "return" : "normal", result.value); } } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } } if (typeof Symbol === "function" && Symbol.asyncIterator) { AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; } AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); }; AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); }; AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); }; return { wrap: function (fn) { return function () { return new AsyncGenerator(fn.apply(this, arguments)); }; }, await: function (value) { return new AwaitValue(value); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let fetchPageCollection = (() => {
  var _ref2 = _asyncGenerator.wrap(function* (resource) {
    const currentPage = yield _asyncGenerator.await(get(resource));
    if (currentPage.items) {
      for (let item of currentPage.items) {
        yield item;
      }
    }
    if (currentPage.next) {
      return fetchPageCollection(currentPage.next);
    }
  });

  return function fetchPageCollection(_x2) {
    return _ref2.apply(this, arguments);
  };
})();



const JSON_LD_HEADERS = {
  'Content-Type': 'application/ld+json',
  Accept: 'application/ld+json'
};



const CONTEXT = 'http://www.w3.org/ns/anno.jsonld';

function makeRequest(method, uri, body, headers = []) {
  return fetch(uri, {
    method,
    headers: _extends({}, JSON_LD_HEADERS, headers),
    body: JSON.stringify(body),
    credentials: 'same-origin',
    redirect: 'follow'
  }).then(response => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    return {
      error: response.statusText,
      status: response.status
    };
  });
}

function get(uri, body) {
  return makeRequest('GET', uri, body);
}

function post(uri, body, headers = []) {
  return makeRequest('POST', uri, body, headers);
}

function putAnnotation(uri, body, headers = []) {
  return makeRequest('PUT', uri, body, headers);
}

function getAnnotation(server, id) {
  return get(`${server}${id}/`);
}

let getAllAnnotationsFromCollection = (() => {
  var _ref = _asyncGenerator.wrap(function* (collectionResource) {
    const firstPage = collectionResource.first;
    if (!firstPage.items) {
      return;
    }
    // First page of results.
    for (let item of firstPage.items) {
      yield item;
    }
    // Further pages of results.
    if (firstPage.next) {
      const collection = fetchPageCollection(firstPage.next);
      do {
        const item = yield _asyncGenerator.await(collection.next());
        if (item.done) {
          return;
        }
        yield item.value;
      } while (true);
    }
  });

  return function getAllAnnotationsFromCollection(_x) {
    return _ref.apply(this, arguments);
  };
})();

function createElucidateCollection(server, label, id) {
  return getAnnotation(server, id).then(response => {
    if (response.status === 404) {
      return post(server, {
        '@context': CONTEXT,
        type: 'AnnotationCollection',
        label
      }, {
        Slug: id
      });
    }
    // Digest collection
    return response;
  });
}

function postAnnotation(collection, annotation) {
  return post(collection, annotation);
}

/**
 * @deprecated
 */
function sendAnnotationToServer(server, body, target, motivation, label) {
  return post(server, {
    '@context': CONTEXT,
    type: 'Annotation',
    label: label ? label : 'unknown',
    body,
    target,
    motivation
  });
}

/***/ }),

/***/ 880:
/*!****************************************************************************!*\
  !*** ./packages/annotation-components/src/components/composites/Canvas.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_Toggle__ = __webpack_require__(/*! ../ui/Toggle */ 881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__viewers_Viewer__ = __webpack_require__(/*! ../viewers/Viewer */ 356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Canvas_scss__ = __webpack_require__(/*! ./Canvas.scss */ 884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Canvas_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Canvas_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__viewers_Region__ = __webpack_require__(/*! ../viewers/Region */ 886);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








const $canvas = __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default.a.block('canvas');

class Canvas extends __WEBPACK_IMPORTED_MODULE_1_react__["Component"] {

  // propTypes = {
  //   onUpdateSelector: PropTypes.func,
  //   onSaveSelector: PropTypes.func,
  //   selector: PropTypes.shape({
  //     type: PropTypes.string.isRequired,
  //     left: PropTypes.number,
  //     top: PropTypes.number,
  //     height: PropTypes.number,
  //     width: PropTypes.number,
  //   }),
  //   image: PropTypes.shape({
  //     src: PropTypes.string.isRequired,
  //     height: PropTypes.number.isRequired,
  //     width: PropTypes.number.isRequired,
  //   }).isRequired,
  //   displayWidth: PropTypes.number.isRequired,
  // };

  constructor() {
    super();

    this.mapRegion = (_ref, index) => {
      let { type: regionType, x, y, height, width: regionWidth } = _ref,
          region = _objectWithoutProperties(_ref, ['type', 'x', 'y', 'height', 'width']);

      const { onEditRegion, displayWidth, width, onUpdateSelector, onSaveSelector } = this.props;
      const scale = displayWidth / width;

      const type = regionType ? regionType : x && y && height && regionWidth ? 'madoc:boxdraw' : x && y ? 'madoc:pin' : 'WholeCanvasSelector';

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__viewers_Region__["a" /* default */], {
        key: index,
        id: region.id,
        type: type,
        x: x,
        y: y,
        width: regionWidth,
        height: height,

        isInitial: false // To change
        , isChanging: false // To change
        , canChange: region.immutable === false,
        pointerEvents: true // To change

        , pixelScale: scale,

        onChange: onEditRegion // Combined with canChange
        , onUpdate: onUpdateSelector // To change
        , onCommit: onSaveSelector // To change
        , onClick: () => null // To change

        , meta: _extends({
          isSecondary: region.isSecondary || false,
          isSelected: region.selected || false,
          focused: region.focused || false
        }, region)
      });
    };

    this.resolveViewer = null;
    this.viewerReady = new Promise((resolve, err) => {
      this.resolveViewer = resolve;
    });
    this.state = {
      showAnnotations: true,
      position: {
        x: -1,
        y: -1,
        scale: 0,
        rotation: 0
      }
    };
  }

  renderCurrentSelector(selector, defaultPosition, relativeTo) {

    // Nope.
    if (!selector) {
      return null;
    }

    // Nothing is relative to the canvas yet.
    if (relativeTo === Canvas.CANVAS_RELATIVE && selector.type !== 'madoc:pin') {
      return null;
    }
    if (relativeTo !== Canvas.CANVAS_RELATIVE && selector.type === 'madoc:pin') {
      return null;
    }

    const {
      onUpdateSelector,
      onSaveSelector,
      image: {
        width
      },
      displayWidth,
      onEditRegion
    } = this.props;

    const { type } = selector,
          position = _objectWithoutProperties(selector, ['type']);
    const scale = displayWidth / width;

    const isInitial = type === 'madoc:boxdraw' ? !position.x && !position.y : false;

    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__viewers_Region__["a" /* default */], {
      id: position.id,
      type: type,
      x: position.x,
      y: position.y,
      defaultX: defaultPosition.x,
      defaultY: defaultPosition.y,
      width: position.width || null,
      height: position.height || null,

      isInitial: isInitial,
      isChanging: true,
      canChange: true // Change change if its being changed? maybe change.
      , pointerEvents: true // To change

      , pixelScale: scale,

      onChange: onEditRegion // Combined with canChange
      , onUpdate: onUpdateSelector // To change
      , onCommit: onSaveSelector // To change
      , onClick: () => null // To change

      , meta: {
        isSecondary: position.isSecondary || false,
        isSelected: position.isSelected || false,
        focused: position.focused || false
      }
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const props = this.props;

    return nextState.showAnnotations !== this.state.showAnnotations || props.displayWidth !== nextProps.displayWidth || props.selector !== nextProps.selector || props.regions !== nextProps.regions || props.regions.length !== nextProps.regions.length;
  }

  createRelativePoint(x, y) {
    return this.viewer.createRelativePoint(x, y);
  }

  createViewportPoint(x, y) {
    return this.viewer.createViewportPoint(x, y);
  }

  getSelectedRegion() {
    return this.viewer.getSelectedRegion();
  }

  getImageSize() {
    const { image: { width, height } } = this.props;

    return {
      width,
      height
    };
  }

  getScale() {
    const {
      image: {
        width
      },
      displayWidth
    } = this.props;
    return displayWidth / width;
  }

  setViewer(viewer) {
    this.resolveViewer(viewer);
    this.viewer = viewer;
  }

  render() {
    const _props = this.props,
          {
      image: {
        src,
        height,
        width
      },
      maxHeight,
      showAnnotationToggle,
      displayWidth,
      selector,
      selectedViewer,
      regions,
      onEditRegion,
      onUpdateSelector,
      onSaveSelector
    } = _props,
          props = _objectWithoutProperties(_props, ['image', 'maxHeight', 'showAnnotationToggle', 'displayWidth', 'selector', 'selectedViewer', 'regions', 'onEditRegion', 'onUpdateSelector', 'onSaveSelector']);

    const scale = displayWidth / width;

    const regionRender = this.state.showAnnotations ? Object.keys(regions).reverse().map(r => regions[r]).map(this.mapRegion) : null;

    const currentSelectorPropsViewport = {
      width: 100,
      height: 100,
      x: displayWidth / 2 - 50,
      y: (height * scale < maxHeight ? height * scale : maxHeight) / 2 - 50
    };

    const currentSelectorPropsCanvas = {
      width: 100,
      height: 100,
      x: width / 2 - 50,
      y: height / 2 - 50
    };

    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { className: $canvas },
      showAnnotationToggle ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: $canvas.element('info-bar') },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ui_Toggle__["a" /* default */], {
          label: 'toggle annotations',
          className: $canvas.element('toggle'),
          onChange: value => this.toggleAnnotations(value),
          isActive: this.state.showAnnotations })
      ) : null,
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        { className: $canvas.element('viewport'), style: { maxHeight: height * scale, width: width * scale } },
        this.renderCurrentSelector(selector, currentSelectorPropsViewport, Canvas.VIEWPORT_RELATIVE),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3__viewers_Viewer__["a" /* default */],
          _extends({
            getRef: ref => this.setViewer(ref),
            type: selectedViewer === 'OpenSeadragonViewer' ? 'OpenSeadragonViewer' : 'ScaledImageViewer',
            resource: src,
            scale: scale,
            width: width,
            height: height,
            maxHeight: maxHeight
          }, props),
          regionRender,
          this.renderCurrentSelector(selector, currentSelectorPropsCanvas, Canvas.CANVAS_RELATIVE)
        )
      )
    );
  }

  toggleAnnotations() {
    this.setState(() => ({
      showAnnotations: !this.state.showAnnotations
    }));
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Canvas;

Canvas.VIEWPORT_RELATIVE = 'VIEWPORT_RELATIVE';
Canvas.CANVAS_RELATIVE = 'CANVAS_RELATIVE';

/***/ }),

/***/ 881:
/*!********************************************************************!*\
  !*** ./packages/annotation-components/src/components/ui/Toggle.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Toggle_scss__ = __webpack_require__(/*! ./Toggle.scss */ 882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Toggle_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Toggle_scss__);




const style = __WEBPACK_IMPORTED_MODULE_0_digirati_bem_js___default.a.block('toggle');

class Toggle extends __WEBPACK_IMPORTED_MODULE_1_react__["PureComponent"] {

  render() {
    const { label, isActive, className, onChange } = this.props;
    return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      'div',
      { className: `${style} ${className}` },
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'span',
        { className: style.element('label') },
        label
      ),
      __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        {
          onKeyDown: e => {
            if (e.keyCode === 32 || e.keyCode === 13) {
              e.nativeEvent.preventDefault();
              onChange(!isActive);
            }
          },
          tabIndex: '0',
          className: style.element('hitbox').modifier('active', isActive),
          onClick: () => onChange(!isActive) },
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { className: style.element('ball').modifier('active', isActive) })
      )
    );
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Toggle);

/***/ }),

/***/ 882:
/*!**********************************************************************!*\
  !*** ./packages/annotation-components/src/components/ui/Toggle.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Toggle.scss */ 883);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Toggle.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Toggle.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 883:
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/ui/Toggle.scss ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".toggle {\n  display: inline-block;\n  box-sizing: border-box;\n  cursor: pointer; }\n  .toggle * {\n    box-sizing: border-box; }\n  .toggle__label {\n    pointer-events: none;\n    opacity: 0;\n    transition: opacity .2s; }\n  .toggle:hover .toggle__label {\n    opacity: 1; }\n  .toggle__label {\n    color: #fff;\n    margin: 5px;\n    background: rgba(0, 0, 0, 0.8);\n    border: 1px solid rgba(255, 255, 255, 0.8);\n    font-size: 14px;\n    padding: 5px 10px;\n    border-radius: 1px;\n    height: 32px;\n    position: absolute;\n    top: 35px; }\n  .toggle__hitbox {\n    display: inline-block;\n    border-radius: 20px;\n    z-index: 100;\n    pointer-events: auto;\n    width: 44px;\n    height: 24px;\n    padding: 2px;\n    background: #FFF;\n    border: 1px solid #DDD;\n    transition: background .2s; }\n    .toggle__hitbox:focus {\n      outline: none;\n      background: #EEE;\n      border: 1px solid #919191; }\n    .toggle__hitbox--active:focus {\n      background: #ecf3fe;\n      border: 1px solid #1266f1; }\n  .toggle__ball {\n    width: 18px;\n    border-radius: 18px;\n    border: 1px solid #888;\n    transition: all .2s;\n    height: 18px;\n    display: block;\n    margin-left: 20px;\n    background: #AAA; }\n    .toggle__ball--active {\n      margin-left: 0;\n      background: #4285F4;\n      border: 1px solid #1266f1; }\n", ""]);

// exports


/***/ }),

/***/ 884:
/*!******************************************************************************!*\
  !*** ./packages/annotation-components/src/components/composites/Canvas.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Canvas.scss */ 885);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Canvas.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Canvas.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 885:
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/composites/Canvas.scss ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".canvas {\n  position: relative; }\n  .canvas__info-bar {\n    user-select: none;\n    pointer-events: none;\n    position: absolute;\n    top: 20px;\n    left: 20px;\n    right: 20px;\n    padding: 5px;\n    height: 30px;\n    z-index: 99999; }\n    .canvas__info-bar * {\n      pointer-events: initial; }\n  .canvas__viewport {\n    overflow: hidden;\n    position: relative; }\n", ""]);

// exports


/***/ }),

/***/ 886:
/*!*************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/Region.js ***!
  \*************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectors_Selector__ = __webpack_require__(/*! ../selectors/Selector */ 360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Region_scss__ = __webpack_require__(/*! ./Region.scss */ 887);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Region_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Region_scss__);




const style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('region');

class Region extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {

  renderRegionBox() {
    if (!(this.props.x && this.props.y && this.props.width && this.props.height)) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', null);
    }
    const { id, type, x, y, width, height, editing, canChange, onChange, meta } = this.props;
    const { isSelected, isSecondary, focused } = meta;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      {
        key: id,
        className: style,
        onClick: () => {
          let el = document.getElementById(id);
          if (el) {
            el.focus();
          }
        },
        style: {
          top: y,
          left: x,
          width: width,
          height: height
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: style.element('item').modifiers({
          focused,
          editing,
          selected: isSelected,
          [type.replace(/:/, '-')]: true
        }, true) })
    );
  }

  render() {
    const {
      // Variables
      id,
      type,
      x,
      y,
      width,
      height,

      // Flags
      isInitial,
      isChanging,
      canChange,
      pointerEvents,
      editing,

      // Scales
      pixelScale,
      canvasScale,

      // Event handlers
      onChange, // no needed?
      onEdit,
      onUpdate,
      onCommit,
      onClick,

      defaultX,
      defaultY,

      // Misc
      meta
    } = this.props;

    // We never render whole canvas.
    if (type === 'WholeCanvasSelector') {
      return null;
    }

    const posX = isChanging ? x ? x : defaultX : x;
    const posY = isChanging ? y ? y : defaultY : y;

    // TECH DEBT.
    if (type === 'madoc:boxdraw' && isChanging === false) {
      return this.renderRegionBox();
    }

    return type && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__selectors_Selector__["a" /* default */], {
      id: id,
      type: type,
      drag: isChanging,
      x: posX,
      y: posY,
      width: width,
      height: height,
      editing: editing // false
      , onEdit: onEdit,
      onUpdate: onUpdate,
      onSave: onCommit,
      canvasScale: canvasScale,
      isSecondary: meta ? meta.isSecondary : false
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Region;


/***/ }),

/***/ 887:
/*!***************************************************************************!*\
  !*** ./packages/annotation-components/src/components/viewers/Region.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Region.scss */ 888);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Region.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./Region.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 888:
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/viewers/Region.scss ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".region {\n  position: absolute;\n  pointer-events: auto; }\n  .region__item {\n    height: 100%;\n    width: 100%;\n    outline: 8px solid #FFF;\n    background-color: rgba(255, 255, 255, 0.3); }\n    .region__item--selected {\n      outline-width: 16px; }\n    .region__item--focused {\n      outline-color: indigo; }\n    .region__item--editing {\n      outline: 16px solid #4285F4; }\n", ""]);

// exports


/***/ }),

/***/ 889:
/*!**************************************************************************************!*\
  !*** ./packages/annotation-components/src/components/composites/ConfirmationForm.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__inputs_Form__ = __webpack_require__(/*! ../inputs/Form */ 362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_isequal__ = __webpack_require__(/*! lodash.isequal */ 142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_isequal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash_isequal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inputs_ComboButton__ = __webpack_require__(/*! ../inputs/ComboButton */ 179);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }







const baseStyle = __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default.a.block('full-form');

class ConfirmationForm extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      onlineStatus: ConfirmationForm.ONLINE
    }, this.setOnline = () => {
      this.setState({ onlineStatus: ConfirmationForm.ONLINE });
    }, this.setOffline = () => {
      this.setState({ onlineStatus: ConfirmationForm.OFFLINE });
    }, _temp;
  }

  // propTypes = {
  //   draft: PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     isPreviewing: PropTypes.bool.isRequired,
  //     input: PropTypes.object.isRequired,
  //   }),
  //   bem: PropTypes.object,
  //   nextLabel: PropTypes.string,
  //   editLabel: PropTypes.string,
  //   saveLabel: PropTypes.string,
  //   updateField: PropTypes.func.isRequired,
  //   onEdit: PropTypes.func,
  //   onSave: PropTypes.func,
  //   previewDraft: PropTypes.func.isRequired,
  // };

  componentDidMount() {
    this.setState({ onlineStatus: navigator.onLine ? ConfirmationForm.ONLINE : ConfirmationForm.OFFLINE });
    window.addEventListener('online', this.setOnline);
    window.addEventListener('offline', this.setOffline);
  }

  renderPublishButton(draft) {
    const {
      onSave,
      onSaveAsInProgress,
      onSaveAsIncomplete,
      enableLocalStorageSaving = false,
      enablePublishing = true
    } = this.props;
    if (!onSave) return null;

    if (this.state.onlineStatus === ConfirmationForm.OFFLINE) {
      if (!onSaveAsInProgress || enablePublishing === false) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__inputs_ComboButton__["a" /* default */],
          { disabled: true },
          'Save'
        );
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4__inputs_ComboButton__["a" /* default */],
        { onClick: () => onSaveAsInProgress(draft) },
        'Save work as in progress'
      );
    }

    if (enablePublishing === false) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4__inputs_ComboButton__["a" /* default */],
        { onClick: () => onSaveAsIncomplete(draft) },
        'Save',
        enableLocalStorageSaving && (draft.fingerprint.source === 'localStorage' ? draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_CHANGED' || draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_NEW' : true) && onSaveAsInProgress ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_4__inputs_ComboButton__["a" /* default */].Option,
          { onClick: () => onSaveAsInProgress(draft) },
          'Save on this computer'
        ) : null
      );
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_4__inputs_ComboButton__["a" /* default */],
      { onClick: () => onSave(draft) },
      'Publish',
      enableLocalStorageSaving && (draft.fingerprint.source === 'localStorage' ? draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_CHANGED' || draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_NEW' : true) && onSaveAsInProgress ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4__inputs_ComboButton__["a" /* default */].Option,
        { onClick: () => onSaveAsInProgress(draft) },
        'Save on this computer'
      ) : null,
      (draft.fingerprint.source === 'elucidate' ? draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_CHANGED' || draft.fingerprint.lifecycle === 'DRAFT_LIFECYCLE_NEW' : true) && onSaveAsIncomplete ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_4__inputs_ComboButton__["a" /* default */].Option,
        { onClick: () => onSaveAsIncomplete(draft) },
        'Save work as in progress'
      ) : null
    );
  }

  render() {
    const _props = this.props,
          {
      // Variables.
      draft,
      fields,
      bem,
      nextLabel,
      editLabel,
      saveLabel,
      saveAsInProgressLabel,
      children,
      // Actions.
      updateField,
      onEdit,
      onSave,
      onSaveAsInProgress,
      onSaveAsIncomplete,
      previewDraft
    } = _props,
          props = _objectWithoutProperties(_props, ['draft', 'fields', 'bem', 'nextLabel', 'editLabel', 'saveLabel', 'saveAsInProgressLabel', 'children', 'updateField', 'onEdit', 'onSave', 'onSaveAsInProgress', 'onSaveAsIncomplete', 'previewDraft']);

    const style = bem ? bem : baseStyle;
    const draftIsEmpty = draft ? Object.values(draft.input).filter(e => e).length === 0 : true;
    const nextButtonProps = {};
    if (draftIsEmpty) {
      nextButtonProps.disabled = 'disabled';
    }

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style },
      children ? children : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__inputs_Form__["a" /* default */], _extends({
        draft: draft,
        fields: fields,
        updateField: (input, value) => updateField(draft.id, { [input.id]: value })
      }, props)),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: style.element('actions') },
        draft.isPreviewing ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          onEdit ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { className: style.element('back-btn').modifiers({ first: true, last: !!onSave }),
              onClick: () => onEdit(draft) },
            editLabel ? editLabel : 'Edit'
          ) : null,
          this.renderPublishButton(draft)
        ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'button',
          _extends({ className: style.element('action-btn').modifiers({ first: true, last: true }),
            onClick: () => previewDraft(draft.id, draft) }, nextButtonProps),
          nextLabel ? nextLabel : 'Next'
        )
      )
    );
  }
}

ConfirmationForm.ONLINE = 0;
ConfirmationForm.OFFLINE = 1;
/* harmony default export */ __webpack_exports__["a"] = (ConfirmationForm);

/***/ }),

/***/ 890:
/*!*******************************************************************************!*\
  !*** ./packages/annotation-components/src/components/inputs/ComboButton.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/css-loader?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./ComboButton.scss */ 891);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./ComboButton.scss", function() {
			var newContent = require("!!../../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../../node_modules/sass-loader/lib/loader.js!./ComboButton.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 891:
/*!******************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-components/src/components/inputs/ComboButton.scss ***!
  \******************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".combo-button {\n  color: #fff;\n  position: relative;\n  float: right;\n  width: 200px;\n  font-size: 16px; }\n  .combo-button * {\n    box-sizing: border-box; }\n  .combo-button--disabled {\n    pointer-events: none;\n    opacity: 0.5; }\n  .combo-button__button {\n    background: #ED1C2E;\n    position: relative;\n    height: 35px;\n    display: block;\n    width: 100%; }\n  .combo-button__cta {\n    padding: 0 10px;\n    cursor: pointer;\n    height: 35px;\n    width: 100%;\n    display: block;\n    margin-right: 60px;\n    line-height: 35px; }\n    .combo-button__cta--single {\n      text-align: center; }\n    .combo-button__cta:hover {\n      background: #af0e1c; }\n  .combo-button__toggle {\n    background: #ED1C2E;\n    position: absolute;\n    display: block;\n    right: 0;\n    top: 0;\n    height: 35px;\n    width: 35px;\n    margin-left: 20px;\n    border-left: 1px solid #af0e1c;\n    font-size: 25px;\n    line-height: 35px;\n    text-align: center;\n    cursor: pointer; }\n    .combo-button__toggle--open, .combo-button__toggle:hover {\n      background: #af0e1c; }\n  .combo-button__list {\n    margin: 0;\n    padding: 0;\n    background: #af0e1c;\n    position: absolute;\n    left: 0;\n    right: 0;\n    list-style: none; }\n    .combo-button__list-item {\n      height: 35px;\n      line-height: 35px;\n      font-size: 14px;\n      padding: 0 10px;\n      cursor: pointer;\n      border-top: 1px solid #970c18; }\n", ""]);

// exports


/***/ }),

/***/ 892:
/*!****************************************************************************!*\
  !*** ./packages/annotation-components/src/components/composites/Router.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


class Router extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.state = {
      selected: null
    }, _temp;
  }
  // propTypes = {
  //   routes: PropTypes.arrayOf(
  //     PropTypes.shape({
  //       matches: PropTypes.func.isRequired,
  //       render: PropTypes.func.isRequired,
  //     }).isRequired
  //   ),
  //   state: PropTypes.any,
  //   renderNotFound: PropTypes.func,
  // };

  // shouldComponentUpdate(_, newState) {
  //   return newState.selected !== this.state.selected;
  // }

  render() {
    const { routes, state, renderNotFound } = this.props;
    for (let route of routes) {
      if (route.matches(state)) {
        return route.render();
      }
    }
    return renderNotFound ? renderNotFound() : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { style: { color: 'darkred', fontWeight: 'bold' } },
      'Route not found.'
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Router);

/***/ }),

/***/ 893:
/*!***************************************************************************!*\
  !*** ./packages/annotation-components/src/components/ui/ActionTimeAgo.js ***!
  \***************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(/*! moment */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);




const $style = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('action-time-ago');
class ActionTimeAgo extends __WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"] {

  render() {
    const { prefix, className, subject, verb, time, showComma = true } = this.props;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'span',
      { className: className ? className : $style },
      [prefix, verb, 'by', subject + (showComma ? ',' : null), __WEBPACK_IMPORTED_MODULE_2_moment___default()(time).fromNow()].filter(e => e).join(' ')
    );
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ActionTimeAgo;


/***/ }),

/***/ 899:
/*!*********************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/resourceEditor.plugin.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = ResourceEditorPlugin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_plugin_core__ = __webpack_require__(/*! digirati-annotation-plugin-core */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__resourceEditor_provider__ = __webpack_require__(/*! ./resourceEditor.provider */ 420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_digirati_annotation_bridge__ = __webpack_require__(/*! digirati-annotation-bridge */ 46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_query_resourceQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/resourceQuery */ 35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_store__ = __webpack_require__(/*! store */ 136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_store__);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }









function ResourceEditorPlugin($el, _ref, store) {
  let {
    canvas,
    manifest,
    serializationStrategy,
    resourceTemplates,
    enablePublishing = 'true',
    target = 'canvas'
  } = _ref,
      unknownProps = _objectWithoutProperties(_ref, ['canvas', 'manifest', 'serializationStrategy', 'resourceTemplates', 'enablePublishing', 'target']);

  __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_plugin_core__["b" /* utils */].unknownPropertyWarning(unknownProps);

  if (resourceTemplates) {
    const { dispatch } = store;

    const enablePublishingBoolean = enablePublishing ? enablePublishing === 'true' : false;

    const importCaptureModel = resourceTemplates => {
      let resourceTemplate = Object(__WEBPACK_IMPORTED_MODULE_5_digirati_annotation_redux_es_query_resourceQuery__["e" /* getResourceById */])(store.getState(), resourceTemplates);
      if (resourceTemplate) {
        return resourceTemplate;
      }

      return fetch(`${resourceTemplates}`).then(r => r.json()).then(resourceTemplate => {
        dispatch(Object(__WEBPACK_IMPORTED_MODULE_4_digirati_annotation_bridge__["d" /* importResourceTemplate */])(resourceTemplate, target));
        return resourceTemplate;
      });
    };

    return importCaptureModel(resourceTemplates).then(resourceTemplate => {
      Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__resourceEditor_provider__["a" /* default */], {
        store: store,
        target: target,
        tree: resourceTemplate['@id'],
        serializationStrategy: serializationStrategy,
        manifest: manifest,
        enablePublishing: enablePublishingBoolean,
        importCaptureModel: importCaptureModel,
        canvas: canvas }), $el);
      return store;
    });
  }
}

/***/ }),

/***/ 90:
/*!*******************************************************!*\
  !*** ./packages/annotation-bridge/src/annotations.js ***!
  \*******************************************************/
/*! exports provided: parseTarget, mapTarget, resourceTemplateReverseTypeLookup, mapAnnotationBody, createDraftListFromAnnotations, immutableRegionsFromDraftList, immutableRegionsFromAnnotations, editableRegionsFromDraftList, detectTypeOfAnnotation, getAnnotationBody, mapTargetToSelector, createDraftFromAnnotation */
/*! exports used: getAnnotationBody, immutableRegionsFromAnnotations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parseTarget */
/* unused harmony export mapTarget */
/* unused harmony export resourceTemplateReverseTypeLookup */
/* unused harmony export mapAnnotationBody */
/* unused harmony export createDraftListFromAnnotations */
/* unused harmony export immutableRegionsFromDraftList */
/* harmony export (immutable) */ __webpack_exports__["b"] = immutableRegionsFromAnnotations;
/* unused harmony export editableRegionsFromDraftList */
/* unused harmony export detectTypeOfAnnotation */
/* harmony export (immutable) */ __webpack_exports__["a"] = getAnnotationBody;
/* unused harmony export mapTargetToSelector */
/* unused harmony export createDraftFromAnnotation */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vocab__ = __webpack_require__(/*! ./vocab */ 69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__annotationBody__ = __webpack_require__(/*! ./annotationBody */ 628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_lib_elucidate_index__ = __webpack_require__(/*! digirati-annotation-redux/es/lib/elucidate/index */ 88);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };





/**
 * @deprecated
 */
function parseTarget(target, scale = 1) {
  return __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_lib_elucidate_index__["a" /* AnnotationSelector */].parse(target, scale);
}

function mapTarget(target, scale = 1) {
  const boxSelector = parseTarget(target, scale);
  if (!boxSelector || typeof boxSelector.target === 'string') {
    return { type: __WEBPACK_IMPORTED_MODULE_0__vocab__["A" /* WHOLE_CANVAS_SELECTOR */], target: boxSelector && boxSelector.target || '' };
  }
  boxSelector.type = __WEBPACK_IMPORTED_MODULE_0__vocab__["b" /* BOX_SELECTOR */];
  return boxSelector;
}

function resourceTemplateReverseTypeLookup(fields, key) {
  for (let template of Object.values(fields)) {
    if (template.metaData.conformsTo.label === key) {
      return template;
    }
  }
  return null;
}

function mapAnnotationBody(resourceTemplate, bodyFields) {
  const fields = Object.keys(bodyFields);
  const fieldMap = {};

  fields.forEach(field => {
    const template = resourceTemplateReverseTypeLookup(resourceTemplate, field);
    if (template) {
      fieldMap[template.id] = bodyFields[field];
    }
  });

  return fieldMap;
}

function createDraftListFromAnnotations(annotations, resourceTemplate, scale) {
  return annotations.map(anno => createDraftFromAnnotation(resourceTemplate, anno, scale)).filter(e => e);
}

function immutableRegionsFromDraftList(drafts) {
  return Object.keys(drafts).filter(k => drafts[k] && drafts[k].selector).map(k => drafts[k]).filter(anno => anno && anno.selector).map(anno => {
    const r = anno.selector.target;
    return {
      id: anno.id,
      onClick: () => {},
      left: r.x, // should be r.left
      top: r.y, // should be r.top
      height: r.height,
      width: r.width,
      scale: r.scale,
      selected: false,
      editing: false,
      immutable: true
    };
  });
}

function immutableRegionsFromAnnotations(annotations, resourceTemplate, scale) {
  return immutableRegionsFromDraftList(createDraftListFromAnnotations(annotations, resourceTemplate, scale));
}

function editableRegionsFromDraftList(drafts, currentDraftKey = null, onClickRegion = () => null, currentSelectorExists = true) {
  return Object.keys(drafts).filter(k => drafts[k] && drafts[k].selector).map(k => {
    const r = drafts[k].selector;
    return _extends({
      id: drafts[k].id,
      onClick: () => onClickRegion(k),
      selected: `${k}` === `${currentDraftKey}`,
      editing: `${k}` === `${currentDraftKey}` && currentSelectorExists,
      immutable: false
    }, r);
  });
}

function detectTypeOfAnnotation(annotation) {
  if (!annotation || !annotation.body) {
    return 'UNKNOWN';
  }

  if (annotation.body && annotation.body.type === 'SpecificResource') {
    return 'SPECIFIC_RESOURCE';
  }
  if (annotation.body && annotation.body.value && typeof annotation.body.value === 'string') {
    // @todo temporary type.
    return 'ANNOTATION_STUDIO';
  }
  if (Object.prototype.toString.call(annotation.body) === '[object Array]') {
    return 'ANNOTATION_ARRAY';
  }
  return 'UNKNOWN';
}

function getAnnotationBody(annotation) {
  const type = detectTypeOfAnnotation(annotation);

  switch (type) {
    case 'ANNOTATION_STUDIO':
      try {
        return JSON.parse(annotation.body.value);
      } catch (err) {
        return annotation.body.value;
      }
    case 'SPECIFIC_RESOURCE':
    default:
      return __WEBPACK_IMPORTED_MODULE_1__annotationBody__["a" /* default */].fromBody(annotation.body);
  }
}

function mapTargetToSelector(target) {
  return _extends({}, target.target, target);
}

function createDraftFromAnnotation(resourceTemplate, annotation, scale = 1) {
  if (!(resourceTemplate && resourceTemplate.fields)) {
    return null;
  }
  // Filter out empty bodied annotations.
  const body = getAnnotationBody(annotation);
  if (body === null) {
    return null;
  }

  return {
    id: annotation.id,
    input: mapAnnotationBody(resourceTemplate.fields, getAnnotationBody(annotation)),
    selector: mapTargetToSelector(mapTarget(annotation.target, scale)),
    isPublishing: true,
    isPreviewing: true,
    published: true,
    template: resourceTemplate.id
  };
}

/***/ }),

/***/ 900:
/*!********************************************************!*\
  !*** ./packages/annotation-bridge/src/model/Choice.js ***!
  \********************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_flatten__ = __webpack_require__(/*! lodash.flatten */ 901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_flatten___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_flatten__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vocab__ = __webpack_require__(/*! ../vocab */ 69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers__ = __webpack_require__(/*! ../helpers */ 109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__(/*! ../index */ 46);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }







class Choice {

  static is(choice) {
    const $ = Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["c" /* get */])(choice);

    if ($(__WEBPACK_IMPORTED_MODULE_1__vocab__["y" /* UI_CHOICE */]) === undefined) {
      Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["g" /* warning */])('Choice', $(__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]), `There is not a choice field on this Choice/Form. Working under the assumtion that it is a FORM and not a choice.`);
    }

    const firstChild = Array.isArray($(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */])) ? $(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */])[0] : $(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */]);
    const firstChildIsField = !!firstChild['crowds:uiInputType'];
    if (Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["y" /* UI_CHOICE */]), false) === true && Array.isArray($(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */]))) {}

    return $(__WEBPACK_IMPORTED_MODULE_1__vocab__["y" /* UI_CHOICE */]) === 'True' && Array.isArray($(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */]));
  }

  isValidTarget(target) {
    return !!this.choice.reduce((s, choice) => {
      if (choice.isValidTarget(target)) {
        s.push(choice);
      }
      return s;
    }, []).length;
  }

  getTree(target) {
    return {
      id: this.id,
      type: this.type,
      title: this.title,
      description: this.description,
      metaData: this.metaData,
      choice: this.choice.filter(choice => choice.isValidTarget(target)).map(choice => choice.type === 'choice' ? choice.getTree(target) : {
        id: choice.id,
        title: choice.title,
        description: choice.description,
        type: choice.type
      }).reduce((s, a) => {
        s[a.id] = a;
        return s;
      }, {})
    };
  }

  flatten() {
    const _ref = this,
          { choice } = _ref,
          item = _objectWithoutProperties(_ref, ['choice']);
    return __WEBPACK_IMPORTED_MODULE_0_lodash_flatten___default()([item, ...choice.map(c => c.flatten())]);
  }

  static fromJsonLD(jsonLd) {
    const $ = Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["c" /* get */])(jsonLd);
    return new Choice($(__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]), $(__WEBPACK_IMPORTED_MODULE_1__vocab__["w" /* TITLE */]), $(__WEBPACK_IMPORTED_MODULE_1__vocab__["e" /* DESCRIPTION */]), {
      combine: Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["c" /* COMBINE */], true)),
      externalise: Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["f" /* EXTERNALISE */], true)),
      humanReadable: Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["i" /* HUMAN_READABLE */], true)),
      serialize: Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["v" /* SERIALIZE */])),
      multiple: Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["p" /* MULTIPLE */])),
      motivatedBy: Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["e" /* motivationFromForm */])(Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["d" /* labelId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["o" /* MOTIVATED_BY */]))),
      labelParts: Object(__WEBPACK_IMPORTED_MODULE_2__helpers__["d" /* labelId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["n" /* LABEL_PARTS */]))
    }, $(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */]).map(template => Object(__WEBPACK_IMPORTED_MODULE_3__index__["a" /* constructUnknownTemplate */])(template)));
  }

  static fromData({ id, title, description, metaData = {}, choices }) {
    return new Choice(id, title, description, metaData, choices);
  }

  constructor(id, title, description, metaData = {}, choices) {
    this.type = 'choice';

    this.id = id;
    this.title = title;
    this.description = description;
    this.metaData = metaData;
    this.choice = choices;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Choice;


/***/ }),

/***/ 902:
/*!**************************************************************!*\
  !*** ./packages/annotation-bridge/src/model/CaptureModel.js ***!
  \**************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(/*! ../helpers */ 109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vocab__ = __webpack_require__(/*! ../vocab */ 69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Field__ = __webpack_require__(/*! ./Field */ 903);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }





class CaptureModel {

  static fromJsonLD(jsonLd) {
    const asArray = a => Array.isArray(a) ? a : [a];
    const $ = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* get */])(jsonLd);

    if ($(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */]) === undefined) {
      Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["g" /* warning */])('CaptureModel', $(__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]), `No fields found in this form, expected in field ${__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */]}`);
    }
    if ($(__WEBPACK_IMPORTED_MODULE_1__vocab__["w" /* TITLE */]) === undefined) {
      Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["g" /* warning */])('CaptureModel', $(__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]), `No title found in this form, expected in field ${__WEBPACK_IMPORTED_MODULE_1__vocab__["w" /* TITLE */]}`);
    }

    return new CaptureModel($('@context'), $(__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]), $(__WEBPACK_IMPORTED_MODULE_1__vocab__["w" /* TITLE */]), $(__WEBPACK_IMPORTED_MODULE_1__vocab__["e" /* DESCRIPTION */]), {
      combine: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["c" /* COMBINE */], true)),
      externalise: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["f" /* EXTERNALISE */], true)),
      humanReadable: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["i" /* HUMAN_READABLE */], true)),
      serialize: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["v" /* SERIALIZE */])),
      multiple: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["p" /* MULTIPLE */])),
      // selectorValue: $(),
      selector: $(__WEBPACK_IMPORTED_MODULE_1__vocab__["t" /* SELECTOR */]) ? Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* castId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["t" /* SELECTOR */]), '', $('@context')).toLowerCase() : null,
      motivatedBy: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["e" /* motivationFromForm */])(Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* labelId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["o" /* MOTIVATED_BY */]))),
      labelParts: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* labelId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["n" /* LABEL_PARTS */]))
    }, asArray($(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */])).map(field => __WEBPACK_IMPORTED_MODULE_2__Field__["a" /* default */].fromJsonLD(field, $('@context'))));
  }

  isValidTarget(target) {
    if (target === 'canvas') {
      return true;
    }
    return (!this.metaData.selector || this.metaData.selector.toLowerCase() === 'wholecanvasselector') && this.fields.reduce((s, field) => {
      if (field.isValidTarget(target)) {
        return s;
      }
      return false;
    }, true);
  }

  flatten() {
    const _ref = this,
          { fields } = _ref,
          item = _objectWithoutProperties(_ref, ['fields']);
    return [item, ...this.dereferenceFields(fields)];
  }

  dereferenceFields(fields) {
    return fields.map(field => field.getReference(this));
  }

  constructor(context, id, title, description, metaData, fields) {
    this.type = 'captureModel';

    this.context = context;
    this.id = id;
    this.title = title;
    this.description = description;
    this.metaData = metaData || {};
    this.fields = fields;
  }

  static is(jsonLd) {
    const $ = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* get */])(jsonLd);

    if (Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["b" /* castId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["z" /* UI_GROUP */]), false, $('@context')) === 'madoc:form') {
      if (Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* castBool */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["y" /* UI_CHOICE */]), false)) {
        const firstChild = Array.isArray($(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */])) ? $(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */])[0] : $(__WEBPACK_IMPORTED_MODULE_1__vocab__["h" /* HAS_PART */]);
        const firstChildIsField = !!firstChild['crowds:uiInputType'];
        Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["g" /* warning */])('CaptureModel', $(__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]), `we found the following conflicts:
  - This model is marked as a madoc:form
  - First child ${firstChildIsField ? 'IS' : 'IS NOT'} detected as a form field
  - The model is marked as a choice (crowds:uiChoice), which is incompatible with forms
  
We've continued under the assumtion that this is a form. 
Please update the model to get rid of this warning.
`);
      }
      return true;
    }

    // @todo remove temporary fix.
    console.warn('CaptureModel:', 'please use JSON-LD fields so that @id is equal to the QName.');
    return $(__WEBPACK_IMPORTED_MODULE_1__vocab__["z" /* UI_GROUP */]) ? $(__WEBPACK_IMPORTED_MODULE_1__vocab__["z" /* UI_GROUP */])[__WEBPACK_IMPORTED_MODULE_1__vocab__["q" /* OMEKA_LABEL */]] === 'madoc:form' : false;
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = CaptureModel;


/***/ }),

/***/ 903:
/*!*******************************************************!*\
  !*** ./packages/annotation-bridge/src/model/Field.js ***!
  \*******************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(/*! ../helpers */ 109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vocab__ = __webpack_require__(/*! ../vocab */ 69);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




class Field {

  getReference(parent) {
    return _extends({ parentId: parent.id }, this);
  }

  static getAutocompleteEndpoint(options) {
    if (!options) {
      return null;
    }
    return options[0] ? options[0] : options['@id'] ? options['@id'] : null;
  }

  constructor(context, id, inputType, annotationMetaData, omekaMetaData, metaData) {
    this.type = 'field';

    this.context = context;
    this.id = id;
    this.inputType = inputType;
    this.annotationMetaData = annotationMetaData;
    this.omekaMetaData = omekaMetaData;
    this.metaData = metaData;
  }

  isValidTarget(target) {
    if (target === 'canvas') {
      return true;
    }
    return !(this.metaData.selector && this.metaData.selector.toLowerCase() !== 'wholecanvasselector');
  }

  static fromJsonLD(jsonLd, inheritedContext) {
    const $ = Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["c" /* get */])(jsonLd, inheritedContext);
    const context = $('@context', inheritedContext);

    return new Field(context, $(__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]), $(__WEBPACK_IMPORTED_MODULE_1__vocab__["m" /* INPUT_TYPE */], { [__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]]: null })[__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]], {
      options: $(__WEBPACK_IMPORTED_MODULE_1__vocab__["l" /* INPUT_OPTIONS */]),
      autocomplete: Field.getAutocompleteEndpoint($(__WEBPACK_IMPORTED_MODULE_1__vocab__["l" /* INPUT_OPTIONS */]))
    }, {
      type: $(__WEBPACK_IMPORTED_MODULE_1__vocab__["x" /* TYPE */]),
      group: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* labelId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["g" /* FIELD_GROUP */])),
      bodyType: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* labelId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["a" /* BODY_TYPE */])),
      purpose: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* labelId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["r" /* PURPOSE */]))
    }, {
      title: $(__WEBPACK_IMPORTED_MODULE_1__vocab__["s" /* RDFS_LABEL */]) || $(__WEBPACK_IMPORTED_MODULE_1__vocab__["w" /* TITLE */]),
      description: $(__WEBPACK_IMPORTED_MODULE_1__vocab__["e" /* DESCRIPTION */]),
      conformsTo: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["d" /* labelId */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["d" /* CONFORMS_TO */])),
      selector: $(__WEBPACK_IMPORTED_MODULE_1__vocab__["t" /* SELECTOR */]) ? $(__WEBPACK_IMPORTED_MODULE_1__vocab__["t" /* SELECTOR */])[__WEBPACK_IMPORTED_MODULE_1__vocab__["j" /* ID */]] : null,
      selectorValue: Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["f" /* parseSelectorTarget */])($(__WEBPACK_IMPORTED_MODULE_1__vocab__["u" /* SELECTOR_VALUE */])),
      defaultValue: $(__WEBPACK_IMPORTED_MODULE_1__vocab__["k" /* INPUT_DEFAULT_VALUE */])
    });
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Field;


/***/ }),

/***/ 904:
/*!*****************************************************************!*\
  !*** ./packages/annotation-redux/src/lib/annotation/mapping.js ***!
  \*****************************************************************/
/*! exports provided: FIELD_TYPES_THAT_ARE_ENTITIES, FIELD_TYPES_THAT_ARE_HUMAN_READABLE, createCombinedAnnotationBody, createInProgressAnnotation, dataSetToSingleAnnotation, getIndividualW3CAnnotationBodies, mapFieldsToDataSet, mapDraftToDataSet, createExternalResourceAnnotationBody, createHumanReadableAnnotationBody, createSerializedAnnotationBody, createMultipleAnnotations, getGenerator, getLabelFromDraft, getSuitableLabelFromBody, getMotivation, convertPercentToPixel, createAnnotationFromCaptureModelAndDraft */
/*! exports used: convertPercentToPixel, createAnnotationFromCaptureModelAndDraft, createInProgressAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createCombinedAnnotationBody */
/* harmony export (immutable) */ __webpack_exports__["c"] = createInProgressAnnotation;
/* unused harmony export dataSetToSingleAnnotation */
/* unused harmony export getIndividualW3CAnnotationBodies */
/* unused harmony export mapFieldsToDataSet */
/* unused harmony export mapDraftToDataSet */
/* unused harmony export createExternalResourceAnnotationBody */
/* unused harmony export createHumanReadableAnnotationBody */
/* unused harmony export createSerializedAnnotationBody */
/* unused harmony export createMultipleAnnotations */
/* unused harmony export getGenerator */
/* unused harmony export getLabelFromDraft */
/* unused harmony export getSuitableLabelFromBody */
/* unused harmony export getMotivation */
/* harmony export (immutable) */ __webpack_exports__["a"] = convertPercentToPixel;
/* harmony export (immutable) */ __webpack_exports__["b"] = createAnnotationFromCaptureModelAndDraft;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Annotation__ = __webpack_require__(/*! ./Annotation */ 226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AnnotationBodyList__ = __webpack_require__(/*! ./AnnotationBodyList */ 228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AnnotationSelector__ = __webpack_require__(/*! ./AnnotationSelector */ 227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AnnotationBody__ = __webpack_require__(/*! ./AnnotationBody */ 229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__query_resourceQuery__ = __webpack_require__(/*! ../../query/resourceQuery */ 35);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







// Draft value is {id: 'http://..'}
const FIELD_TYPES_THAT_ARE_ENTITIES = ['madoc:nullableCaptureModel', 'madoc:fallbackOptions'];
/* unused harmony export FIELD_TYPES_THAT_ARE_ENTITIES */

// Draft value is {label: 'human readable'}
const FIELD_TYPES_THAT_ARE_HUMAN_READABLE = ['madoc:nullableCaptureModel', 'madoc:fallbackOptions'];
/* unused harmony export FIELD_TYPES_THAT_ARE_HUMAN_READABLE */


function createCombinedAnnotationBody(captureModel, draft) {
  return []; // @todo
}

function createInProgressAnnotation(label, target, json, generator, id = null) {
  return new __WEBPACK_IMPORTED_MODULE_0__Annotation__["a" /* default */](id, label, new __WEBPACK_IMPORTED_MODULE_1__AnnotationBodyList__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_3__AnnotationBody__["a" /* default */](null, JSON.stringify(json), 'text/json', 'TextualBody', 'editing')), target, 'http://www.digirati.com/ns/crowds#drafting', generator);
}

/**
 * @deprecated for reference only
 */
function dataSetToSingleAnnotation(template, dataset) {
  const { metaData: { title, description } } = template;

  dataset.context = dataset.context ? dataset.context : {};
  if (title) {
    dataset.context.Title = 'http://dublincore.org/documents/dcmi-terms/#terms-title';
    dataset.Title = title;
  }
  if (description) {
    dataset.context.Description = 'http://dublincore.org/documents/dcmi-terms/#terms-description';
    dataset.Description = description;
  }

  const body = {
    type: ['TextualBody', 'Dataset'],
    value: JSON.stringify(dataset),
    format: 'text/plain'
  };

  return { body, label: title };
}

/**
 * @deprecated for reference only
 */
function getIndividualW3CAnnotationBodies(captureModel, draft) {
  const fields = Object.values(Object(__WEBPACK_IMPORTED_MODULE_4__query_resourceQuery__["d" /* getForm */])(captureModel).fields);

  const selectors = Object.keys(draft.selectors || {}).map(key => ({ id: key, value: draft.selectors[key] })).map(selector => {
    const capModel = fields.find(model => model.id === selector.id);
    return dataSetToSingleAnnotation(capModel, mapDraftToDataSet(fields, { [selector.id]: draft.input[selector.id] }));
  });
  const keyedSelectors = {};
  for (let selector of selectors) {
    keyedSelectors[selector.id] = selector.annotation;
  }

  return keyedSelectors;
}

function mapFieldsToDataSet(fields, data) {
  const contexts = {};
  const body = {};

  fields.filter(e => e).forEach(model => {
    if (model.metaData.conformsTo && data[model.id]) {
      if (model.metaData.conformsTo.label !== model.metaData.conformsTo.id) {
        contexts[model.metaData.conformsTo.label] = model.metaData.conformsTo.id;
      }
      body[model.metaData.conformsTo.label] = data[model.id];
    }
  });

  return _extends({
    '@context': contexts
  }, body);
}

function getModelFields(ids, fields) {
  if (Array.isArray(fields)) {
    return ids.map(fieldId => fields.find(field => field.id === fieldId));
  }
  return ids.map(fieldId => fields[fieldId]);
}

function mapDraftToDataSet(captureModel, draft) {
  const fieldIds = Object.keys(draft.input);
  const fields = getModelFields(fieldIds, captureModel.fields);
  return mapFieldsToDataSet(fields, draft.input);
}

function createExternalResourceAnnotationBody(captureModel, draft) {

  const fieldIds = Object.keys(draft.input);
  const fields = getModelFields(fieldIds, captureModel.fields);
  // const fields = fieldIds.map(fieldId => captureModel.fields.find(field => field.id === fieldId));
  return fields.filter(e => e).reduce((state, field) => {
    if (FIELD_TYPES_THAT_ARE_ENTITIES.indexOf(field.inputType) !== -1) {
      const draftInput = draft.input[field.id];
      if (!draftInput) {
        return state;
      }
      if (draftInput.url) {
        state.push(new __WEBPACK_IMPORTED_MODULE_3__AnnotationBody__["a" /* default */](null, null, 'application/json', 'SpecificResource', null, draftInput.url));
      }
    }
    return state;
  }, []);
}

function createHumanReadableAnnotationBody(captureModel, draft) {
  const fieldIds = Object.keys(draft.input);
  const fields = getModelFields(fieldIds, captureModel.fields);
  // const fields = fieldIds.map(fieldId => captureModel.fields.find(field => field.id === fieldId));

  return fields.filter(e => e).reduce((state, field) => {

    if (field && field.omekaMetaData && field.omekaMetaData && field.omekaMetaData.bodyType.id && field.omekaMetaData.bodyType.id === 'oa:TextualBody' && field.inputType === 'madoc:textarea') {
      const body = new __WEBPACK_IMPORTED_MODULE_3__AnnotationBody__["a" /* default */](null, draft.input[field.id], 'text/plain', 'TextualBody');
      body.purpose = field.omekaMetaData.purpose ? field.omekaMetaData.purpose.label : null;
      state.push(body);
    }

    if (FIELD_TYPES_THAT_ARE_HUMAN_READABLE.indexOf(field.inputType) !== -1) {
      const draftInput = draft.input[field.id];
      if (!draftInput) {
        return state;
      }
      if (draftInput.label) {
        state.push(new __WEBPACK_IMPORTED_MODULE_3__AnnotationBody__["a" /* default */](null, draftInput.label, 'text/plain', 'Text'));
      }
    }
    return state;
  }, []);
}

function createSerializedAnnotationBody(captureModel, draft) {
  const dataSet = mapDraftToDataSet(captureModel, draft);

  if (dataSet) {
    return new __WEBPACK_IMPORTED_MODULE_3__AnnotationBody__["a" /* default */](null, JSON.stringify(dataSet), 'text/plain', 'Dataset');
  }
  return null;
}

function createMultipleAnnotations(target, captureModel, draft) {
  const fieldKeys = Object.keys(draft.input);

  const fields = fieldKeys.map(key => draft.input[key] ? {
    id: key,
    input: draft.input[key],
    selector: draft.selectors[key]
  } : null).filter(e => e);

  return fields.map(field => {
    const captureModelField = captureModel.fields[field.id];
    if (!(captureModelField && (captureModelField.metaData || captureModelField.omekaMeta))) {
      console.warn('createMultipleAnnotations', 'Looks like you have set derivedAnnoCombine to "False" without selectors on the fields, are you sure this is correct?', captureModelField);
    }

    const { metaData = {}, omekaMetaData } = captureModelField;
    const { title, description } = metaData;
    const { purpose } = omekaMetaData;

    const dataSet = mapFieldsToDataSet([captureModel.fields[field.id]], {
      [field.id]: field.input
    });

    dataSet['@context'] = dataSet['@context'] ? dataSet['@context'] : {};
    if (title) {
      dataSet['@context'].Title = 'http://dublincore.org/documents/dcmi-terms/#terms-title';
      dataSet.Title = title;
    }
    if (description && description !== title) {
      dataSet['@context'].Description = 'http://dublincore.org/documents/dcmi-terms/#terms-description';
      dataSet.Description = description;
    }

    return new __WEBPACK_IMPORTED_MODULE_0__Annotation__["a" /* default */](null, field.input, new __WEBPACK_IMPORTED_MODULE_1__AnnotationBodyList__["a" /* default */](new __WEBPACK_IMPORTED_MODULE_3__AnnotationBody__["a" /* default */](null, JSON.stringify(dataSet), 'text/plain', 'Dataset', purpose ? purpose.id : null)), __WEBPACK_IMPORTED_MODULE_2__AnnotationSelector__["a" /* default */].fromTarget(target, field.selector));
  });
}

function getGenerator(captureModel) {
  return captureModel.id;
}

function getLabelFromDraft(labelParts, captureModel, draft) {
  if (!(labelParts && labelParts.label)) {
    return null;
  }
  const fieldIds = Object.keys(draft.input);
  const fields = getModelFields(fieldIds, captureModel.fields);
  const labelField = labelParts.label;

  return fields.filter(e => e).reduce((label, model) => {
    if (label) return label;
    if (model.metaData.conformsTo && draft.input[model.id] && model.metaData.conformsTo.label === labelField) {
      return draft.input[model.id];
    }
    return label;
  }, '');
}

function getSuitableLabelFromBody(bodies) {
  let label = 'unknown';
  const found = bodies.find(body => {
    if (body.type.indexOf('Text') !== -1 && body.value) {
      return true;
    }
  });
  return found && found.value ? found.value : label;
}

function getMotivation(motivatedBy, captureModel, draft) {
  if (motivatedBy.id) {
    return {
      id: motivatedBy.id,
      label: motivatedBy.instance
    };
  }
  return {
    id: 'oa:tagging',
    label: 'Tagging'
  };
}

function convertPercentToPixel(props, height, width) {
  return _extends({}, props, {
    left: props.x / 100 * width,
    top: props.y / 100 * height,
    width: props.width / 100 * width,
    height: props.height / 100 * height,
    immutable: true,
    scale: 1,
    unit: 'pixel'
  });
}

function createAnnotationFromCaptureModelAndDraft(target, captureModel, draft, customDraftSelector) {
  const bodies = [];
  let label = 'unknown';
  const draftSelector = customDraftSelector || draft.selector;

  let motivation = {
    id: 'oa:tagging',
    label: 'Tagging'
  };

  const {
    combine = false,
    externalise = true,
    humanReadable = false,
    serialize = true,
    labelParts,
    motivatedBy
  } = captureModel.metaData;

  if (combine === false) {
    return createMultipleAnnotations(target, captureModel, draft);
  }

  if (combine) {
    createCombinedAnnotationBody(captureModel, draft).forEach(body => bodies.push(body));
  }

  if (externalise) {
    createExternalResourceAnnotationBody(captureModel, draft).forEach(body => bodies.push(body));
  }

  if (humanReadable) {
    createHumanReadableAnnotationBody(captureModel, draft).forEach(body => bodies.push(body));
  }

  if (serialize) {
    const serializedBody = createSerializedAnnotationBody(captureModel, draft);
    if (serializedBody) {
      bodies.push(serializedBody);
    }
  }

  if (labelParts) {
    label = getLabelFromDraft(labelParts, captureModel, draft) || getSuitableLabelFromBody(bodies);
  }

  if (motivatedBy) {
    motivation = getMotivation(motivatedBy, captureModel, draft);
  }

  const generator = getGenerator(captureModel);

  return new __WEBPACK_IMPORTED_MODULE_0__Annotation__["a" /* default */](null, label, __WEBPACK_IMPORTED_MODULE_1__AnnotationBodyList__["a" /* default */].fromJsonLD(bodies), __WEBPACK_IMPORTED_MODULE_2__AnnotationSelector__["a" /* default */].fromTarget(target, draftSelector), motivation, generator);
}

/***/ }),

/***/ 905:
/*!****************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/views/renderForm.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = renderForm;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_components__ = __webpack_require__(/*! digirati-annotation-components */ 91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FullForm_scss__ = __webpack_require__(/*! ./FullForm.scss */ 906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FullForm_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__FullForm_scss__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






const baseStyle = __WEBPACK_IMPORTED_MODULE_2_digirati_bem_js___default.a.block('full-form');

function renderForm(_ref) {
  let {
    currentResourceTemplate,
    resourceForm,
    currentDraft,
    previewDraft,
    updateDraft,
    editSelector,
    onSave,
    unpreviewDraft,
    currentSelector,
    isSelecting,
    isSelectingSecondary,
    renderResourceEditor,
    importCaptureModel,
    onSaveAsInProgress,
    goBack,
    editFieldSelector,
    immutableSelector,
    currentTree,
    elementEvents,
    hideTitle,
    enablePublishing,
    bem
  } = _ref,
      props = _objectWithoutProperties(_ref, ['currentResourceTemplate', 'resourceForm', 'currentDraft', 'previewDraft', 'updateDraft', 'editSelector', 'onSave', 'unpreviewDraft', 'currentSelector', 'isSelecting', 'isSelectingSecondary', 'renderResourceEditor', 'importCaptureModel', 'onSaveAsInProgress', 'goBack', 'editFieldSelector', 'immutableSelector', 'currentTree', 'elementEvents', 'hideTitle', 'enablePublishing', 'bem']);

  const style = bem ? bem : baseStyle;
  const isWholeCanvas = currentDraft && currentDraft.selector && currentDraft.selector.type && currentDraft.selector.type.toLowerCase() === 'wholecanvasselector';

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: style },
    !hideTitle ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'h3',
        { className: style.element('title') },
        currentResourceTemplate.title
      ),
      currentResourceTemplate.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'p',
        { className: style.element('description') },
        currentResourceTemplate.description
      ) : null
    ) : null,
    !isWholeCanvas && !immutableSelector && currentDraft.isPreviewing === false && currentSelector && currentSelector.source && currentSelector.source.template === currentResourceTemplate.id ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style.element('selector-info') },
      'Please select a region on the page'
    ) : null,
    !isWholeCanvas && !immutableSelector && currentDraft.isPreviewing === false && currentDraft.selector && editSelector ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style.element('selector-info').modifier('confirmed') },
      'You have selected a region, do  you want to ',
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'a',
        { onClick: editSelector },
        'change its position'
      )
    ) : null,
    currentDraft.template === currentTree ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: style.element('container') },
      goBack ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
        { onClick: e => {
            e.preventDefault();goBack();
          }, className: style.element('close-icon') },
        '\xD7'
      ) : null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_components__["c" /* ConfirmationForm */], _extends({
        draft: currentDraft,
        fields: Object.values(resourceForm.fields),
        isSelecting: isSelectingSecondary || isSelecting,
        displayFieldSelector: editFieldSelector,
        elementEvents: elementEvents,
        onSaveAsInProgress: onSaveAsInProgress,
        onEdit: draft => unpreviewDraft(draft.id),
        onSave: draft => onSave(draft),
        previewDraft: previewDraft,
        importCaptureModel: importCaptureModel,
        renderResourceEditor: renderResourceEditor,
        updateField: updateDraft,
        enablePublishing: enablePublishing
      }, props))
    ) : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      null,
      'Form disabled, please complete other annotation'
    )
  );
}

/***/ }),

/***/ 906:
/*!****************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/views/FullForm.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./FullForm.scss */ 907);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./FullForm.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./FullForm.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 907:
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-plugin-resource-editor/src/views/FullForm.scss ***!
  \***************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".full-form {\n  left: 0 !important;\n  position: relative; }\n  .full-form:after {\n    display: table;\n    content: '';\n    clear: both; }\n  .full-form__offline-message {\n    color: #E36049;\n    font-weight: bold;\n    text-align: right; }\n  .full-form__close-icon {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    font-size: 30px;\n    line-height: 20px;\n    background: transparent;\n    border: none;\n    color: #000;\n    cursor: pointer;\n    padding: 4px; }\n  .full-form__action-btn:disabled {\n    opacity: 0.6; }\n    .full-form__action-btn:disabled:hover {\n      background: #fff; }\n  .full-form__back-btn {\n    border: none;\n    background: transparent; }\n  .full-form__selector-info {\n    color: rgba(255, 255, 255, 0.9);\n    border: 1px solid #3f505d;\n    background: #546A7B;\n    padding: 5px;\n    margin: 10px 3px;\n    font-size: 12px;\n    border-radius: 3px; }\n    .full-form__selector-info a {\n      cursor: pointer;\n      font-weight: bold;\n      color: #fff; }\n    .full-form__selector-info--confirmed {\n      background: #1FAC78;\n      border-color: #17815a; }\n", ""]);

// exports


/***/ }),

/***/ 908:
/*!**********************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/resourceEditor.utility.js ***!
  \**********************************************************************************/
/*! exports provided: mutateLocalStorage, convertPercentToPixel, immediate, getTargetFromRegion */
/*! exports used: immediate, mutateLocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = mutateLocalStorage;
/* unused harmony export convertPercentToPixel */
/* harmony export (immutable) */ __webpack_exports__["a"] = immediate;
/* unused harmony export getTargetFromRegion */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_store__ = __webpack_require__(/*! store */ 136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_store___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_store__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




function mutateLocalStorage(fn) {
  const url = window.location.href;
  const currentList = fn(__WEBPACK_IMPORTED_MODULE_1_store___default.a.get(`annotation-studio/${url}`) || {});
  __WEBPACK_IMPORTED_MODULE_1_store___default.a.set(`annotation-studio/${url}`, currentList);
  return currentList;
}

/**
 * @deprecated
 */
function convertPercentToPixel(props, height, width) {
  return _extends({}, props, {
    left: props.x / 100 * width,
    top: props.y / 100 * height,
    width: props.width / 100 * width,
    height: props.height / 100 * height,
    immutable: true,
    scale: 1,
    unit: 'pixel'
  });
}

function immediate(loading, fn) {
  return class extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
    componentDidMount() {
      fn();
    }

    render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        loading
      );
    }
  };
}

/**
 * @deprecated
 */
function getTargetFromRegion(canvas, region, height, width) {
  if (region.type === 'WholeCanvasSelector') {
    return canvas;
  }
  if (region.unit === 'percent') {
    return getTargetFromRegion(canvas, convertPercentToPixel(region, height, width), height, width);
  }
  if (region.width === null || isNaN(region.width) || region.height === null || isNaN(region.height)) {
    return `${canvas}#xywh=${Math.floor(region.left)},${Math.floor(region.top)},0,0`;
  }

  return `${canvas}#xywh=${Math.floor(region.left)},${Math.floor(region.top)},${Math.floor(region.width)},${Math.floor(region.height)}`;
}

/***/ }),

/***/ 909:
/*!**********************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/views/confirmationPage.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = confirmationPage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_scss__ = __webpack_require__(/*! ./button.scss */ 910);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__button_scss__);




const $confirmationPage = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('confirmation-page');
const $button = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('button');

function confirmationPage({ onConfirm }) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: $confirmationPage },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h3',
      { className: $confirmationPage.element('title') },
      'Your annotation has been added to the photo.'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      { className: $confirmationPage.element('copy') },
      'Do you want to add another?'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'button',
      { className: $button.modifier('confirmation'), onClick: onConfirm },
      'Start again'
    )
  );
}

/***/ }),

/***/ 91:
/*!*****************************************************!*\
  !*** ./packages/annotation-components/src/index.js ***!
  \*****************************************************/
/*! exports provided: Viewer, Selector, Form, Canvas, ConfirmationForm, Router, ActionTimeAgo, ComboButotn */
/*! exports used: ActionTimeAgo, Canvas, ConfirmationForm, Router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_viewers_Viewer__ = __webpack_require__(/*! ./components/viewers/Viewer */ 356);
/* unused harmony reexport Viewer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_selectors_Selector__ = __webpack_require__(/*! ./components/selectors/Selector */ 360);
/* unused harmony reexport Selector */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_inputs_Form__ = __webpack_require__(/*! ./components/inputs/Form */ 362);
/* unused harmony reexport Form */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_composites_Canvas__ = __webpack_require__(/*! ./components/composites/Canvas */ 880);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__components_composites_Canvas__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_composites_ConfirmationForm__ = __webpack_require__(/*! ./components/composites/ConfirmationForm */ 889);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__components_composites_ConfirmationForm__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_composites_Router__ = __webpack_require__(/*! ./components/composites/Router */ 892);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__components_composites_Router__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_ui_ActionTimeAgo__ = __webpack_require__(/*! ./components/ui/ActionTimeAgo */ 893);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_7__components_ui_ActionTimeAgo__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_inputs_ComboButton__ = __webpack_require__(/*! ./components/inputs/ComboButton */ 179);
/* unused harmony reexport ComboButotn */











/***/ }),

/***/ 910:
/*!**************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/views/button.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./button.scss */ 911);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./button.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./button.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 911:
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-plugin-resource-editor/src/views/button.scss ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".editor-button {\n  width: 200px;\n  padding: 12px;\n  border: 3px solid #000;\n  font-weight: bold;\n  font-size: 14px;\n  margin-bottom: 10px;\n  background-color: #FFF;\n  cursor: pointer; }\n", ""]);

// exports


/***/ }),

/***/ 912:
/*!************************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/views/resourceNavigation.js ***!
  \************************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = resourceNavigation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__ = __webpack_require__(/*! digirati-bem-js */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_digirati_bem_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resourceNavigation_scss__ = __webpack_require__(/*! ./resourceNavigation.scss */ 913);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resourceNavigation_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__resourceNavigation_scss__);




const $resourceNavigation = __WEBPACK_IMPORTED_MODULE_1_digirati_bem_js___default.a.block('resource-navigation');

/**
 * Loops through the available capture models and displays information about them.
 * Using the passed in createDraft the UI should attach a click handler.
 */
function resourceNavigation({ currentResource, resourceTemplates, createDraft, moveForward, moveBack, showBackButton }) {

  const handleItemClick = item => () => {
    moveForward(item.id);
    if (item.type === 'captureModel') {
      createDraft(item);
    }
  };

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: $resourceNavigation },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'h2',
      { className: $resourceNavigation.element('heading') },
      currentResource.title ? currentResource.title : 'What do you want to tag'
    ),
    currentResource.description ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'p',
      { className: $resourceNavigation.element('description') },
      currentResource.description
    ) : null,
    Object.values(resourceTemplates).map(item => __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { key: item.id,
        className: $resourceNavigation.element('metadata'),
        onClick: handleItemClick(item) },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: $resourceNavigation.element('title') },
        item.title
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: $resourceNavigation.element('description') },
        item.description
      )
    )),
    showBackButton ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { onClick: moveBack, className: $resourceNavigation.element('back') },
      'back'
    ) : null
  );
}

/***/ }),

/***/ 913:
/*!**************************************************************************************!*\
  !*** ./packages/annotation-plugin-resource-editor/src/views/resourceNavigation.scss ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./resourceNavigation.scss */ 914);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./resourceNavigation.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js?importLoaders=1!../../../../node_modules/sass-loader/lib/loader.js!./resourceNavigation.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 914:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-plugin-resource-editor/src/views/resourceNavigation.scss ***!
  \*************************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".resource-navigation__metadata {\n  padding: 20px;\n  cursor: pointer;\n  border: 3px solid #000;\n  margin-top: 20px; }\n\n.resource-navigation__title {\n  font-weight: bold; }\n\n.resource-navigation__back {\n  padding: 5px;\n  width: 50%;\n  cursor: pointer;\n  border: 3px solid #000;\n  margin-top: 20px; }\n", ""]);

// exports


/***/ }),

/***/ 915:
/*!*************************************************************!*\
  !*** ./packages/annotation-plugin-transcriber/src/index.js ***!
  \*************************************************************/
/*! exports provided: Component, provider, plugin, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transcriber_plugin__ = __webpack_require__(/*! ./transcriber.plugin */ 916);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transcriber_provider__ = __webpack_require__(/*! ./transcriber.provider */ 421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transcriber__ = __webpack_require__(/*! ./transcriber */ 422);
/* unused harmony reexport Component */
/* unused harmony reexport provider */
/* unused harmony reexport plugin */






/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__transcriber_plugin__["a" /* default */]);

/***/ }),

/***/ 916:
/*!**************************************************************************!*\
  !*** ./packages/annotation-plugin-transcriber/src/transcriber.plugin.js ***!
  \**************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = TranscriberPlugin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_plugin_core__ = __webpack_require__(/*! digirati-annotation-plugin-core */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__transcriber_provider__ = __webpack_require__(/*! ./transcriber.provider */ 421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_digirati_annotation_bridge__ = __webpack_require__(/*! digirati-annotation-bridge */ 46);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }







function TranscriberPlugin($el, _ref, store) {
  let {
    canvas,
    manifest,
    transcriptionVocab,
    serializationStrategy,
    resourceTemplates,
    label,
    target = 'canvas'
  } = _ref,
      unknownProps = _objectWithoutProperties(_ref, ['canvas', 'manifest', 'transcriptionVocab', 'serializationStrategy', 'resourceTemplates', 'label', 'target']);

  const transcription = `${$el.innerText}`;
  __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_plugin_core__["b" /* utils */].unknownPropertyWarning(unknownProps);

  if (resourceTemplates) {
    const { dispatch } = store;

    return fetch(`${resourceTemplates}`).then(r => r.json()).then(resourceTemplate => {

      dispatch(Object(__WEBPACK_IMPORTED_MODULE_4_digirati_annotation_bridge__["d" /* importResourceTemplate */])(resourceTemplate, target));

      return resourceTemplate;
    }).then(resourceTemplate => {
      Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__transcriber_provider__["a" /* default */], {
        transcriptionLabel: label,
        store: store,
        target: target,
        transcription: transcription,
        transcriptionVocab: transcriptionVocab || 'dcterms:description',
        tree: resourceTemplate['@id'],
        serializationStrategy: serializationStrategy,
        manifest: manifest,
        canvas: canvas }), $el);
      return store;
    });
  }
}

/***/ }),

/***/ 917:
/*!********************************************************!*\
  !*** ./packages/annotation-plugin-drafts/src/index.js ***!
  \********************************************************/
/*! exports provided: Component, provider, plugin, default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drafts_plugin__ = __webpack_require__(/*! ./drafts.plugin */ 918);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drafts_provider__ = __webpack_require__(/*! ./drafts.provider */ 423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drafts__ = __webpack_require__(/*! ./drafts */ 424);
/* unused harmony reexport Component */
/* unused harmony reexport provider */
/* unused harmony reexport plugin */






/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__drafts_plugin__["a" /* default */]);

/***/ }),

/***/ 918:
/*!****************************************************************!*\
  !*** ./packages/annotation-plugin-drafts/src/drafts.plugin.js ***!
  \****************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = DraftsPlugin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drafts_provider__ = __webpack_require__(/*! ./drafts.provider */ 423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_plugin_core__ = __webpack_require__(/*! digirati-annotation-plugin-core */ 52);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






function DraftsPlugin(root, attributes, store) {
  const {
    label,
    filterBy,
    emptyState,
    hideIfEmpty,
    thumbnailSize,
    showThumbnail,
    description
  } = attributes,
        unknownProps = _objectWithoutProperties(attributes, ['label', 'filterBy', 'emptyState', 'hideIfEmpty', 'thumbnailSize', 'showThumbnail', 'description']);
  __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_plugin_core__["b" /* utils */].unknownPropertyWarning(unknownProps);

  return __WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__drafts_provider__["a" /* default */], {
    label: label || "Your annotations",
    filterBy: filterBy,
    emptyState: emptyState,
    hideIfEmpty: hideIfEmpty,
    description: description,
    showThumbnail: showThumbnail === 'true',
    thumbnailSize: thumbnailSize ? parseInt(thumbnailSize, 10) : null,
    store: store
  }), root);
}

/***/ }),

/***/ 919:
/*!***********************************************************!*\
  !*** ./packages/annotation-plugin-drafts/src/drafts.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader?importLoaders=1!../../../node_modules/sass-loader/lib/loader.js!./drafts.scss */ 920);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ 6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js?importLoaders=1!../../../node_modules/sass-loader/lib/loader.js!./drafts.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js?importLoaders=1!../../../node_modules/sass-loader/lib/loader.js!./drafts.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 920:
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader?importLoaders=1!./node_modules/sass-loader/lib/loader.js!./packages/annotation-plugin-drafts/src/drafts.scss ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ 5)(undefined);
// imports


// module
exports.push([module.i, ".drafts-list {\n  background: #fff;\n  margin: 20px 0; }\n  .drafts-list:after {\n    clear: both;\n    display: table;\n    content: ''; }\n  .drafts-list * {\n    box-sizing: border-box; }\n  .drafts-list__empty-state {\n    padding: 10px 0 20px 0;\n    font-size: 12px;\n    color: #888;\n    border-bottom: 1px solid #ddd; }\n  .drafts-list__description {\n    font-size: 12px;\n    color: #888; }\n  .drafts-list__unsaved {\n    float: right;\n    color: darkred; }\n  .drafts-list__thumbnail {\n    text-align: center;\n    margin-bottom: 10px; }\n  .drafts-list__list {\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n    .drafts-list__list--hasThumbnail .drafts-list__list-item {\n      float: left;\n      margin: 10px;\n      margin-left: 0;\n      padding: 15px; }\n      .drafts-list__list--hasThumbnail .drafts-list__list-item--selected {\n        outline: 2px solid #ED1C2E;\n        border-color: #ED1C2E;\n        background: #fef1f2; }\n    .drafts-list__list--hasThumbnail .drafts-list__list-item ~ .drafts-list__list-item {\n      border-top: 1px solid #ddd;\n      margin: 10px; }\n      .drafts-list__list--hasThumbnail .drafts-list__list-item ~ .drafts-list__list-item--selected {\n        border-top: 1px solid #ED1C2E; }\n    .drafts-list__list--thumbnail-150 .drafts-list__list-item {\n      width: 190px; }\n    .drafts-list__list--thumbnail-150 .drafts-list__thumbnail {\n      height: 150px; }\n    .drafts-list__list--thumbnail-150 img {\n      max-height: 150px;\n      margin: 0 auto; }\n    .drafts-list__list-item {\n      cursor: pointer;\n      border: 1px solid #ddd;\n      padding: 10px 20px; }\n      .drafts-list__list-item ~ .drafts-list__list-item {\n        border-top: none; }\n      .drafts-list__list-item--selected {\n        background: #EEE; }\n\n.offline-notice,\n.online-notice {\n  opacity: 0.9;\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  padding: 20px 40px;\n  color: #fff;\n  z-index: 10000; }\n  .offline-notice button,\n  .online-notice button {\n    background: rgba(0, 0, 0, 0.3);\n    color: #fff;\n    border: none;\n    margin-left: 20px; }\n\n.offline-notice {\n  background-color: darkred; }\n\n.online-notice {\n  background-color: forestgreen; }\n", ""]);

// exports


/***/ }),

/***/ 921:
/*!*********************************************************!*\
  !*** ./packages/annotation-plugin-tagging/src/index.js ***!
  \*********************************************************/
/*! exports provided: TaggingAnnotationsComponent, TaggingAnnotationsPlugin, TaggingAnnotationsProvider, TaggingComponent, TaggingPlugin, TaggingProvider, default */
/*! exports used: TaggingAnnotationsPlugin, TaggingPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tagging_annotations_component__ = __webpack_require__(/*! ./tagging-annotations.component */ 425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tagging_annotations_plugin__ = __webpack_require__(/*! ./tagging-annotations.plugin */ 923);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tagging_annotations_provider__ = __webpack_require__(/*! ./tagging-annotations.provider */ 426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tagging__ = __webpack_require__(/*! ./tagging */ 427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tagging_plugin__ = __webpack_require__(/*! ./tagging.plugin */ 924);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tagging_provider__ = __webpack_require__(/*! ./tagging.provider */ 428);
/* unused harmony reexport TaggingAnnotationsComponent */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__tagging_annotations_plugin__["a"]; });
/* unused harmony reexport TaggingAnnotationsProvider */
/* unused harmony reexport TaggingComponent */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__tagging_plugin__["a"]; });
/* unused harmony reexport TaggingProvider */









/* unused harmony default export */ var _unused_webpack_default_export = ({});

/***/ }),

/***/ 922:
/*!*****************************************************************!*\
  !*** ./packages/annotation-plugin-tagging/src/tagging.utils.js ***!
  \*****************************************************************/
/*! exports provided: annotationToTag, tagDetails, tagClassForUri, isTaggedAs */
/*! exports used: annotationToTag, isTaggedAs, tagDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = annotationToTag;
/* harmony export (immutable) */ __webpack_exports__["c"] = tagDetails;
/* unused harmony export tagClassForUri */
/* harmony export (immutable) */ __webpack_exports__["b"] = isTaggedAs;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


/**
 * Generate a DOM for displaying an annotation as a tag block.
 *
 * @param annotation
 * @returns {XML}
 */
function annotationToTag(annotation) {
    let bodyDetails = tagDetails(annotation);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { key: bodyDetails.uri, className: 'c-tag' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'a',
            { href: bodyDetails.uri },
            bodyDetails.label
        )
    );
}

/**
 * Extract and return the tag details from an Annotation body using the `TextualBody` and `SpecificResource`
 * items.
 *
 * @param annotation
 */
function tagDetails(annotation) {
    return annotation.body.reduce((details, fragment) => {
        switch (fragment.type) {
            case 'TextualBody':
            case 'Text':
                details['label'] = fragment['value'];
                break;
            case 'SpecificResource':
                details['uri'] = fragment['source'];
                break;
        }

        return details;
    }, {});
}

/**
 * Parse and return the entity class for a given source URI.
 *
 * @param uri
 */
function tagClassForUri(uri) {
    if (!uri) {
        return null;
    }
    const regex = /\/topics\/(?:virtual:)?([A-Za-z_+-].+)\//;
    const matches = regex.exec(uri);

    if (!matches) {
        return null;
    }

    if (matches.length > 1) {
        return matches[1];
    } else {
        return null;
    }
}

/**
 * Currying function that returns a predicate checking if the given Annotation is a tag associated with certain
 * {@code types} of entities.
 *
 * @param types A collection of entity types this tag must be related to.
 * @returns {function(*)}
 */
function isTaggedAs(types) {
    return annotation => {
        let body = Array.isArray(annotation.body) ? annotation.body : [];

        return body.some(fragment => {
            if (!fragment || !fragment.type || fragment.type.toLowerCase() !== 'specificresource') {
                return false;
            }

            let source = fragment.source || fragment.id;
            let entityType = tagClassForUri(source);
            if (!entityType) {
                return [];
            }
            return types.some(type => type.toLowerCase() === entityType.toLowerCase());
        });
    };
}

/***/ }),

/***/ 923:
/*!******************************************************************************!*\
  !*** ./packages/annotation-plugin-tagging/src/tagging-annotations.plugin.js ***!
  \******************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = TaggingAnnotationsPlugin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tagging_annotations_provider__ = __webpack_require__(/*! ./tagging-annotations.provider */ 426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_plugin_core__ = __webpack_require__(/*! digirati-annotation-plugin-core */ 52);





function TaggingAnnotationsPlugin(root, attributes, store) {
  const {
    entityTypes
  } = attributes;

  const types = entityTypes.split(',').map(type => type.substring(7).toLowerCase());

  return __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_plugin_core__["b" /* utils */].renderWhen(store, state => Object.keys(state.elucidate.annotations).length > 0, __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__tagging_annotations_provider__["a" /* default */], {
    store: store,
    entityTypes: types
  }), root);
}

/***/ }),

/***/ 924:
/*!******************************************************************!*\
  !*** ./packages/annotation-plugin-tagging/src/tagging.plugin.js ***!
  \******************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = TaggingPlugin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tagging_provider__ = __webpack_require__(/*! ./tagging.provider */ 428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(/*! react-dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__ = __webpack_require__(/*! digirati-annotation-bridge */ 46);






function TaggingPlugin($el, attributes, store) {
  const {
    canvas,
    manifest,
    resourceTemplates,
    target = 'canvas',
    entityTypes
  } = attributes;

  const { dispatch } = store;

  const importCaptureModel = resourceTemplates => {
    return fetch(`${resourceTemplates}`).then(r => r.json()).then(resourceTemplate => {
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__["d" /* importResourceTemplate */])(resourceTemplate, target));
      return resourceTemplate;
    });
  };

  if (resourceTemplates) {
    return fetch(`${resourceTemplates}`).then(r => r.json()).then(resourceTemplate => {
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge__["d" /* importResourceTemplate */])(resourceTemplate, target));
      return resourceTemplate;
    }).then(resourceTemplate => {
      Object(__WEBPACK_IMPORTED_MODULE_2_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_0__tagging_provider__["a" /* default */], {
        store: store,
        target: target,
        manifest: manifest,
        canvas: canvas,
        tree: resourceTemplate['@id'],
        importCaptureModel: importCaptureModel,
        content: $el.innerText
      }), $el);
    });
  }
}

/***/ }),

/***/ 925:
/*!**********************************************************************!*\
  !*** ./packages/annotation-application/src/js/region-annotations.js ***!
  \**********************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(/*! react */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__ = __webpack_require__(/*! digirati-annotation-redux */ 29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_query_manifestQuery__ = __webpack_require__(/*! digirati-annotation-redux/es/query/manifestQuery */ 141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge_es_annotations__ = __webpack_require__(/*! digirati-annotation-bridge/es/annotations */ 90);





function getImageFromTarget(state, annotation, target, size) {
  const imageService = Object(__WEBPACK_IMPORTED_MODULE_2_digirati_annotation_redux_es_query_manifestQuery__["b" /* currentImageService */])(state);
  if (imageService) {
    const prefix = imageService.split('info.json')[0];
    const src = `${prefix}${target.x},${target.y},${target.width},${target.height}/${size},/0/default.jpg`;
    const body = Object(__WEBPACK_IMPORTED_MODULE_3_digirati_annotation_bridge_es_annotations__["a" /* getAnnotationBody */])(annotation);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'c-image c-image--sm-sq', key: annotation.id },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'c-image__src' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('img', { src: src })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'c-image__info' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'p',
          null,
          body['foaf:name'] ? body['foaf:name'] : body.textualBody ? body.textualBody : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'em',
            null,
            'No content found'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'c-image__actions' })
      )
    );
  }
}

function RegionAnnotations(props) {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'c-dig-image-grid c-dig-image-grid--sm' },
    props.regionAnnotations ? props.regionAnnotations.map(annotation => getImageFromTarget(props.state, annotation, annotation.selector.target, 150)) : 'loading...'
  );
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_digirati_annotation_redux__["a" /* connector */])(RegionAnnotations));

/***/ })

},[429]);
//# sourceMappingURL=index.bundle.js.map