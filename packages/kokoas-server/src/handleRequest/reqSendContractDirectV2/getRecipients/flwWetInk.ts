import { EnvelopeRecipients, Signer } from 'docusign-esign';
import { TContractData } from '../getContractDataV2';
import { roles } from 'types';
import { commonCC } from './commonCC';
//import { commonSigners } from './commonSigners';

export const flwWetInk = (data: TContractData): EnvelopeRecipients => {
  console.log('Flow：紙');

  const {
    cocoAG,
  } = data;

  const {
    email: officerEmail,
    name: officerName,
  } = cocoAG?.[0] ?? {};

  const signers : Signer[] = [];

  signers.push({
    email: officerEmail,
    name: officerName,
    roleName: roles.officer,
    recipientId: '1',
    routingOrder: '1',
    tabs: {
      signerAttachmentTabs: [{
        anchorString: '/tt/',
        tabLabel: roles.officer,
      }],
    },
  });

  return {
    signers,
    carbonCopies: commonCC(data),
  };
};