import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";
import { extraccId, buscarRut } from "../middlewares/formulario.middleware";

router.get('/listarPorRut/:rutPaciente', buscarRut, FormularioController.buscarFichaPaciente);
router.post('/ingresar/:idUsuario', extraccId, FormularioController.crearFichaTecnica);



export default router;
