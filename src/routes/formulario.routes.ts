import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";
import { extraccId, buscarRut } from "../middlewares/formulario.middleware";
import { cambioEstado } from "../middlewares/cambioDeEstados.middleware";

router.get('/listarPorRut/:rutPaciente', buscarRut, FormularioController.buscarFichaPaciente);
router.post('/ingresar/:idUsuario', extraccId,cambioEstado ,FormularioController.crearFichaTecnica);
router.post('/finalizar', FormularioController.finalizar);



export default router;
