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

    cy.log('計算されていることを確認する');
    cy.contains('span', '税率')
      .siblings('span')
      .invoke('text')
      .then((textTaxRate) => {
        // getNumber from text
        const taxRate = 1 + (Number(textTaxRate.replace(/[^0-9]/g, '')) / 100);
        return cy.wrap(taxRate);
      })
      .then((taxRate) => cy
        .contains('span', '税抜金額')
        .siblings('span')
        .invoke('text')
        .then((textTaxExcludeAmt) => {
          const taxExcludedAmt = Number(textTaxExcludeAmt.replace(/[^0-9]/g, ''));
          return cy.wrap(taxExcludedAmt)
            .should('eq', Math.round(totalContractAmt / taxRate));
        }))
      .then((taxExcludedAmt) => cy
        .contains('span', '原価')
        .siblings('span')
        .invoke('text')
        .then((textCost) => {
          const cost = Number(textCost.replace(/[^0-9]/g, ''));
          cy.wrap(cost)
            .should('eq', Math.round(taxExcludedAmt - totalProfit));
          return cy.wrap({
            taxExcludedAmt,
            cost,
          });
        }))
      .then(({
        taxExcludedAmt,
        cost,
      }) => cy
        .contains('span', '粗利率')
        .siblings('span')
        .invoke('text')
        .then((textProfitRate) => {
          // get profitRate with decimal point
          const profitRate = Number(textProfitRate.replace(/[^0-9.]/g, ''));
          console.log(taxExcludedAmt, cost, profitRate);
         
          /** 利益率 = ( 単価 - 原価) / 単価 */
          const calculatedTaxRate = ((taxExcludedAmt - cost) /  taxExcludedAmt) * 100;
        
          cy.wrap(profitRate.toFixed(2))
            .should('eq', calculatedTaxRate.toFixed(2));
        }));


  });
});