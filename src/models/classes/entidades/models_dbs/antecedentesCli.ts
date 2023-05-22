import { TypeAntecedentesClinicos } from "../../../types/tipos.entidades";

export class AntecedentesCli{

    public antecedentePerinatales?: string;
    public antecedenteHospitalizaciones?: string;
    public antecedentesQuirurgicos?: string;
    public antecedentesAlergicos?: string;
    public antecedentesPni?: string;
    public funcionalidadGenital?: string;

    constructor(antecedentes:TypeAntecedentesClinicos){

        this.antecedentePerinatales = antecedentes.antecedentePerinatales;
        this.antecedenteHospitalizaciones = antecedentes.antecedenteHospitalizaciones;
        this.antecedentesQuirurgicos = antecedentes.antecedentesQuirurgicos;
        this.antecedentesAlergicos = antecedentes.antecedentesAlergicos;
        this.antecedentesPni = antecedentes.antecedentesPni;
        this.funcionalidadGenital = antecedentes.funcionalidadGenital;

    }


}