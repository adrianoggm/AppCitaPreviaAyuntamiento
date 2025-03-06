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
    -idtécnico asignado
*/

export class Tramite {
    constructor(
        public readonly id: string,
        public nombre:string,
        public estado: string, //CAMBIAR POR ENUM
        public fechaInicio: Date,
        public idusuario: string,
        public codigo: string,
        public tipoTramite: string, //CAMBIAR POR ENUM
        public fechaFin?: Date,
        public documentos?: string[],
        public observaciones?: string,
       // public idtecnico?: string diria que No sirve una vez tenemos la tabla de CITAS 
    ){
        

    }
}