import { Controller,Post,Body } from "@nestjs/common";
import { CreateUsuarioDto } from "src/domain/dto/create-usuario.dto";
import { Usuario} from "src/domain/entities/usuario.entity";
import { CreateUsuarioUseCase } from "src/application/use-cases/create-usuario.use-case"

    //TODO AÑADIR  + RUTAS de usuario para añadir borrar editar buscar algun usuario .

@Controller("api/usuario")
export class UsuarioController{
    constructor (
        private readonly  createTramiteUseCase: CreateUsuarioUseCase
    ){}

    @Post()
    async create(@Body() createTramiteDto: CreateUsuarioDto):Promise<Usuario>{
        return await this.createTramiteUseCase.execute(createTramiteDto);
    }

}