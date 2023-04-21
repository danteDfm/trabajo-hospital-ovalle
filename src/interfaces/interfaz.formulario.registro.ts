
//sexualidad y disconformidad de genero
export interface ElementosDisforia{
    
    detallesDisforia?: string;
    disforia: boolean;
    prenda?:number;
    usoPrenda: boolean;
}


export interface HistoriaIdentidadGenero{

    identidadGenero:string;
    orientacionSexual:string;
    inicioTransicionSexual:Date;
    tiempoLatencia:Date;
    apoyoNucleoFamilia: boolean;
    
}

//antecedentes clinicos familiares

export interface antecedentesFamiliares{

    detalleAntecedente:string
    presenciaAntecedente:boolean;
}


//habitos

export interface HabitosPaciente{

    detalleHabitoAlimenticio: string;

    Depresoras: number, 
    Alucinogenas: number,
    Estimulants: number

    usoDroga: boolean

}


//detalles paciente

export interface Pacientes{


    rutPaciente:string;
    nombrePaciente:string;
    apellidoPaternoPaciente:string;
    apellidoPaternomaciente:string;
    pronombre: string;
    nombreSocial:string;
    fechaNacimientoPaciente:Date;
    domicilioPaciente: string

    
}

//utilizacion de farmacos y area psiquica

export interface AreaPsiquica{

    nombreFarmaco: string;
    utilizacionFarmaco: boolean;

    controlEquipoSalud:boolean;
    psicoteraia: boolean;
    evaluacionPsiquica:boolean;
    diagnosticoPsiquico:boolean;

}




//personas involucradas en la transicion

export interface personasInvolucradas{


  


}


//antecedentes clincios del paciente
export interface historiaClinica{

   

}

//ficha tecnica del paciente
export interface fichaTecnica{

    fechaIngreso:Date;
    borradoLogico:boolean;

    detalleFuncionalidadGenital: string;

    rutInvolucrado: string;
    nombreInvolucrado:string;
    apellidoPaternoInvolucrado:string;
    apellidoMaternoInvolucrado:string;
    telefonoInvolucrado:number;
    domicilioInvolucrado:string;

    detallesAntecedentesClinicos:string;

    
    gradoEscolar: string;
    gradoApoyo:string;
    actoInvolucrado:string;
    detalleApoyo:string;

    rutProfesional:string;
    nombreProfesional:string;
    emailProfesional:string;
    cargoProfesional:string;

    nombreCentro:string;
    logo:string;
    

}

