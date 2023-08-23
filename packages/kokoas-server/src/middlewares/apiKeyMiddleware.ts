import { NextFunction, Request, Response } from 'express';

// Middleware to check API key
export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKeyHeader = req.headers['x-api-key'];
  const serverApiKey = process.env.SERVER_API_KEY;

  if (!apiKeyHeader || apiKeyHeader !== serverApiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next(); // API key is valid, continue to the next middleware/route handler
};