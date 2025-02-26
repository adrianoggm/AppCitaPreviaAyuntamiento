
import {Schema} from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_ROUND=10;
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
UsuarioSchema.pre('save', async function (next) {
    const usuario = this;
    if (usuario.isModified('contrasena')) {
      try {
        const hash = await bcrypt.hash(usuario.contrasena, SALT_ROUND);
        usuario.contrasena = hash;
      } catch (err) {
        return next(err);
      }
    }
    if (usuario.isModified('dnipas')) {
      try {
        const hash = await bcrypt.hash(usuario.dnipas, SALT_ROUND);
        usuario.dnipas = hash;
      } catch (err) {
        return next(err);
      }
    }
    next();
  });
// Crea una propiedad virtual "id" que devuelve el _id en formato string
UsuarioSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
UsuarioSchema.set('toJSON', { virtuals: true });