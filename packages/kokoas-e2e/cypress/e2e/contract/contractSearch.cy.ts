import { afterEach, beforeEach, context, cy, expect } from 'local-cypress';

/**
 * @todo add process for seeds.
 */

describe('契約一覧', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/project/contract/search');


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

    cy.get('form > div:nth-of-type(2)')
      .as('filterChipsContainer');

  });

  context(
    'shows information in table',
    { testIsolation: false },
    () => {

      it('shows all contract data', () => {
        cy.get('@tableBody').find('tr')
          .should('have.length.at.least', 3); // todo: assert with database if it matches exact record.
      });

      it('shows contract status header ', ()  => {
        cy.get('@tableHead').find('th')
          .first()
          .should('contain', '契約進歩');
      });

      it('shows contract status in all rows', ()  => {
        cy.get('@tableBody')
          .find('tr > td:first-child')
          .each(($td) => {
            const isStatusExist = !!$td.text().split('K')[0];
            cy.log(`First TD Content ${$td.text()}`);
            expect(isStatusExist).to.be.true;
          });
      });

      it('should navigate to the contract page when the contract status is clicked', () => {

        // Click on the first chip label element in the first column of the table body
        cy.get('@tableBody')
          .find('tr > td:first-child .MuiChip-label')
          .first()
          .click();

        cy.url().should('include', '/project/contract/preview');
      });
    },
  );

  context('filters', () => {

    beforeEach(() => {
      // click button containing リセット to reset the filter to default.
      cy.get('button').contains('リセット')
        .click();

      // assert that the url doesn't have query params
      cy.url().should('not.include', '?');

      // click button containing 絞り込み
      cy.get('button[aria-label="絞り込み"]').click();

      // assert that the dialog is open
      cy.get('.MuiDialogTitle-root').contains('絞り込み')
        .should('be.visible');

      // assert that filter dialog has all checkboxes checked as default
      cy.contains('label', '契約進歩')
        .siblings('div')
        .find('input[type="checkbox"]')
        .as('contractStatuses')
        .should('be.checked');

      cy.contains('label', '完了')
        .find('input[type="checkbox"]')
        .as('completeStatus-checkbox');

      cy.contains('label', '未完了')
        .as('incompleteStatus-label');

      cy.get('@incompleteStatus-label')
        .find('input[type="checkbox"]')
        .as('incompleteStatus-checkbox');

      cy.get('@incompleteStatus-label').next()
        .find('input[type="checkbox"]')
        .as('incompleteStatusSteps-checkboxes');

      cy.contains('button', '検索').as('searchButton');
    });

    context("show completed ONLY contracts when only '完了' checkbox is checked", () => {
      beforeEach(() => {
        cy.get('@completeStatus-checkbox')
          .should('be.checked');
      });

      it("unchecks '未完了' checkbox", () => {

        cy.get('@incompleteStatus-checkbox')
          .should('be.checked')
          .click()
          .should('not.be.checked');
      });

      it("unchecks '未完了' checkbox by unchecking all contract steps", () => {
        cy.get('@incompleteStatusSteps-checkboxes')
          .each(($checkbox, index, $list) => {
            const isLastCheckbox = index === $list.length - 1;
            cy.wrap($checkbox)
              .should('be.checked')
              .click()
              .should('not.be.checked');

            cy.get('@incompleteStatus-checkbox')
              .should('have.attr', 'data-indeterminate', isLastCheckbox ? 'false' : 'true');

          });

        // assert that the '未完了' checkbox is not checked when all steps are unchecked
        cy.get('@incompleteStatus-checkbox').should('not.be.checked');
      });

      afterEach(() => {
        cy.get('@searchButton').click()
          .should('not.exist');

        cy.get('@filterChipsContainer')
          .should('contain', '契約完了')
          .should('not.contain', '未完了');
      // TODO: assert results
      });

    });

    context("show incomplete ONLY contracts when only '未完了' checkbox is checked", () => {
      beforeEach(() => {
        // uncheck complete status checkbox
        cy.get('@completeStatus-checkbox')
          .should('be.checked')
          .click()
          .should('not.be.checked');
      });

      it('cycle check 未完了 normally', () => {
        cy.get('@incompleteStatus-checkbox')
          .should('be.checked')
          .click()
          .should('not.be.checked')
          .click();
      });

      it('checks 未完了 when all　確認中 checkboxes is checked', () => {

        // uncheck a random 確認中 checkbox
        const randomIndex = Math.floor(Math.random() * 5);
        cy.get('@incompleteStatusSteps-checkboxes')
          .eq(randomIndex)
          .as('randomStep')
          .should('be.checked')
          .click()
          .should('not.be.checked');

        cy.get('@incompleteStatus-checkbox')
          .should('have.attr', 'data-indeterminate', 'true');


        cy.get('@randomStep')
          .click()
          .should('be.checked');
      });

      it.only('checks all 確認中 checkboxes when 未完了 is checked', () => {

        // Generate up to 4 unique random indexes
        const randomIndexes = [...new Set(Array.from({ length: 4 }, () => Math.floor(Math.random() * 5)))];

        randomIndexes.forEach((randomIndex) => {
          cy.get('@incompleteStatusSteps-checkboxes').eq(randomIndex)
            .should('be.checked')
            .click()
            .should('not.be.checked');
        });

        cy.get('@incompleteStatus-checkbox')
          .should('have.attr', 'data-indeterminate', 'true');

        // assert that the '未完了' checkbox is checked
        cy.get('@incompleteStatus-checkbox').click();

      });

      afterEach(() => {

        cy.get('@incompleteStatus-checkbox')
          .should('have.attr', 'data-indeterminate', 'false')
          .should('be.checked');

        cy.get('@searchButton').click()
          .should('not.exist');

        cy.get('@filterChipsContainer')
          .should('contain', '未完了') // assert that the filter chip container contains '未完了'
          .should('not.contain', '契約完了') // assert that the filter chip container doesn't contain '契約完了'
          .find('.MuiChip-root:contains(確認中)') // find all Chips with the text '確認中'
          .should('have.length', 5); // loosely asserts that there are 5 Chips with the text '確認中'


      // TODO: assert results
      });


    });

  });

});
