/*
    Clase Tipotrámite  tiene asociados los siguientes elementos :

    -nombretipotramite: string     nombre del tramite
    -presentacion: string       estado del trámite (pendiente,confirmado, en proceso,finalizado)
    -organogestor: string    fecha de inicio del trámite 
    -recursos: string       fecha de finalización del trámite
    -normativa: string  idusuario que genera y posee el trámite 
    -documentacion a presentar: string  codigo generado con referencia al tipo de trá,ite departamiento y num del dia

*/

export class TipoTramite {
    constructor(
        public nombretipotramite:string,
        public nombretramites: string[],
    ){
        

    }
}