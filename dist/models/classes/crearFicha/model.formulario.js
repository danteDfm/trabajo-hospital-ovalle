"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioRegistro = void 0;
class FormularioRegistro {
    constructor() {
        this.disforia = false;
        this.usoPrenda = false;
        //sexualidad
        this.identidadGenero = "";
        this.orientacionSexual = "";
        this.inicioTransicionSexual = new Date(0);
        this.tiempoLatencia = new Date(0);
        this.apoyoNucleoFamilia = false;
        //antecedenes familiares
        this.detalleAntecedente = undefined;
        this.presenciaAntecedente = false;
        //HABITOS
        this.detalleHabitoAlimenticio = "";
        this.usoDroga = false;
        //Pacientes
        this.rutPaciente = "";
        this.nombrePaciente = "";
        this.apellidoPaternoPaciente = "";
        this.apellidoMaternoPaciente = "";
        this.pronombre = "";
        this.nombreSocial = "";
        this.fechaNacimientoPaciente = new Date(0);
        this.domicilioPaciente = "";
        //area psiquica
        this.utilizacionFarmaco = false;
        this.controlEquipoSalud = false;
        this.psicoteraia = false;
        this.evaluacionPsiquica = false;
        this.diagnosticoPsiquico = false;
        //APOYO ESCOLARIDAD
        this.gradoEscolar = "";
        this.gradoApoyo = "";
        this.actorInvolucrado = "";
        this.detalleApoyo = "";
        //funcionalidad genital
        this.detalleFuncionalidadGenital = "";
        //historiaClinica
        this.detallesAntecedentesClinicos = "";
        //personas Involucradas
        this.rutInvolucrado = "";
        this.nombreInvolucrado = "";
        this.apellidoPaternoInvolucrado = "";
        this.apellidoMaternoInvolucrado = "";
        this.telefonoInvolucrado = 0;
        this.domicilioInvolucrado = "";
        //acompañante
        this.rutAcompanante = "";
        this.nombreAcompanante = "";
        //ficha tecnica
        this.fechaIngreso = new Date(0);
        this.borradoLogico = false;
    }
    //son las tablas mas fuertes, como la ficha tecnica y la de paciente
    tablasPrimarias(fichaTecnica, pacientes) {
        //ficha
        this.fechaIngreso = fichaTecnica.fechaIngreso;
        this.borradoLogico = fichaTecnica.borradoLogico;
        //paciente
        this.rutPaciente = pacientes.rutPaciente;
        this.nombrePaciente = pacientes.nombrePaciente;
        this.apellidoPaternoPaciente = pacientes.apellidoPaternoPaciente;
        this.apellidoMaternoPaciente = pacientes.apellidoMaternoPaciente;
        this.pronombre = pacientes.pronombre;
        this.nombreSocial = pacientes.nombrePaciente;
        this.fechaNacimientoPaciente = pacientes.fechaNacimientoPaciente;
        this.domicilioPaciente = pacientes.domicilioPaciente;
    }
    //tablas directamente relacionadas a las mas fuertes
    tablasSecuncarias(historiaClinica, personasInvolucradas, personaAcompanante, funcionalidadGenital, historiaIdentidadGenero, presenciaAntecedentes, areaPsiquica, apoyoEscolaridad) {
        this.identidadGenero = historiaIdentidadGenero.identidadGenero;
        this.orientacionSexual = historiaIdentidadGenero.orientacionSexual;
        this.inicioTransicionSexual =
            historiaIdentidadGenero.inicioTransicionSexual;
        this.tiempoLatencia = historiaIdentidadGenero.tiempoLatencia;
        this.apoyoNucleoFamilia = historiaIdentidadGenero.apoyoNucleoFamilia;
        this.presenciaAntecedente = presenciaAntecedentes.presenciaAntecedente;
        this.controlEquipoSalud = areaPsiquica.controlEquipoSalud;
        this.psicoteraia = areaPsiquica.psicoteraia;
        this.evaluacionPsiquica = areaPsiquica.evaluacionPsiquica;
        this.diagnosticoPsiquico = areaPsiquica.diagnosticoPsiquico;
        this.gradoEscolar = apoyoEscolaridad.gradoEscolar;
        this.gradoApoyo = apoyoEscolaridad.gradoApoyo;
        this.actorInvolucrado = apoyoEscolaridad.actorInvolucrado;
        this.detalleApoyo = apoyoEscolaridad.detalleApoyo;
        this.detalleFuncionalidadGenital =
            funcionalidadGenital.detalleFuncionalidadGenital;
        this.detallesAntecedentesClinicos =
            historiaClinica.detallesAntecedentesClinicos;
        this.rutInvolucrado = personasInvolucradas.rutInvolucrado;
        this.nombreInvolucrado = personasInvolucradas.nombreInvolucrado;
        this.apellidoPaternoInvolucrado =
            personasInvolucradas.apellidoPaternoInvolucrado;
        this.apellidoMaternoInvolucrado =
            personasInvolucradas.apellidoMaternoInvolucrado;
        this.telefonoInvolucrado = personasInvolucradas.telefonoInvolucrado;
        this.domicilioInvolucrado = personasInvolucradas.domicilioInvolucrado;
        this.rutAcompanante = personaAcompanante.rutAcompanante;
        this.nombreAcompanante = personaAcompanante.nombreAcompanante;
    }
    //son aquellas tablas que estan en la punta de la categorizacion. sin claves foraneas expresadas
    tablasTerciarias(presenciaDisforia, usoPrenda, usoDroga, habitosAlimenticios, usoFarmaco, detalleAntecedente) {
        this.disforia = presenciaDisforia.disforia;
        this.usoPrenda = usoPrenda.usoPrenda;
        this.detalleHabitoAlimenticio =
            habitosAlimenticios.detalleHabitoAlimenticio;
        this.usoDroga = usoDroga.usoDroga;
        this.utilizacionFarmaco = usoFarmaco.utilizacionFarmaco;
        this.detalleAntecedente = detalleAntecedente.detalleAntecedente;
    }
}
exports.FormularioRegistro = FormularioRegistro;
