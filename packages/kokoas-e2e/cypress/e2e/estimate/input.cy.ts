import { convertObjNumValsToFullWidth } from 'libs/src/convertObjNumValsToFullWidth';
import { beforeEach, context, cy, describe } from 'local-cypress';

describe('見積：入力', () => {
  beforeEach(() => {
    const testProjId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';
    cy.login();
    cy.visit(`/project/estimate/register?projId=${testProjId}`);
  });

  context('お金に関わるフィールドに、フォーカスを外したときに、コンマを追加します', () => {

    const baseData = {
      costPrice: 1000000,
      unitPrice: 2000000,
      rowUnitPriceBeforeTax: 300000,
    };

    let testData: Record<string, number> = Object.create(null);

    afterEach(() => {
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
    });

    it('半角', () => {
      testData = { ...baseData };
    });

    it('全角', () => {
      testData = convertObjNumValsToFullWidth(baseData);
    });
  });
});