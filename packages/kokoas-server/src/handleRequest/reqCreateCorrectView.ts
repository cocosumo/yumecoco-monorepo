import { RequestHandler } from 'express';
import { createCorrectView } from '../api/docusign/createCorrectView';

export const reqCreateCorrectView: RequestHandler<
unknown,
unknown,
{
  envelopeId: string,
}
> = async (req, res) => {
  const body = req.body;

  const {
    envelopeId = '',
  } = body;

  try {

    if (!envelopeId) {
      throw new Error('EnvelopeId is required');
    }
    
    console.log('Request correct view', envelopeId);
    const result = await createCorrectView(envelopeId);

    console.log('Sending correct view url.');
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).send(`編集リクエストが失敗しました。Docusign上で確認するよう管理者にご連絡ください。 ${error.message}`);
  }
};
