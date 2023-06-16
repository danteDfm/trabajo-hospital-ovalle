import { Router } from "express";
const router = Router();
import { FichasController } from "../controllers/fichas.controllers";
import { verificarId } from "../middlewares/historial.ficha.middleware";


router.get('/activa/:idPaciente', verificarId,FichasController.fichaActiva);
router.get('/inactivas/:idPaciente', verificarId,FichasController.fichaInactiva);

export default router;
