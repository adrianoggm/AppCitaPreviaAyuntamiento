import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'), 
      exclude: ['/apo/*'] //excluyo las rutas de api
    }),

    MongooseModule.forRoot('mongodb://localhost/tu_base_de_datos'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
