import { cy, describe, expect, it } from 'local-cypress';
import { TEnvelopeStatus, envelopeStatuses } from 'types';
import qs from 'qs';



const interceptContractRequest = (status: TEnvelopeStatus) => {
  cy.intercept('GET', '**/k/v1/records.json?app=231*', (req) => {
    req.continue((res) => {
      if (res?.body?.records?.[0]?.envelopeStatus) {
        res.body.records[0].envelopeStatus.value = status;
      }
    });
  }).as('getContract');
};

describe('削除処理', () => {
  beforeEach(() => {
    cy.login();

    cy.fixture('testIds')
      .then((testIds) => {
        cy.visit(`/project/contract/preview/v2?contractId=${testIds.contractId}`);
      });

  });

  it('未処理の契約が削除できること', () => {
    interceptContractRequest('');
    /* * 
      * Kintone側の処理になるので、
      * 実際に削除されたテストは不要です。
      * 当面、契約削の理関数の既存の結合テストで十分です。
      * 
      * 実際に削除リクエストを呼ばず、モックする ~ ras 2023-05-12
      * */
    cy.intercept('DELETE', '**/k/v1/records.json*', (req) => {
      const query = qs.parse(req.url.split('?')[1]);
      expect(query.ids?.length).to.be.eq(1, '削除対象の契約が1件であること');
      req.reply({
        statusCode: 200,
      });
    }).as('deleteContract');

    cy.contains('h4', '契約編集').should('be.visible');

    cy.contains('button', '削除').click();
    cy.contains('削除しますか？').should('be.visible');

    cy.contains('.MuiDialogActions-root button', '削除').click();

    cy.wait('@getContract');

    cy.contains('削除が出来ました。').should('be.visible');

  });

  envelopeStatuses
    .filter(Boolean)
    .forEach((status) => {
      it(`「${status}」状態の契約は削除できないこと`, () => {
        interceptContractRequest(status);
        cy.contains('h4', '契約編集').should('be.visible');
        cy.contains('button', '削除').should('be.disabled');
      });
    });

});