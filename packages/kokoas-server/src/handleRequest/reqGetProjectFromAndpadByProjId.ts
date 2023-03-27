import { getOrderByProjId } from 'api-andpad';
import { RequestHandler } from 'express';

export const reqGetProjectFromAndpadByProjId: RequestHandler<
{ projId: string }
> = async (req, res) => {
  try {
    const projId = req.params.projId;
    if (!projId) return res.status(400).send('projId not defined');
    console.log('getOrderByProjId', projId);

    const result = await getOrderByProjId(projId);
    if (!result) return res.status(404).send('Not found');
    
    res.json(result);

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.message || 'Error in reqGetProjectFromAndpadByProjId',
    );
  }


};