import { convertObjNumValsToFullWidth } from 'libs/src/convertObjNumValsToFullWidth';
import { beforeEach, context, cy, describe } from 'local-cypress';

describe('見積：入力', () => {
  beforeEach(() => {
    const testId = '6087cb6b-fa7f-4e75-8a64-0066985fb564';
    cy.login();
    cy.visit(`/project/estimate/register?projEstimateId=${testId}&menuOpen=0`);
  });

  context('お金に関わるフィールドに、フォーカスを外したときに、コンマを追加します', () => {

    const baseData = {
      costPrice: 1000000,
      unitPrice: 2000000,
      rowUnitPriceBeforeTax: 300000,
    };

    let testData: Record<string, number> = Object.create(null);

    afterEach(() => {
      cy.contains('内訳').scrollIntoView({ ensureScrollable: true });

      for (const [key, value] of Object.entries(testData)) {
        cy.get(`input[name*="${key}"]`)
          .first()
          .type(value.toString())
          .blur()
          .should('have.value', baseData[key as keyof typeof baseData].toLocaleString());
      }

      /** 入力がフォーカスされた場合に、値がカンマを含まないことをアサートします。 */
      for (const key of Object.keys(testData)) {
        cy.get(`input[name*="${key}"]`)
          .first()
          .focus()
          .invoke('val')
          .should('not.include', ',');
      }

      cy.contains('button', '一時保存').click();
    });

    it('半角', () => {
      testData = { ...baseData };
    });

    it.only('全角', () => {
      testData = convertObjNumValsToFullWidth(baseData);
    });
  });

  // TODO：入力中の計算のテスト
});