import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../models/operations/app-error';
// import { EnvData } from '../environment/env-data';
// import { env } from '../environment/env';
import { ErrorLogModel } from '../models/entities/error-log';
import { ResponseError } from '../models/operations/response-error';
import { BaseService } from '../services/baseService';

import { Model, model,Document } from "mongoose";

 const ErrorMiddleware = (err:any, req: Request, res: Response, next: NextFunction) => {
  // Handled errors 
  let error =  {} as ErrorLogModel
  error.url= req.path;
  error.message= err.message;
  error.data= req.method==='POST'||req.method==='PUT'?req.body:''
  error.httpVerb=req.method;
  error.actionBy='';
  error.isAppError=err instanceof AppError?true:false;
  //save
  var sr =new BaseService<Model<ErrorLogModel>>();
  // sr.saveOne();
  if(err instanceof AppError) 
  {
    // console.log('Error Called'+err)
    return  res.status(StatusCodes.BAD_REQUEST).send(new ResponseError(err.message,'App Error',StatusCodes.INTERNAL_SERVER_ERROR,err.stack));
  }
  // Unhandled errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(new ResponseError(err.message,'Unknown Error'));
};
export default ErrorMiddleware 