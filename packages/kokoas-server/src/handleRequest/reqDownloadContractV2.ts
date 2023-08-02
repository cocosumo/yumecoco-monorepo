
import { RequestHandler } from 'express';

import { ReqDownloadContractParams, ReqDownloadContractV2Response } from 'types';
import { getContractDataV2 } from './reqSendContractDirectV2/getContractDataV2';
import { generateContractPdfV2 } from '../api/docusign/contracts';
import { getRecipients } from './reqSendContractDirectV2/getRecipients/getRecipients';
import { EnvelopeRecipients } from 'docusign-esign';


export const reqDownloadContractV2: RequestHandler<
unknown,
ReqDownloadContractV2Response & {
  recipients?: EnvelopeRecipients
},
unknown,
ReqDownloadContractParams
> = async (req, res) => {
  try {
    const {
      contractId,
    } = req.query;

    console.log('reqDownloadContractV2 received', contractId);

    if (!contractId) throw new Error('契約IDは指定されていません');

    const contractData = await getContractDataV2({
      contractId,
      signMethod: 'electronic',
    });

    const {
      projName,
      envelopeStatus,
      envelopeId,
    } = contractData;

    const recipients = getRecipients(contractData);
 
    console.log('Contract data', projName, envelopeStatus); 

    const file = await generateContractPdfV2(contractData, 'base64') as string;
    console.log('PDF File generated');

    res.status(200).json( {
      // Array here to accomodate multi-documents in the future
      documents: [file],
      envelopeStatus,
      envelopeId,
      recipients,
    });
  
    res.end();
  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      },
    );
  }
};
