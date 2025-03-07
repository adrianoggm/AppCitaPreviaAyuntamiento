import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { TramiteModule } from './infrastructure/adapters/controllers/tramite/tramite.module';
import { UsuarioModule}   from './infrastructure/adapters/controllers/usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { TecnicoModule } from './infrastructure/adapters/controllers/tecnico/tecnico.module';
import { DepartamentoModule } from './infrastructure/adapters/controllers/departamento/departamento.module';
import { CitaModule } from './infrastructure/adapters/controllers/cita/cita.module';



const config = ConfigModule.forRoot({
  envFilePath: ['local.env', '.env'],
  isGlobal: true,
})

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend','dist'), 
      
      exclude: ['/api/(.*)'], //excluyo las rutas de api
    }),
    config,
    TramiteModule,
    UsuarioModule,
    TecnicoModule,
    DepartamentoModule,
    CitaModule,
    MongooseModule.forRoot(process.env.DATABASE_URI??"localhost"),
    
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
