import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";
import { extraccionId } from "../middlewares/extraccionId";
import { buscarRut } from "../middlewares/verificarRut.buscar.middleware";

router.get('/listarPorRut/:rutPaciente', buscarRut, FormularioController.buscarFichaPaciente);

router.post('/paso1/:idUsuario', FormularioController.primerPasoController);
router.post('/paso2/:idUsuario', FormularioController.segundoPasoController);
router.post('/paso3/:idUsuario', FormularioController.tercerPasoController);
router.post('/paso4/:idUsuario', FormularioController.cuartoPasoController);


router.post('/ingresar/:idUsuario', FormularioController.crearFichaTecnica);

router.put('/actualizar', extraccionId ,FormularioController.actualizarForm);

export default router;
