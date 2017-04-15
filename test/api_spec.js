import {expect} from 'chai';

import {
  getDocumentMetadata,
  updateDocumentMetadata,
  createDocumentMetadata,
  deleteDocumentMetadata,

  getDocumentResource,
  updateDocumentResource,
  createDocumentResource,
  deleteDocumentResource,

  getDocumentContextualization,
  updateDocumentContextualization,
  createDocumentContextualization,
  deleteDocumentContextualization,

  getDocumentContextualizer,
  updateDocumentContextualizer,
  createDocumentContextualizer,
  deleteDocumentContextualizer,

  getDocumentSection,
  updateDocumentSection,
  createDocumentSection,
  deleteDocumentSection,
} from '../src/peritext-core';



describe('peritext document api', () => {
  /*
   * document metadata api
   */
  describe('document metadata api', () => {
    describe('getDocumentMetadata', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = getDocumentMetadata(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('updateDocumentMetadata', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = updateDocumentMetadata(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('createDocumentMetadata', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = createDocumentMetadata(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('deleteDocumentMetadata', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = deleteDocumentMetadata(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
  });
  /*
   * document resource api
   */
   describe('document resource api', () => {
    describe('getDocumentResource', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = getDocumentResource(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('updateDocumentResource', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = updateDocumentResource(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('createDocumentResource', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = createDocumentResource(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('deleteDocumentResource', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = deleteDocumentResource(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
  });
  /*
   * document contextualizer api
   */
   describe('document contextualizer api', () => {
    describe('getDocumentContextualizer', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = getDocumentContextualizer(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('updateDocumentContextualizer', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = updateDocumentContextualizer(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('createDocumentContextualizer', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = createDocumentContextualizer(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('deleteDocumentContextualizer', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = deleteDocumentContextualizer(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
  });
  /*
   * document contextualization api
   */
   describe('document contextualization api', () => {
    describe('getDocumentContextualization', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = getDocumentContextualization(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('updateDocumentContextualization', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = updateDocumentContextualization(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('createDocumentContextualization', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = createDocumentContextualization(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('deleteDocumentContextualization', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = deleteDocumentContextualization(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
  });
  /*
   * document section api
   */
   describe('document section api', () => {
    describe('getDocumentSection', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = getDocumentSection(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('updateDocumentSection', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = updateDocumentSection(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('createDocumentSection', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = createDocumentSection(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
    describe('deleteDocumentSection', () => {
      it('should return undefined if no document is provided', (done) => {
        const doc = deleteDocumentSection(undefined);
        expect(doc).to.be.undefined;
        done();
      });
    });
  });
});
