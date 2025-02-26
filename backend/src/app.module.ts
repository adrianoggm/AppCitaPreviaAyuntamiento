import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { TramiteModule } from './infrastructure/adapters/controllers/tramite/tramite.module';
import { UsuarioModule}   from './infrastructure/adapters/controllers/usuario/usuario.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'), 
      //exclude: ['/api/(.*)'], //excluyo las rutas de api
    }),
    TramiteModule,
    UsuarioModule,
    MongooseModule.forRoot('mongodb+srv://aggm000edu:1@aytocitaprevia.ulfz9.mongodb.net/?retryWrites=true&w=majority&appName=AytoCitaprevia'),
    
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
