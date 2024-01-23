import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
const AuthorizeMiddleware=(req: Request, res: Response, next: NextFunction)=> {
  var token =req.headers['authorization']
  console.log(`Request Token:${token}`);
  if(!token)
  {
    res.status(StatusCodes.BAD_REQUEST).send({message:'header not found'})
  }
  else{
    next();
 }
}
export default AuthorizeMiddleware