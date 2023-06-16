import { Router } from "express";
import { SessionController } from "../controllers/sesion.controller";
import { verficarSesion } from "../middlewares/sesion.middleware";
const router = Router();

router.post('/credenciales',verficarSesion, SessionController.sesion);
router.get('/verificar', SessionController.datosUsuarioSesion);

export default router;
