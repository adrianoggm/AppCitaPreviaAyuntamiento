
//aqui compruebo  si cumplen el tipo de dato que se espera y regla negocio que se espera 
import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate,
    IsDateString
} from 'class-validator';
// Igual si se ponen enums hay que actualizar 
/*
    Clase trámite  tiene asociados los siguientes elementos :
    -id: string         id generado 
    -nombre: string     nombre del tramite
    -estado: enum       estado del trámite (pendiente,confirmado, en proceso,finalizado)
    -fechaInicio: Date    fecha de inicio del trámite 
    -fechaFin: Date       fecha de finalización del trámite
    -usuario: string  idusuario que genera y posee el trámite 
    -codigo: string  codigo generado con referencia al tipo de trá,ite departamiento y num del dia
    -tipo: TipoTramite  tipo de trámite duda si será necesario o duplicado con nombre.
    -documentos: vector de Documentos asociados al trámite.
    -observaciones: string
*/
export class CreateTramiteDto { 
    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    estado: string;

    @IsNotEmpty()
    @IsDateString()
    readonly fechaInicio: string;

    @IsOptional()
    @IsDateString()
    fechaFin: string;

    @IsNotEmpty()
    @IsString()
    readonly idusuario: string;

    @IsNotEmpty()
    @IsString()
    readonly codigo: string;

    @IsNotEmpty()
    @IsString()
    readonly tipoTramite: string;

    @IsOptional()
    @IsString()
    readonly observaciones?: string;

    @IsOptional()
    @IsString({each: true}) //buscar como hacer que cada uno sea un string
    readonly documentos?: string[];

    @IsOptional()
    @IsString()
    idtecnico?: string;
}