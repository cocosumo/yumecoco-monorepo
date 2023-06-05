import { beforeEach, cy, describe, expect } from 'local-cypress';

describe('log', () => {
  const testProjId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';
  beforeEach(() => {
    cy.login();
    cy.visit(`/project/edit?projId=${testProjId}`);
  });
  it('アンドパッドに保存後、ログに表示', () => {

    cy.contains('form div .MuiGrid-root', 'ログ')
      .next('div')
      .children('div')
      .eq(0)
      .as('latestLog')
      .invoke('text')
      .then((text) => {
        const logBefore = text;
        cy.log(logBefore);
        cy.contains('button', 'Andpadへ').as('andpadBtn');
        cy.get('@andpadBtn').click();
        cy.contains('button', 'はい', { timeout: 10000 }).as('saveBtn')
          .should('be.enabled');
        
        cy.intercept(
          'GET',
          '*records.json?app=194*',
        ).as('getLatestData');

        cy.get('@saveBtn').click();

        cy.contains('Andpadへ案件更新しますか').should('not.exist');
        cy.contains('保存が出来ました').should('exist');
        cy.contains('保存が出来ました', { timeout: 10000 }).should('not.exist');
        
        cy.wait('@getLatestData');

        cy.get('@latestLog').invoke('text')
          .then((text2) => {
            const logAfter = text2;
            cy.log(logAfter);
            expect(logAfter).not.to.equal(logBefore);

          });

      });

  });

  it('「もっと見る」を押すと、ログが全て表示される', () => {
    cy.contains('button', 'もっと見る')
      .as('moreBtn')
      .siblings('div')
      .should('have.length', 3);

    cy.get('@moreBtn').click();
    cy.contains('button', '閉じる')
      .siblings('div')
      .should('have.length.gt', 3);
  });
});