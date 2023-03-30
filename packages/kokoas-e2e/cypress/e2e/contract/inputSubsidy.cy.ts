import { beforeEach, cy, describe } from 'local-cypress';

describe('Input Subsidy', () => {
  beforeEach(() => {
    cy.login();
  });
  it('補助金のチェックボックスにチェックが入っている場合、補助金の入力欄が表示される', () => {
    // TODO add fixtures for test data
    cy.visit('/contract/contract');
    cy.get('[data-cy="inputSubsidy"]').click();
    cy.get('[data-cy="subsidy"]').should('be.visible');
  });
});