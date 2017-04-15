'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _metadataModels = require('./metadataModels.json');

Object.defineProperty(exports, 'metadataModels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_metadataModels).default;
  }
});

var _resourceModels = require('./resourceModels.json');

Object.defineProperty(exports, 'resourceModels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_resourceModels).default;
  }
});

var _sectionTypeModels = require('./sectionTypeModels.json');

Object.defineProperty(exports, 'sectionTypeModels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sectionTypeModels).default;
  }
});

var _contextualizerModels = require('./contextualizerModels.json');

Object.defineProperty(exports, 'contextualizerModels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_contextualizerModels).default;
  }
});

var _settingsModels = require('./settingsModels.json');

Object.defineProperty(exports, 'settingsModels', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_settingsModels).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }