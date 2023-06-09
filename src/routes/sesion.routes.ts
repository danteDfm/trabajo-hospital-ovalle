import { Router } from "express";
import { SessionController } from "../controllers/sesion.controller";
const router = Router();

router.post('/credenciales', SessionController.sesion);
router.get('/verificar', SessionController.verificarToken);

export default router;
