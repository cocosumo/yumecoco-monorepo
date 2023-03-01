import { cy, describe, it, before } from 'local-cypress';

describe('Customer Life Cycle', () => {

  before(() => {
    cy.login();
    cy.visit('/');
  });

  it('navigates to 新規登録', () => {

    // Click 顧客メニュー
    cy.get('.MuiButtonBase-root').contains('顧客')
      .click();

    // Click 顧客登録
    cy.get('.MuiButtonBase-root').contains('新規登録');
  });

});