import { EnvelopeRecipientTabs, EnvelopeRecipients, Signer } from 'docusign-esign';
import { TContractData } from '../getContractDataV2';
import { roles } from 'types';
import { commonCC } from './commonCC';
import { commonSigners } from './commonSigners';

// 依頼番号：K9

export const flwJisha = (data: TContractData) : EnvelopeRecipients => {
  console.log('Flow：自社物件');

  
  const {
    cocoAG,
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

  signers.push({
    email: officerEmail,
    name: officerName,
    roleName: roles.officer,
    recipientId: '1',
    routingOrder: '1',
    tabs: envelopeRecipientTabs,
  });


  return {
    signers: [
      ...signers,
      ...commonSigners(data),
    ],
    carbonCopies: commonCC(data),
  };
};