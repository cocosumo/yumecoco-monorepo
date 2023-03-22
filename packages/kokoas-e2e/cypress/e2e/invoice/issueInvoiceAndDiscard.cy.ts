import { beforeEach, cy, describe, expect } from 'local-cypress';


describe('請求書を発行する', () => {

  beforeEach(() => {
    cy.login();
  });

  const testCustGroupId = 'fe8029b9-4206-4344-a9d4-6d31918e8bb8';
  const testReissueInvoiceId = '5a7a506f-e8b8-42f0-9437-d54c5d790701';

  it('テスト準備[発行, 破棄]:APIから直接レコードを編集する', () => {
    cy.task('prepareInvoice', 'KKB-C220020-01');
  });

  it('テスト準備[再発行]:APIから直接レコードを編集する', () => {
    cy.task('prepareInvoiceReissue', testReissueInvoiceId);
  });


  it('請求書の動作確認：作成・更新・破棄', () => {
    cy.visit(`/project/payment/invoice?custGroupId=${testCustGroupId}`);

    // 使用する請求書にチェックを入れる
    cy.get('input[name="estimates[1].isForPayment"]')
      .as('isForPaymentInput')
      .click();

    // 請求金額を入力する
    cy.get('input[name="estimates[1].billingAmount"]')
      .as('billingAmountInput')
      .type('80000', { delay: 100 });

    // 入金予定日を設定する
    // 未定のチェック
    cy.get('input[name*="undecidedPaymentDate"]')
      .as('undecidedPaymentDateInput')
      .first()
      .check();

    cy.get('input[name*="plannedPaymentDate"]')
      .as('plannedPaymentDateInput')
      .first()
      .should('have.attr', 'disabled');

    // 入金予定日：未定の解除
    cy.get('@undecidedPaymentDateInput')
      .first()
      .uncheck();

    cy.get('@plannedPaymentDateInput')
      .first()
      .type('2023/03/15', { delay: 100 });


    // 保存する
    cy.contains('保存').click(); // 保存ボタンをクリックする

    // URLの確認
    cy.url().should('include', 'invoiceId');
    cy.url().should('not.include', 'custGroupId');


    // 既存の請求書を更新する
    // 使用する請求書にチェックを入れる　選択解除＆再選択
    cy.get('@isForPaymentInput')
      .click(); // チェックを外す

    cy.get('@isForPaymentInput')
      .click();

    // 請求金額を入力する 符号間違い入力＆超過入力
    cy.get('@billingAmountInput')
      .clear();
    cy.get('@billingAmountInput')
      .type('-10000', { delay: 100 });

    cy.contains('契約金額と同じ符号(+, -)で入力してください')
      .should('exist');
    cy.get('input[name*="exceedChecked"]')
      .should('not.exist');

    // 超過チェック
    cy.get('@billingAmountInput')
      .clear();
    cy.get('@billingAmountInput')
      .type('150001', { delay: 100 });
    cy.contains('body', '契約金額と同じ符号(+, -)で入力してください')
      .should('not.exist');

    cy.get('input[name*="exceedChecked"]')
      .should('exist')
      .first()
      .check();

    // 入金予定日を設定せず、そのまま遷移

    // 請求書を発行する
    // window.open()を動作させないようにする
    cy.on('window:before:load', (win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.contains('請求書発行').click(); // 請求書発行ボタンをクリックする

    // 入力内容保持の確認
    cy.get('@plannedPaymentDateInput')
      .first()
      .should('have.attr', 'disabled');
      
    cy.get('@plannedPaymentDateInput')
      .first()
      .should('have.value', '2023/03/15');


    // 請求書の破棄
    cy.contains('破棄').click();

    cy.contains('破棄した請求書のため、参照できません')
      .should('exist');


  });

  it('PDFの表示リクエスト', () => {

    // ネットワークのテスト
    cy.intercept(
      {
        method: 'post',
        url: '*k/api/proxy/*',
      },
      (req) => {
        req.continue((res) => {
          console.log('res', res.body.result.body);
          expect(res.body.result.body).to.include('pdf');
          // 'res' represents the real destination response
          // you can manipulate 'res' before it's sent to the browser
        });
      },
    );

    // 請求書発行済みの請求を開く
    cy.visit(`/project/payment/invoice?invoiceId=${testReissueInvoiceId}`);
    cy.get('.MuiTable-root')
      .should('exist');


    // window.open()を動作させないようにする
    cy.on('window:before:load', (win) => {
      cy.stub(win, 'open').as('windowOpen');
    });

    cy.contains('再発行').click(); // 再発行ボタンをクリックする

  });

});
