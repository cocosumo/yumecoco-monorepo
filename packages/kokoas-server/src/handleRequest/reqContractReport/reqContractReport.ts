/* 
import { RequestHandler } from 'express';
import { generateContractReport } from './generateContractReport';

export const reqContractReport: RequestHandler<
unknown,
{
  base64Img: string
},
{
  contractId: string,
}
> = async (req, res) => {
  try {
    const {
      contractId,
    } = req.body;

    console.log(req.body);

    if (!contractId) throw new Error('URLは指定されていません');

    const base64Img = await generateContractReport(contractId);

    res.status(200).json({
      base64Img,
    });

    
  } catch (err) {
    console.error(err);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      },
    );
  }
};
 */