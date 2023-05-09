import { AppIds } from 'config';
import { produce } from 'immer';
import { getNumberFromString } from 'libs/src/getNumberFromString';
import { beforeEach, cy, describe, expect } from 'local-cypress';
import { IProjestimates } from 'types';

describe.skip('Estimate shortcuts', () => {
  const testRowCount = 5;

  beforeEach(() => {
    /**
     * テストデータの条件:
     * 1. 行が１行以上ある
     */
    const testId = 'ce4e52a0-4486-4bae-944c-22c63850de9f';
  
    cy.login();

    cy.visit(`/project/estimate/register?projEstimateId=${testId}&menuOpen=0`);

    cy.log(`${testRowCount}行のテストデータを作成します。`);
    cy.intercept('GET', `**/records.json?app=${AppIds.projEstimates}*`, (req) => {
      req.continue((res) => {
        res.body = produce(res.body, (draft: { records: IProjestimates[] }) => {
          const recordIdx = draft.records.findIndex((record) => record.uuid.value === testId);
          draft.records[recordIdx].内訳.value = Array(testRowCount)
            .fill(0)
            .map(()=>JSON.parse(JSON.stringify({ 
              id: '1',
              value: {
                大項目: { value: '大項目1' },
                中項目: { value: '中項目1' },
                部材名: { value: '小項目1' },
                数量: { value: '1' },
                単位: { value: '個' },
                単価: { value: '1500' },
                備考: { value: '備考1' },
                原価: { value: '1000' },
                税率: { value: '0.1' },
                部材備考:  { value: '部材備考1' },
              }, 
            }))); 
          
        });
      });
    })
      .as('getEstimates');


    cy.wait('@getEstimates');

    cy.get('input[name*="costPrice"]').as('costPriceFields');
    cy.get('input[name*="unitPrice"]').as('unitPriceFields');
    cy.get('@costPriceFields').eq(0)
      .as('firstCostPrice');
    cy.get('@unitPriceFields').eq(0)
      .as('firstUnitPrice');

    cy.contains('p', /\d+行/)
      .as('rowCount');
  });
  
  it('行を追加する', () => {
    
    cy.get('@rowCount')
      .invoke('text')
      .then((oldRowCount) => {
        const rows = getNumberFromString(oldRowCount);

        cy.get('@firstCostPrice').type('{meta}i');
        cy.get('@rowCount')
          .invoke('text')
          .then((newRowCount) => {
            const newRows = getNumberFromString(newRowCount);
            
            expect(newRows).to.eq(rows + 1);
          });
      });

    cy.log('行を追加した後、行の値が初期化されていることを確認します。');
    cy.get('@costPriceFields').eq(1)
      .should('have.value', '0');
  });

  it('行を複製する', () => {
    cy.get('@rowCount')
      .invoke('text')
      .then((oldRowCount) => {
        const rows = getNumberFromString(oldRowCount);
        const randomCostPrice = Math.floor(Math.random() * 8000) + 1000;
        const maxRange = Math.floor(randomCostPrice * 0.9);
        const randomUnitPrice = Math.floor(Math.random() * maxRange) + randomCostPrice;

        cy.get('@firstCostPrice').type(`${randomCostPrice.toString()}`);
        cy.get('@firstUnitPrice').type(`${randomUnitPrice.toString()}{meta}{shift}i`);

        cy.log('行を複製した後、行の値が複製元の行と同じになっていることを確認します。');
        cy.get('@costPriceFields').eq(1)
          .should('have.value', randomCostPrice.toLocaleString());
        cy.get('@unitPriceFields').eq(1)
          .should('have.value', randomUnitPrice.toLocaleString());

        cy.get('@rowCount')
          .invoke('text')
          .then((newRowCount) => {
            const newRows = getNumberFromString(newRowCount);
            expect(newRows).to.eq(rows + 1);
          });
      });
  });

  it('行を削除する', () => {
      
    cy.get('@rowCount')
      .invoke('text')
      .should('eq', `${testRowCount}行`);

    cy.log('１行目を削除したら、フォーカスは次の行に移動する');
    cy.get('@firstCostPrice').type('{meta}{del}', { scrollBehavior: 'center' });
    cy.focused().should('have.attr', 'name', 'items.0.costPrice');

    cy.log('3行目を削除したら、フォーカスは次の行に移動する');
    cy.get('@costPriceFields')
      .eq(2)
      .type('{meta}{del}', { scrollBehavior: 'center' });
    cy.focused().should('have.attr', 'name', 'items.2.costPrice');

    cy.log('最終行を削除したら、フォーカスは前の行に移動する');
    cy.get('@costPriceFields').eq(2)
      .type('{meta}{del}', { scrollBehavior: 'center' });
    cy.focused().should('have.attr', 'name', 'items.1.costPrice');

    cy.get('@costPriceFields').eq(1)
      .type('{meta}{del}', { scrollBehavior: 'center' });
    cy.focused().should('have.attr', 'name', 'items.0.costPrice');

    cy.log('最終行は一つしかないなら、フォーカスは仮想行に移動する');
    cy.get('@costPriceFields')
      .should('have.length', 2) // 最終行 + 仮想行
      .eq(0)
      .type('{meta}{del}', { scrollBehavior: 'center' });
    cy.focused().should('have.attr', 'name', 'items.0.costPrice');
    
    cy.log('仮想行を削除しようとしたら、失敗して警告を出す');
    cy.get('@costPriceFields')
      .should('have.length', 1) // 仮想行しか残っていないことを確認
      .eq(0)
      .type('{meta}{del}', { scrollBehavior: 'center' });

    cy.contains('.MuiSnackbar-root', '削除出来ません')
      .should('be.visible');
   
  });

});
