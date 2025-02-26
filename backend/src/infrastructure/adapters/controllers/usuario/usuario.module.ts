import { Module } from "@nestjs/common";
import { UsuarioController } from '../usuario.controller';
import { CreateUseruseCase  } from '../../../../application/use-cases/create-user.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../persistence/user.schema';
import { UserRepository  } from '../../../persistence/user.repository';