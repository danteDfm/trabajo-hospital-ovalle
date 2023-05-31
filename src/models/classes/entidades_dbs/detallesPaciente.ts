import { HistoriaDrogas, AntecedentesFamilia, Dieta } from "../../interfaces/tipos.entidades";



class detallesPaciente implements HistoriaDrogas, AntecedentesFamilia, Dieta{

    usoDroga?: boolean | undefined;
    detalleDroga?: string | undefined;
    antecedente?: boolean | undefined;
    detalleAntecedente?: boolean | undefined;
    tipoDieta: string;

    constructor(historiaDroga:HistoriaDrogas, antecedentes:AntecedentesFamilia, dieta:Dieta){


        this.usoDroga = historiaDroga.usoDroga;
        this.detalleDroga = historiaDroga.detalleDroga;
        this.antecedente = antecedentes.antecedente;
        this.detalleAntecedente = antecedentes.detalleAntecedente;
        this.tipoDieta = dieta.tipoDieta;



    }


}