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
    cy.get('input[name="items.0.costPrice"]').as('costPrice');
    cy.contains('p', '行数')
      .as('rowCount');
  });
  
  it('行を追加する', () => {

    cy.get('@rowCount')
      .then(($rowCount) => {
        const rows = +$rowCount.text().replace(/\D/g, '');

        cy.get('@costPrice').type('{meta}i');
        cy.get('@rowCount').invoke('text')
          .then((text) => {
            const newRows = +text.replace(/\D/g, '');
            expect(newRows).to.eq(rows + 1);
          });
      });
  });

  it.only('行を削除する', () => {
    
  });
});