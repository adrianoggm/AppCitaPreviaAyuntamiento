
import {Schema} from 'mongoose';


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
export const TramiteSchema = new Schema({
    nombre: {type: String, required: true},
    estado: {type: String, required: true},    //Igual es un Enum y cambia a futuro
    fechaInicio: {type: Date, required: true}, //Reutilizo el time Stamp ? 
    fechaFin: {type: Date},   //OJO 

    idusuario: {type: String, required: true},
    codigo: {type: String, required: true}, 
    tipoTramite: {type: String},   //IGUAL HAY QUE CAMBIARLIO 
    idtecnico: { type: String, required: true },
    documentos: {type: [String]},
    observaciones: {type: String}  


});

// Crea una propiedad virtual "id" que devuelve el _id en formato string
TramiteSchema.virtual('id').get(function() {
    return this._id.toHexString();
  });
TramiteSchema.set('toJSON', { virtuals: true });