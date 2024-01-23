import * as mongoose from 'mongoose';
import {
  model,
  prop,
  getModel,
   index
} from 'mongoose-typescript';
import { BaseEntity } from './baseModel';
@model('User')
@index({ mailAddress: 1, storeId: 1 }, { unique: true })
export class UserModel extends BaseEntity<UserModel> {
  @prop({ required:true}) mailAddress: string;
  @prop({ required:true}) firstName: string;
  @prop({ required:true}) lastName: string;
  @prop() otherName: string;
  @prop({select:false, required:true}) password: string='';  
  /**
   *
   */
}

getModel(UserModel).schema.index({ position: '2dsphere' });
getModel(UserModel).schema.index({ '$**': 'text' });
getModel(UserModel).createIndexes();
export const User: typeof UserModel = getModel(UserModel);
