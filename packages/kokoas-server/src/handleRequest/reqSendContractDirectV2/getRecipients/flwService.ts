import { EnvelopeRecipientTabs, EnvelopeRecipients, Signer } from 'docusign-esign';
import { TContractData } from '../getContractDataV2';
import { roles } from 'types';
import { commonCC } from './commonCC';


// 依頼番号：K9

export const flwService = (data: TContractData): EnvelopeRecipients => {
  console.log('Flow：サービス工事');
  
  const {
    cocoAG,

    subAccountingEmail,
    subAccountingName,

    signMethod,
  } = data;

  const {
    email: officerEmail,
    name: officerName,
  } = cocoAG?.[0] ?? {};

  const signers : Signer[] = [];
  const envelopeRecipientTabs: EnvelopeRecipientTabs = {};

  if (signMethod === 'electronic') {
    envelopeRecipientTabs.approveTabs = [{
      anchorString: '/tt/',
      documentId: '1',
      pageNumber: '1',
      tabLabel: roles.officer,
    }];
  } else {
    envelopeRecipientTabs.signerAttachmentTabs = [{
      anchorString: '/tt/',
      tabLabel: roles.officer,
    }];
  }

  // 担当者
  signers.push({
    email: officerEmail,
    name: officerName,
    roleName: roles.officer,
    recipientId: '1',
    routingOrder: '1',
    tabs: envelopeRecipientTabs,
  });

  // 経理
  signers.push({
    email: subAccountingEmail,
    name: subAccountingName,
    roleName: roles.accounting,
    recipientId: '2',
    routingOrder: '2',
    tabs: {
      approveTabs: [{
        anchorString: '/ke/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: roles.accounting,
      }],
    },
  });



  return {
    signers: signers,
    carbonCopies: commonCC(data),
  };
};