
import { RequestHandler } from 'express';

import { ReqDownloadContractParams } from 'types';
import { getContractDataV2 } from '../api/kintone/getContractDataV2';
import { generateContractPdfV2 } from '../api/docusign/contracts';


export const reqDownloadContractV2: RequestHandler<
unknown,
unknown,
unknown,
ReqDownloadContractParams
> = async (req, res) => {
  try {
    const {
      contractId,
    } = req.query;

    //let file;

    console.log('reqDownloadContractV2 received', contractId);

    if (!contractId) throw new Error('契約IDは指定されていません');

    const contractData = await getContractDataV2({
      contractId,
    });

    const {
      projName,
      envelopeStatus,
    } = contractData;

    console.log('Contract data', projName, envelopeStatus); 

    const file = await generateContractPdfV2(contractData, 'base64');
    console.log('PDF File generated');
    res.status(200).json( {
      // Array here to accomodate multi-documents in the future
      documents: [file],
      envelopeStatus,
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
