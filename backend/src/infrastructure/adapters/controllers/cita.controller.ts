import { Controller,Post,Body,Get,  Query } from "@nestjs/common";
import { CreateCitaDto } from "src/domain/dto/create-cita.dto";
import { Cita} from "src/domain/entities/cita.entity";
import { CreateCitaUseCase } from "src/application/use-cases/create-cita.use-case"
import {ObtenerHorasSemanaCitaUseCase} from "src/application/use-cases/obtener-horas-semana-cita.use-case"

@Controller("api/cita")
export class CitaController{
    constructor (
        private readonly  createCitaUseCase: CreateCitaUseCase,
        private readonly ObtenerHorasSemanaCitaUseCase: ObtenerHorasSemanaCitaUseCase,
    ){}

    @Post()
    async create(@Body() createCitaDto: CreateCitaDto):Promise<Cita>{
        console.log(createCitaDto)
        return await this.createCitaUseCase.execute(createCitaDto);
    }


    @Get('/horas-disponibles')
    async obtenerHorasDisponibles(
      @Query('tipoTramite') tipoTramite: string,
      @Query('localizacion') localizacion?: string,
    ) {
      const horasdisponibles = await this.ObtenerHorasSemanaCitaUseCase.execute(tipoTramite, localizacion);
      // Convertimos el Map a un objeto
      const horas =  Array.from(horasdisponibles.keys());
      return horas;
    }
    /*@Get()   //Busco los que pertenezcan a mismo cita
    async findAllUsuarios(@Query("Cita") nombreusuario:string): Promise <Usuario[]|null>{
        return await this.buscarUsuarioUseCase.execute(nombreusuario);
    }*/
}