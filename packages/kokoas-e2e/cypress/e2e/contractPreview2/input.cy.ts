import { beforeEach, context, cy, describe, it } from 'local-cypress';
import { correctInputData } from './testData';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';

describe(
  '入力挙動', 
  {
    scrollBehavior: 'center',
  }, 
  () => {
    const projId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';
    const {
      totalContractAmt,
      totalProfit,
    } = correctInputData();
  
    beforeEach(() => {
      cy.login();
      cy.visit(`/project/contract/preview/v2?projId=${projId}`);

    });

    it('計算が合っていること', () => {
    
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

    context(
      '支払いの挙動', 
      {
        testIsolation: false,
      }, 
      () => {
        const dividedAmt = Math.round(totalContractAmt / 4);
        const payments = [
          ['契約金', 'contract'],
          ['着手金', 'initial'],
          ['中間金', 'interim'],
          ['最終金', 'final'],
        ];

        it('契約金すること', () => {
          cy.getTextInputsByLabel('契約合計金額')
            .type(totalContractAmt.toString())
            .blur()
            .should('value', totalContractAmt.toLocaleString());
        });

        payments
          .map(([label, namePart], idx) => {
            it(`${label} - チェックが入ると残り金額が生成される`, () => {
              cy.log('初期状態はチェックが入っていないこと');
              cy.get(`input[name="${namePart}Amt"]`)
                .as('amt')
                .should('value', '0');
              cy.get(`input[name="${namePart}AmtDate"]`)
                .as('dt')
                .should('value', '');

              const expectedRemainingAmt = totalContractAmt - (dividedAmt * idx);

              cy.log(`${label} - チェックボックスの挙動`);
              cy.getCheckboxesByLabel(label).check();
              cy.get('@amt').should('value', expectedRemainingAmt.toLocaleString());
              cy.get('@dt').should('value', '');

              cy.get('@amt').clear()
                .type(dividedAmt.toString(), { scrollBehavior: 'center' })
                .blur();

              cy.get('@amt').should('value', dividedAmt.toLocaleString());
              cy.get('@dt').type(format( addMonths(new Date(), idx), 'yyyy/MM/dd'));
            
            });
          });

        payments.map(([label, namePart]) => {
          it(`${label} - チェックを外すと残り金額が0になる`, () => {
            cy.log(`${label} - チェックを外すと残り金額が0になる`);
            cy.getCheckboxesByLabel(label).uncheck();
            cy.get(`input[name="${namePart}Amt"]`)
              .should('value', '0');
          });
        });

      },
    );

    it('返金のチェックボックスをチェックすると、返金金額が入力できる', () => {
      cy.getCheckboxesByLabel('返金').check();
      cy.get('input[name="refundAmt"]')
        .as('refundAmt')
        .type('1000')
        .blur()
        .should('value', '1,000');

      cy.log('チェックを外すと、返金金額が無効化される');
      cy.getCheckboxesByLabel('返金').uncheck();
      cy.get('@refundAmt').should('be.disabled');
    });

    it('補助金のチェックボックスをチェックすると、補助金額が入力できる', () => {
      cy.getCheckboxesByLabel('補助金').check();
      cy.get('input[name="subsidyAmt"]')
        .as('subsidyAmt')
        .type('1000')
        .blur()
        .should('value', '1,000');

      cy.getRadiosByValue('工事に含む').check()
        .should('be.checked');
      cy.getRadiosByValue('顧客に返金').check()
        .should('be.checked');


      cy.getCheckboxesByLabel('補助金').uncheck();
      cy.get('@subsidyAmt').should('be.disabled');
      
    });

    it('支払い方法が指定出来る', () => {
      cy.log('初期状態は振込が選択されていること');
      cy.getRadiosByValue('振込').should('be.checked');
      cy.getTextInputsByLabel('振込先')
        .as('payDestination')
        .scrollIntoView()
        .should('be.visible');

      cy.getRadiosByValue('持参').check()
        .should('be.checked');
      cy.get('@payDestination').should('not.be.visible');

      cy.getRadiosByValue('集金').check()
        .should('be.checked');
      cy.get('@payDestination').should('not.be.visible');

      cy.getRadiosByValue('振込').check()
        .should('be.checked');
      cy.get('@payDestination').should('be.visible');

    });

    // その他のフィールドのテストは特別の挙動はないので省略
    // 挙動に不具合が発生したら、当スペックに追加すること
  
  },
);