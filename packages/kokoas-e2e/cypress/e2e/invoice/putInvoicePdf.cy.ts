import { beforeEach, cy, describe } from 'local-cypress';


describe('請求書を発行する', () => {

  beforeEach(() => {
    const testId = '5a7a506f-e8b8-42f0-9437-d54c5d790701';

    cy.login();
    cy.visit(`/project/payment/invoice?invoiceId=${testId}`);

    cy.get('.MuiTable-root')
      .as('table')
      .should('exist');
  });

  it('PDFの表示ができる', () => {

    cy.contains('再発行').click(); // 再発行ボタンをクリックする

    // TODO PDFが表示されているかのテスト
    cy.window().then((win) => {

      // 実行エラー
      const embed = win.document.body.querySelector('embed'); // 空になってしまう
      cy.log('ログチェック', embed || '空です');
      cy.wrap(embed).should('have.attr', 'type', 'application/pdf');

    });
  });

});
