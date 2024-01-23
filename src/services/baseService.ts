import { NextFunction } from "express";
import { BaseEntity, BaseModel } from "../models/entities/baseModel";
import { User } from "../models/entities/user";
import { Model, model,Document } from "mongoose";
import { create } from "domain";
import { getModel } from "mongoose-typescript";

export class BaseService<T>
{
    

    constructor() {

    }
//    saveOne(data: T)
//    {
//      BaseEntity.create(data);
//    }

}