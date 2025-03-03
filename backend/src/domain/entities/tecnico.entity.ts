/*
        Tecnico:   

         idusuario      id del usuario
        nombretecnico   nombre de usuario 
        nombre 
        apellidos           
        idtrabajador     // cifrarlo 
        contrasena      Contraseña      // cifrarla
        correo
        telefono
        certificado
*/


export class Tecnico{

    constructor(
        public id: string,
        public readonly nombretecnico: string,
        public nombre: string,
        public apellidos:string,
        public idtrabajador:string,
        public contrasena:string,
        public correo: string,
        public telefono:string,
        public certificado:string,  //Certificado de firma asociado?
    ){}
}