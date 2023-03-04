import { context, cy, expect } from 'local-cypress';

/**
 * @todo add process for seeds.
 */

describe('契約一覧', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/project/contract/search');
    cy.intercept('GET', ' **/k/v1/records.json**').as('search');

    cy.get('.MuiTable-root')
      .as('table')
      .should('exist');

    cy.get('@table')
      .find('.MuiTableHead-root')
      .as('tableHead')
      .should('exist');

    cy.get('@table')
      .find('.MuiTableBody-root')
      .as('tableBody')
      .should('exist');

    cy.wait('@search');
  });

  it('shows contract data', () => {
    cy.get('@tableBody').find('tr')
      .should('have.length.at.least', 3); // todo: counter check with database if it matches exact count.
  });

  context('shows contract status', () => {
    it('shows contract status in header ', ()  => {
      cy.get('@tableHead').find('th')
        .first()
        .should('contain', '契約進歩');

    });


    it('shows contract status in body ', ()  => {
      cy.get('@tableBody')
        .find('tr > td:first-child')
        .each(($td) => {
          const isStatusExist = !!$td.text().split('K')[0];
          cy.log(`First TD Content ${$td.text()}`);
          expect(isStatusExist).to.be.true;
        });

    });
  });

});