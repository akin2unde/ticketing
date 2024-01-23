import { BaseService } from './baseService';
import { UserModel} from './../models/entities/user'
import { AppError } from '../models/operations/app-error';
import { NextFunction } from 'express';
import { Model } from 'mongoose';
export class UserService extends Model<UserModel> {
  /**
   *
   */
  constructor() {
    super();
    
    throw new AppError("Wahala ti sele oooo")
  }
}
