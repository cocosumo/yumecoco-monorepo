import { beforeEach, cy, describe } from 'local-cypress';

describe('見積もり選択する', () => {
  /** テスト条件
   * - 見積もりがあること
   */

  const testId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';
  beforeEach(() => {
    cy.login();
    cy.visit(`/project/contract/preview?projId=${testId}`);
  });

  it('見積もりを選択する', () => {
    cy.log('内容は取得出来たことを確認する');
    cy.contains('label', '内容').should('exist');

    cy.contains('見積を選択してください。')
      .as('selectEstimateError')
      .should('exist');
    
    cy.log('見積選択の最初は空でありことを確認する');
    cy.getTextInputsByLabel('見積選択').should('have.value', '');

    cy.getTextInputsByLabel('見積選択')
      .parent() // MUIは pointer-events: none; が設定されているので、親要素をクリックする
      .as('selectEstimate')
      .click();
    
    cy.get('li:contains("契約金額")')
      .as('selectEstimateItems')
      .should('have.length.gt', 1);
    
    cy.get('@selectEstimateItems')
      .first()
      .click();

    cy.log('選択した見積もりが表示されていることを確認する');
    cy.get('@selectEstimateError')
      .should('not.exist');


    cy.log('見積もりを空に設定する'); // https://github.com/Lorenzras/yumecoco-monorepo/issues/187
    cy.get('@selectEstimate').click();
    cy.get('@selectEstimateItems')
      .parent()
      .children()
      .first()
      .as('blankItem')
      .click();
    cy.get('@selectEstimateError').should('exist');

    cy.get('@selectEstimate').click();
    cy.get('@selectEstimateItems')
      .should('have.length.gt', 1);
    

    
  });

  // 見積選択にかかわるその他のテスト
});