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
        certificado     //se genera y se cifra // es el certificado de firma que tiene esta persona solo será modificable por superadmin
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
        public departamento:string,
        public localizacion:string,
        public certificado:string,  //Certificado de firma asociado?
    ){}
}