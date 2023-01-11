import { RequestHandler } from 'express';



export const reqUploadDaikokuEst : RequestHandler = async (req, res) => {
  try {

    console.log(res);
    res.end();

  } catch (err) {
    console.error(err?.message);
    res.status(400).send(
      err?.response?.res?.text ?? {
        message: err?.message,
      });
  }

};