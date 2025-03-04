/*
        Cita:   

        idCita     id de cita
        idtramite   //tramite asociado

        Departamento
        estado
        idtecnico   asignado
        Fechahora    //   
        
        // Departamento 
            iddepartamento
            codigodepartamento:
            TipoTramites asociados :  "  . .. .. .. .. .. . . .  .. . . "

        //  Departamento  
*/


export class Cita{

    constructor(
        public id: string,
        public idtramite: string,
        public departamento: string,
        public estado :string,
        public fechahora:string,
        public idtecnico:string,
    ){}
}