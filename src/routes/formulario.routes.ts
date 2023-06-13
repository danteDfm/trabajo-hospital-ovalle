import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";
import { extraccionId } from "../middlewares/extraccionId";

router.post('/paso1/:pasoDinamico/:idUsuario', FormularioController.primerPasoController);

router.post('/paso2/:pasoDinamico/:idUsuario', FormularioController.segundoPasoController);

router.post('/paso3/:pasoDinamico/:idUsuario', FormularioController.tercerPasoController);

router.post('/paso4/:pasoDinamico/:idUsuario', FormularioController.cuartoPasoController);

router.put('/actualizar', extraccionId ,FormularioController.actualizarForm);

export default router;
