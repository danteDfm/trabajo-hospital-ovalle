import { Router } from "express";
const router = Router();
import { FormularioController } from "../controllers/formulario.controller";

router.post('/primer-paso/:idUsuario', FormularioController.primerPasoController);
router.post('/segundo-paso/:idUsuario', FormularioController.segundoPasoController);
router.post('/tercer-paso/:idUsuario', FormularioController.tercerPasoController);

export default router;
