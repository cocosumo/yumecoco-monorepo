import { beforeEach, context, cy, describe, expect, it } from 'local-cypress';
import { correctInputData, labelMap } from './testData';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import { calculateAmount, roundTo } from 'libs';
import { checkContractAddStatus } from './helpers/checkContractAddStatus';

describe(
  '入力挙動', 
  {
    scrollBehavior: 'center',
  }, 
  () => {
    const projId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60'; // 契約が存在する工事番号
    const {
      totalContractAmt,
      
    } = correctInputData();
  
    beforeEach(() => {
      cy.login();
      cy.visit(`/project/contract/preview/v2?projId=${projId}`);

    });

    it('金額はブラウザ推薦機能で記入したら、エラーにならないこと', () => {
      const simulatedInput = '123,456,789';

      // ブラウザの推薦機能をシミュレーションする　
      // ※ 私の環境では当機能が再現出来ないので、以下の手法で誤検知可能性あり。ras-2023-05-11
      cy.getTextInputsByLabel('契約合計金額（税込）')
        .invoke('val', simulatedInput)
        .type('{ctrl}');
        

      cy.getCheckboxesByLabel('契約金')
        .check({ scrollBehavior: 'center' });
      
      cy.get('input[name="contractAmt"]').should('have.value', simulatedInput);

    });

    
    context(
      '支払いの挙動', 
      {
        testIsolation: false,
      }, 
      () => {
       
        const payments = [
          ['契約金', 'contract'],
          ['着手金', 'initial'],
          ['中間金', 'interim'],
          ['最終金', 'final'],
          ['その他', 'others'],
        ];
        const dividedAmt = Math.round(totalContractAmt / payments.length);

        it('契約金額にコンマが追加されるのを確認する', () => {
          cy.getTextInputsByLabel('契約合計金額（税込）')
            .type(totalContractAmt.toString())
            .blur()
            .should('value', totalContractAmt.toLocaleString());
        });

        payments
          .forEach(([label, namePart], idx) => {
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

        payments
          .forEach(([label, namePart]) => {
            it(`${label} - チェックを外すと対象の金額が0になる`, () => {
              cy.log(`${label} - チェックを外すと対象の金額が0になる`);
              cy.getCheckboxesByLabel(label).uncheck();
              cy.get(`input[name="${namePart}Amt"]`)
                .should('value', '0');
            });
          });

      },
    );


    context(
      '計算が合っていることと小数点以下が出ないこと', 
      { testIsolation: false },
      
      () => {

        const profitRate = 11.11;
        beforeEach(() => {

          cy.getTextInputsByLabel(labelMap.profitRate )
            .clear()
            .type((profitRate).toString(), { delay: 50 })
            .invoke('val')
            .then((val) => {
              expect(Number(val)).to.equal(profitRate);
            });
            
        });

        it('契約金額を入力したら、金額（税抜）と原価と利益額が計算されること', () => {

          const inputValue = 33333;
          const {
            amountBeforeTax,
            costPrice,
            profit,
          } = calculateAmount({
            amountAfterTax: inputValue,
            profitRate: (profitRate / 100),
          });

          cy.getTextInputsByLabel(labelMap.amountAfterTax )
            .clear()
            .type((inputValue).toString(), { delay: 50 })
            .should('have.value', inputValue);

          cy.getTextInputsByLabel(labelMap.amountBeforeTax )
            .should('have.value', roundTo(amountBeforeTax).toLocaleString());

          cy.getTextInputsByLabel(labelMap.costPrice)
            .should('have.value', roundTo(costPrice).toLocaleString());

          cy.getTextInputsByLabel(labelMap.profit)
            .should('have.value', roundTo(profit).toLocaleString());
        });

        it('粗利率を入力したら、契約金額（税抜き）と利益額と原価が計算されること', () => {

          const inputValue = 33333;
          const newProfitRate = 12.12; // 利益率が変わることを確認するために、新しい利益率を設定する

          const {
            profit,
            costPrice,
            amountBeforeTax,
          } = calculateAmount({
            amountAfterTax: inputValue,
            profitRate: (newProfitRate / 100),
          });

          // 契約金額が入力してある状態で、
          cy.getTextInputsByLabel(labelMap.amountAfterTax )
            .clear()
            .type((inputValue).toString(), { delay: 50 })
            .should('have.value', inputValue);

          // 粗利率を再入力する
          cy.getTextInputsByLabel(labelMap.profitRate )
            .clear()
            .type((newProfitRate).toString(), { delay: 50 });

          cy.getTextInputsByLabel(labelMap.profit)
            .should('have.value', roundTo(profit).toLocaleString());

          cy.getTextInputsByLabel(labelMap.costPrice)
            .should('have.value', roundTo(costPrice).toLocaleString());

          cy.getTextInputsByLabel(labelMap.amountBeforeTax )
            .should('have.value', roundTo(amountBeforeTax).toLocaleString());
        });

        it('契約金額にマイナスの値を入力したら、オレンジ色になること', () => {
          const inputValue = -2200;
          const {
            amountBeforeTax,
            costPrice,
            profit,
          } = calculateAmount({
            amountAfterTax: inputValue,
            profitRate: (profitRate / 100),
          });

          cy.getTextInputsByLabel(labelMap.amountAfterTax )
            .invoke('val', '')
            .clear()
            .type((inputValue).toString(), { delay: 50 })
            .should('have.value', inputValue)
            .should('have.css', 'color', 'rgb(255, 165, 0)');

          cy.getTextInputsByLabel(labelMap.amountBeforeTax )
            .should('have.value', roundTo(amountBeforeTax).toLocaleString())
            .should('have.css', 'color', 'rgb(255, 165, 0)');

          cy.getTextInputsByLabel(labelMap.costPrice)
            .should('have.value', roundTo(costPrice).toLocaleString())
            .should('have.css', 'color', 'rgb(255, 165, 0)');

          cy.getTextInputsByLabel(labelMap.profit)
            .should('have.value', roundTo(profit).toLocaleString())
            .should('have.css', 'color', 'rgb(255, 165, 0)');
        });

        // TODO: 他のフィールドの計算が合っていることを確認する
      },
    );

    it('返金のチェックボックスをチェックすると、返金金額が入力できる', () => {

      cy.getCheckboxesByLabel('返金')
        .parent() // actual input element is hidden, so scroll to parent
        .scrollIntoView();

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


    it.only('本契約がある場合、「追加」は有効状態にになる', () => {

      checkContractAddStatus(true, true);
    });

    it.only('本契約がない場合、「追加」は無効状態になる', () => {

      checkContractAddStatus(false, false);

    });
  
  },
);
