import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

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

export class CreateUsuarioDto{

    
    @IsNotEmpty()
    @IsString()
    nombreusuario: string;

    @IsNotEmpty()
    @IsString()
    nombre : string;

    @IsNotEmpty()
    @IsString()
    apellidos : string;

    @IsNotEmpty()
    @IsString()
    dnipas : string;
    
    @IsNotEmpty()
    @IsString()
    contrasena : string;

    @IsNotEmpty()
    @IsString()
    correo : string;
    
    @IsNotEmpty()
    @IsString()
    telefono : string;
}

