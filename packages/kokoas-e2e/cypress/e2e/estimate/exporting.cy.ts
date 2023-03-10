import { beforeEach, cy, describe } from 'local-cypress';

describe('出力', () => {

  beforeEach(() => {
    const testId = '6087cb6b-fa7f-4e75-8a64-0066985fb564';

    cy.login();
    cy.visit(`/project/estimate/register?projEstimateId=${testId}`);
    cy.get('[aria-label="出力"]')
      .click();
    
  });

  it('ANDPAD形式でエクスポート出来る', () => {
    cy.contains('li', 'ANDPAD').should('exist')
      .click();
    // TODO: ダウンロード出来たかどうかのテスト
  });

  it('EXCEL形式でエクスポート出来る', () => {
    cy.contains('li', 'エクセル').click();
    // TODO: ダウンロード出来たかどうかのテスト
  });
});