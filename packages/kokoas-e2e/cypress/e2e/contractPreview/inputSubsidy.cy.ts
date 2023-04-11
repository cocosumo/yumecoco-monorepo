import { beforeEach, context, cy, describe } from 'local-cypress';


describe('Input Subsidy', () => {
  /**
   * テストデータ条件：
   * - 契約がないこと。
  */

  [
    ['契約無し', '6087cb6b-fa7f-4e75-8a64-0066985fb564'],
    ['契約有り', '0db9b792-d98f-4e22-8dfc-8048e4af5174'],
  ].forEach(([testName, testIdNoContract]) => {

    context(testName, () => {
      beforeEach(() => {
        cy.login();
        cy.visit(`/project/contract/preview?projEstimateId=${testIdNoContract}`);

        // Cycle check so that the 金額 has input
        if (testName === '契約無し') {
          cy.contains('label', '最終金')
            .find('input[type="checkbox"]')
            .uncheck()
            .check();
        }

        cy.get('input[name="subsidyAmt"]')
          .as('subsidyAmt');

        cy.contains('label', '工事に含む').find('input')
          .as('subsidyMethod_0');

        cy.contains('label', '顧客に返金').find('input')
          .as('subsidyMethod_1');

        cy.contains('label', '補助金')
          .find('input[type="checkbox"]')
          .as('hasSubsidy');

        cy.get('@hasSubsidy').focus()
          .check();
 
      });

      it('補助金のチェックボックスの挙動', () => {

        cy.log('チェックをはずす');
        cy.get('@hasSubsidy')
          .uncheck();
    
        cy.get('@subsidyAmt')
          .should('be.disabled');

        cy.get('@subsidyMethod_0')
          .should('be.disabled');
      
        cy.get('@subsidyMethod_1')
          .should('be.disabled');

        cy.log('チェックを入れる');
        cy.get('@hasSubsidy').check();

        cy.get('@subsidyAmt')
          .should('be.enabled')
          .should('have.value', '');

        cy.get('@subsidyMethod_0')
          .should('be.enabled');
      
        cy.get('@subsidyMethod_1')
          .should('be.enabled');
      });

      it('入力のバリデーション', () => {

        cy.log('マイナスの場合');
        cy.get('@subsidyAmt')
          .clear()
          .type('-43434', { delay: 100, scrollBehavior: 'center' })
          .parent()
          .should('have.class', 'Mui-error');

        cy.log('空の場合');
        cy.get('@subsidyAmt')
          .clear({ scrollBehavior: 'center' })
          .parent()
          .should('have.class', 'Mui-error');
 
        cy.log('数字ではない場合');
        cy.get('@subsidyAmt')
          .type('abc', { delay: 100, scrollBehavior: 'center' })
          .parent()
          .should('have.value', '')
          .should('have.class', 'Mui-error');

      });

      it.only('補助金の金額を保存したら反映すること', () => {
        // generate random number from 1000 to 999999
        const subsidyAmt = String(Math.floor(Math.random() * 999999) + 1000);

        cy.log(`${subsidyAmt}を入力して、バリデーションエラーが出ないこと`);
        cy.get('@subsidyAmt')
          .clear()
          .type(subsidyAmt, { delay: 100, scrollBehavior: 'center' })
          .parent()
          .should('not.have.class', 'Mui-error');

        cy.get('@subsidyMethod_0')
          .click()
          .should('be.checked');

        cy.log('保存ボタンを押す');
        cy.contains('button', '保存')
          .as('saveButton')
          .click();
    
        cy.log('保存が出来たことをアサートする');
        cy.contains('保存が出来ました。')
          .as('saveSuccessMessage')
          .should('be.visible');

        cy.get('@saveSuccessMessage')
          .should('not.exist');

        cy.log('補助金の入力が反映されていることをアサートする');
        cy.get('@subsidyAmt')
          .should('have.value', subsidyAmt);
        cy.get('@subsidyMethod_0')
          .should('be.checked');

        cy.log('「顧客に返金」を押す');
        cy.get('@subsidyMethod_1')
          .click()
          .should('be.checked');

        cy.log('保存ボタンを押す');
        cy.contains('button', '保存')
          .as('saveButton')
          .click();
    
        cy.log('保存が出来たことをアサートする');
        cy.get('@saveSuccessMessage')
          .should('be.visible');

        cy.get('@saveSuccessMessage')
          .should('not.exist');

        cy.log('「顧客に返金」にチェックが入っていることをアサートする');
        cy.get('@subsidyMethod_1')
          .should('be.checked');
      });

    });
    

  });
});