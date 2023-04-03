import { getNumberFromString } from 'libs/src/getNumberFromString';
import { beforeEach, cy, describe, expect } from 'local-cypress';

describe('Estimate shortcuts', () => {
  beforeEach(() => {
    /**
     * テストデータの条件:
     * 1. 行が１行以上ある
     */
    const testId = 'ce4e52a0-4486-4bae-944c-22c63850de9f';
    
    cy.login();

    cy.visit(`/project/estimate/register?projEstimateId=${testId}&menuOpen=0`);
    cy.get('input[name="items.0.costPrice"]').as('firstCostPrice');
    cy.get('input[name*="costPrice"]').as('costPriceFields');

    cy.contains('p', /\d+行/)
      .as('rowCount');
  });
  
  it('行を追加する', () => {

    cy.get('@rowCount')
      .invoke('text')
      .then((oldRowCount) => {
        const rows = getNumberFromString(oldRowCount);

        cy.get('@firstCostPrice').type('{meta}i');
        cy.get('@rowCount')
          .invoke('text')
          .then((newRowCount) => {
            const newRows = getNumberFromString(newRowCount);
            expect(newRows).to.eq(rows + 1);
          });
      });
  });

  it.only('行を削除する', () => {
    const testRowCount = 5;

    cy.get('@rowCount')
      .then(($rowCount) => {
        const rows = getNumberFromString($rowCount.text());
        cy.get('@firstCostPrice').type('{meta}i');
        for (let i = 1; i < testRowCount - rows; i++) {
          cy.get('@firstCostPrice').type('{meta}i', { release: false });
        }
      });
      
    cy.get('@rowCount')
      .invoke('text')
      .should('eq', `${testRowCount}行`);

    cy.log('１行目を削除したら、フォーカスは次の行に移動する');
    cy.get('@firstCostPrice').type('{meta}{del}');
    cy.get('@firstCostPrice').should('have.focus');
  });


});