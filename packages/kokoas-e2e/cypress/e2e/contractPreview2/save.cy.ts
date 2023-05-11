import { beforeEach, cy, describe, it } from 'local-cypress';
import { correctInputData, testProjId } from './testData';


describe('保存処理', { scrollBehavior: 'center' }, () => {

  const correctInput = correctInputData();
  beforeEach(() => {
    cy.login();
  });
  it('新規保存できること', () => {
    cy.visit(`/project/contract/preview/v2?projId=${testProjId}`);
    cy.getTextInputsByLabel('契約合計金額')
      .type(correctInput.totalContractAmt.toString())
      .should('have.value', correctInput.totalContractAmt.toString());

    cy.getCheckboxesByLabel('契約金').check();
    cy.get('input[name=""contractAmt""]').should('have.value', correctInput.totalContractAmt.toString());
  });
});