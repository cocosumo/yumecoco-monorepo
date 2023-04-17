import { convertToFullWidth } from 'libs/src/convertToFullWidth';
import { beforeEach, context, cy, describe, expect } from 'local-cypress';

describe('見込み管理：入力', () => {
  beforeEach(() => {
    const testProjId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';
    cy.login();
    cy.visit(`/project/prospect/register?projId=${testProjId}&menuOpen=0`);
  });

  context('お金に関わるフィールドに、フォーカスを外したときに、コンマを追加します', () => {

    it('半角', () => {
      // generate random contract amount from 100000 to 999999999
      const contractAmount = Math.floor(Math.random() * 999999999) + 100000;
      cy.getTextInputsByLabel('契約予定金額').as('contractAmtField');

      cy.get('@contractAmtField')
        .should('be.enabled')
        .focus();

      cy.get('@contractAmtField')
        .type(contractAmount.toString());

      cy.get('@contractAmtField').blur();

      cy.get('@contractAmtField').then(($input) => {
        const val = $input.val();
        const normalizeValue = contractAmount.toLocaleString();
        // コンマで区切られた数値が表示されていることを確認
        expect(val).to.equal(normalizeValue);
      });
            

    });

    it('全角', () => {
      // 100000から999999999の間のランダムな契約金額を生成
      const contractAmount = Math.floor(Math.random() * 999999999) + 100000;
      const fullWidthVal = convertToFullWidth(contractAmount);
      cy.getTextInputsByLabel('契約予定金額').as('contractAmtField');

      cy.get('@contractAmtField')
        .should('be.enabled')
        .focus();

      cy.get('@contractAmtField')
        .type(fullWidthVal,  { delay: 100 });


      cy.get('@contractAmtField').blur();
      

      cy.get('@contractAmtField').then(($input) => {
        const val = $input.val();
        const normalizeValue = contractAmount.toLocaleString();
        // コンマで区切られた数値が表示されていることを確認
        expect(val).to.equal(normalizeValue);
      });
      
    });
  }); 

  // TODO：入力中の計算のテスト
});