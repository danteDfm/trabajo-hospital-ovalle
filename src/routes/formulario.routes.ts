import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";
import { extraccionId } from "../middlewares/extraccionId";
import { buscarRut } from "../middlewares/verificarRut.buscar.middleware";

router.get('/listarPorRut/:rutPaciente', buscarRut, FormularioController.buscarFichaPaciente);

router.post('/ingresar/:idUsuario', FormularioController.crearFichaTecnica);



export default router;
