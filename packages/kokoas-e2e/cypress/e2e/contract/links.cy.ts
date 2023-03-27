import { beforeEach, cy, describe, it } from 'local-cypress';

describe('契約一覧：リンクのテスト', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/project/contract/search');
  });

  it('契約画面へ移動する', () => {
    cy.contains('.MuiChip-root', '完了').first()
      .click();
    cy.url().should('include', '/project/contract/preview');
    cy.contains('h4', '契約').should('exist');
  });

  it('工事情報画面へ移動する', () => {
    cy.get('button[aria-label*="工事情報"]').first()
      .click();
    cy.contains('工事情報').click();
    cy.url().should('include', '/project');
    cy.contains('h4', '工事').should('exist');
  });

  it('見積画面へ移動する', () => {
    cy.get('button[aria-label*="見積"]').first()
      .click();
    cy.contains('工事情報').click();
    cy.url().should('include', '/project/estimate');
    cy.contains('h4', '見積').should('exist');
  });
});