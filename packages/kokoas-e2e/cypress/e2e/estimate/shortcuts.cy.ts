import { beforeEach, cy, describe } from 'local-cypress';

describe('Estimate shortcuts', () => {
  beforeEach(() => {
    // test id
    const testId = 'ce4e52a0-4486-4bae-944c-22c63850de9f';
    
    cy.login();
    cy.visit(`/project/estimate/register?projEstimateId=${testId}&menuOpen=0`);
    cy.get('#app > div').as('container');
  });
  it('行を追加する', () => {
    // test if scroll bar height increased
    cy.get('@container')
      .then(($body) => {

        cy.get('input[name="items.0.costPrice"]')
          .as('costPrice')
          .focus()
          .type('{ctrl}i', { scrollBehavior: 'center' });

        cy.get('input[name="items.1.costPrice"]')
      });
  });
});