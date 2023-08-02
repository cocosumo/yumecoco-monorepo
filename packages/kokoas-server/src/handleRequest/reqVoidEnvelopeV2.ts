import { RequestHandler } from 'express';
import { IContracts, IVoidReq, IVoidRes } from 'types';
import { voidEnvelope } from '../api/docusign';
import { saveContract } from 'api-kintone';
import { getContractByEnvId } from 'api-kintone/src/contracts/getContractByEnvId';

/**
 * Request handler for voiding envelope
 *
 * @param req
 * @param {IVoidReq} req.body envelopeId, and voidedReason
 * @param res
 */
export const reqVoidEnvelopeV2 : RequestHandler = async (
  req, res,
) => {
  try {
    const body: IVoidReq = req.body;
    const {
      envelopeId,
      voidedReason,
    } = body;
    console.log('VOIDING...');

    if (!voidedReason) throw new Error('Server: 無効にする理由は定義されていません。');

    const result = await voidEnvelope({ envelopeId, voidedReason });

    const {
      uuid,
    } = await getContractByEnvId(envelopeId);
    console.log(`Voiding envelope id: ${envelopeId}`);

    const record : Partial<IContracts> = {
      envDocFileKeys: { 
        type: 'FILE',
        value: [] as  kintone.fieldTypes.File['value'], 
      }, // Remove attached files
      envelopeStatus: { value: 'voiding' },
    };

    await saveContract({
      recordId: uuid.value,
      record,
    });

    res.status(200).json({
      voidSuccess: true,
      envelopeStatus: 'voiding',
      envelopSummary: result,
    } as IVoidRes);
  } catch (err: any) {
    // Return error from docusign api or validation error.
    console.log(err);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      },
    );
  }
};
