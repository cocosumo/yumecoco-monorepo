import { Cypress, beforeEach, cy, describe, expect } from 'local-cypress';
import path from 'path';

describe('出力', () => {
  const downloadsFolder = Cypress.config('downloadsFolder');
  const testId = '6087cb6b-fa7f-4e75-8a64-0066985fb564';

  beforeEach(() => {
    
    cy.login();
    cy.visit(`/project/estimate/register?projEstimateId=${testId}`);
    cy.get('[aria-label="出力"]').first()
      .trigger('mouseover');
    
  });

  it('ANDPAD形式でエクスポート出来る', () => {
    cy.get('[aria-label*="アンドパッド"]')
      .click();


    const downloadedFilename = path.join(downloadsFolder, '実行予算.xlsx');
    console.log(downloadsFolder);
    cy.readFile(downloadedFilename, 'binary', { timeout: 15000 })
      .should(buffer => expect(buffer.length).to.be.gt(100));
  });

  it('EXCEL形式でエクスポート出来る', () => {
    cy.window().then(win => {
      cy.stub(win, 'open').as('Open');
    });

    cy.get('[aria-label*="顧客用形式"]')
      .click();

    cy.get('@Open').should('have.been.calledWithMatch', 'download/estimate/customer');


  });
});