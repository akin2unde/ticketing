import { Request, Response, NextFunction } from 'express';
const LoggerMiddleware=(req: Request, res: Response, next: NextFunction)=> {
  console.log(`${req.method} request made to ${req.path}`);
  next();
}
export default LoggerMiddleware