import { beforeEach, cy, describe, it } from 'local-cypress';
import { correctInputData, testProjId } from './testData';
import format from 'date-fns/format';


describe('保存処理', { scrollBehavior: 'center' }, () => {

  const correctInput = correctInputData();
  beforeEach(() => {
    cy.login();
  });

  it('新規保存できること', () => {
    cy.visit(`/project/contract/preview/v2?projId=${testProjId}`);
    cy.getTextInputsByLabel('契約合計金額（税込）')
      .type(correctInput.totalContractAmt.toString())
      .should('have.value', correctInput.totalContractAmt.toString());

    cy.getCheckboxesByLabel('契約金').check();
    cy.get('input[name="contractAmt"]').should('have.value', correctInput.totalContractAmt.toLocaleString());

    cy.get('input[name="contractAmtDate"]').type(format(new Date(), 'yyyy/MM/dd'));

    // 実際に保存されないように、保存リクエストをモックする。
    cy.intercept('POST', '**/k/v1/record.json', {
      statusCode: 200,
      body: {
        'revision': '1',
      },
    }).as('saveContract');

    cy.contains('button', '保存').click();
    cy.wait('@saveContract');

    cy.get('.MuiAlert-message').should('contain', '保存が出来ました。');

  });
});