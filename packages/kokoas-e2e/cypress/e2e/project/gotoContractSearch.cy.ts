import { cy, describe, it } from 'local-cypress';

describe('契約検索画面へ飛ぶ', () => {
  it('契約検索画面へ飛ぶ', () => {
    cy.fixture('testIds').then((testIds) => {
      cy.login();
      cy.visit(`/project/edit?projId=${testIds.projIdWithContract}`);

      cy.contains('button', '契約を見る').click();

      cy.contains('h4', '契約一覧').should('be.visible');

      cy.get('.MuiTableBody-root').find('tr')
        .should('have.length.above', 0);
    });
    
    
  });
});