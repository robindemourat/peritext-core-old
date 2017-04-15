'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDocumentSummary = exports.getDocumentSummary = exports.deleteDocumentSection = exports.createDocumentSection = exports.updateDocumentSection = exports.getDocumentSection = exports.deleteDocumentContextualizer = exports.createDocumentContextualizer = exports.updateDocumentContextualizer = exports.getDocumentContextualizer = exports.deleteDocumentContextualization = exports.createDocumentContextualization = exports.updateDocumentContextualization = exports.getDocumentContextualization = exports.deleteDocumentResource = exports.createDocumentResource = exports.updateDocumentResource = exports.getDocumentResource = exports.deleteDocumentMetadata = exports.createDocumentMetadata = exports.updateDocumentMetadata = exports.getDocumentMetadata = exports.bootstrapDocument = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaults = require('./defaults');

Object.keys(_defaults).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defaults[key];
    }
  });
});

var _getters = require('./getters');

Object.keys(_getters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getters[key];
    }
  });
});

var _models = require('./models');

Object.keys(_models).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _models[key];
    }
  });
});

var _uuid = require('uuid');

var _defaultDocument = require('./defaults/defaultDocument');

var _defaultDocument2 = _interopRequireDefault(_defaultDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bootstrapDocument = exports.bootstrapDocument = function bootstrapDocument() {
  return _defaultDocument2.default;
};

var getDocumentMetadata = exports.getDocumentMetadata = function getDocumentMetadata(document, key) {
  var domain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'general';
  return document && document.metadata && document.metadata.domain[key];
};

var updateDocumentMetadata = exports.updateDocumentMetadata = function updateDocumentMetadata(document, key, value) {
  var domain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'general';

  if (document && document.metadata) {
    return _extends({}, document, {
      metadata: _extends({}, document.metadata, _defineProperty({}, domain, _extends({}, document.metadata.domain, _defineProperty({}, key, value))))
    });
  }
  return undefined;
};

var createDocumentMetadata = exports.createDocumentMetadata = function createDocumentMetadata(document) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _uuid.v4)();
  var value = arguments[2];
  var domain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'general';

  if (document && document.metadata) {
    return {
      document: _extends({}, document, {
        metadata: _extends({}, document.metadata, _defineProperty({}, domain, _extends({}, document.metadata.domain, _defineProperty({}, key, value))))
      }),
      id: key
    };
  }
  return undefined;
};

var deleteDocumentMetadata = exports.deleteDocumentMetadata = function deleteDocumentMetadata(document, key) {
  var domain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'general';

  if (document && document.metadata) {
    var newDocument = _extends({}, document);
    delete newDocument.metadata[domain][key];
    return newDocument;
  }
  return undefined;
};

var getSubPropItem = function getSubPropItem(document, subPropKey, id) {
  return document && document[subPropKey] && document[subPropKey][id];
};

var updateSubPropItem = function updateSubPropItem(document, subPropKey, id, value) {
  return document && document[subPropKey] && _extends({}, document, _defineProperty({}, subPropKey, _extends({}, document[subPropKey], _defineProperty({}, id, value))));
};
var createSubPropItem = function createSubPropItem(document, subPropKey) {
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _uuid.v4)();
  var value = arguments[3];
  return document && document[subPropKey] && {
    document: _extends({}, document, _defineProperty({}, subPropKey, _extends({}, document[subPropKey], _defineProperty({}, id, value)))),
    id: id
  };
};

var deleteSubPropItem = function deleteSubPropItem(document, subPropKey, id) {
  if (document && document[subPropKey]) {
    var newDocument = _extends({}, document);
    delete newDocument[subPropKey][id];
    return newDocument;
  }
  return undefined;
};

var getDocumentResource = exports.getDocumentResource = function getDocumentResource(document, id) {
  return getSubPropItem(document, 'resource', id);
};

var updateDocumentResource = exports.updateDocumentResource = function updateDocumentResource(document, id, value) {
  return updateSubPropItem(document, 'resource', id, value);
};

var createDocumentResource = exports.createDocumentResource = function createDocumentResource(document) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _uuid.v4)();
  var value = arguments[2];
  return createSubPropItem(document, 'resource', id, value);
};

// todo : update its related contextualizations, and implementations in sections contents
var deleteDocumentResource = exports.deleteDocumentResource = function deleteDocumentResource(document, id) {
  return deleteSubPropItem(document, 'resource', id);
};

var getDocumentContextualization = exports.getDocumentContextualization = function getDocumentContextualization(document, id) {
  return getSubPropItem(document, 'contextualization', id);
};

var updateDocumentContextualization = exports.updateDocumentContextualization = function updateDocumentContextualization(document, id, value) {
  return updateSubPropItem(document, 'contextualization', id, value);
};

var createDocumentContextualization = exports.createDocumentContextualization = function createDocumentContextualization(document) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _uuid.v4)();
  var value = arguments[2];
  return createSubPropItem(document, 'contextualization', id, value);
};

// todo : update its implementations in sections contents
var deleteDocumentContextualization = exports.deleteDocumentContextualization = function deleteDocumentContextualization(document, id) {
  return deleteSubPropItem(document, 'contextualization', id);
};

var getDocumentContextualizer = exports.getDocumentContextualizer = function getDocumentContextualizer(document, id) {
  return getSubPropItem(document, 'contextualizer', id);
};

var updateDocumentContextualizer = exports.updateDocumentContextualizer = function updateDocumentContextualizer(document, id, value) {
  return updateSubPropItem(document, 'contextualizer', id, value);
};

var createDocumentContextualizer = exports.createDocumentContextualizer = function createDocumentContextualizer(document) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _uuid.v4)();
  var value = arguments[2];
  return createSubPropItem(document, 'contextualizer', id, value);
};

// todo : update contextualizations and their implementations in sections contents
var deleteDocumentContextualizer = exports.deleteDocumentContextualizer = function deleteDocumentContextualizer(document, id) {
  return deleteSubPropItem(document, 'contextualizer', id);
};

var getDocumentSection = exports.getDocumentSection = function getDocumentSection(document, id) {
  return getSubPropItem(document, 'section', id);
};

var updateDocumentSection = exports.updateDocumentSection = function updateDocumentSection(document, id, value) {
  return updateSubPropItem(document, 'section', id, value);
};

var createDocumentSection = exports.createDocumentSection = function createDocumentSection(document) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _uuid.v4)();
  var value = arguments[2];
  return createSubPropItem(document, 'section', id, value);
};

// todo: update summary
var deleteDocumentSection = exports.deleteDocumentSection = function deleteDocumentSection(document, id) {
  return deleteSubPropItem(document, 'section', id);
};

var getDocumentSummary = exports.getDocumentSummary = function getDocumentSummary(document) {
  return document && document.summary;
};

var updateDocumentSummary = exports.updateDocumentSummary = function updateDocumentSummary(document, summary) {
  return document && _extends({}, document, {
    summary: summary
  });
};