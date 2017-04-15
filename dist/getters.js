'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// export const packSection = (document, section) => {
//   const mappedContextualizations = section.contextualizations.map(key =>
//     document.contextualizations[key]
//   );

//   const contextualizations = mappedContextualizations.reduce((total, item) =>
//     Object.assign(total, { [item.id]: item }), {});

//   const contextualizers = mappedContextualizations.map(cont =>
//     document.contextualizers[cont.contextualizer]
//   ).reduce((total, item) =>
//     Object.assign(total, { [item.id]: item }), {});
//   const resources = mappedContextualizations
//    .reduce((res, contextualization) => 
//   res.concat(
//     contextualization.resources
//     .map(resKey => document.resources[resKey])
// ), [])
// .reduce((total, item) =>
//       Object.assign(total, { [item.id]: item }), {});

//   return Object.assign({},
//     section,
//     { contextualizations },
//     { contextualizers },
//     { resources }
//   );
// };

// export const getSection = (document, id) => {
//   const section = document.sections[id];
//   return packSection(document, section);
// };


var getTableOfSections = exports.getTableOfSections = function getTableOfSections(document) {
  return document.summary.map(function (sectionKey) {
    var metadata = document.sections[sectionKey].metadata;
    return {
      id: metadata.general.id.value,
      generalityLevel: metadata.general.generalityLevel.value,
      title: metadata.general.title.value,
      parent: metadata.general.parent ? metadata.general.parent.value : undefined
    };
  });
};

// export const getDocumentBibliography = (document, settings, preRenderContexts) =>
//   computeReferences(document, settings, preRenderContexts);

var getTableOfFigures = exports.getTableOfFigures = function getTableOfFigures(document) {
  return Object.keys(document.contextualizations).map(function (key) {
    return document.contextualizations[key];
  }).filter(function (contextualization) {
    return contextualization.figureId;
  }).map(function (contextualization) {
    return {
      figureId: contextualization.figureId,
      figureNumber: contextualization.figureNumber,
      contextualization: contextualization
    };
  });
};

var getResourceContextualizations = exports.getResourceContextualizations = function getResourceContextualizations(document, resourceId) {
  return Object.keys(document.contextualizations).map(function (key) {
    return document.contextualizations[key];
  }).filter(function (contextualization) {
    return contextualization.resources.indexOf(resourceId) > -1;
  });
};

var getContextualizerContextualizations = exports.getContextualizerContextualizations = function getContextualizerContextualizations(document, contextualizerId) {
  return Object.keys(document.contextualizations).map(function (key) {
    return document.contextualizations[key];
  }).filter(function (contextualization) {
    return contextualization.contextualizer === contextualizerId;
  });
};

var retrieveContext = exports.retrieveContext = function retrieveContext(document, contextualization) {
  var sectionId = contextualization.nodePath[0];
  var contentCategory = contextualization.nodePath[1];
  var blockNumber = contextualization.nodePath[2];
  var contextBlock = document.sections[sectionId][contentCategory][blockNumber];
  var previousBlock = contentCategory === 'contents' && blockNumber > 0 ? document.sections[sectionId][contentCategory][blockNumber - 1] : undefined;
  var nextBlock = contentCategory === 'contents' && blockNumber < document.sections[sectionId][contentCategory].length - 1 ? document.sections[sectionId][contentCategory][blockNumber + 1] : undefined;
  return {
    previousBlock: previousBlock && JSON.parse(JSON.stringify(previousBlock)),
    contextBlock: contextBlock && JSON.parse(JSON.stringify(contextBlock)),
    nextBlock: nextBlock && JSON.parse(JSON.stringify(nextBlock))
  };
};

var getAllContextualizationsFromResource = exports.getAllContextualizationsFromResource = function getAllContextualizationsFromResource(document, resourceId) {
  var preRenderContexts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return Object.keys(document.contextualizations).map(function (key) {
    return document.contextualizations[key];
  }).filter(function (contextualization) {
    return contextualization.resources.indexOf(resourceId) > -1;
  }).map(function (contextualization) {
    return {
      contextualization: contextualization,
      context: preRenderContexts && retrieveContext(document, contextualization),
      sectionId: contextualization.nodePath[0],
      sectionTitle: document.sections[contextualization.nodePath[0]].metadata.general.title.value
    };
  });
};

var getGlossary = exports.getGlossary = function getGlossary(document) {
  var preRenderContexts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var entitiesTypes = ['person', 'place', 'subject', 'concept', 'organization', 'technology', 'artefact'];
  var sections = Object.keys(document.sections).map(function (key) {
    return document.sections[key];
  });
  // get all glossary contextualizations
  var glossaryPointers = sections.reduce(function (results, thatSection) {
    var sectionCitekey = thatSection.metadata.general.id.value;
    return results.concat(thatSection.contextualizations.filter(function (thatContextualization) {
      return document.contextualizations[thatContextualization].contextualizerType === 'glossary';
    }).reduce(function (localResults, contextualizationKey) {
      var contextualization = document.contextualizations[contextualizationKey];
      var targetBlockPath = contextualization.nodePath.slice(0, 3);
      var context = void 0;
      if (preRenderContexts) {
        context = retrieveContext(document, contextualization);
      }
      return localResults.concat({
        mentionId: '#peritext-static-entity-inline-' + sectionCitekey + '-' + contextualization.id,
        id: contextualization.id,
        entity: document.resources[contextualization.resources[0]].id,
        alias: document.contextualizers[contextualization.contextualizer].alias,
        targetBlockPath: targetBlockPath,
        nodePath: contextualization.nodePath,
        context: context
      });
    }, []));
  }, []);
  // regroup related resources
  var glossaryResources = [];
  Object.keys(document.resources).forEach(function (refKey) {
    var thatResource = document.resources[refKey];
    if (thatResource.inheritedVerticallyFrom === undefined && entitiesTypes.indexOf(thatResource.bibType) > -1) {
      glossaryResources.push(thatResource);
    }
  });
  // reduce to have a one-entry-per-entity glossary
  var glossaryData = glossaryResources.map(function (inputGlossaryEntry) {
    var glossaryEntry = Object.assign({}, inputGlossaryEntry);
    // retroup resources
    glossaryEntry.aliases = glossaryPointers.filter(function (pointer) {
      return pointer.entity === glossaryEntry.id;
    }).reduce(function (aliases, entry) {
      var alias = entry.alias || 'no-alias';
      var newAlias = aliases[alias] ? aliases[alias].concat(entry) : [entry];
      // aliases[alias] = aliases[alias] ? aliases[alias].concat(entry) : [entry];
      return _extends({}, aliases, _defineProperty({}, alias, newAlias));
    }, {});
    return glossaryEntry;
  }).sort(function (entry1, entry2) {
    if ((entry1.name || entry1.lastname) > (entry2.name || entry2.lastname)) {
      return 1;
    }
    return -1;
  });
  return glossaryData;
};