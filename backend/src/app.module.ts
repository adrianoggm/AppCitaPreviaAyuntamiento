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
import { TipoTramiteModule } from './infrastructure/adapters/controllers/tipotramite/tipotramite.module';
import { TipoTramiteMetadatoModule } from './infrastructure/adapters/controllers/tipotramitemetadato/tipotramitemetadato.module';
import {AuthModule} from './infrastructure/authentication/auth.module';
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
    AuthModule,
    TramiteModule,
    UsuarioModule,
    TecnicoModule,
    DepartamentoModule,
    TipoTramiteModule,
    CitaModule,
    TipoTramiteMetadatoModule,
    MongooseModule.forRoot(process.env.DATABASE_URI??"localhost"),
    
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
