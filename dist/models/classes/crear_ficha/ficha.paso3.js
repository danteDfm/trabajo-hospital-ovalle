"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entorno = void 0;
class entorno {
    constructor() {
        this.entornoPaciente = {
            escolaridad: {
                gradoEscolar: "",
                gradoDeApoyo: "",
                actorInvolucrado: "",
                detallesApoyo: ""
            },
            antecedentesFamiliares: {
                presenciaAntecedentes: false,
                detallesAntecedentes: ""
            }
        };
    }
}
exports.entorno = entorno;
