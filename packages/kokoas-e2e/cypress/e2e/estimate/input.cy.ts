import { beforeEach, context, cy, describe } from 'local-cypress';

describe('見積：数値入力', () => {
  beforeEach(() => {
    const testProjId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';
    cy.login();
    cy.visit(`/project/estimate/register?projId=${testProjId}`);
  });

  context('お金に関わるフィールドに、フォーカスを外したときに、コンマを追加します', () => {

    const testData = {
      costPrice: 1000000,
      unitPrice: 2000000,
      rowUnitPriceBeforeTax: 300000,
    };

    it('半角', () => {
      for (const [key, value] of Object.entries(testData)) {
        cy.get(`input[name*="${key}"]`)
          .first()
          .type(value.toString())
          .blur()
          .should('have.value', value.toLocaleString());
      }

      /** 入力がフォーカスされた場合に、値がカンマを含まないことをアサートします。 */
      for (const [key, value] of Object.entries(testData)) {
        cy.get(`input[name*="${key}"]`)
          .first()
          .focus()
          .should('have.value', value.toString());
      }
    });

    it.only('全角', () => {
      for (const [key, value] of Object.entries(testData)) {
        cy.get(`input[name*="${key}"]`)
          .first()
          .type(value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,'))
          .blur()
          .should('have.value', value.toLocaleString());
      }

      /** フォーカスが戻ったら、コンマを取り除いたか、あさとします */
      for (const [key, value] of Object.entries(testData)) {
        cy.get(`input[name*="${key}"]`)
          .first()
          .focus()
          .should('have.value', value.toString());
      }
    });
  });
});