import {CreateUsuarioDto} from "../dto/create-usuario.dto";
import {Usuario} from "../entities/usuario.entity";

export interface IUsuarioRepository {
    // Crea un nuevo trámite pasandole el formato con el departamento . 
    createUsuario(tramite: CreateUsuarioDto): Promise<Usuario>;

}