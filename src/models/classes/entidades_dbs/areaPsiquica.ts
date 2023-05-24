import { AreaPsiquica } from "../../types/tipos.entidades";


export class AreaPsique{

    public controlEquipoSaludMental: boolean; 
    public psicoterapia: boolean; 
    public evaluacionPsiquica: boolean; 
    public diagnosticoPsiquiatrico: boolean; 
    public utilizacionFarmaco: boolean; 
    public detallesFarmacos: string;

    constructor(psique:AreaPsique){

        this.controlEquipoSaludMental = psique.controlEquipoSaludMental;
        this.psicoterapia = psique.psicoterapia;
        this.evaluacionPsiquica = psique.evaluacionPsiquica;
        this.diagnosticoPsiquiatrico = psique.diagnosticoPsiquiatrico;
        this.utilizacionFarmaco = psique.utilizacionFarmaco;
        this.detallesFarmacos = psique.detallesFarmacos;

    }

}