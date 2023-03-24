import { convertObjNumValsToFullWidth } from 'libs/src/convertObjNumValsToFullWidth';
import { beforeEach, context, cy, describe, expect } from 'local-cypress';

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
      rowUnitPriceBeforeTax: 3000000,
    };

    let testData: Record<string, number> = Object.create(null);

    afterEach(() => {
      cy.contains('button', '一時保存').click();
      cy.contains('処理中')
        .should('exist');
     
      /** 入力がフォーカスされた場合に、値がカンマを含まないことをアサートします。 */
      for (const key of Object.keys(testData)) {
        cy.get(`input[name*="${key}"]`)
          .first()
          .as(key);

        cy.get(`@${key}`)
          .focus()
          .invoke('val')
          .should('not.include', ',');
      }

    });

    it('半角', () => {
      testData = { ...baseData };
      
      for (const [key, value] of Object.entries(testData)) {

        cy.get(`input[name*="${key}"]`)
          .first()
          .as(key);

        cy.get(`@${key}`)
          .focus();

        cy.get(`@${key}`)
          .type(value.toString(), { delay: 50, scrollBehavior: 'center' });

        cy.get(`@${key}`).blur();

        cy.get(`@${key}`).then(($input) => {
          const val = $input.val();
          const normalizeValue = baseData[key as keyof typeof baseData].toLocaleString();
          expect(val).to.equal(normalizeValue);
        });

      }

    });

    it.only('全角', () => {
      testData = convertObjNumValsToFullWidth(baseData);

      for (const [key, value] of Object.entries(testData)) {

        cy.get(`input[name*="${key}"]`)
          .first()
          .as(key);

        cy.get(`@${key}`)
          .focus();

        // IME入力をシミュレーション
        // デバイスとブラウザによって、IMEの挙動が異なるため、網羅的なテストはできない。
        cy.get(`@${key}`).trigger('compositionstart');

        cy.get(`@${key}`)
          .type(value.toString(), { delay: 50, scrollBehavior: 'center' });
        
        cy.get(`@${key}`).trigger('compositionend');

        cy.get(`@${key}`).blur();

        cy.get(`@${key}`).then(($input) => {
          const val = $input.val();
          const normalizeValue = baseData[key as keyof typeof baseData].toLocaleString();
          expect(val).to.equal(normalizeValue);
        });

      }

    });
  });

  // TODO：入力中の計算のテスト
});