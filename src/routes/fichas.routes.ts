import { Router } from "express";
const router = Router();
import { FichasController } from "../controllers/fichas.controllers";


router.get('/activa/:idFicha', FichasController.fichaActiva);
router.get('/inactivas/:idFicha', FichasController.fichaInactiva);

export default router;
