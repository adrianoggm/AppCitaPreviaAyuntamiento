import { Module } from "@nestjs/common";
import { UsuarioController } from '../usuario.controller';
import { CreateUseruseCase  } from '../../../../application/use-cases/create-user.use-case';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../domain/schemas/user.schema';
import { UserRepository  } from '../../../persistence/user.repository';