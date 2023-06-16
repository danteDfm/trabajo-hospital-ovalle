"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarId = void 0;
function verificarId(req, res, next) {
    const { idPaciente } = req.params;
    if (!idPaciente) {
        return res.status(400).json({
            ok: false,
            err: "le id debe ser obligatorio"
        });
    }
    next();
}
exports.verificarId = verificarId;
