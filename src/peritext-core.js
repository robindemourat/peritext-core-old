import {
  v4 as generateId
} from 'uuid';

import defaultDocument from './defaults/defaultDocument';

export * from './defaults';
export * from './getters';
export * from './models';

export const bootstrapDocument = () => defaultDocument;

export const getDocumentMetadata = (document, key, domain = 'general') => document 
          && document.metadata
          && document.metadata.domain[key];

export const updateDocumentMetadata = (document, key, value, domain = 'general') => {
  if (document && document.metadata) {
    return {
      ...document,
      metadata: {
        ...document.metadata,
        [domain]: {
          ...document.metadata.domain,
          [key]: value
        }
      }
    };
  }
  return undefined;
};

export const createDocumentMetadata = (document, key = generateId(), value, domain = 'general') => {
  if (document && document.metadata) {
    return {
      document: {
        ...document,
        metadata: {
          ...document.metadata,
          [domain]: {
            ...document.metadata.domain,
            [key]: value
          }
        }
      },
      id: key
    };
  }
  return undefined;
};

export const deleteDocumentMetadata = (document, key, domain = 'general') => {
  if (document && document.metadata) {
    const newDocument = { ...document };
    delete newDocument.metadata[domain][key];
    return newDocument;
  }
  return undefined;
};


const getSubPropItem = (document, subPropKey, id) => 
  document && 
  document[subPropKey] &&
  document[subPropKey][id];

const updateSubPropItem = (document, subPropKey, id, value) =>
  document &&
  document[subPropKey] &&
    {
      ...document,
      [subPropKey]: {
        ...document[subPropKey],
        [id]: value
      }
    };
const createSubPropItem = (document, subPropKey, id = generateId(), value) =>
  document &&
  document[subPropKey] &&
    {
      document: {
        ...document,
        [subPropKey]: {
          ...document[subPropKey],
          [id]: value
        }
      },
      id
    };

const deleteSubPropItem = (document, subPropKey, id) => {
  if (document && document[subPropKey]) {
    const newDocument = { ...document };
    delete newDocument[subPropKey][id];
    return newDocument;
  }
  return undefined;
};


export const getDocumentResource = (document, id) => 
  getSubPropItem(document, 'resource', id);

export const updateDocumentResource = (document, id, value) =>
  updateSubPropItem(document, 'resource', id, value);

export const createDocumentResource = (document, id = generateId(), value) =>
  createSubPropItem(document, 'resource', id, value);

// todo : update its related contextualizations, and implementations in sections contents
export const deleteDocumentResource = (document, id) => 
  deleteSubPropItem(document, 'resource', id);


export const getDocumentContextualization = (document, id) => 
  getSubPropItem(document, 'contextualization', id);

export const updateDocumentContextualization = (document, id, value) =>
  updateSubPropItem(document, 'contextualization', id, value);

export const createDocumentContextualization = (document, id = generateId(), value) =>
  createSubPropItem(document, 'contextualization', id, value);

// todo : update its implementations in sections contents
export const deleteDocumentContextualization = (document, id) => 
  deleteSubPropItem(document, 'contextualization', id);


export const getDocumentContextualizer = (document, id) => 
  getSubPropItem(document, 'contextualizer', id);

export const updateDocumentContextualizer = (document, id, value) =>
  updateSubPropItem(document, 'contextualizer', id, value);

export const createDocumentContextualizer = (document, id = generateId(), value) =>
  createSubPropItem(document, 'contextualizer', id, value);

// todo : update contextualizations and their implementations in sections contents
export const deleteDocumentContextualizer = (document, id) => 
  deleteSubPropItem(document, 'contextualizer', id);


export const getDocumentSection = (document, id) => 
  getSubPropItem(document, 'section', id);

export const updateDocumentSection = (document, id, value) =>
  updateSubPropItem(document, 'section', id, value);

export const createDocumentSection = (document, id = generateId(), value) =>
  createSubPropItem(document, 'section', id, value);

// todo: update summary
export const deleteDocumentSection = (document, id) => 
  deleteSubPropItem(document, 'section', id);

export const getDocumentSummary = document => 
  document &&
  document.summary;

export const updateDocumentSummary = (document, summary) => 
  document &&
    {
      ...document,
      summary
    };
