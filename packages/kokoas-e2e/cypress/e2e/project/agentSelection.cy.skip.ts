import { beforeEach, cy, describe } from 'local-cypress';

/**
 * 「工事担当者を確定する」がなくなりました
 * 
 */

describe('agentSelection', () => {
  const testProjId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';

  beforeEach(() => {

    cy.login();
    cy.visit(`/project/edit?projId=${testProjId}`);

  });
  it('完工じゃないの場合、担当者の選択肢の有効状態は 「工事担当者を確定する」に依存する"', () => {
    cy.intercept('*/api/proxy/*').as('proxyCall');
   
    cy.getCheckboxesByLabel('工事担当者を確定する')
      .as('confirmAgent');
     
    cy.getTextInputsByLabel('工事担当者')
      .as('agentInput');

    cy.get('@confirmAgent').should('not.be.checked');
    cy.get('@agentInput').should('be.enabled');

    cy.get('@confirmAgent').check();
    cy.get('@agentInput').should('be.disabled');

    cy.get('@confirmAgent').uncheck();
    cy.get('@agentInput').should('be.enabled');
  });

  it('完工の場合、担当者の選択肢の無効化する', () => {

    // Andpadからのデータの案件フローを完工（精算前）にする
    cy.intercept('*/api/proxy/*', (req) => {
      req.continue((res) => {
        const body = JSON.parse(res.body.result.body);
        if (body['案件管理ID']) {
          body['案件フロー'] = '完工（精算前）';
          res.body.result.body = JSON.stringify(body);
        }
      });
    }).as('proxyCall');

    cy.wait('@proxyCall');

    cy.getCheckboxesByLabel('工事担当者を確定する')
      .as('confirmAgent');
     
    cy.getTextInputsByLabel('工事担当者')
      .as('agentInput');

    cy.get('@confirmAgent').should('be.disabled');
    cy.get('@agentInput').should('be.disabled');
  
  });
});