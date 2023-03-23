import { beforeEach, cy, describe  } from 'local-cypress';

describe('出力', () => {
  const testId = '6087cb6b-fa7f-4e75-8a64-0066985fb564';

  beforeEach(() => {
    
    cy.login();
    cy.visit(`/project/estimate/register?projEstimateId=${testId}`);
    cy.get('[aria-label="出力"]').first()
      .trigger('mouseover');
    cy.window().then(win => {
      cy.stub(win, 'open').as('Open');
    });
  });

  it('ANDPAD形式でエクスポート出来る', () => {


    cy.get('[aria-label*="アンドパッド"]')
      .click();

    cy.get('@Open').should('have.been.calledWithMatch', 'download/estimate/andpad');
  });

  it('EXCEL形式でエクスポート出来る', () => {

    cy.get('[aria-label*="顧客用形式"]')
      .click();

    cy.get('@Open').should('have.been.calledWithMatch', 'download/estimate/customer');


  });
});