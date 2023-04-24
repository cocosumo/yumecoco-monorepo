import { SaveProjectData, SaveProjectResponse, saveProject } from 'api-andpad';
import { RequestHandler } from 'express';


export const saveProjectToAndpad: RequestHandler<
unknown,
SaveProjectResponse,
SaveProjectData> = async (req, res) => {
  try {
    const body = req.body;

    console.log(`Request body: ${JSON.stringify(body, null, 2)}`);
    const result = await saveProject(body);

    res.status(200).json(result);

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      },
    );
  }


};