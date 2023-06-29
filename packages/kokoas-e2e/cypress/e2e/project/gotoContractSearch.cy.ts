import { cy, describe, it } from 'local-cypress';

describe('契約検索画面へ飛ぶ', () => {
  it('契約検索画面へ飛ぶ', () => {
    cy.fixture('testIds').then((testIds) => {
      cy.login();
      cy.visit(`/project/edit/v2?projId=${testIds.projIdWithContract}`);

      cy.contains('契約情報').parents('.MuiDivider-root')
        .next('div')
        .contains('編集')
        .click();

      cy.contains('h4', '契約編集').should('be.visible');

    });
    
    
  });
});