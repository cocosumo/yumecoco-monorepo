import { beforeEach, cy, describe } from 'local-cypress';

describe('出力', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/estimate');
  });

  it('ANDPAD形式でエクスポート出来る', () => {
  
  });
});