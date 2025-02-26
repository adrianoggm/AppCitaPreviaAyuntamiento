import { Controller,Post,Body } from "@nestjs/common";
import { CreateUserDto } from "src/domain/dto/create-usuario.dto";
import { Usuario} from "src/domain/entities/usuario.entity";
import { CreateUsuarioUseCase } from "src/application/use-cases/create-usuario.use-case"

