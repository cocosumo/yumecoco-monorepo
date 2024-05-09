import { produce } from 'immer';
import { cy } from 'local-cypress';
import { IContracts } from 'types';

export const checkContractAddStatus = (mockHasContract: boolean, shouldBeEnabled: boolean) => {
  cy.intercept('GET', '**/k/v1/records.json?app=231&query=projId*', (req) => {
    req.continue((res) => {
      const modifiedBody = produce(res.body as { records: IContracts[] }, (draft) => {
        if (mockHasContract) {
          draft.records[0].contractType.value = '契約';
        } else {
          draft.records = [];
        }
      });

      res.send({ 
        body: modifiedBody, 
      });
    });
  }).as('getContracts');
        
  cy.wait('@getContracts');

  cy.getRadiosByValue('追加')
    .scrollIntoView({ offset: { top: -200, left: 0 } })
    .should(shouldBeEnabled ? 'be.enabled' : 'be.disabled');

  cy.screenshot();
};
