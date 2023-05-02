
import { RequestHandler } from 'express';
import {
  generateContractPdf,
} from '../api/docusign/contracts/';
import { ReqDownloadContractParams } from 'types';
import { getContractDataV2 } from '../api/kintone/getContractDataV2';


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

    res.json(contractData);

    console.log('Contract data', projName, envelopeStatus); 
    /*    switch (fileType) {
      case 'xlsx':
        file = await generateContractXlsx(contractData, 'xlsx') as Xlsx;

        res.attachment(`請負契約書 - ${projName}.xlsx`)
          .status(200);
        await file.write(res);
        break;
      case 'pdf':
        console.log('Generating pdf');
        file = await generateContractPdf(contractData, 'base64');

        console.log('PDF File generated');
        res.status(200).json( {
          // Array here to accomodate multi-documents in the future
          documents: [file],
          envelopeStatus,
        });

        break;
    } */
    //res.end();
  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      },
    );
  }
};
