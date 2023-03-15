import { beforeEach, cy, describe } from 'local-cypress';


describe('請求書を発行する', () => {

  beforeEach(() => {
    cy.login();
  });

  it('請求書の動作確認：作成・更新・破棄', () => {
    const testId = 'fe8029b9-4206-4344-a9d4-6d31918e8bb8';
    cy.visit(`/project/payment/invoice?custGroupId=${testId}`);

    // 使用する請求書にチェックを入れる
    cy.get('input[name*="estimates[1].isForPayment"]').first()
      .click();

    // 請求金額を入力する
    cy.get('input[name*="estimates[1].billingAmount"]').first()
      .type('80000', { delay: 100 });

    // 入金予定日を設定する
    // 未定のチェック
    cy.get('input[name*="undecidedPaymentDate"]').first()
      .click();

    cy.get('input[name*="plannedPaymentDate"]').first()
      .should('have.attr', 'disabled');

    cy.get('input[name*="undecidedPaymentDate"]').first() // 未定のチェックを外す
      .click();

    cy.get('input[name*="plannedPaymentDate"]').first()
      .type('2023/03/15', { delay: 100 });


    // 保存する
    cy.contains('保存').click(); // 再発行ボタンをクリックする

    // URLの確認
    cy.url().should('include', 'invoiceId');
    cy.url().should('not.include', 'custGroupId');


    // 既存の請求書を更新する
    // 使用する請求書にチェックを入れる　選択解除＆再選択
    cy.get('input[name*="estimates[1].isForPayment"]').first()
      .click(); // チェックを外す

    cy.get('input[name*="estimates[1].isForPayment"]').first()
      .click();

    // 請求金額を入力する 符号間違い入力＆超過入力
    cy.get('input[name*="estimates[1].billingAmount"]').first()
      .clear();
    cy.get('input[name*="estimates[1].billingAmount"]').first()
      .type('-10000', { delay: 100 });

    cy.contains('body', '契約金額と同じ符号(+, -)で入力してください')
      .should('exist');
    cy.get('input[name*="exceedChecked"]')
      .should('not.exist');

    // 超過チェック
    cy.get('input[name*="estimates[1].billingAmount"]').first()
      .clear();
    cy.get('input[name*="estimates[1].billingAmount"]').first()
      .type('150001', { delay: 100 });
    cy.contains('body', '契約金額と同じ符号(+, -)で入力してください')
      .should('not.exist');
    
    cy.get('input[name*="exceedChecked"]')
      .should('exist');
    cy.get('input[name*="exceedChecked"]').first()
      .check();

    // 入金予定日を設定せず、そのまま遷移

    // 請求書を発行する
    cy.contains('請求書発行').click(); // 再発行ボタンをクリックする

    // 入力内容保持の確認
    cy.get('input[name*="plannedPaymentDate"]').first()
      .should('have.attr', 'disabled');
    cy.get('input[name*="plannedPaymentDate"]').first()
      .should('have.value', '2023/03/15');


    // 請求書の破棄
    cy.contains('破棄').click();

    cy.contains('body', '破棄した請求書のため、参照できません')
      .should('exist');
    

  });

  it('PDFの表示ができる', () => {

    const testId = '5a7a506f-e8b8-42f0-9437-d54c5d790701';
    cy.visit(`/project/payment/invoice?invoiceId=${testId}`);
    cy.get('.MuiTable-root')
      .as('table')
      .should('exist');


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
