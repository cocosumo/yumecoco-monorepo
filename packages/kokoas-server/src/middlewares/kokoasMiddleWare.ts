import { sendMessage } from 'api-chatwork';
import { NextFunction, Request, Response } from 'express';


export const kokoasMiddleWare = async (req: Request, res: Response, next: NextFunction) => {

  const reqUrl = req.originalUrl;


  console.log('DOMAIN', reqUrl, req);

  const apiKeyHeader = req.headers['x-api-key'];
  const serverApiKey = process.env.KOKOAS_API_KEY;

  if (!apiKeyHeader) {
    await sendMessage({
      roomId: '225800073',
      body: [
        `API KEY NOT PASSED TO: ${reqUrl}`,
        `KOKOAS API KEY: ${apiKeyHeader} === ${serverApiKey}`,
      ].join('\n'),
    });
  }
 
  next(); // API key is valid, continue to the next middleware/route handler
};