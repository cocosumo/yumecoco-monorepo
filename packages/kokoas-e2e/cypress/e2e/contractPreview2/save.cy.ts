import { beforeEach, cy, describe, it } from 'local-cypress';
import { correctInputData, labelMap, testProjId } from './testData';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';


describe('保存処理', { scrollBehavior: 'center' }, () => {

  const correctInput = correctInputData();
  beforeEach(() => {
    cy.login();
    cy.visit(`/project/contract/preview/v2?projId=${testProjId}`);
  });

  it('新規保存できること', () => {
    cy.getTextInputsByLabel('契約合計金額（税込）')
      .type(correctInput.totalContractAmt.toString())
      .should('have.value', correctInput.totalContractAmt.toString());

    cy.getTextInputsByLabel(labelMap.profit)
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

  it('編集で保存すると、更新されること', () => {

    // TODO：リファクタリングして、網羅的に他フィールドも追加する

    const randomAmt = Math.floor(Math.random() * 1000000);
    const futureDate = format(new Date(addMonths(new Date(), 1)), 'yyyy/MM/dd');

    cy.getTextInputsByLabel('契約合計金額（税込）')
      .type(randomAmt.toString())
      .should('have.value', randomAmt.toString());


    cy.getCheckboxesByLabel('その他').check();
    cy.get('input[name="othersAmt"]')
      .as('amt')
      .should('have.value', randomAmt.toLocaleString());

    cy.get('input[name="othersAmtDate"]')
      .as('date')
      .type(futureDate);

    cy.contains('button', '保存').click();

    // 粗利額を入力していない状態だと、エラーが出るように
    cy.get('.MuiAlert-message').should('contain', 'ください。');

    cy.getTextInputsByLabel(labelMap.profit)
      .type(randomAmt.toString())
      .should('have.value', randomAmt.toString());

    cy.contains('button', '保存').click();

    cy.contains('保存が出来ました。').should('not.be.visible');

    cy.get('@amt').should('have.value', randomAmt.toLocaleString());
    cy.get('@date').should('have.value', futureDate);

  });

  it.only('本契約があって、新規契約の場合、', () => {
    
  });
});