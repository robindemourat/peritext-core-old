

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


export const getTableOfSections = document =>
  document.summary.map((sectionKey) => {
    const metadata = document.sections[sectionKey].metadata;
    return {
      id: metadata.general.id.value,
      generalityLevel: metadata.general.generalityLevel.value,
      title: metadata.general.title.value,
      parent: metadata.general.parent ? metadata.general.parent.value : undefined
    };
  });

// export const getDocumentBibliography = (document, settings, preRenderContexts) =>
//   computeReferences(document, settings, preRenderContexts);

export const getTableOfFigures = document =>
  Object.keys(document.contextualizations)
  .map(key => document.contextualizations[key])
  .filter(contextualization => contextualization.figureId)
  .map(contextualization => ({
    figureId: contextualization.figureId,
    figureNumber: contextualization.figureNumber,
    contextualization
  }));

export const getResourceContextualizations = (document, resourceId) =>
  Object.keys(document.contextualizations)
    .map(key => document.contextualizations[key])
    .filter(contextualization =>
      contextualization.resources.indexOf(resourceId) > -1
    );

export const getContextualizerContextualizations = (document, contextualizerId) =>
  Object.keys(document.contextualizations)
    .map(key => document.contextualizations[key])
    .filter(contextualization =>
      contextualization.contextualizer === contextualizerId
    );

export const retrieveContext = (document, contextualization) => {
  const sectionId = contextualization.nodePath[0];
  const contentCategory = contextualization.nodePath[1];
  const blockNumber = contextualization.nodePath[2];
  const contextBlock = document.sections[sectionId][contentCategory][blockNumber];
  const previousBlock = (contentCategory === 'contents' && blockNumber > 0) ? document.sections[sectionId][contentCategory][blockNumber - 1] : undefined;
  const nextBlock = (contentCategory === 'contents' && blockNumber < document.sections[sectionId][contentCategory].length - 1) ? document.sections[sectionId][contentCategory][blockNumber + 1] : undefined;
  return {
    previousBlock: previousBlock && JSON.parse(JSON.stringify(previousBlock)),
    contextBlock: contextBlock && JSON.parse(JSON.stringify(contextBlock)),
    nextBlock: nextBlock && JSON.parse(JSON.stringify(nextBlock))
  };
};

export const getAllContextualizationsFromResource = (
  document, resourceId, preRenderContexts = true
) =>
  Object.keys(document.contextualizations)
    .map(key => document.contextualizations[key])
    .filter(contextualization => contextualization.resources.indexOf(resourceId) > -1)
    .map(contextualization => ({
      contextualization,
      context: preRenderContexts && retrieveContext(document, contextualization),
      sectionId: contextualization.nodePath[0],
      sectionTitle: document.sections[contextualization.nodePath[0]].metadata.general.title.value
    }));

export const getGlossary = (document, preRenderContexts = true) => {
  const entitiesTypes = [
    'person', 
    'place', 
    'subject', 
    'concept', 
    'organization', 
    'technology', 
    'artefact'
  ];
  const sections = Object.keys(document.sections).map(key => document.sections[key]);
  // get all glossary contextualizations
  const glossaryPointers = sections.reduce((results, thatSection) => {
    const sectionCitekey = thatSection.metadata.general.id.value;
    return results.concat(
      thatSection.contextualizations
      .filter(thatContextualization => document.contextualizations[thatContextualization].contextualizerType === 'glossary')
      .reduce((localResults, contextualizationKey) => {
        const contextualization = document.contextualizations[contextualizationKey];
        const targetBlockPath = contextualization.nodePath.slice(0, 3);
        let context;
        if (preRenderContexts) {
          context = retrieveContext(document, contextualization);
        }
        return localResults.concat({
          mentionId: `#peritext-static-entity-inline-${ 
             sectionCitekey 
             }-${ 
             contextualization.id}`,
          id: contextualization.id,
          entity: document.resources[contextualization.resources[0]].id,
          alias: document.contextualizers[contextualization.contextualizer].alias,
          targetBlockPath,
          nodePath: contextualization.nodePath,
          context
        });
      }, []));
  }, []);
  // regroup related resources
  const glossaryResources = [];
  Object.keys(document.resources)
  .forEach((refKey) => {
    const thatResource = document.resources[refKey];
    if (thatResource.inheritedVerticallyFrom === undefined
        && entitiesTypes.indexOf(thatResource.bibType) > -1
        ) {
      glossaryResources.push(thatResource);
    }
  });
  // reduce to have a one-entry-per-entity glossary
  const glossaryData = glossaryResources.map((inputGlossaryEntry) => {
    const glossaryEntry = Object.assign({}, inputGlossaryEntry);
    // retroup resources
    glossaryEntry.aliases = glossaryPointers
    .filter(pointer => pointer.entity === glossaryEntry.id)
    .reduce((aliases, entry) => {
      const alias = entry.alias || 'no-alias';
      const newAlias = aliases[alias] ? aliases[alias].concat(entry) : [entry];
      // aliases[alias] = aliases[alias] ? aliases[alias].concat(entry) : [entry];
      return {
        ...aliases,
        [alias]: newAlias
      };
    }, {});
    return glossaryEntry;
  }).sort((entry1, entry2) => {
    if ((entry1.name || entry1.lastname) > (entry2.name || entry2.lastname)) {
      return 1;
    }
    return -1;
  });
  return glossaryData;
};
