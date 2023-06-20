import { Router } from "express";
const router = Router();
import { FichasController } from "../controllers/fichas.controllers";
import { verificarId } from "../middlewares/historial.ficha.middleware";


router.get('/activa/:rutPaciente', verificarId,FichasController.fichaActiva);

router.get('/inactivas/:rutPaciente', verificarId,FichasController.fichaInactiva);
router.get('/listar/:idFicha', FichasController.listarFichaId);

export default router;
