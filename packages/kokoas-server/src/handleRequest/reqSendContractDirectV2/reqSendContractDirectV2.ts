import { RequestHandler } from 'express';
import { 
  ISendEnvelopeResponse, 
  TEnvelopeStatus, 
  ReqSendContractParams, 
} from 'types';
import { processContractV2 } from './processContractV2';


/**
 * Send contract directly without opening an intermediary link
 * @param req
 * @param res
 */
export const reqSendContractDirectV2: RequestHandler<
unknown,
unknown,
ReqSendContractParams
> = async (req, res) => {

  const {
    contractId,
    signMethod,
  } = req.body;

  console.log('Processing contract');

  try {
    if (!contractId) {
      throw new Error('契約番号は存在していません。管理者にお問い合わせください。');
    }

    if (!signMethod) {
      throw new Error('署名方法は指定していません。管理者にお問い合わせください。');
    }


    const result = await processContractV2(req.body, 'sent');
    const {
      documents,
      envelopeSummary: {
        status = '',
        envelopeId = '',
      } = {},
    } = result;

    console.log('Done processing contract creation.');

    const sendResp : ISendEnvelopeResponse = {
      documents: documents ?? [],
      envelopeId,
      envelopeStatus: status as TEnvelopeStatus,
    };

    if (status) {
      res.status(200).json(sendResp);
    } else {
      throw new Error('Envelope creation failed');
    }
  } catch (err: any) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      },
    );
  }
};
