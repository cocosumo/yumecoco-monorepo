import { cy, describe, it } from 'local-cypress';

describe('削除処理', () => {
  beforeEach(() => {
    cy.login();

    cy.fixture('testIds')
      .then((testIds) => {
        cy.visit(`/project/contract/preview/v2?contractId=${testIds.contractId}`);
      });

  });
  it.only('未処理の契約が削除できること', () => {
    // intercept API GET request to k/v1/records.json with query param containing app=231
    cy.intercept('GET', '**/k/v1/records.json?app=231*', (req) => {
      req.continue((res) => {
        // modify the response body
        if (res?.body?.records?.[0]?.envelopeStatus) {
          res.body.records[0].envelopeStatus.value = 'sent';
          
        }
      });
    });


  });

  it('未処理以外の契約は削除できないこと', () => {
    // TODO
  });

});