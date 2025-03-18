
import {Schema} from 'mongoose';


/*
    Clase Tipotrámite  tiene asociados los siguientes elementos :

    -nombretipotramite: string     nombre del tramite
    -presentacion: string       estado del trámite (pendiente,confirmado, en proceso,finalizado)
    -organogestor: string    fecha de inicio del trámite 
    -recursos: string       fecha de finalización del trámite
    -normativa: string  idusuario que genera y posee el trámite 
    -documentacion a presentar: string  codigo generado con referencia al tipo de trá,ite departamiento y num del dia

*/

export const TipoTramiteMetadatoSchema = new Schema({
    nombre: {type: String, required: true,unique: true},
    presentacion: {type: String, required: true},   
    organogestor: {type: String, required: true}, 
    recursos: {type: String},  
    normativa: {type: String, required: true},
    documentacion: {type: String, required: true}, 
});

// Crea una propiedad virtual "id" que devuelve el _id en formato string
TipoTramiteMetadatoSchema.virtual('id').get(function() {
    return this._id.toHexString();
  });
  
TipoTramiteMetadatoSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      return ret;
    }
  });
  