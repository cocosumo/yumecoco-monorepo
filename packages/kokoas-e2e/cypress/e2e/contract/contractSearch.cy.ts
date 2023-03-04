import { cy } from 'local-cypress';

/**
 * @todo add process for seeds.
 */

describe('契約一覧', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/project/contract/search');
    cy.intercept('GET', ' **/k/v1/records.json**').as('search');
    cy.wait('@search');
  });

  it('shows contract data', () => {
    cy.get('.MuiTableBody-root tr').should('have.length.at.least', 3);
  });

  it('shows contract status', () => {
    cy.get('.MuiTableBody-root tr').should('contain', '契約中');
  });

});