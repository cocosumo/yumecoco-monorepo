import { RequestHandler } from 'express';
import validator from 'validator';
import { getCostMgtDataByProjIdV2 } from './getCostMgtDataByProjIdV2';

export const reqCostMgtDataByProjIdV2: RequestHandler<
{ projId: string }
> = async (req, res) => {
  try {
    const projId = validator.escape(req.params.projId);
    if (!projId) throw new Error('projId is required');
    console.log('getCostMgtDataByProjIdV2', projId);
    
    const result = await getCostMgtDataByProjIdV2(projId);

    res.json(result); 
  } catch (err) {
    console.error(err?.message);
    res.status(400)
      .send(validator.escape(err?.message || 'Error in getCostMgtDataByProjId'));
  }
};