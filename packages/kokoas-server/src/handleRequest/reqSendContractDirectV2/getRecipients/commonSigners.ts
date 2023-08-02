import { roles } from 'types';
import { TContractData } from '../getContractDataV2';
import { Signer } from 'docusign-esign';

export const commonSigners = (data: TContractData) => {

  const {
    storeMngrEmail,
    storeMngrName,

    accountingEmail,
    accountingName,
  } = data;

  const signers: Signer[] = [];

  /* 店長 */
  signers.push({
    email: storeMngrEmail,
    name: storeMngrName,
    roleName: roles.storeMngr,
    recipientId: '3',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/tc/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: roles.storeMngr,
      }],
    },
  });

  /* 経理 */
  signers.push({
    email: accountingEmail,
    name: accountingName,
    roleName: roles.accounting,
    recipientId: '33',
    routingOrder: '3',
    tabs: {
      approveTabs: [{
        anchorString: '/ke/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: roles.accounting,
      }],
    },
  });

  return signers;
};