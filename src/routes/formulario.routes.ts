import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";
import { buscarRut } from "../middlewares/verificarRut.middleware";

router.get('/listarPorRut/:rutPaciente', buscarRut, FormularioController.buscarFichaPaciente);

router.post('/ingresar/:idUsuario', FormularioController.crearFichaTecnica);



export default router;
