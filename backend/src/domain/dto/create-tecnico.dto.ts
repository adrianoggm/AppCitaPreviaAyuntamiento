import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

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


export class CreateTecnicoDto{
    @IsNotEmpty()
    @IsString()
    readonly id: string;
    
    @IsNotEmpty()
    @IsString()
    nombretecnico: string;

    @IsNotEmpty()
    @IsString()
    nombre : string;

    @IsNotEmpty()
    @IsString()
    apellidos : string;

    @IsNotEmpty()
    @IsString()
    idtrabajador : string;
    
    @IsNotEmpty()
    @IsString()
    contrasena : string;

    @IsNotEmpty()
    @IsString()
    correo : string;
    
    @IsNotEmpty()
    @IsString()
    telefono : string;

    @IsNotEmpty()
    @IsString()
    certificado : string;
}

