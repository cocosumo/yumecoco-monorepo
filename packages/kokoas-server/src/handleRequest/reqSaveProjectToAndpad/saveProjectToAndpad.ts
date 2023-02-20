import { SaveProjectData, SaveProjectResponse } from 'api-andpad';
import { RequestHandler } from 'express';


export const saveProjectToAndpad: RequestHandler<
{ projId: string },
SaveProjectResponse,
SaveProjectData> = async (req, res) => {
  try {
    const { projId } = req.params;
    const body = req.body;


    console.log(`Received project id. ${projId} with body ${JSON.stringify(body, null, 2)}`);

    res.status(200).send({
      data: {
        object: {
          システムID: 999,
          案件名: '',
          案件種別: '',
          案件管理ID: '',
          物件ID: 999,
          物件管理ID: '000',
          顧客ID: 999,
          顧客管理ID: '',
        },
      },
    });
  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }


};