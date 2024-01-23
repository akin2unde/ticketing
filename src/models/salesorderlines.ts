import * as mongoose from 'mongoose';
import {
  prop,
  subModel
} from 'mongoose-typescript';
import { Serial } from './serial';

@subModel()
export class SalesOrderLines {
  @prop() itemId!: string;
  @prop() itemName!: string;
  @prop() price!: string;
  @prop() priceSold!: string;
  @prop() costPrice: number = 0;
  @prop() b2bPrice!: string;
  @prop() quantity: number = 0;
  @prop() returnQty: number = 0;
  @prop() tempRtrnQty: number = 0;
  @prop() serial!: Serial[];
  @prop() lineStatus!: string;
}