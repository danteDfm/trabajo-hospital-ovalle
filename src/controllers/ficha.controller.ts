import { Request, Response } from "express";
import { FormularioRegistro } from "../models/classes/crear_ficha/model.formulario";


const dataPaciente = new FormularioRegistro;
export class CrearFichaTecnica{

    constructor(){}

    static async crearFicha(req:Request,res:Response){

        const {body} = req;


        dataPaciente.informacionPaciente.dataPaciente={...body.dataPaciente};
        dataPaciente.informacionPaciente.dataInvolucrados.dataInvolucrado={...body.dataInvolucrados};
        dataPaciente.informacionPaciente.dataInvolucrados.dataAcompanante={...body.dataAcompanante};
        dataPaciente.indentidadGenero.historiaIdentidadGenero.historiaGenero = {...body.historiaIdentidadGenero.historiaGenero};
        dataPaciente.indentidadGenero.historiaIdentidadGenero.prendasDisconformidadGenero = {...body.historiaIdentidadGenero.prendasDisconformidadGenero};
        dataPaciente.entornoPaciente.entornoPaciente.escolaridad = {...body.entornoPaciente.escolaridad};
        dataPaciente.entornoPaciente.entornoPaciente.antecedentesFamiliares = {...body.entornoPaciente.antecedentesFamiliares};
        dataPaciente.areaPsiquica.datosPsiquicos.datosPsiquicos={...body.areaPsiquica.datosPsiquicos};
        dataPaciente.areaPsiquica.datosPsiquicos.usofarmacos={...body.areaPsiquica.usoFarmaco};
        dataPaciente.areaPsiquica.datosPsiquicos.disforia={...body.areaPsiquica.disforia};
        dataPaciente.areaPsiquica.datosPsiquicos.habitos={...body.areaPsiquica.habitos};
        dataPaciente.antecedentesClinicosPaciente.antecedentesClinicos={...body.antecedentesClinicos};


       const idDataTablasTerciarias= await dataPaciente.crearTablasTerciarias();

         const idTablasSecundarias = await  dataPaciente.crearTablasSecundarias(

                idDataTablasTerciarias.idUsoPrenda,
                idDataTablasTerciarias.idPresenciaDisforia,
                idDataTablasTerciarias.idPresenciaAntecedentesFamiliares,
                idDataTablasTerciarias.idUsoDrogas,
                idDataTablasTerciarias.idUsoFarmaco,
                idDataTablasTerciarias.idHabitosAlimenticios,
            );
            dataPaciente.crearTablaPrimaria(
                body.fechaIngreso,
                body.borradoLogico,
                1,
                idTablasSecundarias.idPaciente,
                idTablasSecundarias.idApoyoEscolaridad,
                idTablasSecundarias.idAreaPsiquica,
                idTablasSecundarias.idFuncionalidadGenital,
                idTablasSecundarias.idHistoriasClinicas,
                idTablasSecundarias.idPersonaAcompanante,
                idTablasSecundarias.idPersonaInvolucrada
            );

       res.status(201).send(dataPaciente);
    }



}


