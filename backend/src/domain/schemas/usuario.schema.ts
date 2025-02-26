
import {Schema} from 'mongoose';

/*
        Usuario:   

         idusuario      id del usuario
        nombeusuario   nombre de usuario 
        nombre 
        apellidos           
        dni/pas         DNI pasaporte // cifrarlo 
        contrasena      Contraseña      // cifrarla
        correo
        telefono
*/
export const UsuarioSchema = new Schema (
{
    //id: {type: String, required: true, unique: true},
    nombreusuario: {type: String, required: true,unique: true},
    nombre: {type: String, required: true},
    apellidos: {type: String, required: true},
    dnipas: {type: String, required: true},
    contrasena: {type: String, required: true},
    correo: {type: String, required: true,unique: true},
    telefono: {type: String, required: true},
}

);

// Crea una propiedad virtual "id" que devuelve el _id en formato string
UsuarioSchema.virtual('id').get(function() {
    return this._id.toHexString();
  });
UsuarioSchema.set('toJSON', { virtuals: true });