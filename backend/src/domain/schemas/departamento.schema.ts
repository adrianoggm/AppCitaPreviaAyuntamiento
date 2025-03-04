import { Schema } from 'mongoose';

/*
         Departamento 
            iddepartamento
            nombredepartamento
            codigodepartamento:
            TipoTramites asociados :  "  . .. .. .. .. .. . . .  .. . . "
        
        //  Departamento  
*/

export const DepartamentoSchema = new Schema({
  nombredepartamento: { type: String, required: true, unique: true },
  codigodepartamento: { type: String, required: true, unique: true },
  TipoTramites: { type: [String] }
  
});

// Propiedad virtual "id" para mostrar _id en formato string
DepartamentoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

DepartamentoSchema.set('toJSON', { virtuals: true });
