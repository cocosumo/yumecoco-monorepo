import { cy, describe, it, beforeEach, expect } from 'local-cypress';
import qs from 'qs';
import dt from '../../fixtures/custGroup.json';

describe('registerOne', () => {

  let newCustGroupId: string | undefined; // Will be used for cleanup after test

  beforeEach(() => {
    cy.login();
  });

  it('新規登録', () => {

    cy.visit('/custgroup/edit/v2'); // 当面、新規でも,editにアクセスする

    /**
     * 顧客名入力とフリガナが自動入力されることを確認
     *
     * フリガナ自動入力の制約：
     * 1. 入力が早すぎると、追いつかない
     * 2.　直接漢字で入力したり、コピペ―したり、すると機能しない。
     */
    cy.get('input[name*="custName"]').first()
      .type(dt.custName, { delay: 100 });
    cy.get('input[name*="custNameReading"]').first()
      .should('have.value', 'タナカタロウ');

    // 性別のメニューを開く
    cy.get('div[aria-labelledby*="gender"]').first()
      .click();

    // 性別のメニューから「男」を選択
    cy.get('li[role="option"]').contains(dt.gender)
      .first()
      .click();

    // 生年を選択
    cy.get('input[name*="birthYear"]').first()
      .type('1991', { delay: 100 });


    // 生年を選択
    cy.get('input[name*="birthMonth"]').first()
      .type('10', { delay: 100 });

    // 生日を選択
    cy.get('input[name*="birthDay"]').first()
      .type('20', { delay: 100 });

    // 郵便番号を入力
    cy.get('input[name*="postal"]').first()
      .type(dt.postal);

    // 住所は自動入力されるので、確認
    cy.get('input[name*="address1"', { timeout: 8000 })
      .type(dt.address1, { delay: 100 });
    cy.get('input[name*="address1"', { timeout: 8000 })
      .should('have.value', dt.address1);

    ['phone1', 'phone2', 'email']
      .forEach((key: keyof typeof dt) => {
        cy.get(`input[name*="${key}"]`).first()
          .type(dt[key] as string);

        // 続柄のメニューを開く
        cy.get(`div[aria-labelledby*="${key}Rel"]`).first()
          .click();
        // 続柄のメニューを選択
        cy.get('li[role="option"]').contains(dt[`${key}Rel` as keyof typeof dt])
          .click();
      });


    // 店舗を選択
    cy.get('div[aria-labelledby*="store"]').click();
    cy.get('li').last()
      .click();

    ['cocoAG1', 'cocoAG2', 'yumeAG1', 'yumeAG2']
      .forEach((key: keyof typeof dt) => {
        cy.log(`${key}を選択する`);

        // **AGを選択
        cy.get(`input[name*="${key}"]`).click();
        cy.get('li').last()
          .click();
      });

    // 保存ボタンをクリック後、レコード番号を取得
    cy.intercept('POST', 'https://rdmuhwtt6gx7.cybozu.com//k/v1/record.json').as('postRecord');
    cy.get('button').contains('保存')
      .click();
    cy.wait('@postRecord').then((interception) => {
      const resp = interception.response as { body: { id: string } };
      cy.log(resp.body.id );
      newCustGroupId = resp.body.id;

      //　レコード番号が数字であることを確認
      expect(newCustGroupId).to.be.match(/\d/);
    });

    cy.get('div').contains('工事情報を登録しますか。')
      .should('be.visible');

    cy.url().then((url) => {
      const { custGroupId } = qs.parse(url);
      cy.log('custGroupId: ' + custGroupId);
    });

  });

});