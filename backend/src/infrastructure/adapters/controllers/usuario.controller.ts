import { Controller,Post,Body,Get,  Query } from "@nestjs/common";
import { CreateUsuarioDto } from "src/domain/dto/create-usuario.dto";
import { Usuario} from "src/domain/entities/usuario.entity";
import { CreateUsuarioUseCase } from "src/application/use-cases/create-usuario.use-case"
import { BuscarUsuarioUseCase } from "src/application/use-cases/buscar-usuario.use-case"

    //TODO AÑADIR  + RUTAS de usuario para añadir borrar editar buscar algun usuario .

@Controller("api/usuario")
export class UsuarioController{
    constructor (
        private readonly  createUsuarioUseCase: CreateUsuarioUseCase,
        private readonly  buscarUsuarioUseCase:  BuscarUsuarioUseCase
    ){}

    @Post()
    async create(@Body() createTramiteDto: CreateUsuarioDto):Promise<Usuario>{
        return await this.createUsuarioUseCase.execute(createTramiteDto);
    }
    //Busco por nombre de usario
    @Get()
    async findUsuarioByName(@Query("nombreusuario") nombreusuario:string): Promise <Usuario|null>{
        return await this.buscarUsuarioUseCase.execute(nombreusuario);
    }
    /*@Get()
    async findAllUsuarios(@Query("nombreusuario") nombreusuario:string): Promise <Usuario[]|null>{
        return await this.buscarUsuarioUseCase.execute(nombreusuario);
    }*/
}
