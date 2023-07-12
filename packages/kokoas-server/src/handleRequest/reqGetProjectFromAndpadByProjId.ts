import { getOrderByProjId } from 'api-andpad';
import { RequestHandler } from 'express';
import validator from 'validator';

export const reqGetProjectFromAndpadByProjId: RequestHandler<
{ projId: string }
> = async (req, res) => {
  try {
    const projId = validator.escape(req.params.projId);
    if (!projId) return res.status(400).send('projId not defined');
    console.log('getOrderByProjId', projId);
    
    const result = await getOrderByProjId(projId);
    if (!result) return res.status(404).send(`Andpadで案件管理IDが見つかりません。Andpadへ登録をお願いします。${projId}`);
    //console.log('result', result);
    res.json(result);

  } catch (err) {
    console.error(err?.message);
    res.status(400)
      .send(validator.escape(err?.message || 'Error in reqGetProjectFromAndpadByProjId'));
  }


};