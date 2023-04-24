import { cy, Cypress } from 'local-cypress';

Cypress.Commands.add('login', () => {
  const username = Cypress.env('USERNAME');
  const password = Cypress.env('PASSWORD');

  cy.log(`Logging in as ${username}...`);

  cy.session(
    username,
    () => {
      cy.visit('/');

      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(`${password}{enter}`, { log: false });
      cy.url().should('not.include', 'login');
      
    },
    {
      validate: () => {
        cy.getAllCookies().should('exist');
      },
    },
  );

  Cypress.Commands.add('getTextInputsByLabel', (label: string) => {
    cy.get(`label:contains(${label}) ~ div input`);
  });
});
