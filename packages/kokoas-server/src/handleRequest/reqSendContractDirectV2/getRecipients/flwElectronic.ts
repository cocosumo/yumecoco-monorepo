import { EnvelopeRecipients, Signer } from 'docusign-esign';
import { TContractData } from '../getContractDataV2';
import { roles } from 'types';
import { commonCC } from './commonCC';
import { commonSigners } from './commonSigners';

export const flwElectronic = (data: TContractData) : EnvelopeRecipients => {
  console.log('Flow：電子');

  const {
    customers,
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
      approveTabs: [{
        anchorString: '/tt/',
        documentId: '1',
        pageNumber: '1',
        tabLabel: roles.officer,
      }],
    },
  });

  /* 顧客 */
  signers.push(...customers
    .map<Signer>(
    (
      {
        custName,
        email: custEmail,
      },
      idx,
    ) => {
      if (!custEmail) {
        throw new Error(`顧客${idx + 1}のメールアドレスがありません`);
      }

      return {
        email: custEmail,
        name: custName,
        roleName: roles.customer,
        recipientId: `${1}${idx}`,
        routingOrder: '2',
        tabs: {
          dateSignedTabs: [
            {
              anchorString: `c${idx + 1}date`,
            },
          ],
          signHereTabs: [
            {
              anchorString: `c${idx + 1}`,
              anchorYOffset: '5',
            },
          ],
        },
      };
    },
  ));

  return {
    signers: [
      ...signers,
      ...commonSigners(data),
    ],
    carbonCopies: commonCC(data),
  };
};