import { cy, Cypress } from 'local-cypress';

Cypress.Commands.add('login', () => {
  const username = Cypress.env('USERNAME');
  const password = Cypress.env('PASSWORD');

  cy.session(
    username,
    () => {
      cy.visit('/');

      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(`${password}{enter}`, { log: false });
      cy.url().should('not.include', 'login');
      cy.get('#app .MuiDrawer-root .MuiListItemText-root').should('contain', 'ログアウト');
    },
    {
      validate: () => {
        cy.getAllCookies().should('exist');
      },
    },
  );

  Cypress.Commands.add('getTextInputsByLabel', (label: string, type = 'input') => {
    cy.get(`label:contains(${label}) ~ div ${type}`);
  });

  Cypress.Commands.add('getCheckboxesByLabel', (label: string) => {

    cy.contains('label', label)
      .find('input[type="checkbox"]');
  });

  Cypress.Commands.add('getRadiosByValue', (value: string) => {
    cy.get(`input[value="${value}"]`);
  });



});
