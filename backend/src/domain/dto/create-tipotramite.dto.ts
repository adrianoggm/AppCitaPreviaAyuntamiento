/*
    Clase Tipotrámite  tiene asociados los siguientes elementos :

    -nombretipotramite: string     nombre del tramite
    -presentacion: string       estado del trámite (pendiente,confirmado, en proceso,finalizado)
    -organogestor: string    fecha de inicio del trámite 
    -recursos: string       fecha de finalización del trámite
    -normativa: string  idusuario que genera y posee el trámite 
    -documentacion a presentar: string  codigo generado con referencia al tipo de trá,ite departamiento y num del dia

*/

//aqui compruebo  si cumplen el tipo de dato que se espera y regla negocio que se espera
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoTramiteDto {
  @IsNotEmpty()
  @IsString()
  readonly nombretipotramite: string;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly nombretramites: string[];
}
