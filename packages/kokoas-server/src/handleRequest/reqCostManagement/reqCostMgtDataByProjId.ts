import { getCostMgtDataByProjId } from 'api-kintone';
import { RequestHandler } from 'express';
import validator from 'validator';

export const reqCostMgtDataByProjId: RequestHandler<
{ projId: string }
> = async (req, res) => {
  try {
    const projId = validator.escape(req.params.projId);
    if (!projId) throw new Error('projId is required');
    console.log('getCostMgtDataByProjId', req.query);
    
    const result = await getCostMgtDataByProjId(projId);

    res.json(result); 
  } catch (err) {
    console.error(err?.message);
    res.status(400)
      .send(validator.escape(err?.message || 'Error in getCostMgtDataByProjId'));
  }
};