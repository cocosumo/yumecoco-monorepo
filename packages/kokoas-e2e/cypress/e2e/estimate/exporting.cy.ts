import { Cypress, beforeEach, cy, describe, expect } from 'local-cypress';
import path from 'path';

describe('出力', () => {
  const downloadsFolder = Cypress.config('downloadsFolder');

  beforeEach(() => {
    const testId = '6087cb6b-fa7f-4e75-8a64-0066985fb564';
    cy.login();
    cy.visit(`/project/estimate/register?projEstimateId=${testId}`);
    cy.get('[aria-label="出力"]').first()
      .trigger('mouseover');
    
  });

  it.only('ANDPAD形式でエクスポート出来る', () => {
    cy.get('[aria-label*="アンドパッド"]')
      .click();


    const downloadedFilename = path.join(downloadsFolder, '実行予算.xlsx');
    console.log(downloadsFolder);
    cy.readFile(downloadedFilename, 'binary', { timeout: 15000 })
      .should(buffer => expect(buffer.length).to.be.gt(100));
  });

  it('EXCEL形式でエクスポート出来る', () => {
    cy.get('[aria-label*="エクセル"]')
      .click();
    // TODO: ダウンロード出来たかどうかのテスト
  });
});