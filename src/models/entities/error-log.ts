import * as mongoose from 'mongoose';
import {
  model,
  prop,
  getModel,
} from 'mongoose-typescript';
import { BaseEntity } from './baseModel';
@model('ErrorLog')
export class ErrorLogModel extends BaseEntity<ErrorLogModel> {
  @prop({ required:true}) message: string;
  @prop({ required:true}) isAppError: boolean=false;
  @prop({ required:true}) url: string;
  @prop({ required:true}) httpVerb: string;
  @prop() data: string;
  @prop() actionBy: string;
  /**
   *
   */
  constructor() {
    super();
    
  }
}

getModel(ErrorLogModel).schema.index({ position: '2dsphere' });
getModel(ErrorLogModel).schema.index({ '$**': 'text' });
getModel(ErrorLogModel).createIndexes();
export const ErrorLog: typeof ErrorLogModel = getModel(ErrorLogModel);