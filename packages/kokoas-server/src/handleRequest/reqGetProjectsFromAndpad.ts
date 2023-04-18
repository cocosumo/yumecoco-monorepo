import { GetMyOrders, getMyOrders } from 'api-andpad';
import { RequestHandler } from 'express';
import validator from 'validator';

export const reqGetProjectsFromAndpad: RequestHandler<unknown, unknown, unknown, GetMyOrders > = async (req, res) => {
  try {
    
    console.log('getOrderByProjId', req.query);
    
    const result = await getMyOrders(req.query);

    console.log(result);
    if (!result) return res.status(404).send('Andpadで案件管理IDが見つかりません。Andpadへ登録をお願いします。');
    console.log('result', result);
    res.json(result); 
  } catch (err) {
    console.error(err?.message);
    res.status(400)
      .send(validator.escape(err?.message || 'Error in reqGetProjectFromAndpadByProjId'));
  }


};