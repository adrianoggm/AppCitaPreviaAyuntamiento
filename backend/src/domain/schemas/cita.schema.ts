import { Schema } from 'mongoose';

/*
        Cita:   

         idtramite      → Trámite al que pertenece la cita
         departamento   → Departamento donde se gestiona la cita
         estado        → Estado de la cita (pendiente, confirmada, cancelada)
         fechahora     → Fecha y hora de la cita (ISO 8601)
         idtecnico     → Técnico asignado a la cita
*/

export const CitaSchema = new Schema(
  {
    idtramite: { type: String, required: true },
    //departamento: { type: String, required: true },
    estado: { type: String, required: true, enum: ['pendiente', 'confirmada', 'cancelada'] },
    fechahora: { type: String, required: false },
    idtecnico: { type: String, required: false }
  },
  { timestamps: true } // Agrega createdAt y updatedAt automáticamente
);

// Propiedad virtual "id" para mostrar _id en formato string
CitaSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

CitaSchema.set('toJSON', { virtuals: true });
