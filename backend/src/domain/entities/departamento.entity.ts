/*
         Departamento 
            iddepartamento
            nombredepartamento
            codigodepartamento:
            TipoTramites asociados :  "  . .. .. .. .. .. . . .  .. . . "
        
        //  Departamento  
*/
export class Departamento{

    constructor(
        public id: string,
        public readonly nombredepartamento: string,
        public codigodepartamento: string,
        public TipoTramites:string[],

    ){}
}