import { getProjById } from 'api-kintone';
import { RequestHandler } from 'express';


export const saveProjectToAndpad: RequestHandler<{ projId: string }, unknown> = async (req, res) => {
  try {
    const { projId } = req.params;
    const projRec = await getProjById(projId);


    res.status(200).send(`Success ${JSON.stringify(projRec)}`);
  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }


};