import { beforeEach, cy, describe, it } from 'local-cypress';

describe('getCorrectViewUrl', () => {
  const testContractId = '31d3ef96-75e9-4524-8c99-b84cb6114074';
  beforeEach(() => {
    cy.login(); 
    cy.visit(`/project/contract/preview/v2?contractId=${testContractId}`);
  });

  it('修正画面のURLを取得できる', () => {
    cy.contains('button', 'プレビュー')
      .should('not.be.disabled')
      .click();

    cy.get('button svg[data-testid="MoreIcon"]')
      .click();

    cy.contains('li', '修正')
      .click();

    // 実際にDocusignサーバへ接続しないように、独自サーバへのリクエストをモックする
    // Docusignの編集URL生成の改修などはPostmanかJestで行う
    cy.intercept('POST', '**/proxy/call.json*', {
      statusCode: 200,
      body: {
        result: {
          body: JSON.stringify({
            url: '/',
          }),
          status: 200,
        },
        success: true,
      },
    }).as('mockedEditViewUrl');

    cy.contains('button', '修正')
      .click();



  });
});
