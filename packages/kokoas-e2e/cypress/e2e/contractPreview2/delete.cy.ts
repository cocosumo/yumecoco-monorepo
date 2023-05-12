import { cy, describe, it } from 'local-cypress';

describe('削除処理', () => {
  beforeEach(() => {
    cy.login();
    cy.fixture('testIds').then((testIds) => {
      cy.visit(`/project/contract/preview/v2?contractId=${testIds.contractId}`);
    });

  });
  it.only('未処理の契約が削除できること', () => {
    
  });

  it('未処理以外の契約は削除できないこと', () => {
    // TODO
  });

});