/*
         Departamento 
            iddepartamento
            nombre
            codigo:
            TipoTramites asociados :  "  . .. .. .. .. .. . . .  .. . . "
        
        //  Departamento  
*/
export class Departamento{

    constructor(
        public id: string,
        public readonly nombre: string,
        public codigo: string,
        public TipoTramites:string[],

    ){}
}