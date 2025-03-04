import {
    IsNotEmpty,
    IsString,
    IsOptional,
} from 'class-validator';
/*
         Departamento 
            iddepartamento
            nombredepartamento
            codigodepartamento:
            TipoTramites asociados :  "  . .. .. .. .. .. . . .  .. . . "
        
        //  Departamento  
*/


export class CreateCitaDto{
    /*@IsNotEmpty()
    @IsString()
    readonly id: string;*/
    
    @IsNotEmpty()
    @IsString()
    idtramite: string;

    @IsNotEmpty()
    @IsString()
    departamento : string;

    @IsNotEmpty()
    @IsString()
    estado : string;

    @IsOptional()
    @IsString()
    fechahora : string;
    @IsOptional()
    @IsString() 
    idtecnico : string;

}
