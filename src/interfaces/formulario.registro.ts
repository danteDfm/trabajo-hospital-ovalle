export interface Pacientes{
    rutPaciente: string;
    nombrePaciente: string;
    edadPaciente: number
}

export interface Enfermedades{
    nombreEnfermedad: string;
    gradoEnfermedad: string

}

export interface EnfermedadPaciente{

    fkPaciente: number;
    fkEnfermedad: number

}

