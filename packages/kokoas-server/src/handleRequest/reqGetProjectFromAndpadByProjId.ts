import { RequestHandler } from 'express';

export const reqGetProjectFromAndpadByProjId: RequestHandler<
{ projId: string }
> = (req, res) => {
  try {
    const projId = req.params.projId;
    if (!projId) return res.status(400).send('projId not defined');
    
    res.send('reqGetProjectFromAndpadByProjId - TEST CONNECTION');

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.message || 'Error in reqGetProjectFromAndpadByProjId',
    );
  }


};