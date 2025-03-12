import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class LoginUsuarioDto {
    @IsNotEmpty()
    @IsString()
    nombreusuario: string;
    @IsNotEmpty()
    @IsString()
    contrasena : string;
  }
  