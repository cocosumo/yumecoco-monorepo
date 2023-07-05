import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  next();

  /*   try {
    //throw new Error('認証エラー。管理者にお問い合わせください。');

  } catch (e) {
    next(e);
  } */
/*  

  // Check if the token is valid
  if (token === 'your-valid-token') {
    // Token is valid, proceed to the next middleware or route handler
    next();
  } else {
    // Token is invalid, return an error response
    res.status(401).json({ error: 'Unauthorized' }); 
  }*/
};