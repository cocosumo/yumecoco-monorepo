import { GetOrderBySystemIdParams, getOrderBySystemId } from 'api-andpad/src/@get/getOrderBySystemId';
import { RequestHandler } from 'express';
import validator from 'validator';

export const reqGetProjectBySystemId: RequestHandler<
unknown, 
unknown, 
unknown, 
GetOrderBySystemIdParams > = async (req, res) => {
  // try {
    
  console.log('getOrderByProjId', req.query);
    
  const result = await getOrderBySystemId(req.query);
  throw new Error('test');
  res.json(result); 
  // } catch (err) {
  //   console.error(err?.message);
  //   res.status(400)
  //     .send(validator.escape(err?.message || 'Error in reqGetProjectBySystemid'));
  // }
};