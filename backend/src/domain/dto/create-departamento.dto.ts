import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
/*
         Departamento 
            iddepartamento
            nombredepartamento
            codigo:
            TipoTramites asociados :  "  . .. .. .. .. .. . . .  .. . . "
        
        //  Departamento  
*/

export class CreateDepartamentoDto {
  /*@IsNotEmpty()
    @IsString()
    readonly id: string;*/

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsOptional()
  @IsString({ each: true }) //buscar como hacer que cada uno sea un string
  TipoTramites: string[];
}
