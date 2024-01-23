
import {
  Controller,
  Middleware,
  Get,
  Post,
  Put,
  Delete,
  ClassErrorMiddleware,
} from '@overnightjs/core';
import { Request, Response, NextFunction, json } from 'express';
import * as base from '../services/baseService';
import { AppError } from '../models/operations/app-error';
import { UserService } from '../services/userService';
import ErrorMiddleware from '../middleware/error';

@Controller('test')
export class TestController {
  constructor(
    // public custService: CustomerService
  ) {}
  @Get('sample')
  public async sample(req: Request, res: Response) {
    res.status(200).json({message:'Hello world'});
  }
  @Get('sampleError')
  public async sampleError(req: Request, res: Response,next: NextFunction) {
    try{
   var t =new UserService();
    res.status(200).json({message:'Hello world'});
    }
    catch(err) 
    {
      ErrorMiddleware(err,req,res,next);
    }
  }

  @Post('getInventLocation')
  public async getLocations(req: Request, res: Response) {
    // let rest = await new BaseService(RequestTypes.POST, 'YuvendServiceGroup/YuvendService/getInventLocation',
    // {
    //   filter: LOCATIONFILTER
    // }).call();
    // if (rest.status === "200"){
    //   res.status(200).json(rest.data);
    // } else {
    //   res.status(200).json(rest);
    // }
  }


}


