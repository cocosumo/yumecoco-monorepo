import { RequestHandler } from 'express';
import validator from 'validator';
import { getCostMgtDataByProjIdV4 } from './getCostMgtDataByProjIdV4';

export const reqCostMgtDataByProjIdV4: RequestHandler<
{ projId: string }
> = async (req, res) => {
  try {
    const projId = validator.escape(req.params.projId);
    if (!projId) throw new Error('projId is required');
    console.log('getCostMgtDataByProjIdV4', projId);
    
    const result = await getCostMgtDataByProjIdV4(projId);

    res.json(result); 
  } catch (err) {
    console.error(err?.message);
    res.status(400)
      .send(validator.escape(err?.message || 'Error in getCostMgtDataByProjId'));
  }
};