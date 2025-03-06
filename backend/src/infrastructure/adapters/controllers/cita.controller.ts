import { Controller,Post,Body,Get,  Query } from "@nestjs/common";
import { CreateCitaDto } from "src/domain/dto/create-cita.dto";
import { Cita} from "src/domain/entities/cita.entity";
import { CreateCitaUseCase } from "src/application/use-cases/create-cita.use-case"
import {ObtenerHorasSemanaCitaUseCase} from "src/application/use-cases/obtener-horas-semana-cita.use-case"
import { ObtenerDiasMesCitaUseCase } from "src/application/use-cases/obtener-dias-mes-cita.use-case";

@Controller("api/cita")
export class CitaController{
    constructor (
        private readonly  createCitaUseCase: CreateCitaUseCase,
        private readonly ObtenerHorasSemanaCitaUseCase: ObtenerHorasSemanaCitaUseCase,
        private readonly obtenerDiasMesCitaUseCase: ObtenerDiasMesCitaUseCase,
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
      const horasLocales = horas.map(isoStr => new Date(isoStr).toLocaleString());
     return horasLocales;

    }
    @Get('dias-disponibles')
    async getDiasDisponibles(
      @Query('tipoTramite') tipoTramite: string,
      @Query('localizacion') localizacion?: string,
    ): Promise<string[]> {
      // Ejecutamos el caso de uso para obtener el set de días disponibles
      const diasDisponiblesSet = await this.obtenerDiasMesCitaUseCase.execute(
        tipoTramite,
        localizacion,
      );
  
      // Convertimos el set en array y formateamos cada fecha a DD/MM/YYYY
      const diasDisponiblesArray = Array.from(diasDisponiblesSet).map((fechaISO) => {
        const [year, month, day] = fechaISO.split('-');
        return `${day}/${month}/${year}`;
      });
  
      return diasDisponiblesArray;
    }
    /*@Get()   //Busco los que pertenezcan a mismo cita
    async findAllUsuarios(@Query("Cita") nombreusuario:string): Promise <Usuario[]|null>{
        return await this.buscarUsuarioUseCase.execute(nombreusuario);
    }*/
}