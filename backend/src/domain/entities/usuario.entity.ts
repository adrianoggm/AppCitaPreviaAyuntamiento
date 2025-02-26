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


export class Usuario{

    constructor(
        public id: string,
        public readonly nombreusuario: string,
        public nombre: string,
        public apellidos:string,
        public dnipas:string,
        public contrasena:string,
        public correo: string,
        public telefono:string,
    ){}
}