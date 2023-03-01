import { cy, describe, it, beforeEach } from 'local-cypress';


describe('registerOne', () => {

  const dt = {
    custName: 'たなかたろう',
    custNameReading: 'タナカタロウ',
    gender: '男',
    birthYear: 1990,
    birthMonth: 10,
    birthDay: 19,
    postal: '4418124',
    tel1: '07014528888',
    tel2: '07014529999',
    email: 'lenzras@gmail.com',
    address1: '愛知県豊橋市野依町',
  };

  beforeEach(() => {
    cy.login();
  });

  it('新規登録', () => {

    cy.visit('/custgroup/register');

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
    cy.get('div[aria-labelledby*="birthYear"]').first()
      .click();
    cy.get(`li[data-value="${dt.birthYear}"]`)
      .click();

    // 生年を選択
    cy.get('div[aria-labelledby*="birthMonth"]').first()
      .click();
    cy.get(`li[data-value="${dt.birthMonth}"]`)
      .click();

    // 生日を選択
    cy.get('div[aria-labelledby*="birthDay"]').first()
      .click();
    cy.get(`li[data-value="${dt.birthDay}"]`)
      .click();

    // 郵便番号を入力
    cy.get('input[name*="postal"]').first()
      .type(dt.postal);

    // 住所は自動入力されるので、確認
    cy.get('input[name*="address1"').should('have.value', dt.address1);

  });

});