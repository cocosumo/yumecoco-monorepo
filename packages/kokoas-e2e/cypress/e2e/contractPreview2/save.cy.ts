import { before, cy, describe, it } from 'local-cypress';
import { correctInputData } from './testData';

describe('保存と入力をテストする', () => {
  const projId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';
  const {
    totalContractAmt,
    totalProfit,
  } = correctInputData();
  before(() => {
    cy.login();
    cy.visit(`/project/contract/preview/v2?projId=${projId}`);
  });

  it('正しい入力すると保存が出来る', () => {
    
    cy.getTextInputsByLabel('契約合計金額')
      .type(totalContractAmt.toString())
      .blur();

    cy.getTextInputsByLabel('粗利額')
      .type(totalProfit.toString())
      .blur();

    cy.log('税抜金額が計算されていることを確認する');
    cy.contains('span', '税抜金額').siblings('span')
      .should('have.text', totalContractAmt);

  });
});