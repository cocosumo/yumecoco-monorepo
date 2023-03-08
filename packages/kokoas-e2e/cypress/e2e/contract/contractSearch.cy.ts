import { beforeEach, context, cy, expect } from 'local-cypress';

/**
 * @todo add process for seeds.
 * @terminology 
 *  data-indeterminate: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#indeterminate
 */

describe('契約一覧', () => {

  beforeEach(() => {
    cy.login();
    cy.visit('/project/contract/search');


    cy.get('.MuiTable-root')
      .as('table')
      .should('exist');

    cy.get('@table')
      .find('.MuiTableHead-root')
      .as('tableHead')
      .should('exist');

    cy.get('@table')
      .find('.MuiTableBody-root')
      .as('tableBody')
      .should('exist');

    cy.get('form > div:nth-of-type(2)')
      .as('filterChipsContainer');

  });

  context(
    'テーブルに必要な情報を表示します',
    { testIsolation: false }, // テストを独立させない。要改善
    () => {

      it('すべての契約データを表示します。', () => {
        cy.get('@tableBody').find('tr')
          .should('have.length.at.least', 3); // todo: データベースにアサートし、正確にレコードと一致することを確認します。
      });

      it('契約ステータスのヘッダーを表示します', ()  => {
        cy.get('@tableHead').find('th')
          .first()
          .should('contain', '契約進歩');
      });

      it('すべての行において、契約ステータスを表示します', ()  => {
        cy.get('@tableBody')
          .find('tr > td:first-child')
          .each(($td) => {
            const isStatusExist = !!$td.text().split('K')[0];
            cy.log(`First TD Content ${$td.text()}`);
            expect(isStatusExist).to.be.true;
          });
      });

      it('契約ステータスをクリックした場合、契約ページに移動します', () => {

        // テーブル本体の最初の列の最初のチップのラベル要素をクリックします。
        cy.get('@tableBody')
          .find('tr > td:first-child .MuiChip-label')
          .first()
          .click();

        cy.url().should('include', '/project/contract/preview');
      });
    },
  );

  context('フィルターを適用します', () => {

    beforeEach(() => {
      // 「リセット」という文字列を含むボタンをクリックして、フィルターをデフォルトにリセットします。
      cy.get('button').contains('リセット')
        .click();

      // URLにクエリパラメータが含まれていないことをアサートします
      cy.url().should('not.include', '?');

      // 「絞り込み」というaria-labelを含むボタンをクリックします
      cy.get('button[aria-label="絞り込み"]').click();

      // ダイアログが開いていることをアサートします
      cy.get('.MuiDialogTitle-root').contains('絞り込み')
        .should('be.visible');

      // assert that filter dialog has all checkboxes unchecked as default
      cy.contains('label', '契約進歩')
        .siblings('div')
        .find('input[type="checkbox"]')
        .as('contractStatuses')
        .should('not.be.checked');

      cy.contains('label', '完了')
        .find('input[type="checkbox"]')
        .as('completeStatus-checkbox');

      cy.contains('label', '未完了')
        .as('incompleteStatus-label');

      cy.get('@incompleteStatus-label')
        .find('input[type="checkbox"]')
        .as('incompleteStatus-checkbox');

      cy.get('@incompleteStatus-label').next()
        .find('input[type="checkbox"]')
        .as('incompleteStatusSteps-checkboxes');

      cy.contains('button', '検索').as('searchButton');
    });

    it('show completed contracts ONLY', () => {

      cy.get('@completeStatus-checkbox')
        .should('not.be.checked')
        .click()
        .should('be.checked');

      cy.get('@incompleteStatus-checkbox')
        .should('not.be.checked') // assert that the '未完了' checkbox is not checked by default
        .click()
        .should('be.checked'); // assert that the '未完了' checkbox is checked when clicked

      cy.get('@incompleteStatusSteps-checkboxes')
        .each(($checkbox, index, $list) => {
          const isLastCheckbox = index === $list.length - 1;
          cy.wrap($checkbox)
            .should('be.checked')
            .click()
            .should('not.be.checked');

          cy.get('@incompleteStatus-checkbox')
            .should('have.attr', 'data-indeterminate', isLastCheckbox ? 'false' : 'true');

        });

      // assert that the '未完了' checkbox is not checked when all steps are unchecked
      cy.get('@incompleteStatus-checkbox').should('not.be.checked');

      cy.get('@searchButton').click()
        .should('not.exist');

      cy.get('@filterChipsContainer')
        .should('contain', '契約完了')
        .should('not.contain', '未完了');
      // TODO: assert results

    });

    it.only('show incomplete contracts ONLY', () => {
      cy.get('@incompleteStatus-checkbox')
        .should('not.be.checked') // クリックされた時に、「未完了」のチェックボックスがチェックされていることをアサートします。
        .click()
        .should('be.checked'); // クリックされた時に、「未完了」のチェックボックスがチェックされていることをアサートします。


      cy.log('ランダムな「確認中」のチェックボックスをオフにする操作をシミュレートし、その後再びチェックする操作を行います。'); 
      const randomIndex = Math.floor(Math.random() * 5); // 0-4

      // ランダムな「確認中」のチェックボックスをオフにする
      cy.get('@incompleteStatusSteps-checkboxes')
        .eq(randomIndex)
        .as('randomStep')
        .should('be.checked') 
        .click()
        .should('not.be.checked');


      // 「確認中」チェックボックスの一部はオフ状態だと、
      cy.get('@incompleteStatus-checkbox')
        .should('have.attr', 'data-indeterminate', 'true');  //「未完了」の属性「data-indeterminate」が「true」であることをアサートします。

      // ランダムな「確認中」のチェックボックスを再びチェックする
      cy.get('@randomStep')
        .click()
        .should('be.checked'); 

      // 全ての「確認中」チェックボックスが、チェック状態になると、
      cy.get('@incompleteStatus-checkbox')
        .should('have.attr', 'data-indeterminate', 'false') // 「未完了」の属性「data-indeterminate」が「false」であることをアサートします。
        .should('be.checked'); // 「未完了」のチェックボックスがチェックされていることをアサートします。


      cy.log('ランダムな複数の「確認中」のチェックボックスをオフにする操作をシミュレートし、その後「未完了」のチェックボックスをチェックする操作を行います。');
      // 最大で4つの一意のランダムインデックスを生成します。
      const randomIndexes = [...new Set(Array.from({ length: 4 }, () => Math.floor(Math.random() * 5)))];

      // ランダムな複数の「確認中」のチェックボックスをオフにする
      randomIndexes.forEach((rand) => {
        cy.get('@incompleteStatusSteps-checkboxes').eq(rand)
          .should('be.checked')
          .click()
          .should('not.be.checked');
      });

      cy.get('@incompleteStatus-checkbox')
        .should('have.attr', 'data-indeterminate', 'true');

      // 「未完了」のチェックボックスをチェックする
      cy.get('@incompleteStatus-checkbox').click()
        .should('be.checked');

      //「検索」ボタンをクリックし、その後存在しないことをアサートします。
      cy.get('@searchButton')
        .click()
        .should('not.exist');

      
      cy.get('@filterChipsContainer')
        .should('contain', '未完了') // フィルターチップのコンテナに「未完了」が含まれていることをアサートします。
        .should('not.contain', '契約完了') // フィルターチップのコンテナに「契約完了」が含まれていないことをアサートします。
        .find('.MuiChip-root:contains(確認中)') // 「確認中」というChipsを持つすべてのチップを検索します。
        .should('have.length', 5); // 「確認中」というテキストを持つチップが5つあることを、大まかにアサートします。


      // TODO: assert results


    });

  });

});
