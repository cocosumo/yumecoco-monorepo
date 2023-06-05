import { RequestHandler } from 'express';
import { IProjestimates, IVoidReq, IVoidRes } from 'types';
import { voidEnvelope } from '../api/docusign';
import { getEstimateByEnvId, saveEstimate } from 'api-kintone';

/**
 * Request handler for voiding envelope
 *
 * @param req
 * @param {IVoidReq} req.body envelopeId, and voidedReason
 * @param res
 * @deprecated 見積もりに関係するものは不要になります
 */
export const reqVoidEnvelope : RequestHandler = async (
  req, res,
) => {
  try {
    const body: IVoidReq = req.body;
    const {
      envelopeId,
      voidedReason,
    } = body;


    if (!voidedReason) throw new Error('Server: 無効にする理由は定義されていません。');

    const result = await voidEnvelope({ envelopeId, voidedReason });

    const {
      uuid,
    } = await getEstimateByEnvId(envelopeId);
    console.log(`Voiding envelope id: ${envelopeId}`);

    const record : Partial<IProjestimates> = {
      envDocFileKeys: { value: [] } as any, // Remove attached files
      envStatus: { value: 'voiding' },
    };

    await saveEstimate({
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
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      },
    );
  }
};
