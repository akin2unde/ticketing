import { Model } from "mongoose";
import { id, prop, defaults, array, getModel } from "mongoose-typescript";
import { ObjectState } from "../operations/objectState";

 export class BaseModel<T> extends Model<T> {
  @id() public readonly id!: string;
  state: ObjectState=  ObjectState.New;
  @prop() createdAt!: Date;
  @prop() updatedAt!: Date;
  
}
export const BaseEntity: typeof BaseModel = getModel(BaseModel);
