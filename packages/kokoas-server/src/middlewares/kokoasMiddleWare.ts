import { sendMessage } from 'api-chatwork';
import { NextFunction, Request, Response } from 'express';


export const kokoasMiddleWare = async (req: Request, res: Response, next: NextFunction) => {

  const reqUrl = req.originalUrl;

  const apiKeyHeader = req.headers['kokoas-api-key'];
  const serverApiKey = process.env.KOKOAS_API_KEY;

  console.log(`CALL TO ${reqUrl} with key ${apiKeyHeader}`);


  if (apiKeyHeader !== serverApiKey) {
    // Temporily report endpoints that are called without API key
    // This will be sent chatwork (TEST room)
    // Fix on the client side
    console.error(`API KEY NOT PASSED TO: ${reqUrl}`);
    await sendMessage({
      roomId: '225800073',
      body: [
        `API KEY NOT PASSED TO: ${reqUrl}`,
        `KOKOAS API KEY: ${apiKeyHeader?.slice(0, 4)}...`,
      ].join('\n'),
    });

    // TODO: If stable, block the request.
  }
 
  next(); // API key is valid, continue to the next middleware/route handler
};