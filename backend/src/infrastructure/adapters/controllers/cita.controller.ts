import { Controller,Post,Body,Get,  Query } from "@nestjs/common";
import { CreateCitaDto } from "src/domain/dto/create-cita.dto";
import { Cita} from "src/domain/entities/cita.entity";
import { CreateCitaUseCase } from "src/application/use-cases/create-cita.use-case"

@Controller("api/cita")
export class CitaController{
    constructor (
        private readonly  createCitaUseCase: CreateCitaUseCase,
    ){}

    @Post()
    async create(@Body() createCitaDto: CreateCitaDto):Promise<Cita>{
        console.log(createCitaDto)
        return await this.createCitaUseCase.execute(createCitaDto);
    }


    
    /*@Get()   //Busco los que pertenezcan a mismo cita
    async findAllUsuarios(@Query("Cita") nombreusuario:string): Promise <Usuario[]|null>{
        return await this.buscarUsuarioUseCase.execute(nombreusuario);
    }*/
}