import { Schema } from 'mongoose';

/*
         Departamento 
            iddepartamento
            nombredepartamento
            codigo:
            TipoTramites asociados :  "  . .. .. .. .. .. . . .  .. . . "
        
        //  Departamento  
*/

export const DepartamentoSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  codigo: { type: String, required: true, unique: true },
  TipoTramites: { type: [String] }
  
});

// Propiedad virtual "id" para mostrar _id en formato string
DepartamentoSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

DepartamentoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    return ret;
  }
});
