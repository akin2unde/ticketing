import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Response,Request } from 'express';
import { Server } from '@overnightjs/core';
import mongoose = require('mongoose');
import * as controllers from './controllers';
import path = require('path');
// require('dotenv').config();
import { env } from './environment/env';
import { EnvData } from './environment/env-data';
import LoggerMiddleware from './middleware/logger';
import AuthorizeMiddleware from './middleware/authorize';
import ErrorMiddleware from './middleware/error';
// require('dotenv').config({ path: './process.env' })
// dotenv.config({ path: __dirname+'/.env' });
class MainServer extends Server {
  ROOTDIR = path.join(__dirname, '../');
  PORT:number; 
  Env= env().ENV as unknown as EnvData;
  constructor() {
    super(true);
    this.PORT= this.Env.PORT ?? 5000;
    console.log("port:"+this.Env.PORT)
    this.initialize();
    this.setupControllers();
  }

  private initialize() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(express.static(path.join(this.ROOTDIR, 'yuvendJar')));
    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    //Enables cors
    this.app.use(cors());
    //request log
    this.app.use(LoggerMiddleware)
    //request header with token validation
    this.app.use(AuthorizeMiddleware)
    //model validator 
    // this.app.use(LoggerMiddleware)
    //start and Connect MongosDb
    this.mongoSetup();
    //Error middleware 
    this.app.use(ErrorMiddleware); 
  }

  private setupControllers() {
    const controllerInstances = [];
    for (const name of Object.keys(controllers)) {
      const controller = (controllers as any)[name];
      // console.log(`Controller name: ${name}`);
      if (typeof controller === 'function') {
        controllerInstances.push(new controller());
      }
    }
    console.log(`Controllers ${controllerInstances}`);
    super.addControllers(controllerInstances);
  }

  private mongoSetup(): void {
    console.info("constring:"+this.Env.DBCONNECTIONSTRING as string);
    mongoose.connect(this.Env.DBCONNECTIONSTRING as string);
    mongoose.connection.on('open', () => {
      console.info('connected to mongoDb');
    });
  }

  public start() {
    this.app.listen(this.PORT, () => {
      console.log(`App running in ${process.env.ENV as string} and listening on port ${this.PORT}`);
    });
    this.app.get('/', (request, response) => {
      console.log(`URL: ${request.url}`);
      response.send({ name:"Ticketing "+this.Env.ENV , statusCode: response.statusCode, Status: 'We are doing fine!!!' });
    });
  }
}

export default MainServer;
