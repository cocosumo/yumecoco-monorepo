import { convertToFullWidth } from 'libs/src/convertToFullWidth';
import { beforeEach, context, cy, describe, expect } from 'local-cypress';

describe('見込み管理：入力', () => {

  beforeEach(() => {
    const testProjId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';
    cy.login();
    cy.visit(`/project/prospect/register?projId=${testProjId}&menuOpen=0`);
  });

  context('お金に関わるフィールドに、フォーカスを外したときに、コンマを追加します', () => {
    // 契約金額をランダムに生成
    const contractAmount = Math.floor(Math.random() * 999999999) + 100000;

    const testCases = [
      ['半角', contractAmount.toString() ],
      ['全角', convertToFullWidth(contractAmount) ],
    ];

    testCases.forEach(([testName, testVal]) => {
      it(testName, () => {
        cy.getTextInputsByLabel('契約予定金額').as('contractAmtField');
        
        cy.get('@contractAmtField')
          .should('be.enabled')
          .focus();

        cy.get('@contractAmtField')
          .type(testVal, { delay: 100 });

        cy.get('@contractAmtField').blur();

        cy.get('@contractAmtField').then(($input) => {
          const val = $input.val();
          const normalizeValue = contractAmount.toLocaleString();
          // コンマで区切られた数値が表示されていることを確認
          expect(val).to.equal(normalizeValue);
        });

        // 保存出来るか確認。
        cy.contains('button', '保存').click();
        cy.contains('保存が出来ました').should('exist');

        cy.get('@contractAmtField').invoke('val')
          .then((val) => {
            // 保存後に、コンマが消えていないことを確認
            expect(val).to.equal(contractAmount.toLocaleString());
          });
      });
    });
  });

  // TODO：入力中の計算のテスト
});