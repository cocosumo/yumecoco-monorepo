import { cy, describe, expect, it } from 'local-cypress';

describe('ルークアップを検索フィールドに変更', () => {
  const testLink = '/show#record=6&mode=edit';
  const lookupFields = [
    '店舗名',
    '工事種別名',
    'エージェント',
    'ここすも営業',
    'ここすも工事',
  ];

  beforeEach(() => {
    cy.login();

    cy.visit(testLink);

    cy.contains('button', '保存').as('saveButton');
  });

  lookupFields
    .forEach((label) => {
      it(`${label}で選択した値を保存出来ること`, ()=>{
        cy.getTextInputsByLabel(label)
          .clear()
          .focus();

        cy.get('input[aria-expanded="true"]')
          .as('openedLookup')
          .should('exist');
    
        cy.log('一つ目を選択する');
        cy.getTextInputsByLabel(label).type('{downarrow}{enter}', { delay: 100, scrollBehavior: 'center' });
    
        cy.getTextInputsByLabel(label)
          .then(($el) => {
            const newValue = String($el.val());
            cy.log(`${newValue}を選択されました`);
            expect(newValue).to.not.be.empty;

            cy.getTextInputsByLabel(label).should('have.value', newValue);

            cy.get('@saveButton').click({ force: true });

            cy.get('@saveButton').should('not.exist');

            // containsにstringを渡すと部分でも引っかかるので、regexを使う
            const regex = new RegExp('^' + label + '$');
            cy.contains(regex, { matchCase: false })
              .parent()
              .siblings()
              .as('kintoneField')
              .should('have.text', newValue);
          });

        cy.log('編集画面に戻る');
        cy.get('a[title="レコードを編集する"]')
          .as('editButton')
          .click();

        cy.getTextInputsByLabel(label)
          .clear()
          .focus();

        cy.log('選択肢が開いているかどうか確認');
        cy.get('@openedLookup').should('exist');

        cy.log('三つ目を選択する');
        cy.getTextInputsByLabel(label)
          .type('{downarrow}{downarrow}{downarrow}{enter}', { delay: 100, scrollBehavior: 'center' });
      
        cy.getTextInputsByLabel(label)
          .then(($el) => {
            const newValue = String($el.val());
            expect(newValue).to.not.be.empty;

            cy.get('@saveButton').click();
            cy.get('@editButton').should('exist');

            cy.get('@kintoneField')
              .should('have.text', newValue);
          });
      });

    });
    
});